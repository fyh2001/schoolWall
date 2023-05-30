<template>
  <div>
    <div
      class="fixed bottom-0 flex justify-around items-center w-full py-2 bg-white border-t overflow-hidden"
    >
      <div
        :class="{ 'tabClick': selectIndex == index && isInited == true }"
        v-for="(data, index) in tabList"
        @click="changeIndex(index)"
      >
        <div class="flex items-center justify-center mb-1" v-if="data.icon">
          <n-icon
            :class="
              selectIndex == index
                ? 'transition duration-200 ease-in-out text-green-6'
                : ''
            "
            size="20"
            :component="selectIndex == index ? data.selectedIcon : data.icon"
          />
        </div>
        <div
          :class="[
            selectIndex == index
              ? 'transition duration-200 ease-in-out text-green-6'
              : '',
            'text-center',
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
const emit = defineEmits(["selectIndexchange", "submit", "selectValueChange"]);

const props = defineProps({
  selectIndex: {
    type: Number,
    default: 0,
  },
  tabList: Array,
});

/**
 * 判断是否初始化
 */
const isInited = ref(false);

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
  animation: tabClick 700ms;
}

@keyframes tabClick {
  0% {
    @apply w-0 h-0 opacity-0;
  }
  50% {
    @apply w-25 h-25 opacity-30;
  }
  100% {
    @apply w-25 h-25 opacity-0;
  }
}
</style>
