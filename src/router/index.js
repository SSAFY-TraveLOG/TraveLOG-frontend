import Vue from "vue";
import VueRouter from "vue-router";

//views
import MainPage from "@/views/Main";
import AttractionPage from "@/views/Attraction";
import LoginPage from "@/views/Login";
import JoinPage from "@/views/Join";
import BoardPage from "@/views/Board";
import QnaBoardPage from "@/views/QnaBoard";

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
        meta: { requiresAuth: true },
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
