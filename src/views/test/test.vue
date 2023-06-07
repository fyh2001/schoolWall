<!--
 * @Author: 黄叶
 * @Date: 2023-04-20 22:33:58
 * @LastEditTime: 2023-06-07 01:52:35
 * @FilePath: /schoolWall/src/views/test/test.vue
 * @Description: 
-->
<template>
  <div class="root">
    <DeTabs :list="list" :selected-index="selectedIndex" @change-index="($event) => selectedIndex = $event" />
  </div>
</template>

<script setup>
import DeTabs from "../../components/newUI/DeTabs.vue";

const list = ['主页','动态','点评','图文','问答','好物']

const selectedIndex = ref(1)
onMounted(() => {
});
</script>

<style></style>
