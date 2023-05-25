<template>
  <v-sheet
    class="ma-5 pa-4 d-flex flex-column"
    color="white"
    elevation="5"
    min-height="800px"
    width="80%"
    rounded
  >
    <h1 class="align-self-center mb-5">자유게시판</h1>
    <v-sheet
      class="d-flex flex-row align-center align-self-center justify-center ma-1"
      color="white"
      height="50px"
      width="100%"
    >
      <v-sheet width="150px">
        <v-select
          v-model="searchKey"
          hide-details="true"
          label="옵션"
          :items="searchCondition"
          solo
        >
        </v-select>
      </v-sheet>
      <v-text-field
        class="ml-3 mr-3 align-center"
        hide-details="true"
        v-model="search"
        label="Search"
        clearable
        solo
        single-line
      >
      </v-text-field>
      <v-btn elevation="2" height="50px" width="100px" @click="pressSearch()"
        >검색</v-btn
      >
    </v-sheet>
    <v-data-table
      class="align-self-center elevation-1"
      style="width: 100%"
      :headers="headers"
      :items="articles"
      :loading="isLoading"
      item-key="displayNo"
      :items-per-page="10"
      hide-default-footer
      :page.sync="page"
      @page-count="pageCount = $event"
    >
      <template #[`item`]="{ item }">
        <tr>
          <td>
            <v-icon @click="likeArticle(item)" color="pink">{{
              item.like ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon>
          </td>
          <td class="text-center" @click="openDetail(item.articleNo)">
            {{ item.displayNo }}
          </td>
          <td @click="openDetail(item.articleNo)">{{ item.subject }}</td>
          <td class="text-center" @click="openDetail(item.articleNo)">
            {{ item.userName }}
          </td>
          <td class="text-center" @click="openDetail(item.articleNo)">
            {{ item.registerTime }}
          </td>
          <td class="text-center" @click="openDetail(item.articleNo)">
            {{ item.readCount }}
          </td>
          <td class="text-center" @click="openDetail(item.articleNo)">
            {{ item.likeCount }}
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :total-visible="7" :length="pageCount">
      </v-pagination>
    </div>
    <v-btn
      class="align-self-end"
      width="50px"
      color="#A4D9FF"
      @click="moveWrite()"
      >등록</v-btn
    >
  </v-sheet>
</template>
<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";

export default {
  name: "BoardList",
  components: {},
  data: () => ({
    isLoading: true,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    searchKey: "",
    search: "",
    headers: [
      {
        text: "",
        align: "center",
        sortable: false,
        value: "image",
        width: "2%",
      },
      {
        text: "번호",
        value: "displayNo",
        sortable: false,
        width: "8%",
        align: "center",
      },
      {
        text: "제목",
        value: "subject",
        sortable: false,
        width: "45%",
        align: "center",
      },
      {
        text: "작성자",
        value: "userName",
        sortable: false,
        width: "10%",
        align: "center",
      },
      {
        text: "등록일",
        value: "registerTime",
        sortable: false,
        width: "15%",
        align: "center",
      },
      {
        text: "조회수",
        value: "readCount",
        sortable: false,
        width: "10%",
        align: "center",
      },
      {
        text: "좋아요",
        value: "likeCount",
        sortable: false,
        width: "10%",
        align: "center",
      },
    ],
    articles: [],
    searchCondition: [
      {
        text: "제목",
        value: "subject",
      },
      {
        text: "작성자",
        value: "userName",
      },
      {
        text: "내용",
        value: "content",
      },
    ],
  }),
  created() {
    axios({
      url: "/board/search",
      method: "get",
    }).then(({ data }) => {
      let idx = 1;
      if (data.data != null) {
        data.data.forEach((element) => {
          element.displayNo = idx++;
          if (element.registerTime == "") return "";

          let jsDate = new Date(element.registerTime);

          let year = jsDate.getFullYear();
          let month = jsDate.getMonth() + 1;
          let date = jsDate.getDate();

          if (month < 10) {
            month = "0" + month;
          }
          if (date < 10) {
            date = "0" + date;
          }

          element.registerTime = year + "-" + month + "-" + date;
        });

        data.data.forEach((element) => {
          if (element.modifiedTime == "") return "";

          let jsDate = new Date(element.modifiedTime);

          let year = jsDate.getFullYear();
          let month = jsDate.getMonth() + 1;
          let date = jsDate.getDate();

          if (month < 10) {
            month = "0" + month;
          }
          if (date < 10) {
            date = "0" + date;
          }

          element.modifiedTime = year + "-" + month + "-" + date;
        });
      }
      let articles = data.data;

      axios
        .get(`/like/user/article/${this.userNo}`)
        .then(({ data }) => {
          let likeArr = data.data;
          articles.forEach((article) => {
            if (likeArr.includes(article.articleNo.toString())) {
              article.like = true;
            } else article.like = false;
          });
          return Promise.all(
            articles.map((article) =>
              axios
                .get(`/like/article/${article.articleNo}`)
                .then(({ data }) => {
                  article.likeCount = data.data;
                })
            )
          );
        })
        .then(() => {
          this.articles = articles;
          this.isLoading = false;
        });
    });
  },
  methods: {
    pressSearch() {
      this.isLoading = true;
      if (this.searchKey == "") {
        alert("검색 옵션을 선택해 주세요");
        return;
      }

      if (this.search == null) {
        axios({
          url: `/board/search`,
          method: "get",
        }).then(({ data }) => {
          let idx = 1;
          if (data.data != null) {
            data.data.forEach((element) => {
              element.displayNo = idx++;
              if (element.registerTime == "") return "";

              let jsDate = new Date(element.registerTime);

              let year = jsDate.getFullYear();
              let month = jsDate.getMonth() + 1;
              let date = jsDate.getDate();

              if (month < 10) {
                month = "0" + month;
              }
              if (date < 10) {
                date = "0" + date;
              }

              element.registerTime = year + "-" + month + "-" + date;
            });

            data.data.forEach((element) => {
              if (element.modifiedTime == "") return "";

              let jsDate = new Date(element.modifiedTime);

              let year = jsDate.getFullYear();
              let month = jsDate.getMonth() + 1;
              let date = jsDate.getDate();

              if (month < 10) {
                month = "0" + month;
              }
              if (date < 10) {
                date = "0" + date;
              }

              element.modifiedTime = year + "-" + month + "-" + date;
            });
            let articles = data.data;

            axios
              .get(`/like/user/article/${this.userNo}`)
              .then(({ data }) => {
                let likeArr = data.data;
                articles.forEach((article) => {
                  if (likeArr.includes(article.articleNo.toString())) {
                    article.like = true;
                  } else article.like = false;
                });
                return Promise.all(
                  articles.map((article) =>
                    axios
                      .get(`/like/article/${article.articleNo}`)
                      .then(({ data }) => {
                        article.likeCount = data.data;
                      })
                  )
                );
              })
              .then(() => {
                this.articles = articles;
                this.isLoading = false;
              });
          }
        });
      } else {
        axios({
          url: `/board/search?key=${this.searchKey}&value=${this.search}`,
          method: "get",
        }).then(({ data }) => {
          let idx = 1;
          if (data.data != null) {
            data.data.forEach((element) => {
              element.displayNo = idx++;
              if (element.registerTime == "") return "";

              let jsDate = new Date(element.registerTime);

              let year = jsDate.getFullYear();
              let month = jsDate.getMonth() + 1;
              let date = jsDate.getDate();

              if (month < 10) {
                month = "0" + month;
              }
              if (date < 10) {
                date = "0" + date;
              }

              element.registerTime = year + "-" + month + "-" + date;
            });

            data.data.forEach((element) => {
              if (element.modifiedTime == "") return "";

              let jsDate = new Date(element.modifiedTime);

              let year = jsDate.getFullYear();
              let month = jsDate.getMonth() + 1;
              let date = jsDate.getDate();

              if (month < 10) {
                month = "0" + month;
              }
              if (date < 10) {
                date = "0" + date;
              }

              element.modifiedTime = year + "-" + month + "-" + date;
            });

            let articles = data.data;

            axios
              .get(`/like/user/article/${this.userNo}`)
              .then(({ data }) => {
                let likeArr = data.data;
                articles.forEach((article) => {
                  if (likeArr.includes(article.articleNo.toString())) {
                    article.like = true;
                  } else article.like = false;
                });
                return Promise.all(
                  articles.map((article) =>
                    axios
                      .get(`/like/article/${article.articleNo}`)
                      .then(({ data }) => {
                        article.likeCount = data.data;
                      })
                  )
                );
              })
              .then(() => {
                this.articles = articles;
                this.isLoading = false;
              });
          }
        });
      }
    },
    moveWrite() {
      this.$router.push({ name: "boardWriter" });
    },
    openDetail(val) {
      this.$router.push({
        name: "boardDetail",
        params: { articleNo: val },
      });
    },
    likeArticle(val) {
      if (val.like == 0) {
        axios
          .post("/like/article", {
            userNo: this.userNo,
            articleNo: val.articleNo,
          })
          .then((data) => {
            if (data.data.data[0] == 1) {
              this.articles[val.displayNo - 1].like = true;
              this.articles[val.displayNo - 1].likeCount += 1;
            }
          });
      } else {
        axios
          .post("/like/article/delete", {
            userNo: this.userNo,
            articleNo: val.articleNo,
          })
          .then((data) => {
            if (data.data.data[0] == 1) {
              this.articles[val.displayNo - 1].like = false;
              this.articles[val.displayNo - 1].likeCount -= 1;
            }
          });
      }
    },
  },
  computed: {
    ...mapGetters({ userNo: "getUserNo" }),
  },
};
</script>
