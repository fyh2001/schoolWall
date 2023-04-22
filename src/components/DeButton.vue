<template>
  <button px-4 py-2 rounded-md select-none transition-colors duration-300 :class="additionClass[type]"
    :style="{ backgroundColor: bgColor }">
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  bgColor: String,
  type: String,
});

const additionClass = {
  default: "text-gray-7 bg-gray-1",
  primary: "text-white bg-blue-6",
  error: "text-white bg-red-6",
};
</script>

<style>
button {
  /* 无法复制 */
  @apply select-none
}
</style>
