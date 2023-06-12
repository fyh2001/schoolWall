<template>
  <div class="min-h-screen bg-white">
    <!-- 顶部栏 -->
    <div
      class="sticky top-0 py-3 px-4 w-full bg-white border-b-0.5 overflow-hidden z-999"
    >
      <div class="flex items-center">
        <n-icon
          class="flex items-center text-gray-5 mr-4"
          size="26"
          :component="ChevronLeft"
          @click="router.back()"
        />
        <div>
          <div class="text-4.8 text-gray-5 font-bold">个人主页背景</div>
        </div>
      </div>
    </div>

    <div class="p-4">
      <!-- 预览 -->
      <div>
        <div
          class="rounded-md"
          :style="{
            backgroundImage: `url( ${
              config.baseURL +
              '/file/download?filename=' +
              userStore.user.background
            } )`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        >
          <!-- 深色遮罩 -->
          <div
            class="p-6 pt-8 mb-4 w-full h-full bg-black bg-opacity-40 rounded-md"
          >
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
              />
              <!-- 编辑资料按钮 -->
              <div class="">
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
                  <n-icon
                    class="text-white"
                    size="14"
                    :component="ManOutlined"
                  />
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
            <div class="flex items-center mb-4 text-gray-3">
              <n-icon class="mr-2" size="16" :component="Edit" />
              <div>点击设置我的签名</div>
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
        <!-- 选择背景 -->
        <div class="">
          <!-- 自定义背景 -->
          <div>
            <div class="mb-4">自定义背景</div>
            <!-- 背景展示 -->
            <div class="relative w-42 h-42">
              <!-- 有背景展示 -->
              <n-image
                class="rounded-md"
                v-if="userStore.user.diyBackground != ''"
                :src="
                  config.baseURL +
                  '/file/download?filename=' +
                  userStore.user.diyBackground
                "
                style="width: 100%; height: 100%"
                object-fit="cover"
              />
              <!-- 无背景展示 -->
              <div
                v-if="userStore.user.diyBackground == ''"
                class="w-full h-full rounded-md"
                style="background-color: #999999"
              />
              <!-- 修改按钮与正在使用提示 -->
              <div
                class="flex items-center justify-between px-2 text-white -translate-y-10 z-10"
              >
                <!-- 修改按钮 -->
                <n-upload
                  class="flex w-auto"
                  :action="config.baseURL + '/file/upload'"
                  :headers="{
                    Authorization: `${token}`,
                  }"
                  accept="image/*"
                  name="file"
                  :show-file-list="false"
                  @error="uploadError"
                  @finish="uploadSuccess"
                >
                  <div class="flex items-center">
                    <n-icon class="mr-1" size="18" :component="Edit" />
                    <div>修改</div>
                  </div>
                </n-upload>
                <!-- 设为背景 -->
                <div
                  v-if="
                    userStore.user.background != userStore.user.diyBackground
                  "
                  class="py-1 px-1.5 bg-green-6 rounded text-3"
                  @click="useDiyBackgoundListHandler"
                >
                  设为背景
                </div>
                <!-- 正在使用 -->
                <div
                  v-if="
                    userStore.user.background == userStore.user.diyBackground
                  "
                  class="py-0.6 px-1.2 border-1.5 border-white rounded text-3"
                >
                  正在使用
                </div>
              </div>
            </div>
          </div>
          <!-- 推荐背景 -->
          <div class="">
            <div class="my-4">推荐背景</div>
            <div class="grid grid-cols-2 gap-4">
              <div
                class="relative"
                v-for="(data, index) in backgroundList"
                :key="index"
              >
                <!-- 有背景展示 -->
                <n-image
                  class="rounded-md"
                  v-if="userStore.user.background != ''"
                  :src="config.baseURL + '/file/download?filename=' + data"
                  style="width: 100%"
                  object-fit="cover"
                />
                <!-- 设为背景与正在使用 -->
                <div class="absolute bottom-5 right-2 text-white z-10">
                  <!-- 设为背景 -->
                  <div
                    v-if="userStore.user.background != data"
                    class="py-1 px-1.5 bg-green-6 rounded text-3"
                    @click="useBackgoundListHandler(data)"
                  >
                    设为背景
                  </div>
                  <!-- 正在使用 -->
                  <div
                    v-if="userStore.user.background == data"
                    class="py-0.6 px-1.2 border-1.5 border-white rounded text-3"
                  >
                    正在使用
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import Edit from "@vicons/carbon/Edit";
import ManOutlined from "@vicons/antd/ManOutlined";
import WomanOutlined from "@vicons/antd/WomanOutlined";
import ChevronRight from "@vicons/carbon/ChevronRight";

import userApi from "../../../api/user";
import router from "../../../router/router";
import config from "../../../config/config";
import { useUserStore } from "../../../store/userStore";
import user from "../../../api/user";

const userStore = useUserStore();

const token = localStorage.getItem("token");

// 推荐背景
const backgroundList = ["bg_1.jpeg", "bg_2.jpeg", "bg_3.jpeg", "bg_4.jpeg"];
/**
 * 使用推荐背景
 */
const useBackgoundListHandler = async (image) => {
  const res = await userApi.update({
    background: image,
  });

  if (res.code === 200) {
    window.$message.success("修改成功");
    userStore.update({
      background: image
    });
  } else {
    window.$message.error(res.msg);
  }
};

/**
 * 使用自定义背景
 */
const useDiyBackgoundListHandler = async () => {
  const res = await userApi.update({
    background: userStore.user.diyBackground,
  });
  if (res.code === 200) {
    window.$message.success("修改成功");
    userStore.update({
      background: userStore.user.diyBackground,
    });
  } else {
    window.$message.error(res.msg);
  }
};

const uploadError = () => {
  window.$message.error("上传失败");
};

const uploadSuccess = async (options) => {
  if (options.event.target.responseText != undefined) {
    let image = options.event.target.responseText;
    const res = await userApi.update({
      background: image.replace(/[\"\[\]]/g, ""),
      diy_background: image.replace(/[\"\[\]]/g, ""),
    });

    if (res.code === 200) {
      window.$message.success("修改成功");
      userStore.update({
        background: image.replace(/[\"\[\]]/g, ""),
      });
      userStore.update({
        diyBackground: image.replace(/[\"\[\]]/g, ""),
      });
    } else {
      window.$message.error(res.msg);
    }
  }
};
</script>
