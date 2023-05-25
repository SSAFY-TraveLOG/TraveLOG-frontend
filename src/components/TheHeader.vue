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
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/attraction"
                  ><v-text-field
                    variant="plain"
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="관광지 알아보기"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/plan"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="여행 일정 만들기"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/board"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="게시판"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/qna"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="Q&A"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <!-- 여기에 프사/닉네임 띄우고 호버하면 셀렉트메뉴 띄우기 -->
          <v-menu transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-sheet
                id="myInfo"
                v-bind="attrs"
                v-on="on"
                class="d-flex justify-center"
              >
                <v-img id="userImage" :src="userImage" />
                <v-text-field :value="userName"></v-text-field>
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
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/attraction"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="관광지 알아보기"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/plan"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="여행 일정 만들기"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/board"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="게시판"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/qna"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="Q&A"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/login"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="로그인"
                  ></v-text-field
                ></router-link>
              </div>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <div class="menuItem">
                <router-link class="linking" to="/user/join"
                  ><v-text-field
                    :class="{ 'hover-text': hover, 'no-hover-text': !hover }"
                    value="회원가입"
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
      menu: [
        {
          name: "관광지 알아보기",
          link: "/attraction",
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
  font-size: 25px;
  font-weight: bold;
  color: white !important;
}
.no-hover-text {
  transition: all 0.2s ease-in-out; /* Slow animation speed */
  font-size: 16px;
  font-weight: normal;
  color: white !important;
}

.hover-text:hover {
  text-decoration-color: white;
}

.no-hover-text:not(:hover) {
  text-decoration-color: white !important;
}

#myInfo {
  min-width: 200px;
  background-color: transparent;
}
</style>
