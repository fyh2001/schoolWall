<!--
 * @Author: 黄叶
 * @Date: 2023-05-31 02:49:39
 * @LastEditTime: 2023-06-01 14:15:19
 * @FilePath: /schoolWall/src/components/newUI/DeDragWindow.vue
 * @Description: 
-->
<template>
  <div>
    <Transition name="window">
      <div
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-9"
        v-if="showShadowWindow"
        @click="emit('close')"
      />
    </Transition>
    <Transition name="box">
      <div
        ref="boxRef"
        class="box"
        :style="{translate: boxTop}, innerStyle"
        v-if="showShadowWindow"
        :class="innerClass"
        @touchmove="onMouseMove"
        @touchend="onMouseUp"
        @touchstart="onMouseDown"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { translate } from "element-plus";
import { gsap } from "gsap";

const emit = defineEmits(["close"]);

const props = defineProps({
  showShadowWindow: {
    type: Boolean,
    default: false,
  },
  innerStyle: {
    type: Object,
    default: () => ({}),
  },
  innerClass: {
    type: String,
    default: "",
  },
  boxTop: {
    type: Number,
    default: 200,
  },
});

const boxTop = ref(props.boxTop);

const boxRef = ref(null);

// 拖拽初始位置的Y轴坐标
let dragPosY = 0;

// 拖拽结束位置的Y轴坐标
let finalPosY = 0;

// 拖拽距离
let distance = 0;

let isTop = false;

// 记录移动位置的Y轴坐标
let tempY = 0;
// 拖拽状态
const dragStatus = {
  isDrag: false,
  isMove: false,
};

// 拖拽开始
const onMouseDown = (e) => {
    if(boxTop.value == 0) return
  dragStatus.isDrag = true; // 拖拽开始
  dragPosY = e.touches[0].clientY; // 记录初始位置的Y轴坐标
  tempY = dragPosY; // 记录移动位置的Y轴坐标
};

// 拖拽中

const onMouseMove = (e) => {
  if (dragStatus.isDrag) {
    dragStatus.isMove = true; // 拖拽中
    finalPosY = e.touches[0].clientY; // 记录移动位置的Y轴坐标
    distance = finalPosY - tempY; // 计算移动距离

    // if(isTop && distance < 0) return

    tempY = finalPosY; // 记录移动位置的Y轴坐标
    boxTop.value += distance; // 计算移动后的top值

    if (boxTop.value == 0) isTop = true;
  }
};

// 拖拽结束
const onMouseUp = (e) => {
  if (dragStatus.isDrag && dragStatus.isMove) {
    dragStatus.isDrag = false; // 拖拽结束
    dragStatus.isMove = false; // 拖拽结束

    distance = finalPosY - dragPosY; // 计算移动距离

    if (isTop) {
      if (distance > 500) {
        emit("close");
      } else {
        gsap.to(boxTop, { value: 0, duration: 0.3 });
      }
      isTop = false;
      return;
    }

    if (distance > 150) {
      // 向下拖拽
      emit("close");
    } else {
      gsap.to(boxTop, { value: props.boxTop, duration: 0.3 });
    }

    if (distance < 0) {
      // 向上拖拽
      gsap.to(boxTop, { value: 0, duration: 0.3 });
    }
  }
};

onMounted(() => {});
</script>

<style>
.box {
  @apply absolute top-0 left-0 w-full bg-white z-20;
  
}

.window-enter-active,
.window-leave-active {
  transition: opacity 0.3s ease;
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
}

.box-enter-active,
.box-leave-active {
  transition: transform 0.3s ease;
}

.box-enter-from,
.box-leave-to {
  transform: translateY(100%);
}
</style>
