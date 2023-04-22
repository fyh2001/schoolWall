/*
 * @Author: 黄叶
 * @Date: 2023-04-19 23:31:47
 * @LastEditTime: 2023-04-22 02:16:02
 * @FilePath: /schoolWall/src/api/user.js
 * @Description:
 */
import request from "../utils/axios";

const userApi = {};

/**
 * 用户登录
 * @param {*} data 
 * @returns 
 */
userApi.login = (data) => {
  return request({
    method: "POST",
    url: "/user/login",
    data,
  });
};

/**
 * 用户注册
 * @param {*} data 
 * @returns 
 */
userApi.register = (data) => {
  return request({
    method: "POST",
    url: "/user/register",
    data
  })
}
export default userApi;
