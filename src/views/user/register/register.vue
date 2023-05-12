<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 18:38:15
 * @LastEditTime: 2023-05-11 16:09:59
 * @FilePath: /schoolWall/src/views/user/register/register.vue
 * @Description: 
-->
<template>
  <div class="root">
    <div class="absolute p-5 bottom-0 w-full h-80% bg-white rounded-t-2xl">
      <div class="text-5" style="margin: 0 auto">注册</div>
      <div>
        <n-form ref="formRef" :model="formData" :rules="rules" size="large">
          <n-form-item path="username">
            <n-input
              class="rounded-md shadow-sm"
              v-model:value="formData.username"
              placeholder="请输入用户名"
              clearable
              autofocus
              @keydown.enter.prevent
              @input="killChinese"
            />
          </n-form-item>
          <n-form-item path="password">
            <n-input
              class="rounded-md shadow-sm"
              v-model:value="formData.password"
              placeholder="请输入密码"
              type="password"
              clearable
              show-password-on="click"
              @keydown.enter.prevent
            />
          </n-form-item>
          <!-- <n-form-item path="password" label="确认密码">
          <n-input
            v-model:value="formData.password"
            placeholder="请再次输入密码"
            prefix-icon="icon-lock"
          />
        </n-form-item> -->
          <n-form-item path="nickname">
            <n-input
              class="rounded-md shadow-sm"
              v-model:value="formData.nickname"
              placeholder="请输入昵称"
              clearable
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-form>
      </div>
      <div class="flex flex-col items-center">
        <de-button class="w-80" type="primary" size="large" @click="submit"
          >注册</de-button
        >
        <div class="mt-5">
          <router-link to="/login">已有账号？去登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../../router/router";
import userApi from "../../../api/user";
import DeDeadline from "../../../components/DeDeadline.vue";
import DeButton from "../../../components/DeButton.vue";

const formData = ref({
  username: "",
  nickname: "",
  password: "",
});

const formRef = ref(null);

const submit = async () => {
  if (
    formData.value.username != "" &&
    formData.value.nickname != "" &&
    formData.value.password != ""
  ) {
    const res = await userApi.register(formData.value);
    console.log(res);
    if (res.code == 0) {
      // 用户名或密码错误
      ElMessage({
        message: res.msg,
        type: "warning",
        grouping: true,
      });
    } else {
      ElMessage.success("注册成功!");
      router.back(1);
    }
  } else {
    ElMessage({
      message: "账号、昵称、密码不能为空!",
      type: "warning",
      grouping: true,
    });
  }
};

/**
 * 对用户名和密码中输入的中文进行删除
 */
const killChinese = (value) => {
  formData.value.username.replace(/[\u4e00-\u9fa5]/g, "")
}

watch(() => {

})

const rules = {
  username: [
    {
      required: true,
      validator(rule, value) {
        if (value == null || value.length == 0) {
          return new Error("用户名不能为空");
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value) && /[a-zA-Z]+/.test(value) && /[0-9]+/.test(value))) {
          return new Error("用户名格式应是长度为6-16的英文与数字的组合");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  password: [
    {
      required: true,
      validator() {},
    },
  ],
};
</script>

<style scoped>
.root {
  @apply flex flex-col justify-center w-full h-full;
  height: 100vh;
  /* background-color: #fff; */
}

.n-form-item {
  display: inline;
}

.n-form-item .n-form-item-feedback-wrapper {
  min-height: 0px;
}
</style>
