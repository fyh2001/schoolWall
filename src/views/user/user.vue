<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 18:37:53
 * @LastEditTime: 2023-06-12 23:46:14
 * @FilePath: /schoolWall/src/views/user/user.vue
 * @Description: 
-->
<template>
  <div class="">
    <!-- 个人资料 -->
    <div
      :class="['user_info', 'relative w-full']"
      :style="{
        backgroundImage: `url( ${
          config.baseURL +
          '/file/download?filename=' +
          userStore.user.background
        } )`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <!-- 未登录 -->
      <div
        class="p-6 py-8 w-full h-full bg-black bg-opacity-40"
        v-if="!isLogined"
        @click="router.push('/login')"
      >
        <div class="flex items-center justify-between mb-4">
          <!-- 头像 -->
          <n-avatar
            round
            :size="76"
            :src="config.baseURL + '/file/download?filename=' + 'boy_4.png'"
            object-fit="cover"
          />
          <!-- 登录 -->
          <div class="flex items-center text-white font-bold">
            <div class="mr-2 text-4">点击登录</div>
            <!-- 右箭头 -->
            <n-icon :size="20" :component="ChevronRight" />
          </div>
        </div>
      </div>

      <!-- 已登陆 -->
      <div
        class="p-6 pt-8 w-full h-full bg-black bg-opacity-40"
        v-if="isLogined"
      >
        <!-- 设置按钮 -->
        <div class="flex justify-end -translate-y-1/2">
          <n-icon
            class="text-gray-3"
            :size="24"
            :component="Settings"
            @click="router.push('/settings')"
          />
        </div>
        <!-- 头像与编辑资料按钮 -->
        <div class="flex items-center justify-between">
          <!-- 头像 -->
          <n-avatar
            round
            :size="76"
            :src="
              config.baseURL +
              '/file/download?filename=' +
              userStore.user.avatar
            "
            object-fit="cover"
            @click.stop="showImagePreview = true"
          />
          <!-- 头像预览 -->
          <van-image-preview
            v-model:show="showImagePreview"
            :images="[
              `${
                config.baseURL +
                '/file/download?filename=' +
                userStore.user.avatar
              }`,
            ]"
            show-indicators
          >
          </van-image-preview>
          <!-- 编辑资料按钮 -->
          <div class="" @click.stop="router.push('/editProfile')">
            <n-button
              class="bg-white bg-opacity-25"
              round
              ghost
              :bordered="false"
              size="large"
            >
              <div class="text-white">编辑资料</div>
            </n-button>
          </div>
        </div>
        <!-- 昵称与性别 -->
        <div class="flex items-center mt-6 mb-4">
          <!-- 昵称 -->
          <div class="mr-2 text-4.5 text-white font-bold">
            {{ userStore.user.nickname }}
          </div>
          <!-- 性别 -->
          <div v-if="userStore.user.gender">
            <!-- 男 -->
            <div
              class="flex items-center py-0.5 px-1.5 rounded-2xl bg-blue-4"
              v-if="userStore.user.gender == 1"
            >
              <n-icon class="text-white" size="14" :component="ManOutlined" />
            </div>
            <!-- 女 -->
            <div
              class="flex items-center py-0.5 px-1.5 rounded-2xl bg-red-4"
              v-if="userStore.user.gender == 2"
            >
              <n-icon class="text-white" size="14" :component="WomanOutlined" />
            </div>
          </div>
        </div>

        <!-- 签名 -->
        <div
          class="flex items-center mb-4 text-gray-3"
          :class="{ 'text-white': userStore.user.signature != '' }"
          @click.stop="router.push('/editProfile')"
        >
          <n-icon class="mr-2" size="16" :component="Edit" v-if="userStore.user.signature == ''"/>
          <div>{{ userStore.user.signature != '' ? userStore.user.signature : "点击设置我的签名" }}</div>
        </div>
        <!-- 获赞、关注、粉丝 -->
        <div class="flex items-center mb-4">
          <!-- 获赞 -->
          <div class="flex items-center mr-4">
            <!-- 获赞数 -->
            <div class="mr-1 text-4.2 text-white font-bold">0</div>
            <div class="text-4 text-white">获赞</div>
          </div>
          <!-- 关注 -->
          <div class="flex items-center mr-4">
            <!-- 关注数 -->
            <div class="mr-1 text-4.2 text-white font-bold">0</div>
            <div class="text-4 text-white">关注</div>
          </div>
          <!-- 粉丝 -->
          <div class="flex items-center">
            <!-- 粉丝数 -->
            <div class="mr-1 text-4.2 text-white font-bold">0</div>
            <div class="text-4 text-white">粉丝</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 与我相关 -->
    <div
      class="w-full rounded-t-2xl bg-white -translate-y-5"
      :class="{ 'h-80': postsData.length == 0 }"
    >
      <!-- tabs -->
      <DeTabs
        tab-class="px-4 rounded-t-2xl"
        :list="tabList"
        :selected-index="selectedIndex"
        @change-index="($event) => (selectedIndex = $event)"
      />
      <!-- 详情 -->
      <div class="relative h-full p-2" style="background-color: #f2f1f6">
        <n-spin :show="isLoading">
          <div class="w-full" v-if="postsData.length > 0">
            <div class="px-2 mb-2 text-3 text-gray-4">
              全部动态({{ postsData.length }})
            </div>
            <ContentBox
              :content-data="postsData"
              @change-like-status-index="changeLikeStatus"
              @box-click="goToPostPage($event)"
            />
          </div>

          <!-- 无数据时显示 -->
          <div
            v-if="postsData.length == 0 && isLogined"
            class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray"
          >
            咦，什么都没找到...
          </div>
        </n-spin>
        <!-- 未登录时 -->
        <div>
          <div
            v-if="!isLogined"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray"
          >
            请先登录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Settings from "@vicons/tabler/Settings";
