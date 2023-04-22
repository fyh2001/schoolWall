<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 18:38:15
 * @LastEditTime: 2023-04-22 02:42:24
 * @FilePath: /schoolWall/src/views/user/register/register.vue
 * @Description: 
-->
<template>
  <div class="root">
    <DeDeadline title="注册" />
    <div class="p-5">
      <a-space direction="vertical" size="large" w-full>
        <a-form :model="formData" layout="vertical">
          <a-form-item field="username" label="用户名">
            <a-input
              class="input"
              v-model="formData.username"
              placeholder="请输入用户名"
            />
          </a-form-item>
          <a-form-item field="password" label="密码">
            <a-input
              class="input"
              v-model="formData.password"
              placeholder="请输入密码"
            />
          </a-form-item>
          <a-form-item field="nickname" label="昵称">
            <a-input
              class="input"
              v-model="formData.nickname"
              placeholder="请输入昵称"
            />
          </a-form-item>
        </a-form>
      </a-space>
    </div>
    <div relative mt-10>
      <DeButton
        class="absolute left-1/2 -translate-x-1/2 w-20 h-20"
        style="border-radius: 9999px; background-color: #f2f3f5"
        type="default"
        @click="submit"
      >
        <icon-right
          style="
            font-size: 32;
            stroke-linecap: round;
            stroke-linejoin: round;
            color: #fff;
          "
        />
      </DeButton>
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

const submit = async () => {
  if (formData.value.username != "" && formData.value.nickname != "" && formData.value.password != "") {
    const res = await userApi.register(formData.value);
    console.log(res);
    if (res.code == 0) {
      // 用户名或密码错误
      ElMessage({
        message: "注册失败,请稍后重试或联系客服!",
        type: "warning",
        grouping: true,
      });
    } else {
      ElMessage.success("注册成功!")
      router.back(1)
    }
  }else{
    ElMessage({
      message: "账号、昵称、密码不能为空!",
      type: "warning",
      grouping: true
    })
  }
};
</script>

<style scoped>
.root{
  height: 100vh;
  background-color: #fff;
}
.input {
  /* @apply h-15 rounded-2; */
  border-radius: 0.375rem !important;
  height: 4rem !important;
  width: 100vw !important;
}
</style>
