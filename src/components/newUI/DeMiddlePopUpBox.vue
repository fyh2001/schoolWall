<!--
 * @Author: 黄叶
 * @Date: 2023-06-09 11:03:17
 * @LastEditTime: 2023-06-12 06:23:38
 * @FilePath: /schoolWall/src/components/newUI/DeMiddlePopUpBox.vue
 * @Description: 中间弹出框
-->
<template>
  <div>
    <Transition name="MiddlePopUpBox" appear>
      <div
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-9"
        v-if="show"
        @click="emit('close')"
        @touchmove.prevent
      />
    </Transition>
    <Transition name="MiddlePopUpBox" appear>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80% bg-white rounded-md shadow-lg z-10"
        :class="boxClass"
        v-if="show"
      >
          <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

const props = defineProps({
  // 是否显示
  show: {
    type: Boolean,
    default: false,
  },
  boxClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.MiddlePopUpBox-enter-active,
.MiddlePopUpBox-leave-active {
  transition: opacity 0.3s ease;
}

.MiddlePopUpBox-enter-from,
.MiddlePopUpBox-leave-to {
  opacity: 0;
}
</style>
