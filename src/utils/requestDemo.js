/*
 * @Author: 黄叶
 * @Date: 2023-04-18 22:37:01
 * @LastEditTime: 2023-04-19 00:39:23
 * @FilePath: /schoolWall/src/api/index.js
 * @Description: 
 */
/**
 * @typedef {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} HttpMethod
 */

// 配置
const config = {
  baseUrl: "http://127.0.0.1:8080",
};

// 请求拦截器
const requestInterceptor = (requestInit) => {
  // 获取本地token
  // 如果有token，添加到请求头中
  requestInit.headers.Annotation = "xxxxxxxx";
  // 否则跳转到登录页面
  return requestInit;
};

// 响应拦截器
const responseInterceptor = (data) => {
  return data;
};

/**
 * @param {string} url 请求链接
 * @param {HttpMethod} method 请求方法
 * @param {object} data 请求参数
 */
export function request(url, method = "GET", data = null) {
  let targetUrl = "";
  if (url.startsWith("http")) {
    targetUrl = url;
  } else {
    targetUrl = config.baseUrl + url.startsWith("/") ? "" : "/" + url;
  }

  console.log("targetUrl", targetUrl);

  return new Promise((resolve, reject) => {
    let requestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method == 'GET' ? undefined : JSON.stringify(data),
    };

    requestInit = requestInterceptor(requestInit);

    fetch(targetUrl, requestInit)
      .then((res) => {
        res.json();
      }, reject)
      .then((res) => {
        res = responseInterceptor(res);
        resolve(res);
      });
  });
}
