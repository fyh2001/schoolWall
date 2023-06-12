<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 10:53:29
 * @LastEditTime: 2023-06-08 15:37:20
 * @FilePath: /schoolWall/src/views/post/post.vue
 * @Description: 
-->
<template>
  <div class="min-h-screen bg-white" v-if="!isLoding">
    <div ref="contentRef">
      <DeTopTabbar :data="postData" />
      <div ref="swiperRef">
        <Swiper
          v-if="postData[0].images[0] != ''"
          :modules="[Pagination]"
          :slides-per-view="1"
          :loop="true"
          :pagination="{ clickable: true }"
          :scrollbar="{ draggable: true }"
        >
          <SwiperSlide v-for="(data, index) in postData[0].images">
            <div ref="imageRef" class="flex flex-col justify-center">
              <img
                class="max-w-full max-h-120"
                :src="imageBaseUrl + data"
                style="object-fit: cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="p-4">
        <div class="mt-2 mb-10 text-4">{{ postData[0].text }}</div>

        <!-- <div class="my-5 w-full border-t" /> -->

        <!-- 回复列表 -->
        <DeContentBox
          :post-user-id="postData[0].userId"
          :content-data="replyData"
          @changeSelectedTabsIndex="(index) => (selectedTabsIndex = index)"
          @changeLikeStatus="changeLikeStatus"
          @showFormEditBoxByDeskTypeIs2="showFormEditBoxHandleByReplyToReply"
          @showFormEditBoxByDeskTypeIs3="showFormEditBoxHandleByReplyToReply2"
          @showMoreReplyBox="showMoreReplyBox"
        />
      </div>
      <DeBottomTabbar
        :data="postData"
        @showFormEditBox="showFormEditBoxHandleByReplyToPost"
        @changeLikeStatus="changeLikeStatus"
      />
      <DeFormEditBox
        :show="isShowFormEditBox"
        @close="() => (isShowFormEditBox = false)"
        @submit="submitReply"
      />

      <!-- 防止底部栏遮挡 -->
      <div class="w-full h-12" />
    </div>
  </div>
</template>

<script setup>
import DeFormEditBox from "./components/DeFormEditBox.vue";
import DeTopTabbar from "./components/DeTopTabbar.vue";
import DeBottomTabbar from "./components/DeBottomTabbar.vue";
import DeContentBox from "./components/DeContentBox.vue";
import postApi from "../../api/post";
import replyApi from "../../api/reply";
import timeFormat from "../../utils/timeFormat";
import config from "../../config/config";
import { useUserStore } from "../../store/userStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import post from "../../api/post";
import { nextTick } from "vue";

const userStore = useUserStore();
const imageBaseUrl = config.baseURL + "/file/download?filename=";

const props = defineProps({
  id: String,
});

// swiper
const swiperRef = ref(null);
const swiperHeight = ref(0);
const imageRef = ref(null);

/**
 * 回复tabs的当前下标
 */
const selectedTabsIndex = ref(0);

const isLoding = ref(true);

// 是否显示更多回复
const isShowMoreReplyBox = ref(false);

// 修改显示更多回复的状态
const showMoreReplyBox = () => {
  if (isShowMoreReplyBox.value == true) {
    isShowMoreReplyBox.value = false;
  } else {
    isShowMoreReplyBox.value = true;
  }
};

// 是否显示回复编辑框
const isShowFormEditBox = ref(false);

/**
 * 显示回复编辑框(回复帖子)
 */
const showFormEditBoxHandleByReplyToPost = () => {
  deskId.value = parseInt(props.id);
  deskSecondId.value = null;
  deskType.value = 1;
  isShowFormEditBox.value = true;
};

/**
 * 显示回复编辑框(回复评论)
 * @param {*} deskId 评论id
 */
const showFormEditBoxHandleByReplyToReply = (id) => {
  deskId.value = id;
  deskSecondId.value = null;
  deskType.value = 2;
  isShowFormEditBox.value = true;
};

const showFormEditBoxHandleByReplyToReply2 = (desk, deskSecond) => {
  deskId.value = desk;
  deskSecondId.value = deskSecond;
  deskType.value = 3;
  isShowFormEditBox.value = true;
};

const deskId = ref(null);
const deskSecondId = ref(null);
const deskType = ref(null);

/**
 * 发布新回复
 * @param {*} formData 表单数据
 */
