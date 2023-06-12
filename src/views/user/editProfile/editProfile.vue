<!--
 * @Author: 黄叶
 * @Date: 2023-06-07 04:43:54
 * @LastEditTime: 2023-06-12 18:49:49
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
      <div
        class="flex items-center justify-between py-3 px-4"
        @click="router.push('/editAvatar')"
      >
        <div class="text-4">头像</div>
        <n-avatar
          round
          :size="48"
          :src="
            config.baseURL + '/file/download?filename=' + userStore.user.avatar
          "
          object-fit="cover"
        />
      </div>
      <!-- 个人主页背景 -->
      <div
        class="flex items-center justify-between py-3 px-4"
        @click="router.push('/editBackground')"
      >
        <div class="text-4">个人主页背景</div>
        <n-avatar
          :size="48"
          :src="
            config.baseURL +
            '/file/download?filename=' +
            userStore.user.background
          "
          object-fit="cover"
          v-if="userStore.user.background != ''"
        />
        <div
          class="text-3.8 text-gray-5"
          v-if="userStore.user.background == ''"
        >
          未设置
        </div>
      </div>
      <!-- 昵称 -->
      <div
        class="flex items-center justify-between py-3 px-4 mb-2"
        @click="router.push('editNickname')"
      >
        <div class="text-4">昵称</div>
        <div class="text-3.8 text-gray-5">{{ userStore.user.nickname }}</div>
      </div>
      <!-- 性别 -->
      <div
        class="flex items-center justify-between py-3 px-4 mb-2"
        @click="showChangeGenderBox = true"
      >
        <div class="text-4">性别</div>
        <div class="text-3.8 text-gray-5">
          {{
            { 1: "男", 2: "女", 0: "保密" }[userStore.user.gender] || "未设置"
          }}
        </div>
      </div>
      <!-- 签名 -->
      <div
        class="flex items-center justify-between py-3 px-4 mb-2"
        @click="showChangeSignatureBox = true"
      >
        <div class="w-30 text-4">签名</div>
        <div class="text-3.8 text-gray-5">{{ userStore.user.signature != '' ? userStore.user.signature : "未设置"}}</div>
      </div>
      <!-- 帐号与绑定 -->
      <div
        class="flex items-center justify-between pt-3 pb-4 px-4 mb-2"
        @click="router.push('/editBinding')"
      >
        <div class="text-4">帐号与绑定</div>
        <n-icon class="text-gray-5" :size="20" :component="ChevronRight" />
      </div>
    </div>
    <!-- 性别修改弹出框 -->
    <DeMiddlePopUpBox
      :show="showChangeGenderBox"
      @close="showChangeGenderBox = false"
    >
      <div class="text-center pt-8 pb-6 px-8">
        <div class="mb-10 m-auto">
          <n-radio-group
            v-model:value="changeGenderValue"
            :default-value="userStore.user.gender"
          >
            <n-radio-button
              class="w-auto"
              v-for="(gender, index) in genderList"
              :key="index"
              :value="gender.value"
              :label="gender.label"
              :default-checked="true"
            />
          </n-radio-group>
        </div>
        <!-- 确定与取消按钮 -->
        <div class="flex flex-row-reverse text-green-6">
          <div class="ml-8" @click="changeGenderHandler">确定</div>
          <div @click="showChangeGenderBox = false">取消</div>
        </div>
      </div>
    </DeMiddlePopUpBox>
    <!-- 修改个性签名弹出框 -->
    <DeBottomPopUpBox
      :show="showChangeSignatureBox"
      @close="showChangeSignatureBox = false"
    >
      <div class="p-4 bg-white rounded-t-2xl">
        <div class="p-4 mb-1 rounded-lg" style="background-color: #f5f5f5">
          <!-- 标题 -->
          <div class="mb-2 text-3 text-green-6">修改签名</div>
          <div>
            <n-input
              class="text-4"
              style="
                --n-color: none;
                --n-color-hover: none;
                --n-color-focus: none;
                --n-border: none;
                --n-border-hover: none;
                --n-border-focus: none;
                --n-box-shadow-focus: none;
              "
              v-model:value="formSignature"
              :default-value="formSignature"
              placeholder="在这里编辑你的个性签名～"
              type="textarea"
              size="small"
              :autosize="{
                minRows: 1,
              }"
              maxlength="60"
              @update:value="watchSignature"
            />
          </div>
        </div>
        <!-- 签名长度 -->
        <div class="mr-2 mb-4 text-end text-3 text-gray-5">
          {{ signatureLength }}/60
        </div>
        <!-- 确定与取消按钮 -->
        <div class="flex flex-row-reverse mr-2 text-green-6">
          <div class="ml-8" @click="changeSignatureHandler">确定</div>
          <div @click="showChangeSignatureBox = false">取消</div>
        </div>
      </div>
    </DeBottomPopUpBox>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import ChevronRight from "@vicons/carbon/ChevronRight";
import DeMiddlePopUpBox from "../../../components/newUI/DeMiddlePopUpBox.vue";
import DeBottomPopUpBox from "../../../components/newUI/DeBottomPopUpBox.vue";
import router from "../../../router/router";
import config from "../../../config/config";
import userApi from "../../../api/user";
import { useUserStore } from "../../../store/userStore";

const userStore = useUserStore();

const temp = () => {
  window.$message.info("暂未开放");
};

// 是否显示性别修改弹出框
const showChangeGenderBox = ref(false);
// 性别列表
const genderList = [
  { label: "男孩", value: 1 },
  { label: "女孩", value: 2 },
  { label: "保密", value: 0 },
];
// 性别修改值
const changeGenderValue = ref(userStore.user.gender || 0);
/**
 * 修改性别
 */
const changeGenderHandler = async () => {
  const res = await userApi.update({
    gender: changeGenderValue.value,
  });
  console.log(res);
  if (res.code === 200) {
    window.$message.success("修改成功");
    userStore.update({
      gender: changeGenderValue.value
    });
  } else {
    window.$message.error("修改失败");
  }
  showChangeGenderBox.value = false;
};

// 是否显示个性签名修改弹出框
const showChangeSignatureBox = ref(false);
// 个性签名
const formSignature = ref(userStore.user.signature || "");
// 个性签名长度
const signatureLength = ref(formSignature.value.length);

/**
 * 监听个性签名修改
 * @param {*} e 个性签名
 */
const watchSignature = (e) => {
  signatureLength.value = e.length;
};

/**
 * 修改个性签名
 */
const changeSignatureHandler = async() => {
  if (formSignature.value.length > 60) {
    window.$message.error("个性签名不能超过60个字符");
    return;
  }
  const res = await userApi.update({
    signature: formSignature.value,
  });
  console.log(res);
  if (res.code === 200) {
    window.$message.success("修改成功");
    userStore.update({
      signature: formSignature.value,
    })
  } else {
    window.$message.error("修改失败");
  }
}
onMounted(() => {});
</script>

<style></style>
