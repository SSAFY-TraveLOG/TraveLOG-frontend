<template>
  <div>
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
  </div>
</template>

<script>
import axios from "@/util/axios";

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
      if (confirm("정말로 삭제?")) {
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
