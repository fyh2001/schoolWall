<!--
 * @Author: 黄叶
 * @Date: 2023-05-13 00:23:10
 * @LastEditTime: 2023-05-13 01:08:35
 * @FilePath: /schoolWall/src/components/FloatingButton.vue
 * @Description: 
-->
<template>
  <div class="button">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.button {
  @apply: fixed w-14 h-14 rounded-xl shadow-lg bg-opacity-10 z-99;
  background-color: #cceada;
  
}

.content{
    @apply: absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;
    color: #18a058;
}
</style>
