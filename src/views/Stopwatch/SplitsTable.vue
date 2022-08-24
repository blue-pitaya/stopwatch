<script lang="ts" setup>
const tableData = [
  {
    total: "00:03:45:2",
    interval: "00:03:45:2",
    description: "coding",
  },
];
</script>

<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    cell-class-name="ok"
    size="large"
  >
    <el-table-column prop="total" label="Total" width="150" />
    <el-table-column prop="interval" label="Interval" width="150" />
    <el-table-column prop="description" label="Description" />
  </el-table>
</template>

<style scoped>
.el-table--large {
  font-size: 1.1rem;
}
</style>
