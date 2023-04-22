<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 18:37:53
 * @LastEditTime: 2023-04-20 14:40:59
 * @FilePath: /schoolWall/src/views/user/user.vue
 * @Description: 
-->
<template>
    <div>
        <div class="w-20 h-20 bg-green-5" @click="exit()">注销登录</div>
    </div>
</template>

<script setup>

const exit = () => {
    localStorage.removeItem("token")
    console.log(localStorage.getItem("token"))
}
</script>