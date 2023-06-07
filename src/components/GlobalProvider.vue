<!--
 * @Author: 黄叶
 * @Date: 2023-05-04 21:26:45
 * @LastEditTime: 2023-06-06 03:52:55
 * @FilePath: /schoolWall/src/components/GlobalProvider.vue
 * @Description: 
-->
<template>
  <div>
    <n-config-provider preflight-style-disabled>
      <n-message-provider>
        <n-dialog-provider>
          <slot></slot>
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script>
import { createDiscreteApi } from "naive-ui";
import { defineComponent } from "vue";

const { message, notification, dialog, loadingBar } = createDiscreteApi([
  "message",
  "dialog",
  "notification",
  "loadingBar",
]);

window.$message = message;
window.$notification = notification;
window.$dialog = dialog;
window.$loadingBar = loadingBar;

export default defineComponent({});
</script>
