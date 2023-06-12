<!--
 * @Author: 黄叶
 * @Date: 2023-06-12 10:08:54
 * @LastEditTime: 2023-06-13 00:06:33
 * @FilePath: /schoolWall/src/views/user/editProfile/editBinding.vue
 * @Description: 账号与绑定
-->
<template>
  <div class="h-screen" style="background-color: #f5f5f5;">
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
          <div class="text-4.8 text-gray-5 font-bold">账号与绑定</div>
        </div>
      </div>
    </div>
    <!-- 手机号、邮箱绑定 -->
    <div class="pt-5 pb-3">
      <!-- 昵称 -->
      <div
        class="flex items-center justify-between py-3 px-4 bg-white border-b-0.5"
        @click="router.push('/editNickname')"
      >
        <div class="text-4">昵称</div>
        <div class="flex items-center">
          <div class="mr-2 text-4.2 text-gray-5">
            {{ userStore.user.nickname }}
          </div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      </div>
      <!-- 手机号 -->
      <div
        class="flex items-center justify-between py-3 px-4 bg-white border-b-0.5"
        @click="showEditPhoneBox = true"
      >
        <div class="text-4">手机号</div>
        <div class="flex items-center">
          <div class="mr-2 text-4.2 text-gray-5">
            {{
              userStore.user.phone != '' ? userStore.user.phone.slice(0, 3) +
              "****" +
              userStore.user.phone.slice(7) : '未设置'
            }}
          </div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      </div>
      <!-- 邮箱 -->
      <div
        class="flex items-center justify-between py-3 px-4 bg-white"
        @click="editMailHandler"
      >
        <div class="text-4">邮箱</div>
        <div class="flex items-center">
          <div class="mr-2 text-4.2 text-gray-5">
            {{ userStore.user.email }}
          </div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      </div>
    </div>
    <!-- 社交账号绑定 -->
    <div class="pl-3 text-gray-5">社交账号绑定(一键登录)</div>
    <div class="pt-2 pb-3">
      <!-- 抖音 -->
      <div
        class="flex items-center justify-between py-3 px-4 bg-white border-b-0.5"
        @click="temp"
      >
        <div class="text-4">抖音</div>
        <div class="flex items-center">
          <div class="mr-2 text-4.2 text-gray-5">未开放</div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      </div>
      <!-- 微博 -->
      <div
        class="flex items-center justify-between py-3 px-4 bg-white border-b-0.5"
        @click="temp"
      >
        <div class="text-4">微博</div>
        <div class="flex items-center">
          <div class="mr-2 text-4.2 text-gray-5">未开放</div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      </div>
      <!-- 微信 -->
      <div
        class="flex items-center justify-between py-3 px-4 bg-white border-b-0.5"
        @click="temp"
      >
        <div class="text-4">微信</div>
        <div class="flex items-center">
          <div class="mr-2 text-4.2 text-gray-5">未开放</div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      </div>
      <!-- QQ -->
      <div
        class="flex items-center justify-between py-3 px-4 bg-white border-b-0.5"
        @click="temp"
      >
        <div class="text-4">QQ</div>
        <div class="flex items-center">
          <div class="mr-2 text-4.2 text-gray-5">未开放</div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="pt-2 pb-3">
      <!-- 修改密码 -->
      <div
        class="flex items-center justify-between py-3 px-4 bg-white border-b-0.5"
        @click="temp"
      >
        <div class="text-4">修改密码</div>
        <div class="flex items-center">
          <div class="mr-2 text-4.2 text-gray-5">未开放</div>
          <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
        </div>
      </div>
    </div>
    <!-- 更换手机号弹窗 -->
    <DeMiddlePopUpBox :box-class="'w-90%'" :show="showEditPhoneBox" @close="showEditPhoneBox = false">
      <div class="p-6">
        <!-- 有手机号 -->
        <div v-if="userStore.user.phone != ''">
          <div class="mb-4 text-5 font-bold">已绑定</div>
          <div class="mb-4 text-4">您当前的手机号为: {{ userStore.user.phone }}</div>
          <div class="mb-6 text-4">您要取消绑定还是更换绑定？</div>
          <!-- 按钮 -->
          <div class="flex justify-end text-green-6 font-bold">
            <div class="mr-4" @click="showEditPhoneBox = false">取消</div>
            <div class="mr-4" @click="router.push('/editPhone/unbindPhone')">取消绑定</div>
            <div @click="router.push('/editPhone/verifyPhone')">更换绑定</div>
          </div>
        </div>
        <!-- 无手机号 -->
        <div v-if="userStore.user.phone == ''">
          <div class="mb-4 text-5 font-bold">未绑定</div>
          <div class="mb-6 text-4">您当前为绑定手机号，是否前去绑定？</div>
          <!-- 按钮 -->
          <div class="flex justify-end text-green-6 font-bold">
            <div class="mr-4" @click="showEditPhoneBox = false">取消</div>
            <div @click="router.push('/editPhone/bindPhone')">前去绑定</div>
          </div>
        </div>
      </div>
    </DeMiddlePopUpBox>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import ChevronRight from "@vicons/carbon/ChevronRight";
import DeMiddlePopUpBox from "../../../components/newUI/DeMiddlePopUpBox.vue";
import router from "../../../router/router";
import { useUserStore } from "../../../store/userStore";

const userStore = useUserStore();

const temp = () => {
  window.$message.info("暂未开放");
};

const showEditPhoneBox = ref(false);


/**
 * 跳转到修改邮箱页面
 */
const editMailHandler = () => {
  if (userStore.user.email === "") {
    router.push("/editMail/bindMail");
  } else {
    router.push("/editMail");
  }
};

/**
 * 跳转到修改手机号页面
 */
const editPhoneHandler = () => {
  if (userStore.user.phone === "") {
    router.push("/editPhone/bindPhone");
  } else {
    router.push("/editPhone/verifyPhone");
  }
};

/**
 * 跳转到解绑手机号页面
 */
const unbindPhoneHandler = () => {
  router.push("editPhone/unbindPhone.vue")
}
</script>
