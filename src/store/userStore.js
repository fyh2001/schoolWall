/*
 * @Author: 黄叶
 * @Date: 2023-04-24 12:14:35
 * @LastEditTime: 2023-04-26 16:55:36
 * @FilePath: /schoolWall/src/store/userStore.js
 * @Description:
 */
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => ({
    user: {
      userId: 0,
      username: "",
      nickname: "",
    },
  }),

  actions: {
    // updataUser(user) {
    //     this.user.userId = user.userId,
    //     this.user.username = user.username,
    //     this.user.nickname = user.nickname
    // },
    updataUser(user) {
      this.user = user
  },
  },
});
