<!--
 * @Author: 黄叶
 * @Date: 2023-05-21 01:06:30
 * @LastEditTime: 2023-06-07 13:36:08
 * @FilePath: /schoolWall/src/views/post/components/DeContentBox.vue
 * @Description: 
-->
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div class="text-3.8">共 {{ contentData.length }} 条回复</div>
      <DeTabs
        class="w-40"
        :list="['默认', '最新', '热门', '楼主']"
        :select-index="selectedTabsIndex"
        @change="(index) => (selectedTabsIndex = index)"
      />
    </div>
    <div
      v-if="contentData.length > 0"
      class="mb-6"
      v-for="(data, index) in contentData"
      @click="emit('showFormEditBoxByDeskTypeIs2', data.id)"
    >
      <div class="flex items-center">
        <!-- 头像 -->
        <div class="mr-3">
          <n-avatar
            round
            size="small"
            style="width: 24px; height: 24px"
            :src="config.baseURL + '/file/download?filename=' + data.avatar"
          />
        </div>
        <!-- 昵称 -->
        <div>
          <div class="inline-block text-green-6">{{ data.nickname }}</div>
          <div
            v-if="data.userId == postUserId"
            class="inline-block p-0.5 border border-green-6 rounded scale-78 text-green-6"
          >
            楼主
          </div>
        </div>
      </div>
      <div class="pl-9">
        <!-- 正文 -->
        <div ref="imageRef" class="mb-5 text-4">{{ data.text }}</div>
        <!-- 图片 -->
        <div class="mb-6">
          <div
            v-if="data.images[0] != ''"
            class="flex justify-between mt-5 w-full"
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
        <div class="flex justify-between items-center mb-3">
          <!-- 发布时间 -->
          <div class="text-3 text-gray">{{ data.createTime }}</div>
          <div class="flex justify-between items-center">
            <!-- 点赞 -->
            <div
              class="flex justify-between items-center mr-4"
              @click.stop="
                emit('changeLikeStatus', data.id, 2, data.likeStatus)
              "
            >
              <n-icon
                class="flex items-center"
                :class="
                  data.likeStatus == null || data.likeStatus == 0
                    ? 'text-gray'
                    : 'text-green-6'
                "
                size="18"
                :component="data.likeStatus ? LikeFilled : LikeOutlined"
              />
              <!-- 点赞数 -->
              <div
                class="ml-1 text-3.5"
                :class="
                  data.likeStatus == null || data.likeStatus == 0
                    ? 'text-gray'
                    : 'text-green-6'
                "
              >
                {{ data.likes }}
              </div>
            </div>
            <!-- 评论 -->
            <div
              class="flex justify-between items-center mr-4"
              @click.stop="emit('showFormEditBoxByDeskTypeIs2', data.id)"
            >
              <n-icon
                class="flex items-center text-gray"
                size="18"
                :component="ChatboxEllipsesOutline"
              />
              <!-- 评论数 -->
              <div class="ml-1 text-gray text-3.5">
                {{ data.secondReplies.length }}
              </div>
            </div>
          </div>
        </div>

        <!-- 回复板块 -->
        <div
          class="py-1 px-2 w-full rounded"
          style="background-color: #f9f9f9"
          v-if="data.secondReplies.length > 0"
        >
          <div
            class="reply"
            v-for="(reply, replyIndex) in data.secondReplies.slice(0, 5)"
            @click.stop="
              emit('showFormEditBoxByDeskTypeIs3', data.id, reply.id)
            "
          >
            <div>
              <!-- 昵称 -->
              <div class="inline text-green-6">
                <div class="inline">{{ reply.nickname }}</div>
                <div
                  v-if="reply.userId == postUserId"
                  class="inline-block p-0.5 border border-green-6 rounded scale-78"
                >
                  楼主
                </div>
                <div class="inline" v-if="reply.deskType == 3">
                  <div class="inline text-black">回复</div>
                  <div class="inline">
                    {{ getReplyInfo(index, reply.deskSecondId).nickname }}
                  </div>
                  <div
                    v-if="
                      getReplyInfo(index, reply.deskSecondId).userId ==
                      postUserId
                    "
                    class="inline-block p-0.5 border border-green-6 rounded scale-78"
                  >
                    楼主
                  </div>
                </div>
              </div>
              <!-- 回复内容 -->
              <div class="inline">:{{ reply.text }}</div>
            </div>
          </div>
          <div
            class="text-green-6"
            v-if="data.secondReplies.length > 5"
            @click.stop="
              router.push('/moreReplies/' + data.id + '/' + postUserId)
            "
          >
            查看更多回复({{ data.secondReplies.length }})
          </div>
        </div>
      </div>
    </div>
    <div  class="w-full h-40 text-center translate-y-20 text-4 text-gray" v-if="contentData.length == 0"> 还没有回复哦，快来回复一下吧～</div>
  </div>
</template>

<script setup>
import config from ".././../../config/config";
import LikeFilled from "@vicons/antd/LikeFilled";
import LikeOutlined from "@vicons/antd/LikeOutlined";
import ChatboxEllipsesOutline from "@vicons/ionicons5/ChatboxEllipsesOutline";
import DeTabs from "../components/DeTabs.vue";
import router from "../../../router/router";

const emit = defineEmits([
  "changeLikeStatus",
  "showFormEditBoxByDeskTypeIs2",
  "showFormEditBoxByDeskTypeIs3",
  "changeSelectedTabsIndex",
  "showMoreReplyBox",
]);

const props = defineProps({
  postUserId: Number,
  contentData: {
    type: Array,
    default: [],
  },
  changeLikeStatusIndex: {
    type: Function,
    default: () => {},
  },
  selectedTabsIndex: {
    type: Number,
    default: 0,
  },
  boxClick: {
    type: Function,
    default: () => {},
  },
});

/**
 * 获取回复信息
 */
const getReplyInfo = computed(() => (index, deskId) => {
  return props.contentData[index].secondReplies.find(
    (item) => item.id == deskId
  );
});

const imageBaseUrl = config.baseURL + "/file/download?filename=";

const imageRef = ref(null);
const imageRefClientWidth = ref(0);

watch(
  () => props.contentData,
  () => {
    nextTick(() => {
      imageRefClientWidth.value = imageRef.value[0].clientWidth;
    });
  },
  { deep: true }
);

const selectedTabsIndex = ref(props.selectedTabsIndex);

watch(selectedTabsIndex, (newIndex) => {
  emit("changeSelectedTabsIndex", newIndex);
});

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
    } else if (length >= 3) {
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
</script>

<style>
.reply {
  /* display: inline-block; */
  margin-bottom: 0.5rem;
}
.reply:nth-last-of-type(1) {
  margin-bottom: 0;
}

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
