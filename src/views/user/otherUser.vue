<!--
 * @Author: 黄叶
 * @Date: 2023-06-13 01:22:27
 * @LastEditTime: 2023-06-13 01:23:48
 * @FilePath: /schoolWall/src/views/user/otherUser.vue
 * @Description: 访问他人主页
-->
<template>
  <div>
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
                <n-icon
                  class="text-white"
                  size="14"
                  :component="WomanOutlined"
                />
              </div>
            </div>
          </div>

          <!-- 签名 -->
          <div
            class="flex items-center mb-4 text-gray-3"
            :class="{ 'text-white': userStore.user.signature != '' }"
            @click.stop="router.push('/editProfile')"
          >
            <n-icon
              class="mr-2"
              size="16"
              :component="Edit"
              v-if="userStore.user.signature == ''"
            />
            <div>
              {{
                userStore.user.signature != ""
                  ? userStore.user.signature
                  : "点击设置我的签名"
              }}
            </div>
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
  </div>
</template>

<script setup>
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});
</script>
