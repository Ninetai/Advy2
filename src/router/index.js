import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Auth from "../views/auth/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "start",
    component: Auth,
    // component: () => import("../views/index.vue"),
    meta: {
      title: "Advy.ai",
      requiresAuth: false,
    },
  },
  {
    path: "/campaigns",
    name: "campaigns",
    component: () => import("../views/Campaigns.vue"),
    meta: {
      title: "Advy.ai - Campaign",
      requiresAuth: true,
    },
    children: [
      {
        path: "onboarding",
        name: "onboarding",
        component: () => import("../views/onboarding/index.vue"),
        meta: {
          title: "Advy.ai - Onboarding Start",
          requiresAuth: true,
        },
      },
      // {
      //   path:"register",
      //   name:"register",
      //   component: ()=>import("../components/auth/RegistrationForm.vue"),
      //   meta: {
      //     title: "Advy.ai - Onboarding Start",
      //     requiresAuth: false,
      //   },
      // }
    ],
  },
  {
    path: "/campaign/:id/description",
    name: "description",
    component: () => import("../views/campaign/description.vue"),
    meta: {
      title: "Advy.ai - Campaign Description",
      requiresAuth: true,
    },
  },
  {
    path: "/campaign/:id/bloggers",
    name: "bloggers",
    component: () => import("../views/campaign/bloggers.vue"),
    meta: {
      title: "Advy.ai - Campaign Description",
      requiresAuth: true,
    },
  },
  {
    path: "/campaign/:id/result",
    name: "results",
    component: () => import("../views/campaign/results.vue"),
    meta: {
      title: "Advy.ai - Campaign Description",
      requiresAuth: true,
    },
  },
  {
    path: "/campaign/:id/bartersettings",
    name: "barterSettings",
    component: () => import("../views/campaign/barterSettings.vue"),
    meta: {
      title: "Advy.ai - Campaign Description",
      requiresAuth: true,
    },
  },
  {
    path: "/campaign/:id/init",
    name: "init",
    component: () => import("../views/campaign/initView.vue"),
    meta: {
      title: "Advy.ai - Campaign Description",
      requiresAuth: true,
    },
  },
  {
    path: "/cabinet",
    name: "cabinet",
    component: () => import("../views/admin/Cabinet.vue"),
    meta: {
      title: "Advy.ai - Campaign Description",
      requiresAuth: true,
    },
  },
  {
    path: "story/:id",
    name: "story",
    component: () => import("../views/admin/StoryView.vue"),
    meta: {
      title: "Advy.ai",
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, _, next) => {
  const authToken = localStorage.getItem("accessToken");

  if (to?.meta?.requiresAuth && !authToken) {
    next({ name: "start" });
  } else if (!to?.meta?.requiresAuth && authToken) {
    next({ name: "campaigns" });
  } else {
    next();
  }
});

export default router;
