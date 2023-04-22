<!--
 * @Author: 黄叶
 * @Date: 2023-04-14 09:23:55
 * @LastEditTime: 2023-04-21 20:31:31
 * @FilePath: /schoolWall/src/views/post/components/replyBox.vue
 * @Description: 
-->
<template>
  <div>
    <contentBox :content-data="replyData" :click-func="() => {}" />
  </div>
</template>

<script setup>
import replyApi from "../../../api/reply";
import { ref, onMounted } from "vue";
import contentBox from "../../../components/contentBox.vue";

const props = defineProps({
  id: Number,
});

const replyData = ref();
const getReplyData = async (id) => {
  const { data } = await replyApi.getByPostId(id)
  replyData.value = data;
};

onMounted(() => {
  getReplyData(parseInt(props.id));
});
</script>
