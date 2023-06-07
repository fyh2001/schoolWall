<!--
 * @Author: 黄叶
 * @Date: 2023-04-18 23:33:34
 * @LastEditTime: 2023-06-07 04:40:30
 * @FilePath: /schoolWall/src/views/index/index.vue
 * @Description: 
-->
<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component
          :is="Component"
          :key="$route.name"
        />
      </keep-alive>
      <component
        :is="Component"
        :key="$route.name"
        v-else
      />
    </router-view>
    
    

    <DeBottomTabBar
      :tabList="tabList"
      :selectIndex="tabbarIndex"
      @selectIndexchange="tabChange"
    />
    <!-- 防止底部栏遮挡 -->
    <div class="w-full h-12" />
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
    icon: 'solar:home-2-outline',
    selectedIcon: 'solar:home-2-bold',
    text: "首页",
    link: "/",
  },
  {
    icon: 'fluent:mail-read-28-regular',
    selectedIcon: 'fluent:mail-read-28-filled',
    text: "消息",
    link: "/message",
  },
  {
    icon: 'healthicons:person-outline',
    selectedIcon: 'healthicons:person',
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
