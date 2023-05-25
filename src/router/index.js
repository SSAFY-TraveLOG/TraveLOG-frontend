import Vue from "vue";
import VueRouter from "vue-router";

//views
import MainPage from "@/views/Main";
import AttractionPage from "@/views/Attraction";
import LoginPage from "@/views/Login";
import JoinPage from "@/views/Join";
import BoardPage from "@/views/Board";
import QnaBoardPage from "@/views/QnaBoard";
import PlanPage from "@/views/Plan";
import MyPage from "@/views/MyPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/attraction",
    name: "attraction",
    component: AttractionPage,
    redirect: "/attraction/search",
    children: [
      {
        path: "search",
        name: "attractionSearch",
        component: () => import("@/components/attraction/AttractionList.vue"),
        meta: { requiresAuth: true },
      },
    ],
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
        meta: { requiresAuth: true },
      },
      {
        path: "write",
        name: "boardWriter",
        component: () => import("@/components/board/BoardWriter.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "view/:articleNo",
        name: "boardDetail",
        component: () => import("@/components/board/BoardDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "modify/:articleNo",
        name: "boardModify",
        component: () => import("@/components/board/BoardModify.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "delete/:articleNo",
        name: "boardDelete",
        component: () => import("@/components/board/BoardDelete.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/qna",
    name: "qnaBoard",
    component: QnaBoardPage,
    redirect: "/qna/search",
    children: [
      {
        path: "search",
        name: "qnaBoardList",
        component: () => import("@/components/qnaboard/QnaBoardList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "write",
        name: "qnaBoardWriter",
        component: () => import("@/components/qnaboard/QnaBoardWriter.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "view/:articleNo",
        name: "qnaBoardDetail",
        component: () => import("@/components/qnaboard/QnaBoardDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "modify/:articleNo",
        name: "qnaBoardModify",
        component: () => import("@/components/qnaboard/QnaBoardModify.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "delete/:articleNo",
        name: "qnaBoardDelete",
        component: () => import("@/components/qnaboard/QnaBoardDelete.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/plan",
    name: "plan",
    component: PlanPage,
    redirect: "/plan/",
    children: [
      {
        path: "",
        name: "planList",
        component: () => import("@/components/plan/PlanList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/write/info",
        name: "planWriter",
        component: () => import("@/components/plan/PlanWriter.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/write/route",
        name: "routeWriter",
        component: () => import("@/components/plan/RouteWriter.vue"),
        meta: { requiresAuth: true },
      },
      // {
      //   path: "view/:planNo",
      //   name: "planDetail",
      //   component: () => import("@/components/plan/PlanDetail.vue"),
      //   meta: { requiresAuth: true },
      // },
      // {
      //   path: "modify/:planNo",
      //   name: "planModify",
      //   component: () => import("@/components/plan/PlanModify.vue"),
      //   meta: { requiresAuth: true },
      // },
      {
        path: "delete/:planNo",
        name: "planDelete",
        component: () => import("@/components/plan/PlanDelete.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/user/join",
    name: "join",
    component: JoinPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPage,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, _, next) {
  const access_token = localStorage.getItem("accessToken");
  if (!access_token) {
    if (to.meta.requiresAuth) {
      alert("로그인 후 이용해주세요.");
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
