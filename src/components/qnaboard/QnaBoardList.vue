<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title primary-title>Q&A 게시판</v-card-title>
    </v-card>
    <v-text-field
      v-model="search"
      label="Search"
      solo
      single-line
    >
    </v-text-field>
    <div v-if="articles.length">
      <v-data-table
        style="width: 100%"
        :headers="headers"
        :items="articles"
        :items-per-page="10"
        :search="search"
        @click:row="openDetail"
      ></v-data-table>
    </div>
    <div v-else>
      <v-text-field v-model="search" label="Search" solo single-line>
      </v-text-field>
      <div v-if="articles.length">
        <v-data-table
          style="width: 100%"
          :headers="headers"
          :items="articles"
          :items-per-page="10"
          :search="search"
          @click:row="openDetail"
        ></v-data-table>
      </div>
    </div>
    <v-btn color="#A4D9FF" @click="moveWrite()">등록</v-btn>
  </v-container>
</template>

<script>
import axios from "@/util/axios";

export default {
  name: "QnaBoardList",
  components: {},
  data: () => ({
    search: "",
    headers: [
      {
        text: "번호",
        value: "articleNo",
        sortable: false,
        width: "10%",
        align: "center",
      },
      {
        text: "제목",
        value: "subject",
        sortable: false,
        width: "55%",
        align: "end",
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
        subject: "등록된 글이 없습니다.",
        userName: "",
        registerTime: "",
        readCount: "",
      },
    ],
  }),
  created() {
    axios({
      url: "/qna/search",
      method: "post",
      data: JSON.stringify({
        userNo: "2",
      }),
    }).then(({ data }) => {
      data.data.forEach((element) => {
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
        console.log(element.registerTime);
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
        console.log(element.modifiedTime);
      });

      this.articles = data.data;
      console.log(data);
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "qnaBoardWriter" });
    },
    openDetail(val) {
      this.$router.push({
        name: "qnaBoardDetail",
        params: { articleNo: val.articleNo },
      });
    },
  },
};
</script>
