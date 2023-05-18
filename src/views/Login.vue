<template>
    <div>
        <h2>Login</h2>
        <div>
            <div>ID</div>
            <input placeholder="ID를 입력하세요." v-model="userId" />
        </div>
        <div>
            <div>Password</div>
            <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                v-model="password"
            />
        </div>
        <button @click="login">로그인</button>
    </div>
</template>

<script>
// import axios from "@/util/axios";
import { mapActions } from "vuex";
export default {
    name: "LoginView",
    components: {},
    data() {
        return {
            userId: "",
            password: "",
        };
    },
    created() {},
    methods: {
        ...mapActions(["loginApi"]),
        login() {
            this.loginApi({
                userId: this.userId,
                password: this.password,
            }).then(() => {
                this.$router.push("/");
            });
        },
    },
};
</script>

<style scoped></style>
