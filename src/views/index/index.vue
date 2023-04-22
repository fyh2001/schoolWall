<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 23:33:34
 * @LastEditTime: 2023-04-22 02:28:47
 * @FilePath: /schoolWall/src/views/index/index.vue
 * @Description: 
-->

<template>
  <div class="p-4 overflow-hidden">
    <commentForm class="block mb-4" :button-func="submit" />
    <DeTabs class="block mb-4" :list="tabList" />
    <search class="block mb-4" />
    <contentBox
      :content-data="postsData"
      type-of-display="post"
      @changeLikeStatusIndex="changeLikeStatus"
    />
  </div>
</template>

<script setup>
import timeFormat from "../../utils/timeFormat";
import postApi from "../../api/post";
import commentForm from "../../components/commentForm.vue";
import contentBox from "../../components/contentBox.vue";
import DeTabs from "../../components/DeTabs.vue";
import tabs from "../../components/tabs.vue";
import search from "../../components/search.vue";
import { ref, onMounted } from "vue";

const tabList = ["我发", "我回", "我赞", "新回", "新发", "精选", "热榜"];

/**
 * 发布新帖子
 * @param {*} formData 表单数据
 * @param
 */
const submit = async (formData) => {
  if (formData.text != "") {
    const res = await postApi.add(formData);
    if (res.code == 1) {
      res.data.nickname = "黄叶";
      res.data.likes = 0;
      res.data.replies = 0;
      res.data.createTime = "片刻之前"
      res.data.text = textWraFormat(res.data.text);
      postsData.value.unshift(res.data);
    }
  }
};

/**
 * 帖子数据
 */
const postsData = ref([]);
const getPostData = async () => {
  const { data } = await postApi.getAll();
  postsData.value = data;
  postsData.value.reverse();
  postsData.value.forEach((data) => {
    data.text = textWraFormat(data.text);
    data.createTime = timeFormat.getFormateTime(data.createTime);
  });
};

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
const textWraFormat = (text) => {
  return text.replace(/\n/g, "<br>");
};

getPostData();
onMounted(() => {});
</script>
