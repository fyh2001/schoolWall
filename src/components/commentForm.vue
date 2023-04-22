<template>
  <div>
    <div
      class="p-2 pb-4 rounded-xl shadow-sm bg-white bg-opacity-65 backdrop-blur-30"
    >
      <div class="p-3 rounded-md bg-white">
        <el-input
          v-model="textContent"
          autosize
          resize="none"
          type="textarea"
          maxlength="500"
          :placeholder="placeholder"
          style="font-size: 15px"
          @input="() => (textareaLength = textContent.length)"
        />
        <div class="flex justify-between pt-2">
          <img
            class="w-25px h-25px"
            v-for="(data, index) in emoji"
            :src="data.url"
            :key="index"
          />
          <img src="../../dist/icon/smile-circle-outline.svg" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="flex">
            <img
              class="w-24px h-24px mr-4"
              src="../../dist/icon/baseline-camera-alt.svg"
            />
            <img
              class="w-24px h-24px mr-4"
              src="../../dist/icon/topic-discussion.svg"
            />
          </div>
          <div>
            <div>{{ textareaLength }}/500</div>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <div class="flex items-center px-2">
          <div>黄叶</div>
          <img
            src="../../dist/icon/edit.svg"
            style="width: 16px; height: 16px; margin-left: 0.5rem"
          />
        </div>
        <div style="display: flex; align-items: center">
          <el-switch
            v-model="isAnonymous"
            class="ml-2"
            style="--el-switch-on-color: #e8a65c; --el-switch-off-color: "
            size="large"
            inline-prompt
            active-text="已匿名"
            inactive-text="未匿名"
          />
          <!-- <text
            :style="isAnonymous ? 'color: green' : ''"
            @click="
              () => {
                isAnonymous = !isAnonymous;
              }
            "
            >{{ isAnonymous ? "已匿名" : "未匿名" }}</text
          > -->
          <button w-15 h-8 ml-4 rounded-3 bg-green text-white @click="submit">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  buttonText: {
    type: String,
    default: "发布",
  },
  placeholder: {
    type: String,
    default: "善语结善缘, 恶言伤人心",
  },

  /**
   * 提交的数据类型: post | reply
   */
  submissionType: String,

  /**
   * 当submissionType为reply时，需传入postId
   */
  postId: String,

  /**
   *  提交按钮所绑定的函数
   */
  buttonFunc: Function,
});
// 是否匿名
const isAnonymous = ref(false);

// 输入框内文字更新
const textContent = ref("");
const textareaLength = ref(0);

const submit = () => {
  if (props.submissionType == "post") {
    const formData = {
      anonymous: isAnonymous.value ? 1 : 0,
      text: textContent.value,
    };
    props.buttonFunc(formData);
  } else if (props.submissionType == "reply") {
    const formData = {
      postId: parseInt(props.postId),
      anonymous: isAnonymous.value ? 1 : 0,
      text: textContent.value,
      // targetReplyId: 
    }
    props.buttonFunc(formData)
  }
};

const style = ref("border-color: red;");

const emoji = [
  {
    url: "/dist/icon/emoji.jpg",
  },
  {
    url: "/dist/icon/emoji2.jpg",
  },
  {
    url: "/dist/icon/emoji3.jpg",
  },
  {
    url: "/dist/icon/emoji4.jpg",
  },
  {
    url: "/dist/icon/emoji5.jpg",
  },
  {
    url: "/dist/icon/emoji6.jpg",
  },
  {
    url: "/dist/icon/emoji7.jpg",
  },
  {
    url: "/dist/icon/emoji8.jpg",
  },
  {
    url: "/dist/icon/emoji9.jpg",
  },
];
</script>

<style></style>
