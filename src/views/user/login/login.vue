<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 18:38:09
 * @LastEditTime: 2023-05-04 16:35:56
 * @FilePath: /schoolWall/src/views/user/login/login.vue
 * @Description: 
-->
<template>
  <div class="root">
    <div>
      <DeDeadline title="登录" description="" />
    </div>
    <div p-5>
      <div pb-4>
        <a-input
          class="input"
          placeholder="请输入用户名"
          allow-clear
          v-model="userData.username"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </div>
      <div>
        <a-input-password
          class="input"
          placeholder="请输入密码"
          allow-clear
          v-model="userData.password"
        >
          <template #prefix>
            <icon-unlock />
          </template>
        </a-input-password>
      </div>
      <div
        mt-4
        flex
        flex-row-reverse
        text-gray
        @click="() => router.push('/register')"
      >
        <div>没有账号?立即注册</div>
      </div>
    </div>
    <div relative mt-30>
      <!-- <DeButton
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
      </DeButton> -->

      <n-button class="absolute left-1/2 -translate-x-1/2 scale-120 w-22 h-14 rounded-xl" type="tertiary"  ghost size="large" :loading="isloding" @click="submit">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M22 16L12 26l-1.4-1.4l8.6-8.6l-8.6-8.6L12 6z" fill="currentColor"></path></svg>
        </template>
      </n-button>
    </div>
    <!-- 同意事项 -->
    <!-- <div class="absolute left-1/2 -translate-x-1/2 bottom-8" v-show="hideshow">
      <el-checkbox
        v-model="isRead"
        label="注册即代表同意《用户协议》和《隐私协议》"
        size="small"
      />
    </div> -->
  </div>
</template>

<script setup>
import DeDeadline from "../../../components/DeDeadline.vue";
import DeButton from "../../../components/DeButton.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import userApi from "../../../api/user";
import { useUserStore } from "../../../store/userStore";

const router = useRouter();
const userStore = useUserStore()

const userData = ref({
  username: "",
  password: "",
});

const isloding = ref(false)
const submit = async () => {
  if (userData.value.username != "" && userData.value.password != "") {
    isloding.value = true
    const res = await userApi.login(userData.value);
    isloding.value = false
    if (res.code == 0) {
      // 用户名或密码错误
      ElMessage({
        message: res.msg,
        type: "warning",
        grouping: true,
      });
    } else {
      ElMessage({
        message: res.msg,
        type: "success",
        grouping: true,
      })
      localStorage.setItem("token", res.data.token);
      userStore.updataUser({
        userId: res.data.id,
        username: res.data.username,
        nickname: res.data.nickname
      })
      router.back(1)
    }
  }else{
    ElMessage({
      message: "账号或密码不能为空!",
      type: "warning",
      grouping: true
    })
  }
};
</script>

<style scoped>
.root {
  height: 100vh;
  background-color: #fff;
}
.input {
  /* @apply h-15 rounded-2; */
  border-radius: 0.6rem !important;
  height: 4rem !important;
}
</style>
