<script lang="ts" setup>
import { SplittedMark } from "@/services/useSplitter";
import moment from "moment";
import { Edit } from "@element-plus/icons-vue";
import {
  computed,
  defineProps,
  defineEmits,
  nextTick,
  getCurrentInstance,
} from "vue";
import SplitsTableEditDescription from "./SplitsTableEditDescription.vue";

interface TableRow {
  id: number;
  totalTime: string;
  interval: string;
  description: string;
  editMode: boolean;
}

const props = defineProps<{
  marks: Array<SplittedMark>;
}>();

const emit = defineEmits<{
  (e: "descriptionChanged", payload: { id: number; value: string }): void;
}>();

const tableData = computed(() =>
  props.marks
    .slice()
    .reverse()
    .map<TableRow>((mark) => ({
      id: mark.id,
      totalTime: moment.utc(mark.totalTimeInMs).format("HH:mm:ss:S"),
      interval: moment.utc(mark.intervalInMs).format("HH:mm:ss:S"),
      description: mark.description,
      editMode: false,
    }))
);

const editClicked = (row: TableRow) => {
  row.editMode = true;
};

const confirmClicked = (
  row: TableRow,
  payload: { id: number; value: string }
) => {
  row.editMode = false;
  emit("descriptionChanged", payload);
};
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
    <el-table-column prop="description" label="Description">
      <template #default="scope">
        <div class="descriptionCell">
          <div v-if="!scope.row.editMode" class="leftRight">
            <div>{{ scope.row.description }}</div>
            <el-button :icon="Edit" circle @click="editClicked(scope.row)" />
          </div>
          <SplitsTableEditDescription
            v-else
            :mark-id="scope.row.id"
            :description="scope.row.description"
            @description-changed="
              (payload) => confirmClicked(scope.row, payload)
            "
          />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.el-table--large {
  font-size: 1.1rem;
}

.leftRight {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.leftRight:first-child {
  width: 100%;
}

.leftRight:last-child {
  flex: 1;
}

.descriptionCell {
  display: flex;
  flex-direction: row;
}
</style>
