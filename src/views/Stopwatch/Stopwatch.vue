<template>
  <div class="container">
    <div class="counterGrid">
      <Counter :duration-in-ms="deltaTimeInMs" />
      <div class="rowFlex">
        <el-button
          v-if="!hasStarted"
          type="success"
          class="bigButton"
          plain
          @click="startClicked"
          >Start</el-button
        >
        <el-button
          v-if="hasStarted && !isPaused"
          type="primary"
          class="bigButton"
          plain
          @click="pauseClicked"
          >Pause</el-button
        >
        <el-button
          v-if="hasStarted && isPaused"
          type="success"
          class="bigButton"
          plain
          @click="resumeClicked"
          >Resume</el-button
        >
        <el-button type="warning" class="bigButton" plain @click="splitClicked"
          >Split</el-button
        >
      </div>
    </div>
    <div>
      <SplitsTable :marks="splitter.marks.value" />
    </div>
    <div>
      <el-button plain>Export</el-button>
      <el-button type="danger" plain>Reset</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSplitter } from "@/services/useSplitter";
import { useTimer } from "@/services/useTimer";
import Counter from "./Counter.vue";
import SplitsTable from "./SplitsTable.vue";

const { start, pause, resume, deltaTimeInMs, hasStarted, isPaused } =
  useTimer();

const splitter = useSplitter();

const splitClicked = (e: any) => {
  splitter.add(deltaTimeInMs.value);
  unFocus(e);
};

const unFocus = (e: any) => {
  e.target.blur();
};

const startClicked = (e: any) => {
  start();
  unFocus(e);
};

const pauseClicked = (e: any) => {
  pause();
  unFocus(e);
};

const resumeClicked = (e: any) => {
  resume();
  unFocus(e);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.counterGrid {
  display: grid;
  height: 400px;
  grid-template-rows: 3fr 2fr;
}
.columnFlex {
  display: flex;
  flex-direction: column;
}

.rowFlex {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 10px;
}

.rowFlex * {
  flex: 1;
  height: 100%;
}

.bigButton {
  font-size: 3rem;
}
</style>
