/*
 * @Author: 黄叶
 * @Date: 2023-04-19 23:39:53
 * @LastEditTime: 2023-05-30 00:26:43
 * @FilePath: /schoolWall/src/api/post.js
 * @Description:
 */
import request from "../utils/axios";

export default {
  baseURL: "/post",
  /**
   * 发布帖子
   * @param {*} post 帖子信息
   * @returns 发布结果
   */
  addPost(post){
    return request({
      method: "POST",
      url: `${this.baseURL}/addPost`,
      data: post
    });
  },
  /**
   * 获取所有帖子信息(未登录)
   * @returns 帖子列表
   */
  getAllPost() {
    return request({
      method: "GET",
      url: `${this.baseURL}/getAllPost`,
    });
  },
  /**
   * 获取所有帖子信息(已登录)
   * @returns 帖子列表
   */
  getAllPostByLogin() {
    return request({
      method: "GET",
      url: `${this.baseURL}/getAllPostByLogin`,
    });
  },
  /**
   * 根据帖子ID获取帖子详情
   * @param {*} postId 帖子ID
   * @returns 帖子详情
   */
  getPostByPostId(postId) {
    return request({
      method: "GET",
      url: `${this.baseURL}/getPostByPostId?postId=${postId}`,
    });
  },
  /**
   * 根据用户ID获取帖子列表
   * @param {*} userId 用户ID
   * @returns 帖子列表
   */
  getPostByUserId(userId) {
    return request({
      method: "GET",
      url: `${this.baseURL}/getPostByUserId?userId=${userId}`,
    });
  },
  /**
   * 根据已登录用户ID获取帖子列表
   * @returns 帖子列表
   */
  getPostByLoginUserId() {
    return request({
      method: "GET",
      url: `${this.baseURL}/getPostByLoginUserId`,
    });
  },
  /**
   * 根据已登录用户ID获取点赞的帖子列表
   * @returns 帖子列表
   */
  getLikedPostsByUserId() {
    return request({
      method: "GET",
      url: `${this.baseURL}/getLikedPostsByUserId`,
    });
  },
  /**
   * 根据已登录用户ID获取回复的帖子列表
   * @returns 帖子列表
   */
  getRepliedPostsByUserId() {
    return request({
      method: "GET",
      url: `${this.baseURL}/getRepliedPostsByUserId`,
    });
  },
  /**
   * 给帖子点赞
   * @param {*} postId 帖子ID
   * @returns 点赞结果
   */
  likePost(postId) {
    return request({
      method: "POST",
      url: `${this.baseURL}/likePost`,
      data: postId
    });
  },
  /**
   * 取消给帖子点赞
   * @param {*} postId 帖子ID
   * @returns 取消点赞结果
   */
  unlikePost(postId) {
    return request({
      method: "POST",
      url: `${this.baseURL}/unlikePost`,
      data: postId
    });
  },
  /**
   * 收藏帖子
   * @param {*} postId 帖子ID
   * @returns 收藏结果
   */
  collectPost(postId) {
    return request({
      method: "POST",
      url: `${this.baseURL}/collectPost`,
      data: postId
    });
  },
  /**
   * 取消收藏帖子
   * @param {*} postId 帖子ID
   * @returns 取消收藏结果
   */
  unCollectPost(postId) {
    return request({
      method: "POST",
      url: `${this.baseURL}/unCollectPost`,
      data: postId
    });
  },
};
