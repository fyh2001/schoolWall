<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 21:42:04
 * @LastEditTime: 2023-05-31 00:16:55
 * @FilePath: /schoolWall/src/App.vue
 * @Description: 
-->
<template>
  <GlobalProvider>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          :key="$route.name"
          v-if="$route.meta.keepAlive"
        />
      </keep-alive>
      <component
        :is="Component"
        :key="$route.name"
        v-if="!$route.meta.keepAlive"
      />
    </router-view>
     <!-- 防止底部栏遮挡 -->
     <div class="w-full h-12" />
  </GlobalProvider>
</template>

<script setup>
import GlobalProvider from "./components/GlobalProvider.vue";

onMounted(() => {});
</script>

<style>
body {
  /* background-image: url("../public/bg.jpg");
  background-size: 100% 100%; */
  background-attachment: fixed;
  /* background-image: linear-gradient(
    125deg, #2c3e50, #56f197,
    #55b0ec, #f08377, #d58bf5
  ); */
  /* background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%); */
  /* background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%); */
  /* background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%); */
  /* background-image: linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%); */
  /* background-image: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%); */
  /* background-size: 400%;
  animation: bgmove 20s linear infinite; */
  background-color: #f2f1f6;
}
@keyframes bgmove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
