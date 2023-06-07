<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 18:38:09
 * @LastEditTime: 2023-06-07 01:23:08
 * @FilePath: /schoolWall/src/views/login/index.vue
 * @Description: 
-->
<template>
  <div class="root">
    <!-- 顶部栏 -->
    <div class="py-3 px-4 w-full bg-white border-b-0.5 overflow-hidden z-999">
      <div class="flex items-center">
        <n-icon
          class="flex items-center text-gray-5 mr-4"
          size="26"
          :component="ChevronLeft"
          @click="router.back()"
        />
        <div>
          <div class="text-5 text-gray-5 font-bold">登录</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import router from "../../router/router";
</script>

<style>
.root {
  height: 100vh;
  background-color: #f8f8f8;
}
</style>
