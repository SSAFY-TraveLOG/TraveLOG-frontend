<template>
  <v-sheet
    class="ma-5 pa-4 d-flex flex-column"
    color="white"
    elevation="5"
    min-height="800px"
    rounded
  >
    <h1 class="align-self-center mb-5">Q&A 게시판</h1>
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
        :loading="isLoading"
        clearable
        solo
        single-line
      >
      </v-text-field>
      <v-btn elevation="2" height="50px" width="100px" @click="pressSearch()"
        >검색</v-btn
      >
    </v-sheet>
    <div class="d-flex flex-column" v-if="articles.length">
      <v-data-table
        class="align-self-center"
        style="width: 100%"
        :headers="headers"
        :items="articles"
        :items-per-page="10"
        @click:row="openDetail"
      ></v-data-table>
    </div>
    <div v-else>
      <div class="d-flex flex-column">
        <v-data-table
          style="width: 100%"
          :headers="headers"
          :items="emptyArticle"
          :items-per-page="10"
          :search="search"
        ></v-data-table>
      </div>
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
  name: "QnaBoardList",
  components: {},
  data: () => ({
    isLoading: true,
    searchKey: "",
    search: "",
    headers: [
      {
        text: "번호",
        value: "displayNo",
        sortable: false,
        width: "10%",
        align: "center",
      },
      {
        text: "제목",
        value: "subject",
        sortable: false,
        width: "55%",
        align: "start",
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
    ],
    articles: [],
    emptyArticle: [
      {
        articleNo: "",
        displayNo: "",
        subject: "등록된 글이 없습니다.",
        userName: "",
        registerTime: "",
        readCount: "",
      },
    ],
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
      url: "/qna/search",
      method: "post",
      data: JSON.stringify({
        userNo: this.userNo,
      }),
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
      this.articles = data.data;
      this.isLoading = false;
    });
  },
  methods: {
    pressSearch() {
      this.isLoading = true;
      if (this.searchKey == "") {
        alert("검색 옵션을 선택해 주세요");
        return;
      }

      axios({
        url: `/qna/search?key=${this.searchKey}&value=${this.search}`,
        method: "post",
        data: JSON.stringify({
          userNo: this.userNo,
        }),
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
        this.articles = data.data;
        this.isLoading = false;
      });
    },
    moveWrite() {
      this.$router.push({ name: "qnaBoardWriter" });
    },
    openDetail(val) {
      if (val.userNo === -1) {
        alert("열람 권한이 없습니다.");
        return;
      }
      this.$router.push({
        name: "qnaBoardDetail",
        params: { articleNo: val.articleNo },
      });
    },
  },
  computed: {
    ...mapGetters({ userNo: "getUserNo" }),
  },
};
</script>
