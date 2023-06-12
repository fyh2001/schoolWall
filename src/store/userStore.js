/*
 * @Author: 黄叶
 * @Date: 2023-04-24 12:14:35
 * @LastEditTime: 2023-06-12 18:47:58
 * @FilePath: /schoolWall/src/store/userStore.js
 * @Description:
 */
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => ({
    user: {
      userId: null, // 用户id
      email: "", // 邮箱
      phone: "", // 手机号
      nickname: "", // 昵称
      gender: null, // 性别
      avatar: "", // 头像
      signature: "", // 个性签名
      background: "", // 个人主页背景图
      diyBackground: "", // 自定义背景图
    },
  }),
  actions: {
    /**
     * 更新用户信息
     * @param {*} object 用户信息
     */
    update(object){
      Object.keys(object).forEach((key) => {
        this.user[key] = object[key];
      })
    },
    /**
     * 删除用户
     */
    deleteUser() {
      this.user = {
        userId: null, // 用户id
        email: "", // 邮箱
        phone: "", // 手机号
        nickname: "", // 昵称
        gender: null, // 性别
        avatar: "", // 头像
        background: "", // 个人主页背景图
        diyBackground: "", // 自定义背景图
      };
    },
  },
});
