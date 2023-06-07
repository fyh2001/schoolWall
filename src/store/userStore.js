/*
 * @Author: 黄叶
 * @Date: 2023-04-24 12:14:35
 * @LastEditTime: 2023-06-07 09:24:37
 * @FilePath: /schoolWall/src/store/userStore.js
 * @Description:
 */
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => ({
    user: {
      userId: 0, // 用户id
      email: "", // 邮箱
      phone: "", // 手机号
      nickname: "", // 昵称
      gender: null, // 性别
      avatar: "", // 头像
      background: "", // 个人主页背景图
    },
  }),
  actions: {
    /**
     * 更新用户信息
     * @param {*} user 用户信息
     */
    updateUser(user) {
      this.user = user;
    },
    /**
     * 更新用户头像
     * @param {*} avatar 头像
     */
    updateAvatar(avatar) {
      this.user.avatar = avatar;
    },
    /**
     * 更新用户昵称
     * @param {*} nickname 昵称
     */
    updateNickname(nickname) {
      this.user.nickname = nickname;
    }
  },
});
