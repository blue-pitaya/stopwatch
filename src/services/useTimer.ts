import { computed } from "@vue/reactivity";
import { useInterval } from "@vueuse/shared";
import moment from "moment";
import { ref, watch } from "vue";

export const useTimer = () => {
  const startTime = ref(moment());
  const lastTime = ref(moment());
  const pausedDurationMs = ref<number>(0);
  const isPaused = ref(false);

  const {
    counter,
    pause: timerPause,
    resume: timerResume,
  } = useInterval(10, {
    controls: true,
    immediate: false,
  });

  const start = () => {
    startTime.value = moment();
    lastTime.value = moment();
    pausedDurationMs.value = 0;
    counter.value = 0;

    resume();
  };

  watch(
    counter,
    () => {
      lastTime.value = moment();
    },
    {
      flush: "post",
    }
  );

  const pause = () => {
    timerPause();
    lastTime.value = moment();
    isPaused.value = true;
  };

  const resume = () => {
    pausedDurationMs.value =
      pausedDurationMs.value + moment().diff(lastTime.value);
    lastTime.value = moment();
    isPaused.value = false;
    timerResume();
  };

  const deltaTimeInMs = computed(
    () => lastTime.value.diff(startTime.value) - pausedDurationMs.value
  );

  const hasStarted = computed(() => counter.value > 0);

  return {
    start,
    resume,
    pause,
    deltaTimeInMs,
    hasStarted,
    isPaused,
  };
};
