<script lang="ts" setup>
import { SplittedMark } from "@/services/useSplitter";
import moment from "moment";
import { computed, defineProps } from "vue";

const props = defineProps<{
  marks: Array<SplittedMark>;
}>();

const tableData = computed(() =>
  props.marks
    .slice()
    .reverse()
    .map((mark) => ({
      totalTime: moment.utc(mark.totalTimeInMs).format("HH:mm:ss:S"),
      interval: moment.utc(mark.intervalInMs).format("HH:mm:ss:S"),
      description: mark.description,
    }))
);
</script>

<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    cell-class-name="ok"
    size="large"
  >
    <el-table-column prop="totalTime" label="Total" width="150" />
    <el-table-column prop="interval" label="Interval" width="150" />
    <el-table-column prop="description" label="Description" />
  </el-table>
</template>

<style scoped>
.el-table--large {
  font-size: 1.1rem;
}
</style>
