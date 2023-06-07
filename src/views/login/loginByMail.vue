<!--
 * @Author: 黄叶
 * @Date: 2023-06-06 01:57:15
 * @LastEditTime: 2023-06-07 18:50:47
 * @FilePath: /schoolWall/src/views/login/loginByMail.vue
 * @Description: 
-->
<template>
  <div>
    <!-- 标题 -->
    <div class="text-center py-4">
      <!-- 主标题 -->
      <div class="my-3 text-5">邮箱登录</div>
      <!-- 副标题 -->
      <div class="my-3 text-gray">未注册邮箱验证后会直接注册为帐号</div>
    </div>
    <!-- 表单 -->
    <n-form :model="formData">
      <n-form-item class="h-12" size="large">
        <n-input
          class="pl-4 py-1 h-12"
          style="--n-border: none"
          placeholder="请输入邮箱"
          v-model:value="formData.email"
        />
      </n-form-item>
      <div class="border-t" />
      <n-form-item class="h-12" size="large">
        <n-input-group>
          <n-input
            class="pl-4 py-1 h-12"
            style="--n-border: none"
            placeholder="邮箱验证码"
            v-model:value="formData.code"
          />
          <n-button
            class="w-35 h-12"
            type="primary"
            strong
            secondary
            :disabled="isGetMailCodeButtonDisabled"
            :loading="isSending"
            @click="getMailCode"
          >
            {{ getMailCodeButtonText }}
          </n-button>
        </n-input-group>
      </n-form-item>
      <n-form-item class="px-4">
        <n-button
          class="my-6 w-full h-12"
          color="#19ac18"
          :disabled="isSubmitButtonDisabled"
          @click="submit"
        >
          <div class="text-5">登 录</div>
        </n-button>
      </n-form-item>
    </n-form>

    <!-- 其他方式登录 -->
    <div class="text-center text-green-6" @click="goToOtherLogin">使用手机验证码快捷登录</div>
  </div>
</template>

<script setup>
import userApi from "../../api/user";
import router from "../../router/router";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore();

// 表单数据
const formData = ref({
  email: "",
  code: "",
});

// 获取验证码按钮的文字
const getMailCodeButtonText = ref("获取验证码");
// 是否正在发送验证码
const isSending = ref(false);
// 是否显示“获取验证码”按钮
const isGetMailCodeButtonDisabled = ref(true);
// 监听邮箱输入框的值，如果不为空，则显示“获取验证码”按钮
watch(
  () => formData.value.email,
  (val) => {
    if (val != "") {
      isGetMailCodeButtonDisabled.value = false;
    } else {
      isGetMailCodeButtonDisabled.value = true;
    }
  }
);

// 是否显示“登录”按钮
const isSubmitButtonDisabled = ref(true);
// 监听邮箱和验证码输入框的值，如果都不为空，则显示“登录”按钮
watch(formData.value, (newData) => {
  if (newData.email != "" && newData.code != "") {
    isSubmitButtonDisabled.value = false;
  } else {
    isSubmitButtonDisabled.value = true;
  }
});

/**
 * @description: 获取邮箱验证码
 */
const getMailCode = async () => {
  if (formData.value.email == "") {
    window.$message.error("请输入邮箱");
    return;
  }
  // 正在发送验证码
  isSending.value = true;

  const res = await userApi.getMailCode(formData.value.email);
  console.log(res);
  if (res.code == 200) {
    window.$message.success(res.data);
  } else {
    window.$message.error(res.data);
  }

  // 发送验证码结束
  isSending.value = false;

  // 按钮进入倒计时，防止用户频繁点击
  const timer = setInterval(() => {
    if (getMailCodeButtonText.value == "获取验证码") {
      getMailCodeButtonText.value = "59s";
      isGetMailCodeButtonDisabled.value = true;
    } else if (getMailCodeButtonText.value == "1s") {
      getMailCodeButtonText.value = "获取验证码";
      isGetMailCodeButtonDisabled.value = false;
      clearInterval(timer);
    } else {
      getMailCodeButtonText.value =
        parseInt(getMailCodeButtonText.value) - 1 + "s";
    }
  }, 1000);
};

// 提交表单，登录
const submit = async () => {
  if (formData.value.email == "" && formData.value.code == "") {
    window.$message.error("请输入邮箱和验证码");
    return;
  }
  const res = await userApi.loginOrRegisterByMail(formData.value);
  console.log(res);
  if (res.code == 200) {
    window.$message.success("登录成功");
    localStorage.setItem("token", res.data.token);
    userStore.updateUser({
      userId: res.data.id,
      email: res.data.email,
      nickname: res.data.nickname,
      avatar: res.data.avatar,
    });
    console.log(userStore.user)
    // 1秒后返回上一页
    setTimeout(() => {
      router.back();
    }, 1000);
  } else {
    window.$message.error(res.msg);
  }
};

const goToOtherLogin = () => {
  router.replace("/loginByPhone");
};
</script>

<style>
.n-form-item {
  display: block;
}
</style>
