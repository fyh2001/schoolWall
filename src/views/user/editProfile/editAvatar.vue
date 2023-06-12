<!--
 * @Author: 黄叶
 * @Date: 2023-06-07 05:29:21
 * @LastEditTime: 2023-06-12 18:52:32
 * @FilePath: /schoolWall/src/views/user/editProfile/editAvatar.vue
 * @Description: 
-->
<!--
 * @Author: 黄叶
 * @Date: 2023-06-07 05:29:21
 * @LastEditTime: 2023-06-07 07:42:18
 * @FilePath: /schoolWall/src/views/user/editProfile/editAvatar.vue
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
          <div class="text-4.8 text-gray-5 font-bold">修改头像</div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center px-4 py-20">
      <n-image
        :src="config.baseURL + '/file/download?filename=' + userStore.user.avatar"
        style="width: 100%"
        object-fit="cover"
      />
      <div class="mt-20">
        <n-upload
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
          <n-button class="w-40 h-10" type="primary"> 选择图片 </n-button>
        </n-upload>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import ChevronRight from "@vicons/carbon/ChevronRight";

import router from "../../../router/router";
import config from "../../../config/config";
import userApi from "../../../api/user";
import { useUserStore } from "../../../store/userStore";
import user from "../../../api/user";

const userStore = useUserStore();

const token = localStorage.getItem("token");

const uploadError = () => {
  window.$message.error("上传失败");
};

const uploadSuccess = async (options) => {
  if (options.event.target.responseText != undefined) {
    let image = options.event.target.responseText;
    const res = await userApi.update({
      avatar: image.replace(/[\"\[\]]/g, ""),
    });

    if (res.code === 200) {
      window.$message.success("修改成功");
      userStore.update({
        avatar: image.replace(/[\"\[\]]/g, "")
      })
      
    } else {
      window.$message.error(res.msg);
    }
  }
};
</script>
