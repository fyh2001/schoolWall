/*
 * @Author: 黄叶
 * @Date: 2023-04-18 21:42:04
 * @LastEditTime: 2023-04-30 00:44:45
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
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)


//vue-router路由管理
import router from "./router/router";
app.use(router);

//Acro组件库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css'
app.use(ArcoVueIcon);

import AsyncComputed from 'vue-async-computed'
app.use(AsyncComputed)

app.mount("#app")
