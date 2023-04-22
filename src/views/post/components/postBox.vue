<!--
 * @Author: 黄叶
 * @Date: 2023-04-14 09:04:11
 * @LastEditTime: 2023-04-21 20:48:40
 * @FilePath: /schoolWall/src/views/post/components/postBox.vue
 * @Description: 
-->
<template>
  <div>
    <contentBox :content-data="postData" :click-func="() => {}" />
  </div>
</template>

<script setup>
import postApi from "../../../api/post";
import { ref, onMounted } from "vue";
import contentBox from "../../../components/contentBox.vue";

const props = defineProps({
  id: Number,
});

const postData = ref([]);
const getPostData = async (id) => {
  const { data } = await postApi.getById(id)
  postData.value.push(data);
};

onMounted(() => {
  getPostData(parseInt(props.id));
});
</script>

<style lang="scss"></style>
