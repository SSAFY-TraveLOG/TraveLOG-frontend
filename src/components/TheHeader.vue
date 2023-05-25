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
                  ><v-text-field
                    color="#FFFFFF"
                    readonly
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    :value="menu.name"
                  ></v-text-field
                ></router-link>
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
                <v-img id="userImage" :src="userImage" />
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <div class="menuItem">
                      <v-text-field
                        color="#FFFFFF"
                        readonly
                        id="userName"
                        :class="{
                          'hover-text': hover,
                          'no-hover-text': !hover,
                        }"
                        :value="userName"
                      ></v-text-field>
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
                  ><v-text-field
                    color="#FFFFFF"
                    readonly
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    :value="menu.name"
                  ></v-text-field
                ></router-link>
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
          link: "/join",
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
  height: 130px;
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
  height: 60px;
  margin-right: 20px;
}

#logo {
  display: inline-block;
  vertical-align: middle;
  height: 35px;
}

.menu {
  width: 1000px;
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menuItem {
  max-width: 800px;
  width: 800px;
  color: white;
}

#userImage {
  width: 64px;
  height: auto;
  image-rendering: smooth;
}
.hover-text {
  transition: all 0.3s ease-in-out; /* Slow animation speed */
  font-size: 21px;
  font-weight: bold;
  color: white !important;
  text-decoration-color: white !important;
}
.no-hover-text {
  transition: all 0.2s ease-in-out; /* Slow animation speed */
  font-size: 16px;
  font-weight: bold;
  color: white !important;
  text-decoration-color: white !important;
}

.hover-text:hover {
  color: white !important;
  text-decoration-color: white !important;
}

.no-hover-text:not(:hover) {
  color: white !important;
  text-decoration-color: white !important;
}

#myInfo {
  min-width: 200px;
  font-weight: bold;
  background-color: transparent;
}
</style>
