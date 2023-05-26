<template>
  <v-sheet>
    <v-sheet class="d-flex align-center justify-center">
      <v-carousel
        id="landscape"
        cycle
        height="500px"
        hide-delimiter-background
        :show-arrows="false"
        interval="3000"
      >
        <v-carousel-item
          v-for="(item, i) in srcs"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel> </v-sheet
    ><template>
      <v-card class="mx-auto" max-width="80%" elevation="0">
        <v-container fluid>
          <v-row dense>
            <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
              <v-card>
                <router-link class="link" :to="card.to">
                  <v-img
                    :src="card.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                    <v-card-title>{{ card.title }}</v-card-title>
                  </v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon>
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>

                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </v-card-actions></router-link
                >
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template></v-sheet
  >
</template>

<script>
export default {
  name: "MainPage",
  components: {},
  data() {
    return {
      srcs: [
        {
          src: "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/MainFrame1.png",
        },
        {
          src: "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/MainFrame2.png",
        },
        {
          src: "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/MainFrame3.png",
        },
        {
          src: "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/MainFrame4.png",
        },
        {
          src: "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/MainFrame5.png",
        },
      ],
      cards: [
        {
          title: "관광지 알아보기",
          src: "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/MainFrame6.png",
          flex: 4,
          to: "/attraction",
        },
        {
          title: "공유 게시판",
          src: "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/MainFrame7.png",
          flex: 4,
          to: "/board",
        },
        {
          title: "여행 일정 만들기",
          src: "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/MainFrame8.png",
          flex: 4,
          to: "/plan",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
#landscape {
  width: 80%;
  margin-top: 30px;
  border-radius: 10px;
}
.link {
  text-decoration: none;
}
</style>
