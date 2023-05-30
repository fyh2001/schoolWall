/*
 * @Author: 黄叶
 * @Date: 2023-04-18 23:10:07
 * @LastEditTime: 2023-05-22 01:25:38
 * @FilePath: /schoolWall/src/router/router.js
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/index/index.vue";
import Home from "../views/home/home.vue";
import Post from "../views/post/post.vue";
import User from "../views/user/user.vue";
import Register from "../views/user/register/register.vue";
import Login from "../views/user/login/login.vue";
import Message from "../views/message/message.vue"
import Test from "../views/test/test.vue";

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "",
        component: Home,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "user",
        component: User,
      },
      {
        path: "message",
        component: Message
      }
    ],
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/post/:id",
    component: Post,
    props: true,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/test",
    component: Test,
  },
];

const router = createRouter({
  history: createWebHistory("/schoolWall"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 100 };
    }
  },
});

export default router;
