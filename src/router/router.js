/*
 * @Author: 黄叶
 * @Date: 2023-04-18 23:10:07
 * @LastEditTime: 2023-04-30 16:43:33
 * @FilePath: /schoolWall/src/router/router.js
 * @Description: 
 */
import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/index/index.vue"
import Post from "../views/post/post.vue"
import User from "../views/user/user.vue"
import Register from "../views/user/register/register.vue"
import Login from "../views/user/login/login.vue"

import Test from "../views/test/test.vue"

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/post/:id",
    component: Post,
    props: true
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/test",
    component: Test
  }
];

const router = createRouter({
  history: createWebHistory('/schoolWall'),
  routes,
});

export default router;
