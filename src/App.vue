<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 21:42:04
 * @LastEditTime: 2023-04-20 22:54:29
 * @FilePath: /schoolWall/src/App.vue
 * @Description: 
-->
<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {});
</script>

<style>
body {
  background-image: url("../../../dist/bg.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>
