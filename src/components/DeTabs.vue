<!--
 * @Author: 黄叶
 * @Date: 2023-04-21 11:25:50
 * @LastEditTime: 2023-05-30 04:20:59
 * @FilePath: /schoolWall/src/components/DeTabs.vue
 * @Description: 
-->
<template>
  <div>
  <div class="tabs" ref="tabs">
    <div class="checkBox" :style="[{ backgroundColor: tabsBg }, checkBox]" />
    <div
      v-for="(data, index) in list"
      :key="index"
      :class="['tabs-item', index == selectIndex ? 'tabs-item--selected' : '']"
      @click="selectChange(index)"
    >
      {{ data }}
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";

const props = defineProps({
  list: Array,
  tabsBg: String,
  selectIndex: {
    type: Number,
    default: 0,
  },
});

const tabs = ref();
const checkBoxSize = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  tabX: 0,
});

// [submit]为菜单组件中分支绑定方法
const emit = defineEmits(["change", "submit", "selectValueChange"]);

// watch(
//   props.selectIndex,
//   (index) => {
//     console.log(index);
//     selectChange(index);
//   },
// );

function selectChange(index) {
  emit("change", index);
  // emit("selectValueChange", props.list[index]);
  const rect = tabs.value
    .querySelectorAll(".tabs-item")
    [index].getBoundingClientRect();
  checkBoxSize.value = {
    width: rect.width + 2,
    height: rect.height + 4,
    left: rect.left,
    top: rect.top,
    tabX: tabs.value.getBoundingClientRect().left,
  };
}

const checkBox = computed(() => {
  return {
    width: checkBoxSize.value.width + "px",
    height: checkBoxSize.value.height + "px",
    left: checkBoxSize.value.left - checkBoxSize.value.tabX + "px",
  };
});


onMounted(() => {
  selectChange(props.selectIndex);
});
</script>

<style scoped>
.tabs {
  @apply relative flex justify-between bg-white bg-opacity-65 backdrop-blur-30 items-center px-2 py-2;
}
.checkBox {
  @apply absolute bg-white rounded duration-300;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px; */
  /* width: v-bind("checkBoxSize.width+'px'");
  height: v-bind("checkBoxSize.height+'px'");
  left: v-bind("checkBoxSize.left-checkBoxSize.tabX+'px'"); */
}
.tabs-item {
  /* @apply flex-1 */
  @apply w-full py-1 text-gray-5 text-center z-1 rounded-lg duration-300;
}

.tabs-item--selected {
  /* @apply text-gray-8 duration-300; */
  @apply text-green-6 duration-300;
}
</style>
