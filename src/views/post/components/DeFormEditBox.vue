<template>
  <div @touchmove.prevent>
    <Transition name="window">
      <div
        class="fixed top-0 left-0 w-screen h-screen bg-gray-8 bg-opacity-20 z-9"
        v-if="show"
        @click="emit('close')"
      />
    </Transition>

    <Transition name="box">
      <div
        class="fixed left-0 bottom-0 w-full h-3/4 p-5 rounded-t-2xl bg-white z-10"
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
              minRows: 3,
              maxRows: 5,
            }"
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
            @onFinish="uploadHandle"
            @change="changeHandle"
          >
            点击上传
          </n-upload>
        </div>
        <div
          class="absolute bottom-0 left-0 flex justify-between items-center w-full h-10 p-4 border-t"
        >
          <!--  表情 -->
          <svg
            class="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                d="M10.25 10a1.25 1.25 0 1 0-2.499 0a1.25 1.25 0 0 0 2.499 0zm6 0a1.25 1.25 0 1 0-2.499 0a1.25 1.25 0 0 0 2.499 0zm-6.114 5.106a.75.75 0 0 0-.772 1.286c.767.46 1.72.67 2.636.67c.916 0 1.87-.21 2.636-.67a.75.75 0 1 0-.772-1.286c-.483.29-1.154.456-1.864.456c-.71 0-1.38-.166-1.864-.456zM22.002 12c0-5.524-4.478-10.002-10.002-10.002C6.476 1.998 2 6.476 2 12C1.999 17.523 6.476 22 12 22c5.524 0 10.002-4.478 10.002-10.001zM3.499 12a8.502 8.502 0 1 1 17.003 0a8.502 8.502 0 0 1-17.003 0z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <!--  图片 -->
          <n-upload
            class="w-7 h-7"
            :action="baseURL + '/file/upload'"
            accept="image/*"
            :default-upload="false"
          >
            <svg
              class="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 28 28"
            >
              <g fill="none">
                <path
                  d="M21.75 3A3.25 3.25 0 0 1 25 6.25v15.5A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V6.25A3.25 3.25 0 0 1 6.25 3h15.5zm.583 20.4l-7.807-7.68a.75.75 0 0 0-.968-.07l-.084.07l-7.808 7.68c.183.065.38.1.584.1h15.5c.204 0 .4-.035.583-.1l-7.807-7.68l7.807 7.68zM21.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v15.5c0 .208.036.408.103.593l7.82-7.692a2.25 2.25 0 0 1 3.026-.117l.129.117l7.82 7.692c.066-.185.102-.385.102-.593V6.25a1.75 1.75 0 0 0-1.75-1.75zm-3.25 3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5zm0 1.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </n-upload>
          <!--  @ -->
          <!-- <svg
              class="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
            >
              <path
                d="M16 3A12.92 12.92 0 0 0 3 16v1a13 13 0 0 0 13 13h7v-2h-7A11 11 0 0 1 5 17v-1A10.94 10.94 0 0 1 16 5a10.64 10.64 0 0 1 11 11c0 3.59-1.4 5-3.66 5c-1.58 0-2.34-1.29-2.34-3v-8h-2v1.94A3.84 3.84 0 0 0 15.5 10a5.48 5.48 0 0 0-5.5 5.44v2.12A5.48 5.48 0 0 0 15.5 23a4.28 4.28 0 0 0 4-2.46A4.35 4.35 0 0 0 23.41 23c3.07 0 5.59-2 5.59-7A12.72 12.72 0 0 0 16 3zm3 14.56a3.5 3.5 0 0 1-7 0v-2.12a3.5 3.5 0 0 1 7 0z"
                fill="currentColor"
              ></path>
            </svg> -->
          <!--  话题 -->
          <svg
            class="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 16 16"
          >
            <g fill="none">
              <path
                d="M6.992 2.592a.5.5 0 1 0-.984-.18L5.538 5H3.495a.5.5 0 0 0 0 1h1.86l-.728 4H2.5a.5.5 0 0 0 0 1h1.946l-.44 2.41a.5.5 0 0 0 .985.18L5.462 11h3.982l-.439 2.409a.5.5 0 0 0 .984.18l.472-2.59H12.5a.5.5 0 0 0 0-1h-1.857l.728-3.998H13.5a.5.5 0 1 0 0-1h-1.946l.439-2.409a.5.5 0 1 0-.984-.179l-.472 2.588H6.554l.438-2.41zM6.372 6h3.983L9.626 10H5.644l.728-4z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <!-- 更多 -->
          <!-- <svg
              class="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1024 1024"
            >
              <path
                d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"
                fill="currentColor"
              ></path>
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                fill="currentColor"
              ></path>
            </svg> -->
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import config from "../../../config/config";

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
