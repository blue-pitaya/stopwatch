<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";

const props = defineProps<{
  markId: number;
  description: string;
}>();

const emit = defineEmits<{
  (e: "descriptionChanged", payload: { id: number; value: string }): void;
}>();

const desc = ref(props.description);
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  nextTick(() => {
    inputRef.value?.focus();
  });
});

const confirmClicked = () => {
  emit("descriptionChanged", { id: props.markId, value: desc.value });
};
</script>

<template>
  <el-form class="leftRight" @submit.prevent="confirmClicked()">
    <el-input v-model="desc" ref="inputRef" />
    <el-button @click="confirmClicked()">Confirm</el-button>
  </el-form>
</template>
