<!--
 * @Author: 黄叶
 * @Date: 2023-05-20 15:59:37
 * @LastEditTime: 2023-06-13 00:10:59
 * @FilePath: /schoolWall/src/components/newUI/DeBottomTabBar.vue
 * @Description: 
-->
<template>
  <div>
    <div
      class="fixed bottom-0 flex justify-around items-center w-full py-1.5 bg-white border-t overflow-hidden z-99"
    >
      <div
        v-for="(data, index) in tabList"
        :class="{ tabClick: selectIndex === index && isInited === true }"
        @click="changeIndex(index)"
      >
        <div class="flex items-center justify-center mb-1" v-if="data.icon">
          <Icon :class="
              selectIndex === index
                ? 'transition duration-200 ease-in-out text-green-6'
                : ''
            " :icon="selectIndex == index ? data.selectedIcon : data.icon" width="25" height="25"/>
        </div>
        <div
          :class="[
            selectIndex === index
              ? 'transition duration-200 ease-in-out text-green-6'
              : '',
            'text-center text-3',
          ]"
        >
          {{ data.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "../../router/router";
import { Icon } from '@iconify/vue';

const emit = defineEmits(["selectIndexchange", "submit", "selectValueChange"]);

const props = defineProps({
  selectIndex: {
    type: Number,
  },
  tabList: Array,
});

/**
 * 判断是否初始化
 */
const isInited = ref(true);
const changeIndex = (index) => {
  emit("selectIndexchange", index);
  isInited.value = true;
};

</script>

<style>
.tabClick {
  @apply relative;
}

.tabClick::after {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-25 h-25 rounded-full bg-green-6 opacity-0;
  content: "";
  /* animation: tabClick 700ms; */
}

/* @keyframes tabClick {
  0% {
    @apply w-0 h-0 opacity-0;
  }
  50% {
    @apply w-25 h-25 opacity-30;
  }
  100% {
    @apply w-25 h-25 opacity-0;
  }
} */
</style>
