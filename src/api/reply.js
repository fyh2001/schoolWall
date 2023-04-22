/*
 * @Author: 黄叶
 * @Date: 2023-04-19 23:39:57
 * @LastEditTime: 2023-04-22 04:29:15
 * @FilePath: /schoolWall/src/api/reply.js
 * @Description: 
 */
import request from "../utils/axios"

const replyApi = {}

replyApi.add = (data) => {
    return request({
        method: "POST",
        url: "/reply/add",
        data
    })
}

replyApi.getByPostId = (id) => {
    return request({
        method: 'GET',
        url: `/reply/getByPostId?id=${id}`
    })
}

replyApi.giveLike = (replyId) => {
    return request({
        method: "POST",
        url: `/reply/giveLike?replyId=${replyId}`
    })
}

replyApi.cancelLike = (replyId) => {
    return request({
        method: "POST",
        url: `/reply/cancelLike?replyId=${replyId}`
    })
}
export default replyApi