import Edit from "@vicons/carbon/Edit";
import ManOutlined from "@vicons/antd/ManOutlined";
import WomanOutlined from "@vicons/antd/WomanOutlined";
import ChevronRight from "@vicons/carbon/ChevronRight";
import DeTabs from "../../components/newUI/DeTabs.vue";
import ContentBox from "../../components/newUI/ContentBox.vue";
import { useUserStore } from "../../store/userStore";
import postApi from "../../api/post";
import userApi from "../../api/user";
import postDataFormat from "../../utils/postDataFormat";
import config from "../../config/config";
import router from "../../router/router";

const userStore = useUserStore();

const isLogined = localStorage.getItem("token") ? true : false;
const isLoading = ref(false); //是否正在加载

// tab栏内容
const tabList = ["动态", "点赞", "评论", "收藏", "关注", "粉丝"];
// tab栏选中的index
const selectedIndex = ref(0);

/**
 * 根据用户ID获取用户信息
 */
const getUserData = async () => {
  const res = await userApi.getUserByUserId(userStore.user.userId);
  console.log(res);
  if (res.code == 200) {
    userStore.update({
      userId: res.data.id,
      email: res.data.email,
      phone: res.data.phone,
      nickname: res.data.nickname,
      gender: res.data.gender,
      avatar: res.data.avatar,
      signature: res.data.signature,
      background: res.data.background,
      diyBackground: res.data.diy_background,
    });
  }
};

// 帖子数据
const postsData = ref([]);

/**
 * 获取用户的帖子
 */
const getPostByUserId = async () => {
  isLoading.value = true;
  const res = await postApi.getPostByUserId(userStore.user.userId);
  console.log(res);
  if (res.code == 200) {
    if (res.data == null) {
      postsData.value = [];
      isLoading.value = false;
      return;
    }
    postsData.value = postDataFormat.postDataFormat(res.data);
  }
  isLoading.value = false;
};

/**
 * 修改点赞状态
 * @param {*} index 帖子在数组中的下标
 */
const changeLikeStatus = async (index) => {
  if (
    postsData.value[index].likeStatus == 0 ||
    postsData.value[index].likeStatus == null
  ) {
    const res = await postApi.likePost(postsData.value[index].id);
    ElMessage.success(res.data);
    postsData.value[index].likeStatus = 1;
    postsData.value[index].likes++;
  } else {
    const res = await postApi.unlikePost(postsData.value[index].id);
    ElMessage.success(res.data);
    console.log(res);
    postsData.value[index].likeStatus = 0;
    postsData.value[index].likes--;
  }
};

/**
 * 跳转到具体的帖子页面
 * @param {number} id 帖子id
 */
const goToPostPage = (id) => {
  router.push(`/post/${id}`);
};

/**
 * 图片预览
 * @param {*} dataIndex
 * @param {*} imageIndex
 */
const showImagePreview = ref(false);
const imagePreviewIndex = ref(0);

onMounted(() => {
  getUserData();
  getPostByUserId();
});

console.log(userStore.user);
</script>

<style>
/* .user_info {
  background-image: url("../../../public/userBg.jpg");
  background-size: cover;
} */
</style>
