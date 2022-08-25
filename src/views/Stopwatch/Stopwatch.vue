<script lang="ts" setup>
import { useSplitter } from "@/services/useSplitter";
import { useTimer } from "@/services/useTimer";
import { ElMessageBox } from "element-plus";
import Counter from "./Counter.vue";
import SplitsTable from "./SplitsTable/SplitsTable.vue";

const { start, pause, resume, deltaTimeInMs, hasStarted, isPaused, reset } =
  useTimer();
const splitter = useSplitter();

const splitClicked = () => {
  splitter.add(deltaTimeInMs.value);
};

const startClicked = () => {
  start();
};

const pauseClicked = () => {
  pause();
};

const resumeClicked = () => {
  resume();
};

const resetClicked = () => {
  ElMessageBox.confirm("Are you sure?").then(() => {
    reset();
    splitter.clear();
  });
};
</script>

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
          @focus="(e: any) => e.target.blur()"
          >Start</el-button
        >
        <el-button
          v-if="hasStarted && !isPaused"
          type="primary"
          class="bigButton"
          plain
          @click="pauseClicked"
          @focus="(e: any) => e.target.blur()"
          >Pause</el-button
        >
        <el-button
          v-if="hasStarted && isPaused"
          type="success"
          class="bigButton"
          plain
          @click="resumeClicked"
          @focus="(e: any) => e.target.blur()"
          >Resume</el-button
        >
        <el-button
          type="warning"
          class="bigButton"
          plain
          @click="splitClicked"
          @focus="(e: any) => e.target.blur()"
          >Split</el-button
        >
      </div>
    </div>
    <div>
      <SplitsTable
        :marks="splitter.marks.value"
        @description-changed="
          (payload) => splitter.changeDescription(payload.id, payload.value)
        "
      />
    </div>
    <div>
      <el-button plain>Export</el-button>
      <el-button
        type="danger"
        plain
        @click="resetClicked"
        @focus="(e: any) => e.target.blur()"
        >Reset</el-button
      >
    </div>
  </div>
</template>

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
