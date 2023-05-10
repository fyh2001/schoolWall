<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 21:42:04
 * @LastEditTime: 2023-05-10 20:11:50
 * @FilePath: /schoolWall/src/App.vue
 * @Description: 
-->
<template>
  <Global>
    <router-view></router-view>
  </Global>
</template>

<script setup>
import Global from "./components/Global.vue";

onMounted(() => {});
</script>

<style>
body {
  /* background-image: url("../public/bg.jpg");
  background-size: 100% 100%;
  background-attachment: fixed; */
  background-image: linear-gradient(
    125deg, #2c3e50, #56f197,
    #55b0ec, #f08377, #d58bf5
  );
  background-size: 400%;
  animation: bgmove 20s linear infinite;
}
@keyframes bgmove{
  0%{
    background-position: 0% 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0% 50%;
  }
}
</style>
