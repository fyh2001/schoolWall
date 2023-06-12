<!--
 * @Author: 黄叶
 * @Date: 2023-06-07 06:44:47
 * @LastEditTime: 2023-06-12 18:54:21
 * @FilePath: /schoolWall/src/views/user/editProfile/editNickname.vue
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
          <div class="text-4.8 text-gray-5 font-bold">编辑资料</div>
        </div>
      </div>
    </div>
    <!-- 标题 -->
    <div class="text-center py-4">
      <!-- 主标题 -->
      <div class="my-3 text-5">修改用户名</div>
      <!-- 副标题 -->
      <div class="my-3 text-gray">
        您当前用户名为: {{ userStore.user.nickname }}
      </div>
    </div>
    <!-- 输入框 -->
    <div class="">
      <n-input
        class="pl-4 py-1.5 h-12 text-4"
        style="--n-border: none"
        placeholder="请输入昵称"
        v-model:value="formData.nickname"
      />
    </div>
    <!-- 提交按钮 -->
    <div class="px-4">
      <n-button
        class="my-6 w-full h-12"
        color="#19ac18"
        :disabled="isSubmitButtonDisabled"
        @click="submit"
      >
        <div class="text-4.8">确认修改</div>
      </n-button>
    </div>
    <!-- 注意事项 -->
    <div class="pl-4 text-gray-4 text-3.5">
      <div class="mb-1">・请注意，修改昵称后，您的旧昵称将不再被保留</div>
      <div class="mb-1">・昵称禁止包含非法字符及违禁关键词</div>
      <div class="mb-1">・无法使用其他用户使用过的用户名</div>
    </div>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import ChevronRight from "@vicons/carbon/ChevronRight";

import userApi from "../../../api/user";
import router from "../../../router/router";
import config from "../../../config/config";

import { useUserStore } from "../../../store/userStore";

const userStore = useUserStore();

const formData = ref({
  nickname: "",
});

// 是否显示提交按钮
const isSubmitButtonDisabled = ref(true)

// 监听昵称输入框
watch(
  () => formData.value.nickname,
  (val) => {
    if (val == '') {
      isSubmitButtonDisabled.value = true
    } else {
      isSubmitButtonDisabled.value = false
    }
  }
)

/**
 * @description: 提交修改
 */
const submit = async() => {
  if (formData.value.nickname === userStore.user.nickname) {
    window.$message.error("昵称未改变");
    return;
  } else if (formData.value.nickname.length < 2) {
    window.$message.error("昵称长度不得小于2");
    return;
  } else if (formData.value.nickname == "") {
    window.$message.error("昵称不能为空");
    return;
  }
  const res = await userApi.updateNickname(formData.value.nickname)
  console.log(res)
  if (res.code === 200) {
    window.$message.success(res.data);
    userStore.update({
      nickname: formData.value.nickname
    })
  } else {
    window.$message.error(res.msg);
  }
};
</script>

<style>
.root {
  background-color: #f8f8f8;
  height: 100vh;
}
</style>
