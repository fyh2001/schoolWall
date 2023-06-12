<!--
 * @Author: 黄叶
 * @Date: 2023-06-12 11:04:19
 * @LastEditTime: 2023-06-12 11:13:35
 * @FilePath: /schoolWall/src/views/user/editProfile/editMail/index.vue
 * @Description: 
-->
<template>
  <div  class="h-screen" style="background-color: #f5f5f5;">
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
          <div class="text-4.8 text-gray-5 font-bold">修改邮箱</div>
        </div>
      </div>
    </div>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import ChevronLeft from "@vicons/carbon/ChevronLeft";

import userApi from "../../../../api/user";
import router from "../../../../router/router";
import { useUserStore } from "../../../../store/userStore";

</script>
