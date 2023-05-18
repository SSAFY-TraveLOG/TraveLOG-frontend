<template>
    <header>
        <nav class="header-nav">
            <div class="logo">
                <router-link to="/">
                    <img id="icon" src="@/assets/icon_TraveLOG.png" />
                    <img id="logo" src="@/assets/logo_TraveLOG.png" />
                </router-link>
            </div>
            <div>
                <router-link to="/attraction">관광지 알아보기</router-link>
                <router-link to="/board">게시판</router-link>
                <router-link to="/qna">Q&A</router-link>
                <router-link to="/login">로그인</router-link>
                <router-link to="/user/join">회원가입</router-link>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "TheHeader",
    components: {},
    data() {
        return {
            message: "",
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped>
header {
    margin: 0;
    position: sticky;
    height: 60px;
    width: 100%;
    background-color: #62b7f3;
    line-height: 60px;
}

.header-nav {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    /* flex-direction: column; */
}

.logo {
    text-align: center;
}

#icon {
    display: inline-block;
    vertical-align: middle;
    height: 20px;
}

#logo {
    display: inline-block;
    vertical-align: middle;
    height: 20px;
}

a {
    text-decoration: none;
    color: white;
}
</style>
