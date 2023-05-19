<template>
  <header>
    <nav class="header-nav">
      <div class="logo menuTop">
        <router-link to="/">
          <img id="icon" src="@/assets/icon_TraveLOG.png" />
          <img id="logo" src="@/assets/logo_TraveLOG.png" />
        </router-link>
      </div>
      <div class="menuTop">
        <div class="menu" v-if="userNo">
          <div class="menuItem">
            <router-link class="linking" to="/attraction"
              >관광지 알아보기</router-link
            >
          </div>
          <div class="menuItem">
            <router-link class="linking" to="/board">게시판</router-link>
          </div>
          <div class="menuItem">
            <router-link class="linking" to="/qna">Q&A 게시판</router-link>
          </div>
          <div class="menuItem">
            <button class="linking" @click="logout">로그아웃</button>
          </div>
        </div>
        <div class="menu" v-else>
          <div class="menuItem">
            <router-link class="linking" to="/attraction"
              >관광지 알아보기</router-link
            >
          </div>
          <div class="menuItem">
            <router-link class="linking" to="/board">게시판</router-link>
          </div>
          <div class="menuItem">
            <router-link class="linking" to="/qna">Q&A 게시판</router-link>
          </div>
          <div class="menuItem">
            <router-link class="linking" to="/login">로그인</router-link>
          </div>
          <div class="menuItem">
            <router-link class="linking" to="/user/join">회원가입</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TheHeader",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapActions(["logoutApi"]),
    logout() {
      this.logoutApi().then(() => {
        location.reload();
      });
    },
  },
  computed: {
    ...mapGetters({ userNo: "getUserNo" }),
  },
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
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.linking {
  font-weight: 500;
  text-decoration: none;
  color: white;
  margin: 0, 10;
}

.header-nav {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* flex-direction: column; */
  justify-content: space-between;
  width: 90%;
  /* background-color: red; */
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

.menu {
  width: 400px;
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
