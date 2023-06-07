/*
 * @Author: 黄叶
 * @Date: 2023-06-07 03:21:56
 * @LastEditTime: 2023-06-07 03:24:57
 * @FilePath: /schoolWall/src/utils/postDataFormat.js
 * @Description:
 */
import timeFormat from "./timeFormat";

export default {
  /**
   * 帖子文本格式化
   * @param {*} text 帖子文本
   */
  textWraFormat(text) {
    return text.replace(/\n/g, "<br>");
  },

  /**
   * 帖子数据格式化
   */
  postDataFormat(postData) {
    if (postData != null) {
      postData.reverse();
      postData.forEach((data) => {
        data.text = this.textWraFormat(data.text);
        data.createTime = timeFormat.getFormateTime(data.createTime);
        data.updateTime = timeFormat.getFormateTime(data.updateTime);
        data.images = data.images.split(",");
        if (data.isTop == 1) {
          postData.unshift(postData.splice(postData.indexOf(data), 1)[0]);
        }
      });
      console.log(postData);
    }
    return postData;
  },
};
