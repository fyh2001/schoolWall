<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 23:33:34
 * @LastEditTime: 2023-05-31 00:17:54
 * @FilePath: /schoolWall/src/views/index/index.vue
 * @Description: 
-->
<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          :key="$route.name"
          v-if="$route.meta.keepAlive"
        />
      </keep-alive>
      <component
        :is="Component"
        :key="$route.name"
        v-if="!$route.meta.keepAlive"
      />
    </router-view>
     
    <DeBottomTabBar
      :tabList="tabList"
      :selectIndex="tabbarIndex"
      @selectIndexchange="tabChange"
    />
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


const tabList = [
  {
    icon: HomeOutline,
    selectedIcon: Home,
    text: "首页",
    link: "/",
  },
  {
    icon: MarkChatUnreadOutlined,
    selectedIcon: MarkChatUnreadRound,
    text: "消息",
    link: "/message",
  },
  {
    icon: PersonOutline,
    selectedIcon: PersonSharp,
    text: "我",
    link: "/user",
  },
];

const tabbarIndex = ref(0);
const tabChange = (index) => {
  tabbarIndex.value = index;
  router.replace(tabList[index].link);
};
</script>