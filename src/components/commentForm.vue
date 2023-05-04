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
        <div class="flex flex-row-reverse relative justify-between pt-2">
          <!-- <div
            class="text-6"
            v-for="(data, index) in emojiData.slice(0, 8)"
            @click="addEmoji(index)"
          >
            {{ data }}
          </div> -->
          <img
            ref="smile"
            class="mr-4"
            src="../../public/icon/smile-circle-outline-f8eee911.svg"
            @click="changeEmojiShow"
          />
          <!-- <EmojiPicker
            class="absolute z-10"
            :style="`left: ${emojiPickerPosition.left}px; top: ${emojiPickerPosition.top}px`"
            v-if="emojiShow"
            @emoji_click="addEmoji"
          /> -->
        </div>
        <div class="flex mt-4 justify-between">
          <div class="flex">
            <img
              class="w-24px h-24px mr-4"
              src="../../public/icon/baseline-camera-alt-3611b9c9.svg"
            />
            <img
              class="w-24px h-24px mr-4"
              src="../../public/icon/topic-discussion-3b9a2db1.svg"
            />
          </div>
          <div>
            <div>{{ textareaLength }}/500</div>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <div class="flex items-center px-2">
          <div>{{ userStore.user.nickname }}</div>
          <img
            src="../../public/icon/edit-007cc8d7.svg"
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
          <button w-15 h-8 ml-4 rounded-3 bg-green text-white @click="emit('submit', formDataHandle())" >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import emoji from "../utils/emoji";
import EmojiPicker from "./emoji/EmojiPicker.vue";
import { useUserStore } from "../store/userStore";
import { ref, computed, onMounted, watch } from "vue";

const userStore = useUserStore();

const emit = defineEmits(["submit"]);

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

const emojiShow = ref(false);
const smile = ref();
const emojiPickerPosition = ref({
  top: 25 + 15,
  left: 0,
});

const changeEmojiShow = () => {
  // emojiPickerPosition.value.top =
  //   smile.value.offsetTop + smile.value.clientHeight;
  // emojiPickerPosition.value.left =
  //   smile.value.offsetLeft + smile.value.clientWidth - 320 * 0.9;
  //   console.log(smile.value.clientHeight);
  // console.log(smile.value.clientWidth);
  emojiShow.value = !emojiShow.value;
};

// 是否匿名
const isAnonymous = ref(false);

// 输入框内文字更新
const textContent = ref("");
const textareaLength = ref(0);

const formDataHandle = () => {
  const data = {
    anonymous: isAnonymous.value ? 1 : 0,
    text: textContent.value,
  };
  return data;
}

const addEmoji = (emoji) => {
  // console.log(emojiData[index])
  console.log(textContent.value + emoji);

  textContent.value += emoji;
};

const submit = () => {
  if (props.submissionType == "post") {
    const formData = {
      anonymous: isAnonymous.value ? 1 : 0,
      text: textContent.value,
    };
    // 将参数传入，并接受返回来的状态码
    props.buttonFunc(formData).then((code) => {
      if (code == 1) textContent.value = " ";
    });
  } else if (props.submissionType == "reply") {
    const formData = {
      postId: parseInt(props.postId),
      anonymous: isAnonymous.value ? 1 : 0,
      text: textContent.value,
      // targetReplyId:
    };
    // 将参数传入，并接受返回来的状态码
    props.buttonFunc(formData).then((code) => {
      if (code == 1) textContent.value = " ";
    });
  }
};

onMounted(() => {});
</script>

<style scoped></style>
