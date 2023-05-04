<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 23:59:28
 * @LastEditTime: 2023-04-30 23:33:31
 * @FilePath: /schoolWall/src/components/contentBox.vue
 * @Description: 
-->

<template>
  <div>
    <div class="content">
        <div
          class="p-3 px-4 mb-4 rounded-xl shadow bg-white bg-opacity-65 backdrop-blur-30"
          style="box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px"
          v-for="(data, index) in contentData"
          :key="index"
          @click="emit('boxClick', data.id)"
        >
          <div class="flex justify-between mb-2">
            <div class="flex">
              <div class="text-gray-5 mr-1.5"># {{ data.id }} ·</div>
              <div class="text-gray-5" v-if="data.anonymous == 0">
                {{ data.nickname }}
              </div>
              <div
                class="p-0.5 rounded bg-gray-4 bg-opacity-10 text-gray-5 -translate-y-0.5"
                v-if="data.anonymous == 1"
              >
                匿名
              </div>
            </div>
            <div class="text-gray-5">{{ data.createTime }}</div>
          </div>
          <div class="mb-3">
            <div
              v-html="data.text"
              class="break-normal text-gray-8 text-4.5"
              style="text-indent: 2em"
            ></div>
          </div>
          <div class="flex justify-between">
            <div
              class="flex items-center"
              @click.stop="emit('changeLikeStatusIndex', index)"
            >
              <icon-thumb-up
                class="mr-1"
                style="font-size: 16; color: #6b7280"
                v-if="data.likeStatus == null || data.likeStatus == 0"
              />
              <icon-thumb-up-fill
                class="mr-1"
                style="font-size: 16; color: #e8a65c"
                v-if="data.likeStatus == 1"
              />
              <div class="text-gray-5">{{ data.likes }}</div>
            </div>
            <div class="flex items-center" v-if="typeOfDisplay == 'post'">
              <icon-message
                class="mr-1"
                style="font-size: 16; color: #6b7280"
              />
              <div class="text-gray-5">{{ data.replies }}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

// import { ElMessage } from "element-plus";

const emit = defineEmits(["boxClick", "changeLikeStatusIndex"]);
const props = defineProps({
  /**
   * 显示的数据
   */
  contentData: Object,
  /**
   * 显示的数据类型: 帖子/回复
   */
  typeOfDisplay: String,
});

onMounted(() => {});
</script>

<style scoped>
/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, -30px);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
