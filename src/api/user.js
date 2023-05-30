/*
 * @Author: 黄叶
 * @Date: 2023-04-19 23:31:47
 * @LastEditTime: 2023-05-29 22:29:38
 * @FilePath: /schoolWall/src/api/user.js
 * @Description:
 */
import request from "../utils/axios";

export default {
  baseURL: "/user",
  /**
   * 用户登录
   * @param {*} user 用户信息
   * @returns 登录结果
   */
  login(user){
    return request({
      method: "POST",
      url: `${this.baseURL}/login`,
      data: user
    });
  },
  /**
   * 用户注册
   * @param {*} user 用户信息
   * @returns 注册结果
   */
  register(user){
    return request({
      method: "POST",
      url: `${this.baseURL}/register`,
      data: user
    });
  }

}
