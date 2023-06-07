<!--
 * @Author: 黄叶
 * @Date: 2023-06-07 04:43:54
 * @LastEditTime: 2023-06-07 07:48:09
 * @FilePath: /schoolWall/src/views/user/editProfile/editProfile.vue
 * @Description: 
-->
<template>
  <div>
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
          <div class="text-4.8 text-gray-5 font-bold">编辑资料</div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="bg-white">
        <!-- 头像 -->
        <div class="flex items-center justify-between py-3 px-4" @click="router.push('/editAvatar')">
            <div class="text-4">头像</div>
            <n-avatar round :size="48" :src="config.baseURL + '/file/download?filename=' + userStore.user.avatar" />
        </div>
        <!-- 个人主页背景 -->
        <div class="flex items-center justify-between py-3 px-4" @click="temp">
            <div class="text-4">个人主页背景</div>
            <n-avatar :size="48" src="../../../public/userBg.jpg" v-if="userStore.user.background != ''"/>
            <div class="text-3.8 text-gray-5"  v-if="userStore.user.background == ''">未设置</div>
        </div>
        <!-- 昵称 -->
        <div class="flex items-center justify-between py-3 px-4 mb-2" @click="router.push('editNickname')">
            <div class="text-4">昵称</div>
            <div class="text-3.8 text-gray-5">{{ userStore.user.nickname }}</div>
        </div>
        <!-- 性别 -->
        <div class="flex items-center justify-between py-3 px-4 mb-2"  @click="temp">
            <div class="text-4">性别</div>
            <div class="text-3.8 text-gray-5">{{ userStore.user.gender == 1 ? '男' : '女' }}</div>
        </div>
         <!-- 签名 -->
         <div class="flex items-center justify-between py-3 px-4 mb-2"  @click="temp">
            <div class="text-4">签名</div>
            <div class="text-3.8 text-gray-5">未设置</div>
        </div>
         <!-- 帐号与绑定 -->
         <div class="flex items-center justify-between pt-3 pb-4 px-4 mb-2"  @click="temp">
            <div class="text-4">帐号与绑定</div>
            <n-icon class=" text-gray-5" :size="20" :component="ChevronRight" />
        </div>
    </div>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import ChevronRight from "@vicons/carbon/ChevronRight";

import router from "../../../router/router";
import config from "../../../config/config";

import { useUserStore } from "../../../store/userStore";

const userStore = useUserStore();

const temp = () => {
  window.$message.info("暂未开放")
}
</script>
