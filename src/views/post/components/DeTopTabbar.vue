<!--
 * @Author: 黄叶
 * @Date: 2023-05-20 22:37:38
 * @LastEditTime: 2023-05-21 01:03:23
 * @FilePath: /schoolWall/src/views/post/components/DePostTopTabbar.vue
 * @Description: 
-->
<template>
  <div v-if="props.data.length > 0">
    <div class="sticky top-0 left-0 w-full py-2 pl-4 pr-3 border-b-0.5">
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
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
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
  </div>
</template>

<script setup>
import ArrowLeft from "@vicons/fa/ArrowLeft";
import ChevronLeft from "@vicons/carbon/ChevronLeft";
import OverflowMenuVertical from "@vicons/carbon/OverflowMenuVertical";
import router from "../../../router/router";
const props = defineProps({
  data: {
    type: Array,
  },
});

const goBack = () => {
  router.go(-1);
};
onMounted(() => {
  console.log(props.data);
});
</script>
