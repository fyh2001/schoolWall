/*
 * @Author: 黄叶
 * @Date: 2023-04-19 23:31:47
 * @LastEditTime: 2023-06-07 09:20:35
 * @FilePath: /schoolWall/src/api/user.js
 * @Description:
 */
import request from "../utils/axios";

export default {
  baseURL: "/user",

  /**
   * 手机登录或注册
   * @param {*} userLoginByPhone 手机号和验证码
   * @returns 登录结果
   */
  loginOrRegisterByPhone(userLoginByPhone) {
    return request({
      method: "POST",
      url: `${this.baseURL}/loginOrRegisterByPhone`,
      data: userLoginByPhone,
    });
  },
  /**
   * 邮箱登录或注册
   * @param {*} userLoginByMail 邮箱和验证码
   * @returns 登录结果
   */
  loginOrRegisterByMail(userLoginByMail){
    return request({
      method: "POST",
      url: `${this.baseURL}/loginOrRegisterByMail`,
      data: userLoginByMail,
    })
  },
  /**
   * 获取手机验证码
   * @param {*} phone 手机号
   * @returns 发送验证码结果
   */
  getPhoneCode(phone){
    return request({
      method: "POST",
      url: `${this.baseURL}/getPhoneCode`,
      data: {
        phone: phone,
      },
    })
  },
  /**
   * 获取邮箱验证码
   * @param {*} email 邮箱
   * @returns 发送验证码结果
   */
  getMailCode(email) {
    return request({
      method: "POST",
      url: `${this.baseURL}/getMailCode`,
      data: {
        email: email,
      },
    });
  },
  /**
   * 更新用户信息
   * @param {*} user 用户信息
   * @returns 更新结果
   */
  update(user) {
    return request({
      method: "PUT",
      url: `${this.baseURL}/update`,
      data: user,
    });
  },
  /**
   * 更新昵称
   * @param {*} nickname 昵称
   * @returns 更新结果
   */
  updateNickname(nickname){
    return request({
      method: "PUT",
      url: `${this.baseURL}/updateNickname`,
      data: nickname
    })
  },
  /**
   * 根据用户id获取用户信息
   * @param {*} userId 用户id
   * @returns 用户信息
   */
  getUserByUserId(userId){
    return request({
      method: "GET",
      url: `${this.baseURL}/getUserByUserId?userId=${userId}`
    })
  }
};
