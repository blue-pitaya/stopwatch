import { computed } from "@vue/reactivity";
import { useStorage } from "@vueuse/core";
import { useInterval } from "@vueuse/shared";
import moment from "moment";
import { watch } from "vue";

interface TimerState {
  startTimestamp: number;
  lastTimestamp: number;
  pausedDurationMs: number;
  isPaused: boolean;
  counter: number;
}

const currentTimestamp = () => moment().valueOf();

//Timestamps in miliseconds
const defaultState = (): TimerState => ({
  startTimestamp: currentTimestamp(),
  lastTimestamp: currentTimestamp(),
  pausedDurationMs: 0,
  isPaused: false,
  counter: 0,
});

const timerId = "timer-state";

export const useTimer = () => {
  const {
    counter,
    pause: timerPause,
    resume: timerResume,
  } = useInterval(10, {
    controls: true,
    immediate: false,
  });

  const state = useStorage<TimerState>(timerId, defaultState());

  const hasStarted = computed(() => state.value.counter > 0);

  //After refreshing page when timer was running, pause it without counting paused duration
  if (hasStarted.value && !state.value.isPaused) {
    state.value.isPaused = true;
  }

  const pause = () => {
    timerPause();
    state.value.lastTimestamp = currentTimestamp();
    state.value.isPaused = true;
  };

  const reset = () => {
    timerPause();
    state.value = defaultState();
  };

  const start = () => {
    resume();
  };

  watch(
    counter,
    (v) => {
      state.value.counter = v;
      state.value.lastTimestamp = currentTimestamp();
    },
    {
      flush: "post",
    }
  );

  const resume = () => {
    const diffFromLastTimestamp =
      currentTimestamp() - state.value.lastTimestamp;
    state.value.pausedDurationMs =
      state.value.pausedDurationMs + diffFromLastTimestamp;
    state.value.lastTimestamp = currentTimestamp();
    state.value.isPaused = false;
    timerResume();
  };

  const deltaTimeInMs = computed(
    () =>
      state.value.lastTimestamp -
      (state.value.startTimestamp + state.value.pausedDurationMs)
  );

  const isPaused = computed(() => state.value.isPaused);

  return {
    start,
    resume,
    pause,
    deltaTimeInMs,
    hasStarted,
    isPaused,
    reset,
  };
};
