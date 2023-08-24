import { useStorage } from "@vueuse/core";
import { computed } from "vue";

export interface SplittedMark {
  id: number;
  totalTimeInMs: number;
  intervalInMs: number;
  description: string;
}

interface SplitterState {
  nextId: number;
  marks: Array<SplittedMark>;
  lastMarkMs: number; //TODO: can be calculated
}

//useStorage make ref out of it, so it has to be new instance
//every time you want reset state...
const defaultState = (): SplitterState => ({
  nextId: 1,
  marks: [],
  lastMarkMs: 0,
});

const splitterId = "splitter-state";

export const useSplitter = () => {
  const state = useStorage<SplitterState>(splitterId, defaultState());

  const add = (totalTimeInMs: number) => {
    const intervalInMs = totalTimeInMs - state.value.lastMarkMs;
    state.value.lastMarkMs = totalTimeInMs;
    state.value.marks.push({
      id: state.value.nextId,
      totalTimeInMs,
      intervalInMs,
      description: "",
    });
    state.value.nextId = state.value.nextId + 1;
  };

  const changeDescription = (id: number, description: string) => {
    state.value.marks = state.value.marks.map((m: any) =>
      m.id === id ? { ...m, description } : m,
    );
  };

  const clear = () => {
    state.value = defaultState();
  };

  const marks = computed(() => state.value.marks);

  return { marks, add, changeDescription, clear };
};
