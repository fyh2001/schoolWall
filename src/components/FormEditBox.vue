<!--
 * @Author: 黄叶
 * @Date: 2023-05-12 11:13:42
 * @LastEditTime: 2023-06-12 01:56:57
 * @FilePath: /schoolWall/src/components/FormEditBox.vue
 * @Description: 
-->
<template>
  <div>
    <transition name="window">
      <div
        @touchmove.prevent
        class="fixed top-0 left-0 w-screen h-screen bg-gray-8 bg-opacity-20 z-9"
        v-if="show"
        @click="emit('close')"
      />
    </transition>

    <transition name="box" >
      <div
        class="fixed left-0 bottom-0 w-full min-h-3/4 p-5 rounded-t-2xl bg-white z-10"
        v-if="show"
      >
        <div
          class="flex justify-between items-center mb-2"
          @click="emit('close')"
        >
          <svg
            class="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
          >
            <path
              d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z"
              fill="currentColor"
            ></path>
          </svg>
          <n-button
          style="sticky top-0 left-0"
            strong
            secondary
            round
            type="primary"
            @click="emit('submit', formDataHandle(), uploadHandle)"
          >
            发布
          </n-button>
        </div>
        <div>
          <n-input
            class="text-4"
            style="
              --n-border: none;
              --n-border-hover: none;
              --n-border-focus: none;
              --n-box-shadow-focus: none;
            "
            v-model:value="formData.text"
            placeholder="在这里编辑你的想法～"
            type="textarea"
            size="small"
            :autosize="{
              minRows: 10,
            }"
            maxlength="500"
          />
        </div>
        <div>
          <n-upload
            ref="upload"
            :action="baseURL + '/file/upload'"
            :headers="{
              Authorization: `${token}`,
            }"
            :default-file-list="fileList"
            list-type="image-card"
            accept="image/*"
            :default-upload="false"
            name="file"
            multiple
            :max="9"
            @onFinish="uploadHandle"
            @change="changeHandle"
          >
            点击上传
          </n-upload>
        </div>
        <!-- 防止底部遮挡 -->
        <div class="w-full h-10"/>
      </div>
    </transition>
  </div>
</template>

<script setup>
import config from "../config/config";

const token = localStorage.getItem("token");
const baseURL = config.baseURL;
const emit = defineEmits(["close", "submit", "fileFinished"]);
const props = defineProps({
  /**
   * 是否显示
   */
  show: Boolean,

  /**
   * 提交类型
   * post: 帖子
   * reply: 评论
   * reply2: 二级评论
   * @default post
   */
  submissionType: {
    type: String,
    default: "post",
  },

  /**
   * 帖子id
   */
  postId: Number,

  /**
   * 评论id
   */
  replyId: Number,
});

/**
 * 表单数据
 */
const formData = ref({
  anonymous: 0,
  text: "",
});

/**
 * 表单数据处理
 */
const formDataHandle = () => {
  const data = {
    text: formData.value.text,
  };
  return data;
};

/**
 * 上传图片
 */
const upload = ref(null);
const fileList = ref([]);
/**
 * 上传图片处理
 */

const fileListLength = ref(0);
const fileNamesList = ref([]);
async function uploadHandle() {
  upload.value?.submit();

  return await delay();
}

const delay = () => {
  return new Promise((resolve, reject) => {
    if (fileNamesList.value.length == fileListLength.value) {
      // console.log(fileNamesList.value)
      resolve(fileNamesList.value);
    } else {
      setTimeout(() => {
        delay().then(resolve).catch(reject);
      }, 100);
    }
  });
};

const changeHandle = (options) => {
  fileListLength.value = options.fileList.length;

  if (options.file.status == "finished") {
    fileNamesList.value.push(options.event.target.responseText);
  }
};
</script>

<style>
.n-input .n-input-wrapper {
  padding-left: 0;
  padding-right: 0;
}

.window-enter-active,
.window-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
}

.box-enter-active,
.box-leave-active {
  transition: transform 0.3s ease-in-out;
}

.box-enter-from,
.box-leave-to {
  transform: translateY(100%);
}
</style>
