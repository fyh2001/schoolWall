<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 23:46:07
 * @LastEditTime: 2023-04-19 11:35:23
 * @FilePath: /schoolWall/src/components/tabs.vue
 * @Description: 
-->
<template>
  <div>
    <div class="flex justify-between rounded-md bg-white bg-opacity-50 overflow-hidden">
      <div
        class="grid place-content-center h-10 w-full text-4.5 "
        :style="index == tabCheckedIndex ? 'background-color: white' : ''"
        v-for="(data, index) in tabList"
        :key="index"
        @click="() => (tabCheckedIndex = index)"
      >
        <div>{{ data }}</div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
	tabList: Array,
  tabStartIndex: Number
})

const tabCheckedIndex = ref(props.tabStartIndex)
</script>
