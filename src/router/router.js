/*
 * @Author: 黄叶
 * @Date: 2023-04-18 23:10:07
 * @LastEditTime: 2023-06-13 01:25:12
 * @FilePath: /schoolWall/src/router/router.js
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import('../views/index/index.vue'),
    children: [
      {
        path: "",
        component: () => import('../views/home/home.vue'),
        name: 'Home',
        meta: {
          // keepAlive: true,
        },
      },
      {
        path: "user",
        component: () => import('../views/user/user.vue'),
        name: 'User',
      },
      {
        path: "updateLog",
        component: () => import('../views/updateLog/updateLog.vue'),
        name: 'UpdateLog',
      },
    ],
  },
  {
    path: "/post/:id",
    component: () => import('../views/post/post.vue'),
    name: 'Post',
    props: true,
  },
  {
    path: "/moreReplies/:replyId/:postUserId",
    component: () => import('../views/post/moreReplies.vue'),
    name: 'MoreReplies',
    props: true,
  },
  {
    path: "/login",
    component: () => import('../views/login/index.vue'),
    children: [
      {
        path: "",
        component: () => import('../views/login/loginByMail.vue'),
        name: 'LoginByMail',
      },
      {
        path: "/loginByPhone",
        component:() => import('../views/login/loginByPhone.vue'),
        name: 'LoginByPhone',
      }
    ]
  },
  {
    path: "/settings",
    component: () => import('../views/user/settings.vue'),
    name: 'Settings',
  },
  {
    path: "/editProfile",
    component: () => import('../views/user/editProfile/editProfile.vue'),
    name: 'EditProfile',
  },
  {
    path: "/editAvatar",
    component: () => import('../views/user/editProfile/editAvatar.vue'),
    name: 'EditAvatar',
  },
  {
    path: "/editBackground",
    component: () => import('../views/user/editProfile/editBackground.vue'),
    name: 'EditBackground',
  },
  {
    path: "/editNickname",
    component: () => import('../views/user/editProfile/editNickname.vue'),
    name:'EditNickname'
  },
  {
    path: "/editBinding",
    component: () => import('../views/user/editProfile/editBinding.vue'),
    name: 'EditBinding',
  },
  {
    path: "/editMail",
    component: () => import('../views/user/editProfile/editMail/index.vue'),
    children: [
      {
        path: "",
        component: () => import('../views/user/editProfile/editMail/verifyMail.vue'),
        name: 'VerifyMail',
      },
      {
        path: "editMail",
        component: () => import('../views/user/editProfile/editMail/editMail.vue'),
        name: 'EditMail',
      },
      {
        path: "bindMail",
        component: () => import('../views/user/editProfile/editMail/bindMail.vue'),
        name: 'BindMail',
      }
    ]
  },
  // 
  {
    path: "/editPhone",
    component: () => import('../views/user/editProfile/editPhone/index.vue'),
   children: [
      {
        path: "verifyPhone",
        component: () => import('../views/user/editProfile/editPhone/verifyPhone.vue'),
        name: 'VerifyPhone',
      },
      {
        path: "editPhone",
        component: () => import('../views/user/editProfile/editPhone/editPhone.vue'),
        name: 'EditPhone',
      },
      {
        path: "bindPhone",
        component: () => import('../views/user/editProfile/editPhone/bindPhone.vue'),
        name: 'BindPhone',
      },
      {
        path: "unbindPhone",
        component: () => import('../views/user/editProfile/editPhone/unbindPhone.vue'),
        name: 'UnbindPhone',
      }
    ]
  },
  {
    path: "/test",
    component: () => import('../views/test/test.vue'),
  },
];

const router = createRouter({
  history: createWebHistory("/schoolWall/"),
  routes,
});

export default router;
