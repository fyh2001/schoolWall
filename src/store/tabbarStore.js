/*
 * @Author: 黄叶
 * @Date: 2023-06-08 01:09:35
 * @LastEditTime: 2023-06-08 01:28:04
 * @FilePath: /schoolWall/src/store/tabbarStore.js
 * @Description:
 */
import { defineStore } from "pinia";

export const useTabbarStore = defineStore("tabbar", {
  persist: {
    enabled: true,
    storage: sessionStorage, //窗口关闭后清除
  },
  state: () => ({
    tabsSelectIndex: 0,
  }),
  actions: {
    updateTabsSelectIndex(index) {
      this.tabsSelectIndex = index;
    },
  },
});
