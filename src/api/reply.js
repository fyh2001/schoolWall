/*
 * @Author: 黄叶
 * @Date: 2023-04-19 23:39:57
 * @LastEditTime: 2023-04-29 13:34:14
 * @FilePath: /schoolWall/src/api/reply.js
 * @Description: 
 */
import request from "../utils/axios"

const replyApi = {}

/**
 * 发布新的回复
 * @param {*} data 
 * @returns 
 */
replyApi.add = (data) => {
    return request({
        method: "POST",
        url: "/reply/add",
        data
    })
}

/**
 * 通过帖子id获取所有回复
 * @param {*} postId 帖子id
 * @returns 
 */
replyApi.getByPostId = (postId) => {
    return request({
        method: 'GET',
        url: `/reply/getByPostId?postId=${postId}`
    })
}

/**
 * 给回复点赞
 * @param {*} replyId 回复id
 * @returns 
 */
replyApi.giveLike = (replyId) => {
    return request({
        method: "POST",
        url: `/reply/giveLike?replyId=${replyId}`
    })
}

/**
 * 给回复取消点赞
 * @param {*} replyId 回复id
 * @returns 
 */
replyApi.cancelLike = (replyId) => {
    return request({
        method: "DELETE",
        url: `/reply/cancelLike?replyId=${replyId}`
    })
}
export default replyApi