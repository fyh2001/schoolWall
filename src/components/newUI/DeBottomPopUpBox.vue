<!--
 * @Author: 黄叶
 * @Date: 2023-06-12 02:02:49
 * @LastEditTime: 2023-06-12 03:03:04
 * @FilePath: /schoolWall/src/components/newUI/DeBottomPopUpBox.vue
 * @Description: 
-->
<template>
  <div>
    <Transition name="BottomPopUpWindow">
      <div
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-9"
        v-if="show"
        @click="emit('close')"
        @touchmove.prevent
      />
    </Transition>

    <Transition name="BottomPopUpBox">
      <div
        class="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl z-10"
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
});
</script>

<style scoped>
.BottomPopUpWindow-enter-active,
.BottomPopUpWindow-leave-active {
  transition: opacity 0.3s ease;
}

.BottomPopUpWindow-enter-from,
.BottomPopUpWindow-leave-to {
  opacity: 0;
}

.BottomPopUpBox-enter-active,
.BottomPopUpBox-leave-active {
  transition: all 0.3s ease;
}

.BottomPopUpBox-enter-from,
.BottomPopUpBox-leave-to {
  transform: translateY(100%);
}
</style>
