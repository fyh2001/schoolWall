/*
 * @Author: 黄叶
 * @Date: 2023-04-18 23:10:07
 * @LastEditTime: 2023-06-07 11:03:33
 * @FilePath: /schoolWall/src/router/router.js
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/index/index.vue";
import Home from "../views/home/home.vue";
import Post from "../views/post/post.vue";
import MoreReplies from "../views/post/moreReplies.vue";
import User from "../views/user/user.vue";
import EditProfile from "../views/user/editProfile/editProfile.vue";
import EditAvatar from "../views/user/editProfile/editAvatar.vue";
import EditNickname from "../views/user/editProfile/editNickname.vue"
import Login from "../views/login/index.vue";
import LoginByPhone from "../views/login/loginByPhone.vue";
import LoginByMail from "../views/login/loginByMail.vue";
import Message from "../views/message/message.vue";
import Test from "../views/test/test.vue";

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "",
        component: Home,
        name: Home,
        meta: {
          // keepAlive: true,
        },
      },
      {
        path: "user",
        component: User,
        name: User,
      },
      {
        path: "message",
        component: Message,
        name: Message,
      },
    ],
    meta: {
      // keepAlive: true,
    },
  },
  {
    path: "/post/:id",
    component: Post,
    name: Post,
    props: true,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/moreReplies/:replyId/:postUserId",
    component: MoreReplies,
    name: MoreReplies,
    props: true,
  },
  {
    path: "/login",
    component: Login,
    children: [
      {
        path: "",
        component: LoginByMail,
        name: LoginByMail,
      },
      {
        path: "/loginByPhone",
        component: LoginByPhone,
        name: LoginByPhone,
      }
    ]
  },
  {
    path: "/editProfile",
    component: EditProfile,
    name: EditProfile,
  },
  {
    path: "/editAvatar",
    component: EditAvatar,
    name: EditAvatar,
  },
  {
    path: "/editNickname",
    component: EditNickname,
    name: EditNickname
  },
  {
    path: "/test",
    component: Test,
  },
];

const router = createRouter({
  history: createWebHistory("/schoolWall/"),
  routes,
});

export default router;
