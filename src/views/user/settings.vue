<template>
  <div class="h-screen bg-white">
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
          <div class="text-4.8 text-gray-5 font-bold">设置</div>
        </div>
      </div>
    </div>
    <!-- 具体设置 -->
    <div class="py-6">
        <!-- 头像与个人信息 -->
        <div
          class="flex items-center justify-between py-2 px-4 mb-4"
          @click="router.push('/editProfile')"
        >
          <div class="text-4">头像与个人信息</div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      <!-- 帐号与绑定 -->
      <div
        class="flex items-center justify-between py-2 px-4 mb-4"
        @click="temp"
      >
        <div class="text-4">帐号与绑定</div>
        <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
      </div>
      <div class="mx-4 border-t-0.5" />
    </div>
    <!-- 退出登录 -->
    <div class="text-center text-4 text-red-6 " @click="logOut">退出登录 </div>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import ChevronRight from "@vicons/carbon/ChevronRight";

import router from "../../router/router";

import { useUserStore } from "../../store/userStore";
import user from "../../api/user";

const userStore = useUserStore();

const temp = () => {
  window.$message.info("暂未开放");
};

/**
 * 退出登录
 */
const logOut = () => {
    localStorage.removeItem("token");
    userStore.deleteUser()
    window.$message.success("退出成功");
    router.replace("/user");
};
</script>
