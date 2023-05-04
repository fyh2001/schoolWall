<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 23:33:34
 * @LastEditTime: 2023-05-02 01:15:30
 * @FilePath: /schoolWall/src/views/index/index.vue
 * @Description: 
-->

<template>
  <div class="p-4 overflow-hidden">
    <Transition name="commentForm" appear>
      <commentForm
        class="block mb-4 z-10"
        submission-type="post"
        @submit="submitPost($event)"
      />
    </Transition>
    <Transition name="DeTabs" appear>
      <DeTabs
        class="sticky top-0 block mb-4"
        :list="tabList"
        :select-index="tabsSelectIndex"
        @change="tabsSelectIndex = $event"
      />
    </Transition>
    <!-- <Transition name="search" appear>
      <search class="block mb-4" />
    </Transition> -->
    <Transition name="contentBox" appear>
      <contentBox
        :content-data="postsData"
        type-of-display="post"
        @changeLikeStatusIndex="changeLikeStatus"
        @box-click="goToPostPage($event)"
      />
    </Transition>
  </div>
</template>

<script setup>
import timeFormat from "../../utils/timeFormat";
import postApi from "../../api/post";
import commentForm from "../../components/commentForm.vue";
import contentBox from "../../components/contentBox.vue";
import DeTabs from "../../components/DeTabs.vue";
import search from "../../components/search.vue";
import { useUserStore } from "../../store/userStore";
import { ref, onMounted, computed, watch } from "vue";
import { computedAsync } from "@vueuse/core";
import { onBeforeMount } from "vue";

const userStore = useUserStore();

const tabList = ["我发", "我回", "我赞", "新回", "新发", "精选", "热榜"];

/**
 * 帖子文本格式化
 * @param {*} text 帖子文本
 */
const textWraFormat = (text) => {
  return text.replace(/\n/g, "<br>");
};

/**
 * 帖子数据格式化
 */
const postDataFormat = (postData) => {
  postData.reverse();
  postData.forEach((data) => {
    data.text = textWraFormat(data.text);
    data.createTime = timeFormat.getFormateTime(data.createTime);
    data.updateTime = timeFormat.getFormateTime(data.updateTime);
  });

  return postData;
};

/**
 * 我发
 */
let userPostsData = null;
const getUserPosts = async () => {
  const res = await postApi.getByUserId();
  if (res.code == 1) {
    return postDataFormat(res.data);
  }
};

/**
 * 我回
 */
let userRepliedPostsData = null;
const getUserRepliedPosts = async () => {
  const res = await postApi.getMyRepliedPosts();
  if (res.code == 1) {
    return postDataFormat(res.data);
  }
};

/**
 * 我赞
 */
let userLikedPostsData = null;
const getUserLikedPosts = async () => {
  const res = await postApi.getLikedPostsByUserId();
  if (res.code == 1) {
    return postDataFormat(res.data);
  }
};

/**
 * 新回
 */
let latestRepliedPostData = null;
const getLatestRepliedPost = async () => {
  const res = await postApi.getAll();
  if (res.code == 1) {
    res.data.sort((pre, cur) => {
      return pre.updateTime - cur.updateTime;
    });
    return postDataFormat(res.data);
  }
};

/**
 * 新发
 */
let latestPostsData = null;
const getLatestPosts = async () => {
  const res = await postApi.getAll();
  if (res.code == 1) {
    return postDataFormat(res.data);
  }
};

/**
 * 帖子数据
 */
const postsData = ref();

//tabs下标
const tabsSelectIndex = ref(3);

watch(
  tabsSelectIndex,
  async (newIndex) => {
    switch (newIndex) {
      case 0:
        if (userPostsData != null) {
          postsData.value = userPostsData;
        } else {
          postsData.value = await getUserPosts();
          userPostsData = postsData.value;
        }
        break;
      case 1:
        if (userRepliedPostsData != null) {
          postsData.value = userRepliedPostsData;
        } else {
          postsData.value = await getUserRepliedPosts();
          userRepliedPostsData = postsData.value;
        }
        break;
      case 2:
        if (userLikedPostsData != null) {
          postsData.value = userLikedPostsData;
        } else {
          postsData.value = await getUserLikedPosts();
          userLikedPostsData = postsData.value;
        }
        break;
      case 3:
        if (latestRepliedPostData != null) {
          postsData.value = latestRepliedPostData;
        } else {
          postsData.value = await getLatestRepliedPost();
          latestRepliedPostData = postsData.value;
        }
        break;
      case 4:
        if (latestPostsData != null) {
          postsData.value = latestPostsData;
        } else {
          postsData.value = await getLatestPosts();
          latestPostsData = postsData.value;
        } 
        break;
    }
  },
  { immediate: true }
);

/**
 * 修改点赞状态
 * @param {*} index 帖子在数组中的下标
 */
const changeLikeStatus = async (index) => {
  if (
    postsData.value[index].likeStatus == 0 ||
    postsData.value[index].likeStatus == null
  ) {
    const res = await postApi.giveLike(postsData.value[index].id);
    ElMessage.success(res.data);
    postsData.value[index].likeStatus = 1;
    postsData.value[index].likes++;
  } else {
    const res = await postApi.cancelLike(postsData.value[index].id);
    ElMessage.success(res.data);
    console.log(res);
    postsData.value[index].likeStatus = 0;
    postsData.value[index].likes--;
  }
};

/**
 * 跳转到具体的帖子页面
 * @param {number} id 帖子id
 */
const goToPostPage = (id) => {
  if (localStorage.getItem("token") == null) {
    ElMessageBox.confirm("查看内容需要登录", "需要登录", {
      type: "warning", 
      confirmButtonText: "前往登录", 
      cancelButtonText: "我再看看", 
    })
      .then(() => {
        router.push("/login");
        return;
      })
      .catch(() => {});
  } else {
    router.push(`/post/${id}`);
  }
};

/**
 * 发布新帖子
 * @param {*} formData 表单数据
 */
const submitPost = async (formData) => {
  const res = await postApi.add(formData);
  console.log(res);
  if (res.code == 1) {
    res.data = {
      ...res.data,
      nickname: userStore.user.nickname,
      likes: 0,
      replies: 0,
      createTime: "片刻之前",
      text: textWraFormat(res.data.text),
    };
    tabsSelectIndex.value = 3;
    postsData.value.unshift(res.data);
    ElMessage.success("发布成功");
  } else {
    ElMessage.error("发布失败");
  }
};

onMounted(() => {});
onBeforeMount(() => {
  // tabsSelectIndex.value = 3;
});
</script>

<style scoped>
.commentForm-enter-active,
.commentForm-leave-active {
  transition: all 0.3s ease;
}

.commentForm-enter-from,
.commentForm-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
/* -------------------------- */

.DeTabs-enter-active,
.DeTabs-leave-active {
  transition: all 0.4s ease;
}

.DeTabs-enter-from,
.DeTabs-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* -------------------------- */

.search-enter-active,
.search-leave-active {
  transition: all 0.5s ease;
}

.search-enter-from,
.search-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* -------------------------- */

.contentBox-enter-active,
.contentBox-leave-active {
  transition: all 0.55s ease;
}

.contentBox-enter-from,
.contentBox-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
