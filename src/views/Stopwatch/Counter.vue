<script lang="ts" setup>
import moment from "moment";
import { computed } from "vue";

const props = defineProps<{
  durationInMs: number;
}>();

const displayTimer = computed(() =>
  moment.utc(props.durationInMs).format("HH:mm:ss:S")
);
</script>

<template>
  <div class="counterContainer">{{ displayTimer }}</div>
</template>

<style scoped>
.counterContainer {
  font-size: 10rem;
  color: #cccccc;
}
</style>
