import { ref } from "vue";

export interface SplittedMark {
  id: number;
  totalTimeInMs: number;
  intervalInMs: number;
  description: string;
}

export const useSplitter = () => {
  const nextId = ref<number>(1);
  const marks = ref<Array<SplittedMark>>([]);
  const lastMarkMs = ref<number>(0);

  const add = (totalTimeInMs: number) => {
    const intervalInMs = totalTimeInMs - lastMarkMs.value;
    lastMarkMs.value = totalTimeInMs;
    marks.value.push({
      id: nextId.value,
      totalTimeInMs,
      intervalInMs,
      description: "",
    });
    nextId.value = nextId.value + 1;
  };

  const changeDescription = (id: number, description: string) => {
    marks.value = marks.value.map((m) =>
      m.id === id ? { ...m, description } : m
    );
  };

  const clear = () => {
    marks.value = [];
  };

  return { marks, add, changeDescription, clear };
};
