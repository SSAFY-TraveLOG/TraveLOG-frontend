<template>
  <v-sheet
    class="ma-5 pt-4 pa-7 d-flex flex-column justify-start"
    color="white"
    elevation="5"
    min-height="800px"
    rounded
  >
    <v-container>
      <v-divider class="mb-3"></v-divider>
      <h3>{{ article.subject }}</h3>
      <h6>작성자 : {{ article.userName }} | {{ article.registerTime }}</h6>
      <v-divider class="mt-3 mb-3"></v-divider>
      <span>
        {{ article.content }}
      </span>
      <v-divider class="mt-3 mb-3"></v-divider>
      <v-container class="d-flex flex-row justify-end">
        <v-btn class="mr-3" @click="listArticle"> 목록 </v-btn>
        <v-btn
          class="mr-3"
          @click="moveModifyArticle"
          v-if="article.userNo == this.userNo || this.userNo == 1"
        >
          수정
        </v-btn>
        <v-btn
          @click="deleteArticle"
          v-if="article.userNo == this.userNo || this.userNo == 1"
        >
          삭제
        </v-btn>
      </v-container>
    </v-container>
  </v-sheet>
  <!-- <div>
    <div v-if="article != null">
      <div>{{ article.subject }}</div>
      <div>{{ article.userName }}</div>
      <div>{{ article.registerTime }}</div>
      <div>{{ article.content }}</div>
    </div>
    <div v-if="article == null">
      <div>접근 권한이 없는 게시글입니다.</div>
    </div>
    <button @click="moveModifyArticle">수정</button>
    <button @click="deleteArticle">삭제</button>
  </div> -->
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";

export default {
  name: "QnaBoardDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
    ...mapGetters({ userNo: "getUserNo" }),
  },
  created() {
    console.log(this.$route.params.articleNo);
    axios
      .post(`/qna/view/${this.$route.params.articleNo}`, { userNo: "2" })
      .then(({ data }) => {
        console.log(data);
        this.article = data.data;
      });
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "qnaBoardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "qnaBoardModify",
        params: { articleNo: this.article.articleNo },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "qnaBoardDelete",
          params: { articleNo: this.article.articleNo },
        });
      }
    },
  },
};
</script>

<style></style>
