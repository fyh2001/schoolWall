<!--
 * @Author: 黄叶
 * @Date: 2023-05-20 22:37:38
 * @LastEditTime: 2023-06-08 14:58:02
 * @FilePath: /schoolWall/src/views/post/components/DeTopTabbar.vue
 * @Description: 
-->
<template>
  <div
    class="sticky top-0 w-full py-2 pl-4 pr-3 bg-white border-b-0.5 z-999"
    v-if="props.data.length > 0"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-between">
        <n-icon
          class="flex items-center mr-4 text-gray"
          size="24"
          :component="ChevronLeft"
          @click="goBack"
        />
        <!-- 头像 -->
        <div class="mr-3">
          <n-avatar
            round
            size="small"
            :src="config.baseURL + '/file/download?filename=' + data[0].avatar"
            object-fit="cover"
          />
        </div>
        <div>
          <!-- 昵称 -->
          <div class="mb-1">{{ data[0].nickname }}</div>
          <!-- 发布时间 -->
          <div class="text-3 text-gray">{{ data[0].createTime }}</div>
        </div>
      </div>
      <!-- 更多操作 -->
      <div class="mr-2">
        <n-icon
          class="flex items-center text-gray"
          size="24"
          :component="OverflowMenuVertical"
        ></n-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from "@vicons/fa/ArrowLeft";
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import OverflowMenuVertical from "@vicons/carbon/OverflowMenuVertical";
import router from "../../../router/router";
import config from "../../../config/config";
const props = defineProps({
  data: {
    type: Array,
  },
});

const goBack = () => {
  router.go(-1);
};
onMounted(() => {});
</script>
