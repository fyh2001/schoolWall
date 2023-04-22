/*
 * @Author: 黄叶
 * @Date: 2023-04-18 21:42:04
 * @LastEditTime: 2023-04-19 19:55:38
 * @FilePath: /schoolWall/src/main.js
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// UnoCSS
import "@unocss/reset/tailwind.css";
import 'uno.css'


// pinia全局状态管理
import { createPinia } from 'pinia'
app.use(createPinia())

//vue-router路由管理
import router from "./router/router";
app.use(router);

//Acro组件库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css'
app.use(ArcoVueIcon);

app.mount("#app")
