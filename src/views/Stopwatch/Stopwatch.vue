<template>
  <div class="container">
    <div class="counterGrid">
      <Counter />
      <div class="rowFlex">
        <el-button type="success" class="bigButton" plain @click="unFocus"
          >Start</el-button
        >
        <el-button type="warning" class="bigButton" plain @click="unFocus"
          >Split</el-button
        >
      </div>
    </div>
    <div>
      <SplitsTable />
    </div>
    <div>
      <el-button plain>Export</el-button>
      <el-button type="danger" plain>Reset</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Counter from "./Counter.vue";
import SplitsTable from "./SplitsTable.vue";

const unFocus = (e: any) => {
  e.target.blur();
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
  font-size: 3em;
}
</style>
