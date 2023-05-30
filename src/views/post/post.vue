<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 10:53:29
 * @LastEditTime: 2023-05-31 00:23:42
 * @FilePath: /schoolWall/src/views/post/post.vue
 * @Description: 
-->
<template>
  <div class="min-h-screen bg-white overflow-hidden" v-if="isLoding">
    <DeTopTabbar :data="postData" />
    <Swiper
      :modules="[Pagination]"
      :slides-per-view="1"
      :loop="true"
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
    >
      <SwiperSlide v-for="(data, index) in postData[0].imageUrl">
        <img
          class="max-w-full max-h-120"
          :src="imageBaseUrl + data"
          style="object-fit: cover"
        />
      </SwiperSlide>
    </Swiper>
    <div class="p-4">
      <div class="mt-2">
        <div class="text-4">{{ postData[0].text }}</div>
      </div>

      <div class="my-5 w-screen border-t" />

      <DeContentBox
        :post-user-id="postData[0].userId"
        :content-data="replyData"
        @changeSelectedTabsIndex="(index) => (selectedTabsIndex = index)"
        @changeLikeStatus="changeLikeStatus"
        @showFormEditBoxByDeskTypeIs2="showFormEditBoxHandleByReplyToReply"
        @showFormEditBoxByDeskTypeIs3="showFormEditBoxHandleByReplyToReply2"
      />

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

const userStore = useUserStore();
const imageBaseUrl = config.baseURL + "/file/download?imagesNames=";

const props = defineProps({
  id: String,
});

/**
 * 回复tabs的当前下标
 */
const selectedTabsIndex = ref(0);

const isLoding = ref(false);

// 是否显示回复编辑框
const isShowFormEditBox = ref(false);

/**
 * 显示回复编辑框(回复帖子)
 */
const showFormEditBoxHandleByReplyToPost = () => {
  deskId.value = parseInt(props.id);
  deskSecondId.value = null
  deskType.value = 1;
  isShowFormEditBox.value = true;
};

/**
 * 显示回复编辑框(回复评论)
 * @param {*} deskId 评论id
 */
const showFormEditBoxHandleByReplyToReply = (id) => {
  deskId.value = id;
  deskSecondId.value = null
  deskType.value = 2;
  isShowFormEditBox.value = true;
};

const showFormEditBoxHandleByReplyToReply2 = (desk, deskSecond) => {
  deskId.value = desk;
  deskSecondId.value = deskSecond
  deskType.value = 3;
  isShowFormEditBox.value = true;
}

const deskId = ref(null);
const deskSecondId = ref(null)
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

    console.log(images);
  }
  formData = {
    ...formData,
    images: imagesFormat == "" ? null : imagesFormat,
    deskId: deskId.value,
    deskSecondId: deskSecondId.value,
    deskType: deskType.value,
  };

  console.log(formData);
  const res = await replyApi.addReply(formData);
  if (res.code == 200) {
    res.data = {
      ...res.data,
      nickname: userStore.user.nickname,
      likes: 0,
      createTime: "片刻之前",
      text: textWraFormat(res.data.text),
      images: imagesFormat.split(","),
    };
    if(deskType.value == 1){
      replyData.value.push(res.data);
    }else{
      replyData.value.forEach((item, index) => {
        if(item.id == deskId.value){
          item.secondReplies.unshift(res.data)
        }
      })
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
  postData.value.push(data);
  isLoding.value = true;
  console.log(postData.value);
};

// 回复信息
const replyData = ref([]);

/**
 * 获取回复信息
 * @param {*} postId 帖子ID
 */
const getReplyData = async (postId) => {
  const { data } = await replyApi.getReplyByPostId(postId);
  console.log(data);
  if (data.length > 0) {
    replyData.value = data;
    replyData.value.forEach((data) => {
      data.text = textWraFormat(data.text);
      data.createTime = timeFormat.getFormateTime(data.createTime);
      data.updateTime = timeFormat.getFormateTime(data.updateTime);
      data.images = data.images.split(",");
    });
    replyData.value.reverse();
  }
};

/**
 * 修改点赞状态
 * @param {*} index 帖子在数组中的下标
 */
const changeLikeStatus = async (deskId, deskType, likeStatus) => {
  // 修改对象为帖子
  if (deskType == 1){
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
  else if(deskType == 2){
    if(likeStatus == 0 || likeStatus == null){
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
    }else{
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

onMounted(() => {
  getPostData(parseInt(props.id));
  getReplyData(parseInt(props.id));
});
</script>

<style scoped>
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
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
  align-items: center;
}
</style>
