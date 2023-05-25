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
          <v-hover v-for="(menu, i) in userMenu" :key="i">
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" :to="menu.link"
                  ><div class="text-center"
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                  >
                    {{ menu.name }}
                  </div></router-link
                >
              </div>
            </template>
          </v-hover>
          <v-menu transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-sheet
                id="myInfo"
                v-bind="attrs"
                v-on="on"
                class="d-flex justify-center"
              >
                <v-img id="userImage" class="align-self-center" :src="userImage" />
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <div class="menuItem">
                      <div
                        id="userName"
                        :class="{
                          'hover-user-name': hover,
                          'no-hover-user-name': !hover,
                        }"
                      >
                        {{ userName }}
                      </div>
                    </div>
                  </template>
                </v-hover>
              </v-sheet>
            </template>
            <v-list>
              <v-list-item>
                <router-link to="/mypage"> 마이페이지 </router-link>
              </v-list-item>
              <v-list-item @click="logout"> 로그아웃 </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="menu" v-else>
          <v-hover v-for="(menu, i) in visitorMenu" :key="i">
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" :to="menu.link"
                  ><div class="text-center"
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                  >
                    {{ menu.name }}
                  </div></router-link
                >
              </div>
            </template>
          </v-hover>
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
    return {
      userMenu: [
        {
          name: "관광지 알아보기",
          link: "/attraction",
        },
        {
          name: "여행 일정 만들기",
          link: "/plan",
        },
        {
          name: "공유 게시판",
          link: "/board",
        },
        {
          name: "Q&A",
          link: "/qna",
        },
      ],
      visitorMenu: [
        {
          name: "관광지 알아보기",
          link: "/attraction",
        },
        {
          name: "여행 일정 만들기",
          link: "/plan",
        },
        {
          name: "공유 게시판",
          link: "/board",
        },
        {
          name: "Q&A",
          link: "/qna",
        },
        {
          name: "로그인",
          link: "/login",
        },
        {
          name: "회원가입",
          link: "/user/join",
        },
      ],
    };
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
    ...mapGetters({
      userNo: "getUserNo",
      userImage: "getUserImage",
      userName: "getUserName",
    }),
  },
};
</script>

<style scoped>
header {
  margin: 0;
  position: sticky;
  height: 80px;
  width: 100%;
  background-color: #62b7f3;
  line-height: 60px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.linking {
  font-weight: 500;
  text-decoration-line: none;
  color: white !important;
  text-decoration-color: white !important;
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
  height: 40px;
  margin-right: 20px;
}

#logo {
  display: inline-block;
  vertical-align: middle;
  height: 25px;
}

.menu {
  width: 1000px;
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* background-color: red; */
}

.menuItem {
  max-width: 700px;
  width: 180px;
  color: white;
}

#userName {
  color: #62b7f3;
}

#userImage {
  width: 40px;
  height: 40px;
  image-rendering: smooth;
  margin-right: 10px;
}
.hover-text {
  transition: all 0.3s ease-in-out; /* Slow animation speed */
  font-size: 22px;
  font-weight: bold;
  color: white !important;
  text-decoration-color: white !important;
}
.no-hover-text {
  transition: all 0.2s ease-in-out; /* Slow animation speed */
  font-size: 20px;
  font-weight: bold;
  color: white !important;
  text-decoration-color: white !important;
}
.hover-user-name {
  transition: all 0.3s ease-in-out; /* Slow animation speed */
  font-size: 22px;
  font-weight: bold;
  color: #62b7f3;
  text-decoration-color: #62b7f3;
}
.no-hover-user-name {
  transition: all 0.2s ease-in-out; /* Slow animation speed */
  font-size: 20px;
  font-weight: bold;
  color: #62b7f3;
  text-decoration-color: #62b7f3;
}
#myInfo {
  width: 150px;
  max-width: 150px;
  font-weight: bold;
  background-color: white;
  padding-left: 10px;
  border-radius: 10px;
}
#myInfo2 {
  width: 250px;
  max-width: 350px;
  font-weight: bold;
  background-color: white;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
}
</style>
