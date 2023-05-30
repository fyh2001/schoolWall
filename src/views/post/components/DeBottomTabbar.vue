<!--
 * @Author: 黄叶
 * @Date: 2023-05-20 23:55:18
 * @LastEditTime: 2023-05-30 17:17:59
 * @FilePath: /schoolWall/src/views/post/components/DeBottomTabbar.vue
 * @Description: 
-->
<template>
  <div>
    <div
      class="fixed bottom-0 left-0 flex justify-around items-center w-full py-3 pr-3 bg-white border-t z-10"
      style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <n-button
        strong
        secondary
        round
        type="tertiary"
        @click="emit('showFormEditBox')"
      >
        <n-icon size="16" :component="Edit"></n-icon>
        <div class="ml-1 mr-8">写回复...</div>
      </n-button>
      <!-- 评论 -->
      <div>
        <n-badge
          :value="data[0].replies"
          color="none"
          :offset="[7, -2]"
          show-zero
        >
          <n-icon
            class="flex items-center text-gray"
            size="18"
            :component="ChatboxEllipsesOutline"
          />
        </n-badge>
      </div>
      <!-- 点赞 -->
      <div @click="emit('changeLikeStatus', data[0].id, 1, data[0].likeStatus)">
        <n-badge
          :value="data[0].likes"
          color="none"
          :offset="[7, -2]"
          show-zero
        >
          <n-icon
            class="flex items-center text-gray"
            :class="
              data[0].likeStatus == null || data[0].likeStatus == 0
                ? 'text-gray'
                : 'text-green-6'
            "
            size="18"
            :component="data[0].likeStatus ? LikeFilled : LikeOutlined"
          />
        </n-badge>
      </div>
      <!-- 收藏 -->
      <div>
        <n-badge value="0" color="none" :offset="[7, -2]" show-zero>
          <n-icon
            class="flex items-center text-gray"
            size="18"
            :component="StarOutlined"
          />
        </n-badge>
      </div>
      <!-- 分享 -->
      <div>
        <n-badge value="0" color="none" :offset="[7, -2]" show-zero>
          <n-icon
            class="flex items-center text-gray"
            size="18"
            :component="ShareOutline"
          />
        </n-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
import LikeFilled from "@vicons/antd/LikeFilled";
import LikeOutlined from "@vicons/antd/LikeOutlined";
import StarOutlined from "@vicons/antd/StarOutlined";
import ShareOutline from "@vicons/ionicons5/ShareOutline";
import ChatboxEllipsesOutline from "@vicons/ionicons5/ChatboxEllipsesOutline";
import Edit from "@vicons/carbon/Edit";
const props = defineProps({
  data: {
    type: Array,
  },
});

const emit = defineEmits(["showFormEditBox", "changeLikeStatus", "changeCollectsStatus","share"]);
</script>

<style>
.n-badge .n-badge-sup {
  @apply text-gray;
}
</style>
