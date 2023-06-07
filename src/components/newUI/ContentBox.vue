<!--
 * @Author: 黄叶
 * @Date: 2023-05-19 17:09:38
 * @LastEditTime: 2023-06-07 19:08:33
 * @FilePath: /schoolWall/src/components/newUI/ContentBox.vue
 * @Description: 
-->
<template>
  <div>
    <!-- 内容 -->
    <div
      class="p-3 bg-white mb-4 rounded-md"
      v-for="(data, dataIndex) in contentData"
      @click.stop="emit('boxClick', data.id)"
    >
      <!-- header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <!-- 头像 -->
          <div class="mr-3">
            <n-avatar
              round
              size="small"
              :src="config.baseURL + '/file/download?filename=' + data.avatar"
            />
          </div>

          <div>
            <!-- 昵称 -->
            <div class="mb-1">{{ data.nickname }}</div>
            <!-- 发布时间 -->
            <div text-3 text-gray>{{ data.createTime }}</div>
          </div>

          <!-- 更多操作 -->
        </div>
        <div class="mr-2">
          <n-icon size="20" :component="ChevronDownOutline"></n-icon>
        </div>
      </div>
      <!-- 内容 -->
      <div class="mb-6">
        <!-- 文本内容 -->
        <div ref="imageRef" class="text-4.2">{{ data.text }}</div>
        <!-- 图片 -->
        <div
          v-if="data.images[0] != ''"
          class="grid gap-4 mt-5 w-full"
          :class="{
            'grid-cols-1': data.images.length == 1,
            'grid-cols-2': data.images.length == 2,
            'grid-cols-3': data.images.length >= 3,
          }"
        >
          <van-image
            class="overflow-hidden"
            v-for="(image, imageIndex) in data.images"
            :src="imageBaseUrl + image"
            fit="cover"
            :style="imageStyleRule(data.images.length)"
            @click.stop="imagePreview(dataIndex, imageIndex)"
          />
        </div>
        <van-image-preview
          v-model:show="show"
          :images="images"
          show-indicators
          :loop="false"
          :start-position="imagePreviewIndex"
        >
        </van-image-preview>
      </div>
      <!-- 点赞、评论、分享 -->
      <div class="flex justify-around">
        <!-- 点赞 -->
        <div
          class="flex items-center"
          @click.stop="emit('changeLikeStatusIndex', dataIndex)"
        >
          <div class="mr-2 items-center">
            <n-icon
              class="flex items-center text-green-6"
              size="18"
              v-if="data.likeStatus"
              :component="LikeFilled"
            />
            <n-icon
              class="flex items-center text-gray"
              size="18"
              v-if="!data.likeStatus"
              :component="LikeOutlined"
            />
          </div>
          <div
            :class="[
              'text-3.5',
              data.likeStatus == 1 ? 'text-green-6' : 'text-gray',
            ]"
          >
            {{ data.likes }}
          </div>
        </div>
        <!-- 评论 -->
        <div class="flex items-center">
          <div class="mr-2 items-center">
            <n-icon
              class="flex items-center text-gray"
              size="18"
              :component="ChatboxEllipsesOutline"
            />
          </div>
          <div class="text-3.5 text-gray">{{ data.replies }}</div>
        </div>
        <!-- 分享 -->
        <div class="flex items-center">
          <div class="mr-2 items-center">
            <n-icon
              class="flex items-center text-gray"
              size="18"
              :component="ShareOutline"
            />
          </div>
          <div class="text-3.5 text-gray">0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import config from "../../config/config";
import LikeFilled from "@vicons/antd/LikeFilled";
import LikeOutlined from "@vicons/antd/LikeOutlined";
import ShareOutline from "@vicons/ionicons5/ShareOutline";
import ChatboxEllipsesOutline from "@vicons/ionicons5/ChatboxEllipsesOutline";
import ChevronDownOutline from "@vicons/ionicons5/ChevronDownOutline";
import { showImagePreview } from "vant";
import { nextTick } from "vue";

const emit = defineEmits(["boxClick", "changeLikeStatusIndex"]);

const props = defineProps({
  contentData: {
    type: Array,
    default: [],
  },
  typeOfDisplay: {
    type: String,
    default: "post",
  },
  changeLikeStatusIndex: {
    type: Function,
    default: () => {},
  },
  boxClick: {
    type: Function,
    default: () => {},
  },
});

const imageBaseUrl = config.baseURL + "/file/download?filename=";

const imageRef = ref(null);
const imageRefClientWidth = ref(0);

watch(
  () => props.contentData,
  () => {
    nextTick(() => {
      imageRefClientWidth.value = imageRef.value[0].clientWidth;
      console.log(imageRefClientWidth.value);
    });
  },
  { deep: true, immediate: true }
);

/**
 *  图片样式规则
 */
const imageStyleRule = computed(() => {
  return (length) => {
    if (length == 1) {
      return {
        "border-radius": "8px",
        "max-height": imageRefClientWidth.value / 1.5 - 5 + "px",
      };
    } else if (length == 2) {
      return {
        "border-radius": "8px",
        width: imageRefClientWidth.value / 2 - 5 + "px",
        height: imageRefClientWidth.value / 2 - 5 + "px",
      };
    } else if (length == 3) {
      return {
        "border-radius": "8px",
        width: imageRefClientWidth.value / 3 - 5 + "px",
        height: imageRefClientWidth.value / 3 - 5 + "px",
      };
    } else if (length > 3) {
      return {
        "border-radius": "8px",
        width: imageRefClientWidth.value / 3 - 5 + "px",
        height: imageRefClientWidth.value / 3 - 5 + "px",
      };
    }
  };
});

/**
 * 图片预览
 * @param {*} dataIndex
 * @param {*} imageIndex
 */
const show = ref(false);
const imagePreviewIndex = ref(0);
let images = ref([]);
const imagePreview = (dataIndex, imageIndex) => {
  let temp = [];
  props.contentData[dataIndex].images.forEach((item) => {
    temp.push(imageBaseUrl + item);
  });
  images.value = temp;
  imagePreviewIndex.value = imageIndex;
  show.value = true;
};

onMounted(() => {});
</script>

<style>
.van-swipe {
  transform: translate3d(0, 0, 0);
  overflow: hidden;
}
.van-image-preview__image img {
  max-height: 100%;
  max-width: 100%;
  transform: translate3d(0, 0, 0);
}
</style>
