<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 23:33:34
 * @LastEditTime: 2023-06-12 05:45:51
 * @FilePath: /schoolWall/src/views/index/index.vue
 * @Description: 
-->
<template>
  <div>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>
      <DeBottomTabBar
        :tabList="tabList"
        :selectIndex="tabbarStore.tabsSelectIndex"
        @selectIndexchange="tabChange"
      />
      <!-- 防止底部栏遮挡 -->
    <div class="w-full h-14" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import DeBottomTabBar from "../../components/newUI/DeBottomTabBar.vue";
import HomeOutline from "@vicons/ionicons5/HomeOutline";
import Home from "@vicons/ionicons5/Home";
import PersonOutline from "@vicons/ionicons5/PersonOutline";
import PersonSharp from "@vicons/ionicons5/PersonSharp";
import MarkChatUnreadOutlined from "@vicons/material/MarkChatUnreadOutlined";
import MarkChatUnreadRound from "@vicons/material/MarkChatUnreadRound";
import router from "../../router/router";
import { useTabbarStore } from "../../store/tabbarStore";

const tabbarStore = useTabbarStore();

const tabList = [
  {
    icon: "solar:home-2-outline",
    selectedIcon: "solar:home-2-bold",
    text: "首页",
    link: "/",
  },
  {
    icon: "fluent:mail-read-28-regular",
    selectedIcon: "fluent:mail-read-28-filled",
    text: "更新日志",
    link: "/updateLog",
  },
  {
    icon: "healthicons:person-outline",
    selectedIcon: "healthicons:person",
    text: "我",
    link: "/user",
  },
];

const tabbarIndex = ref(tabbarStore.tabsSelectIndex);
const tabChange = (index) => {
  tabbarStore.updateTabsSelectIndex(index);
  router.replace(tabList[index].link);
};

</script>
