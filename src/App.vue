<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 21:42:04
 * @LastEditTime: 2023-04-30 16:34:45
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
  background-image: url("../public/bg.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>
