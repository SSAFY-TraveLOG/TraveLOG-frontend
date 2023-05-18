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
            <div v-show="passwordErr" class="input-error">
                비밀번호는 8자리 이상, 16자리 이하의 영문자, 숫자가 포함되어야
                합니다.
            </div>
        </div>
        <button @click="login">로그인</button>

        <template>
            <div class="text-center">
                <v-snackbar v-model="snackbar" :timeout="timeout">
                    {{ text }}

                    <v-btn
                        color="blue"
                        variant="text"
                        @click="snackbar = false"
                    >
                        닫기
                    </v-btn>
                </v-snackbar>
            </div>
        </template>
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
            passwordErr: false,
            text: "ID 또는 비밀번호가 일치하지 않습니다.",
            snackbar: false,
            timeout: 2000,
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
        checkPassword() {
            const reg =
                /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
            if (!reg.test(this.password) || !this.password) {
                this.passwordErr = true;
            } else {
                this.passwordErr = false;
            }
        },
    },
    watch: {
        password: function () {
            this.checkPassword();
        },
    },
};
</script>

<style scoped>
.input-error {
    line-height: 16px;
    font-size: 11px;
    color: red;
}
</style>
