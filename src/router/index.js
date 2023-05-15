import Vue from "vue";
import VueRouter from "vue-router";

//views
import MainPage from "@/views/Main";
import AttractionPage from "@/views/Attraction";
import LoginPage from "@/views/Login";
import JoinPage from "@/views/Join";
import BoardPage from "@/views/Board";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/attraction",
    name: "attraction",
    component: AttractionPage,
  },
  {
    path: "/board",
    name: "board",
    component: BoardPage,
    redirect: "/board/search",
    children: [
      {
        path: "search",
        name: "boardList",
        component: () => import("@/components/board/BoardList.vue"),
      },
      {
        path: "write",
        name: "boardWriter",
        component: () =>
          import("@/components/board/BoardWriter.vue"),
      },
      {
        path: "view/:articleNo",
        name: "boardDetail",
        component: () =>
          import("@/components/board/BoardDetail.vue"),
      },
      {
        path: "modify/:articleNo",
        name: "boardModify",
        component: () =>
          import("@/components/board/BoardModify.vue"),
      },
      {
        path: "delete/:articleNo",
        name: "boardDelete",
        component: () =>
          import("@/components/board/BoardDelete.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/user/join",
    name: "join",
    component: JoinPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
