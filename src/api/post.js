/*
 * @Author: 黄叶
 * @Date: 2023-04-19 23:39:53
 * @LastEditTime: 2023-04-29 13:32:34
 * @FilePath: /schoolWall/src/api/post.js
 * @Description:
 */
import request from "../utils/axios";

const postApi = {};

/**
 * 获取所有帖子信息
 */
postApi.getAll = () => {
  return request({
    method: "GET",
    url: "/post/getAll",
  });
};

/**
 * 通过帖子id获取帖子信息
 * @param {number} postId 
 * @returns 
 */
postApi.getByPostId = (postId) => {
  return request({
    method: "GET",
    url: `/post/getByPostId?postId=${postId}`,
  });
};

/**
 * 发布帖子
 * @param {Post} data 
 * @returns 
 */
postApi.add = (data) => {
  return request({
    method: "POST",
    url: "/post/add",
    data,
  });
};

/**
 * 根据帖子id给帖子点赞
 * @param {*} postId 帖子id
 * @returns 
 */
postApi.giveLike = (postId) => {
  return request({
    method: "POST",
    url: `/post/giveLike?postId=${postId}`,
  })
}

/**
 * 根据帖子id取消帖子点赞
 * @param {*} postId 帖子id
 * @returns 
 */
postApi.cancelLike = (postId) => {
  return request({
    method: "DELETE",
    url: `/post/cancelLike?postId=${postId}`,
  })
}

/**
 * 查询登录用户发的帖子
 * @returns 
 */
postApi.getByUserId = () => {
  return request({
    method: "GET",
    url: "/post/getByUserId"
  })
}

/**
 * 查询登录用户回复的帖子
 * @returns 
 */
postApi.getMyRepliedPosts = () => {
  return request({
    method: "GET",
    url: "/post/getMyRepliedPostsByUserId"
  })
}

/**
 * 查询登录用户点赞过的帖子
 * @returns 
 */
postApi.getLikedPostsByUserId = () => {
  return request({
    method: "GET",
    url: "/post/getLikedPostsByUserId"
  })
}
export default postApi;
