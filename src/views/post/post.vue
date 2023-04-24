<!--
 * @Author: 黄叶
 * @Date: 2023-04-19 10:53:29
 * @LastEditTime: 2023-04-24 09:23:10
 * @FilePath: /schoolWall/src/views/post/post.vue
 * @Description: 
-->
<template>
  <div class="p-4 overflow-hidden">
    <Transition name="contentBox-post" appear>
      <contentBox
        class="block mb-4"
        :content-data="postData"
        type-of-display="post"
      />
    </Transition>
    <Transition name="commentForm" appear>
      <commentForm
        class="block mb-4"
        placeholder="回点什么呢~"
        button-text="评论"
        :button-func="submit"
        submission-type="reply"
        :post-id="id"
      />
    </Transition>
    <Transition name="DeTabs" appear>
      <DeTabs class="block mb-4" :list="['最新评论', '最早评论']" />
    </Transition>
    <Transition name="contentBox-reply" appear>
      <contentBox
        class="block mb-4"
        :content-data="replyToPostDataData"
        type-of-display="replyToPost"
        @change-like-status-index="changeLikeStatus"
      />
    </Transition>
  </div>
</template>

<script setup>
import DeTabs from "../../components/DeTabs.vue";
import commentForm from "../../components/commentForm.vue";
import contentBox from "../../components/contentBox.vue";
import postApi from "../../api/post";
import replyApi from "../../api/reply";
import timeFormat from "../../utils/timeFormat";
import { ref, onMounted } from "vue";

const props = defineProps({
  id: String,
});

/**
 * 发布新回复
 * @param {*} formData 表单数据
 * @param
 */
const submit = async (formData) => {
  if (formData.text != "") {
    const res = await replyApi.add(formData);
    console.log(res);
    if (res.code == 1) {
      res.data.nickname = "黄叶";
      res.data.likes = 0;
      res.data.createTime = "片刻之前";
      res.data.text = textWraFormat(res.data.text);
      replyToPostDataData.value.unshift(res.data);
    }
  }
};

// 帖子信息
const postData = ref([]);

/**
 * 获取帖子信息
 * @param {*} id 帖子id
 */
const getPostData = async (id) => {
  const { data } = await postApi.getById(id);
  data.text = textWraFormat(data.text);
  data.createTime = timeFormat.getFormateTime(data.createTime);
  postData.value.push(data);
};

// 回复信息
const replyToPostDataData = ref([]);

/**
 * 获取回复信息
 * @param {*} id 帖子id
 */
const getReplyToPostData = async (id) => {
  const { data } = await replyApi.getByPostId(id);
  console.log(data);
  if (data.length > 0) {
    replyToPostDataData.value = data;
    replyToPostDataData.value.forEach((data) => {
      data.text = textWraFormat(data.text);
      data.createTime = timeFormat.getFormateTime(data.createTime);
    });
    replyToPostDataData.value.reverse();
  }
};

/**
 * 修改点赞状态
 * @param {*} index 帖子在数组中的下标
 */
const changeLikeStatus = async (index) => {
  if (
    replyToPostDataData.value[index].likeStatus == 0 ||
    replyToPostDataData.value[index].likeStatus == null
  ) {
    const res = await replyApi.giveLike(replyToPostDataData.value[index].id);
    ElMessage({
      message: res.data,
      type: "success",
      grouping: true,
    });
    replyToPostDataData.value[index].likeStatus = 1;
    replyToPostDataData.value[index].likes++;
  } else {
    const res = await replyApi.cancelLike(replyToPostDataData.value[index].id);
    ElMessage({
      message: res.data,
      type: "success",
      grouping: true,
    });
    console.log(res);
    replyToPostDataData.value[index].likeStatus = 0;
    replyToPostDataData.value[index].likes--;
  }
};

const textWraFormat = (text) => {
  return text.replace(/\n/g, "<br>");
};

onMounted(() => {
  getPostData(parseInt(props.id));
  getReplyToPostData(parseInt(props.id));
});
</script>

<style contentBox>
.contentBox-post-enter-active,
.contentBox-post-leave-active {
  transition: all 0.3s ease;
}

.contentBox-post-enter-from,
.contentBox-post-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* ------------------------- */

.commentForm-enter-active,
.commentForm-leave-active {
  transition: all 0.4s ease;
}

.commentForm-enter-from,
.commentForm-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* ------------------------- */

.DeTabs-enter-active,
.DeTabs-leave-active {
  transition: all 0.5s ease;
}

.DeTabs-enter-from,
.DeTabs-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* ------------------------- */

.contentBox-reply-enter-active,
.contentBox-reply-leave-active {
  transition: all 0.6s ease;
}

.contentBox-reply-enter-from,
.contentBox-reply-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
