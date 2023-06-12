<!--
 * @Author: 黄叶
 * @Date: 2023-05-31 00:39:57
 * @LastEditTime: 2023-06-08 17:30:23
 * @FilePath: /schoolWall/src/views/post/moreReplies.vue
 * @Description: 
-->
<template>
  <div
    class="absolute top-0 left-0 w-full bg-white z-10"
    v-if="repliesData != null"
  >
    <!-- header -->
    <div class="sticky top-0 flex px-5 py-4 border-b-0.5 bg-white z-21">
      <n-icon
        class="flex items-center mr-4"
        size="24"
        :component="Close"
        @click="router.back()"
      />
      <div class="text-5 text-gray-6">
        回复({{ repliesData.secondReplies.length }})
      </div>
    </div>
    <!-- content -->
    <div
      class="px-5 py-4"
      @click="showFormEditBoxByDeskTypeIsTwo(repliesData.id)"
    >
      <div class="flex items-center">
        <!-- 头像 -->
        <div class="mr-3">
          <n-avatar
            round
            size="small"
            style="width: 24px; height: 24px"
            object-fit="cover"
            :src="config.baseURL + '/file/download?filename=' + userStore.user.avatar"
          />
        </div>
        <!-- 昵称 -->
        <div>
          <div class="inline-block text-green-6">
            {{ repliesData.nickname }}
          </div>
          <div
            v-if="repliesData.userId == parseInt(postUserId)"
            class="inline-block p-0.5 border border-green-6 rounded scale-78 text-green-6"
          >
            楼主
          </div>
        </div>
      </div>
      <div class="pl-9">
        <!-- 正文 -->
        <div ref="imageRef" class="mb-5 text-4">
          {{ repliesData.text }}
        </div>
        <!-- 图片 -->
        <div class="mb-6">
          <div
            v-if="repliesData.images != '' || repliesData.images[0] != ''"
            class="flex justify-between mt-5 w-full"
          >
            <van-image
              class="overflow-hidden"
              v-for="(image, imageIndex) in repliesData.images"
              :src="imageBaseUrl + image"
              fit="cover"
              :style="imageStyleRule(repliesData.images.length)"
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
          <div class="text-3 text-gray">
            {{ repliesData.createTime }}
          </div>
          <div class="flex justify-between items-center">
            <!-- 点赞 -->
            <div
              class="flex justify-between items-center mr-4"
              @click.stop="
                changeLikeStatus(
                  repliesData.id,
                  repliesData.deskType,
                  repliesData.likeStatus
                )
              "
            >
              <n-icon
                class="flex items-center"
                :class="
                  repliesData.likeStatus == null || repliesData.likeStatus == 0
                    ? 'text-gray'
                    : 'text-green-6'
                "
                size="18"
                :component="repliesData.likeStatus ? LikeFilled : LikeOutlined"
              />
              <!-- 点赞数 -->
              <div
                class="ml-1 text-3.5"
                :class="
                  repliesData.likeStatus == null || repliesData.likeStatus == 0
                    ? 'text-gray'
                    : 'text-green-6'
                "
              >
                {{ repliesData.likes }}
              </div>
            </div>
            <!-- 评论 -->
            <div class="flex justify-between items-center mr-4">
              <n-icon
                class="flex items-center text-gray"
                size="18"
                :component="ChatboxEllipsesOutline"
              />
              <!-- 评论数 -->
              <div class="ml-1 text-gray text-3.5">
                {{ repliesData.secondReplies.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 回复 -->
    <div class="px-5 py-4" style="background-color: #f2f1f6">
      <div
        class="mb-6"
        v-for="(data, index) in repliesData.secondReplies"
        @click="showFormEditBoxByDeskTypeIsThree(repliesData.id, data.id)"
      >
        <div class="flex items-center">
          <!-- 头像 -->
          <div class="mr-3">
            <n-avatar
              round
              size="small"
              style="width: 24px; height: 24px"
              object-fit="cover"
              :src="config.baseURL + '/file/download?filename=' + data.avatar"
            />
          </div>
          <!-- 昵称 -->
          <div>
            <div class="inline-block text-green-6">
              {{ data.nickname }}
            </div>
            <div
              v-if="data.userId == parseInt(postUserId)"
              class="inline-block p-0.5 border border-green-6 rounded scale-78 text-green-6"
            >
              楼主
            </div>
            <!-- 回复 -->
            <div class="inline" v-if="data.deskType == 3">
              <div class="inline text-black">回复</div>
              <div class="inline text-green-6">
                {{ getReplyInfo(index, data.deskSecondId).nickname }}
              </div>
              <div
                v-if="
                  getReplyInfo(index, data.deskSecondId).userId ==
                  parseInt(postUserId)
                "
                class="inline-block p-0.5 border border-green-6 rounded scale-78 text-green-6"
              >
                楼主
              </div>
            </div>
          </div>
        </div>
        <div class="pl-9">
          <!-- 正文 -->
          <div ref="imageRef" class="mb-5 text-4">
            {{ data.text }}
          </div>
          <!-- 图片 -->
          <div class="mb-6" v-if="data.images[0] != '' && data.images != ''">
            <div class="flex justify-between mt-5 w-full">
              <van-image
                class="overflow-hidden"
                v-for="(image, imageIndex) in data.images"
                :src="imageBaseUrl + image"
                fit="cover"
                :style="imageStyleRule(data.images.length)"
                @click.stop="imagePreview(dataIndex, imageIndex)"
              />
            </div>
            <!-- 图片预览 -->
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
            <div class="text-3 text-gray">
              {{ data.createTime }}
            </div>
            <div class="flex justify-between items-center">
              <!-- 点赞 -->
              <div
                class="flex justify-between items-center mr-4"
                @click.stop="
                  changeLikeStatus(data.id, data.deskType, data.likeStatus)
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
              <div class="flex justify-between items-center mr-4">
                <n-icon
                  class="flex items-center text-gray"
                  size="18"
                  :component="ChatboxEllipsesOutline"
                />
                <!-- 评论数 -->
                <div class="ml-1 text-gray text-3.5">
                  {{ data.replies }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeFormEditBox
      :show="isShowFormEditBox"
      @close="() => (isShowFormEditBox = false)"
      @submit="submitReply"
    />
  </div>
</template>

<script setup>
import config from "../../config/config";
import LikeFilled from "@vicons/antd/LikeFilled";
import LikeOutlined from "@vicons/antd/LikeOutlined";
import ChatboxEllipsesOutline from "@vicons/ionicons5/ChatboxEllipsesOutline";
import Close from "@vicons/ionicons5/Close";
import replyApi from "../../api/reply";
import timeFormat from "../../utils/timeFormat";
import router from "../../router/router";
import DeFormEditBox from "./components/DeFormEditBox.vue";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore();

const props = defineProps({
  replyId: String,
  postUserId: String,
});

// 回复数据
const repliesData = ref(null);
/**
 * 获取二三级回复
 */
const getSecondReplies = async () => {
  const res = await replyApi.getReplyByReplyId(parseInt(props.replyId));
  if (res.code == 200) {
    repliesData.value = formatData(res.data);
    console.log("格式化回复: ", repliesData.value);
  }
};

// 是否显示编辑框
const isShowFormEditBox = ref(false);

// 显示编辑框(二级回复)
const showFormEditBoxByDeskTypeIsTwo = (deskId) => {
  formData.value.deskId = deskId;
  formData.value.deskType = 2;
  isShowFormEditBox.value = true;
};

// 显示编辑框(三级回复)
const showFormEditBoxByDeskTypeIsThree = (deskId, deskSecondId) => {
  formData.value.deskId = deskId;
  formData.value.deskSecondId = deskSecondId;
  formData.value.deskType = 3;
  isShowFormEditBox.value = true;
};

// 表单数据
const formData = ref({
  text: "", // 回复内容
  deskId: null, // 回复目标ID
  deskSecondId: null, // 回复目标二级ID
  deskType: null, // 回复目标类型
});

/**
 * 发布新回复
 * @param {*} formData 表单数据
 */
const submitReply = async (formData, uploadHandle) => {
  // 验证是否有正文
  if (formData.text == null || formData.text == "") {
    ElMessage.error("内容不能为空");
    return;
  }

  // 上传图片并获取图片名
  const images = await uploadHandle();

  // 格式化图片名
  let imagesFormat = "";
  if (images != null) {
    images.forEach((item) => {
      imagesFormat == ""
        ? (imagesFormat = item.replace(/[\[\]\"]/g, ""))
        : (imagesFormat += "," + item.replace(/[\[\]\"]/g, ""));
    });
  }

  // 格式化表单数据
  formData = {
    ...formData,
    images: imagesFormat == "" ? null : imagesFormat,
  };

  // 发布回复
  const res = await replyApi.addReply(formData);

  if (res.code == 200) {
    // 格式化回复数据
    res.data = {
      ...res.data,
      nickname: userStore.user.nickname,
      likes: 0,
      createTime: "片刻之前",
      text: textWraFormat(res.data.text),
      images: imagesFormat.split(","),
    };
    if (deskType.value == 1) {
      replyData.value.push(res.data);
    } else {
      replyData.value.forEach((item, index) => {
        if (item.id == deskId.value) {
          item.secondReplies.unshift(res.data);
        }
      });
    }
    ElMessage.success("发布成功");
  } else {
    ElMessage.error("发布失败");
  }
};

/**
 * 格式化数据
 * @param {*} ReplyData
 */
const formatData = (ReplyData) => {
  const formatData = {
    ...ReplyData,
    createTime: timeFormat.getFormateTime(ReplyData.createTime),
    updateTime: timeFormat.getFormateTime(ReplyData.updateTime),
    text: textWraFormat(ReplyData.text),
    images: ReplyData.images.split(","),
    secondReplies: ReplyData.secondReplies.map((item) => {
      return {
        ...item,
        createTime: timeFormat.getFormateTime(item.createTime),
        updateTime: timeFormat.getFormateTime(item.updateTime),
        text: textWraFormat(item.text),
        images: item.images.split(","),
      };
    }),
  };
  formatData.secondReplies.reverse();
  return formatData;
};

/**
 * 文本换行格式化
 * @param {*} text 文本
 */
const textWraFormat = (text) => {
  return text.replace(/\n/g, "<br>");
};

/**
 * 修改点赞状态
 * @param {*} replyId 回复ID
 * @param {*} deskType 回复类型
 * @param {*} likeStatus 点赞状态
 */
const changeLikeStatus = async (replyId, deskType, likeStatus) => {
  // 点赞
  if (likeStatus == 0 || likeStatus == null) {
    const res = await replyApi.likeReply(replyId);
    if (res.code == 200) {
      ElMessage({
        message: res.data,
        type: "success",
        grouping: true,
      });
      if (deskType == 1) {
        repliesData.value.likeStatus = 1;
        repliesData.value.likes++;
      } else if (deskType == 2 || deskType == 3) {
        const deskReply = repliesData.value.secondReplies.find(
          (item) => item.id == replyId
        );
        deskReply.likeStatus = 1;
        deskReply.likes++;
      }
    } else {
      ElMessage({
        message: res.data,
        type: "error",
        grouping: true,
      });
    }
  } else {
    // 取消点赞
    const res = await replyApi.unlikeReply(replyId);
    if (res.code == 200) {
      ElMessage({
        message: res.data,
        type: "success",
        grouping: true,
      });
      if (deskType == 1) {
        repliesData.value.likeStatus = 0;
        repliesData.value.likes--;
      } else if (deskType == 2 || deskType == 3) {
        const deskReply = repliesData.value.secondReplies.find(
          (item) => item.id == replyId
        );
        deskReply.likeStatus = 0;
        deskReply.likes--;
      }
    } else {
      ElMessage({
        message: res.data,
        type: "error",
        grouping: true,
      });
    }
  }
};

/**
 * 获取回复信息
 */
const getReplyInfo = computed(() => (index, deskId) => {
  return repliesData.value.secondReplies.find((item) => item.id == deskId);
});

const imageBaseUrl = config.baseURL + "/file/download?filename=";

const imageRef = ref(null);
const imageRefClientWidth = ref(0);

watch(
  () => props.repliesData,
  () => {
    nextTick(() => {
      imageRefClientWidth.value = imageRef.value[0].clientWidth;
    });
  },
  { deep: true }
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
  props.repliesData.images.forEach((item) => {
    temp.push(imageBaseUrl + item);
  });
  images.value = temp;
  imagePreviewIndex.value = imageIndex;
  show.value = true;
};

onMounted(() => {
  getSecondReplies();
});
</script>

<style>
.window-enter-active,
.window-leave-active {
  transition: opacity 0.3s ease;
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
}

.box-enter-active,
.box-leave-active {
  transition: transform 0.3s ease;
}

.box-enter-from,
.box-leave-to {
  transform: translateY(100%);
}
</style>
