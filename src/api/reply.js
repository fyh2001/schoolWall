/*
 * @Author: 黄叶
 * @Date: 2023-04-19 23:39:57
 * @LastEditTime: 2023-06-01 16:57:56
 * @FilePath: /schoolWall/src/api/reply.js
 * @Description:
 */
import request from "../utils/axios";

export default {
  baseURL: "/reply",

  /**
   * 添加回复
   * @param {*} reply 回复
   * @returns 添加结果
   */
  addReply(reply){
    return request({
      method: "POST",
      url: `${this.baseURL}/addReply`,
      data: reply
    });
  },
  /**
   * 根据帖子ID获取回复列表
   * @param {*} postId 帖子ID
   * @returns 回复列表
   */
  getReplyByPostId(postId) {
    return request({
      method: "GET",
      url: `${this.baseURL}/getReplyByPostId?postId=${postId}`,
    });
  },
  /**
   * 根据回复ID获取回复详情
   * @param {*} replyId 回复ID
   * @returns 
   */
  getReplyByReplyId(replyId) {
    return request({
      method: "GET",
      url: `${this.baseURL}/getReplyByReplyId?replyId=${replyId}`,
    })
  },
  /**
   * 根据回复ID获取二级回复列表
   * @param {*} replyId 回复ID
   * @returns 回复详情
   */
  getSecondReplyByReplyId(replyId) {
    return request({
      method: "GET",
      url: `${this.baseURL}/getSecondReplyByReplyId?replyId=${replyId}`,
    });
  },
  /**
   * 点赞回复
   * @param {*} replyId 回复ID
   * @returns 点赞结果
   */
  likeReply(replyId) {
    return request({
      method: "POST",
      url: `${this.baseURL}/likeReply`,
      data: replyId
    });
  },
  /**
   * 取消点赞回复
   * @param {*} replyId 回复ID
   * @returns 取消点赞结果
   */
  unlikeReply(replyId) {
    return request({
      method: "POST",
      url: `${this.baseURL}/unlikeReply`,
      data: replyId
    });
  },
};