const submitReply = async (formData, uploadHandle) => {
  if (formData.text == null || formData.text == "") {
    ElMessage.error("内容不能为空");
    return;
  }

  const images = await uploadHandle();

  let imagesFormat = "";
  if (images != null) {
    images.forEach((item) => {
      imagesFormat == ""
        ? (imagesFormat = item.replace(/[\[\]\"]/g, ""))
        : (imagesFormat += "," + item.replace(/[\[\]\"]/g, ""));
    });
  }
  formData = {
    ...formData,
    images: imagesFormat == "" ? null : imagesFormat,
    deskId: deskId.value,
    deskSecondId: deskSecondId.value,
    deskType: deskType.value,
  };
  const res = await replyApi.addReply(formData);
  console.log(res);
  if (res.code == 200) {
    res.data = {
      ...res.data,
      nickname: userStore.user.nickname,
      createTime: "片刻之前",
      text: textWraFormat(res.data.text),
      secondReplies: [],
      likes: 0,
      replies: 0,
      collects: 0,
      likeStatus: 0,
      collectStatus: 0,
      avatar: userStore.user.avatar,
      images: imagesFormat == '' ? [''] : imagesFormat.split(','),
    };
    if (res.data.deskType == 1) {
      console.log(replyData.value)
      replyData.value.push(res.data);
      console.log(replyData.value)

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

// 帖子信息
const postData = ref([]);

/**
 * 获取帖子信息
 * @param {*} id 帖子id
 */
const getPostData = async (id) => {
  const { data } = await postApi.getPostByPostId(id);

  data.text = textWraFormat(data.text);
  data.createTime = timeFormat.getFormateTime(data.createTime);
  data.updateTime = timeFormat.getFormateTime(data.updateTime);
  data.images = data.images.split(",");
  postData.value.push(data);

  console.log("帖子信息", postData.value);
};

// 回复信息
const replyData = ref([]);

/**
 * 获取回复信息
 * @param {*} postId 帖子ID
 */
const getReplyData = async (postId) => {
  const { data } = await replyApi.getReplyByPostId(postId);
  console.log("帖子回复:", data);
  if (data != null) {
    replyData.value = data;
    replyData.value.forEach((data) => {
      data.text = textWraFormat(data.text);
      data.createTime = timeFormat.getFormateTime(data.createTime);
      data.updateTime = timeFormat.getFormateTime(data.updateTime);
      data.images = data.images.split(",");
      data.secondReplies.forEach((sr) => {
        sr.createTime = timeFormat.getFormateTime(sr.createTime);
        sr.updateTime = timeFormat.getFormateTime(sr.updateTime);
      });
    });
    replyData.value.reverse();
  }
  isLoding.value = false;

  nextTick(() => {
    console.log(swiperRef.value.offsetHeight);
    imageRef.value.forEach((item) => {
      item.style.height = swiperRef.value.offsetHeight + 'px';
    });
  });
};

/**
 * 修改点赞状态
 * @param {*} index 帖子在数组中的下标
 */
const changeLikeStatus = async (deskId, deskType, likeStatus) => {
  // 修改对象为帖子
  if (deskType == 1) {
    if (likeStatus == 0 || likeStatus == null) {
      const res = await postApi.likePost(deskId);
      ElMessage({
        message: res.data,
        type: "success",
        grouping: true,
      });

      postData.value[0].likeStatus = 1;
      postData.value[0].likes++;
    } else {
      const res = await postApi.unlikePost(deskId);
      ElMessage({
        message: res.data,
        type: "success",
        grouping: true,
      });
      postData.value[0].likeStatus = 0;
      postData.value[0].likes--;
    }
  }
  // 修改对象为回复
  else if (deskType == 2) {
    if (likeStatus == 0 || likeStatus == null) {
      const res = await replyApi.likeReply(deskId);
      ElMessage({
        message: res.data,
        type: "success",
        grouping: true,
      });
      const reply = replyData.value.find((item) => item.id == deskId);
      if (reply != null) {
        reply.likeStatus = 1;
        reply.likes++;
      }
    } else {
      const res = await replyApi.unlikeReply(deskId);
      ElMessage({
        message: res.data,
        type: "success",
        grouping: true,
      });
      const reply = replyData.value.find((item) => item.id == deskId);
      if (reply != null) {
        reply.likeStatus = 0;
        reply.likes--;
      }
    }
  }
};

const textWraFormat = (text) => {
  return text.replace(/\n/g, "<br>");
};

const contentRef = ref(null);
onMounted(async () => {
  await getPostData(parseInt(props.id));
  await getReplyData(parseInt(props.id));
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  height: 100%;
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  /* display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center; */
}
</style>
