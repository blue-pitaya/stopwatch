import { ref } from "vue";

export interface SplittedMark {
  totalTimeInMs: number;
  intervalInMs: number;
  description: string;
}

export const useSplitter = () => {
  const marks = ref<Array<SplittedMark>>([]);
  const lastMarkMs = ref<number>(0);

  const add = (totalTimeInMs: number) => {
    const intervalInMs = totalTimeInMs - lastMarkMs.value;
    lastMarkMs.value = totalTimeInMs;
    marks.value.push({ totalTimeInMs, intervalInMs, description: "-" });
  };

  return { marks, add };
};
