<template>
  <div class="container">
    <p>BoardList</p>

    <div v-if="articles.length">
      <table class="user-list">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <qna-board-list-item
            v-for="article in articles" :key="article.articleNo" v-bind="article"
          ></qna-board-list-item>
        </tbody>
      </table>
    </div>
    <div v-else>등록된 게시글이 없습니다.</div>

    <button @click="moveWrite()">등록</button>
  </div>
</template>
<script>
import axios from "@/util/axios";
import QnaBoardListItem from "@/components/qnaboard/item/QnaBoardListItem"

export default {
  name: "QnaBoardList",
  components: {
    QnaBoardListItem,
  },
  data() {
    return {
      articles: [],
    }
  },
  created() {
    axios({
      url: "/qna/search",
      method: "post",
      data: JSON.stringify ({
        userNo: "2"
      })
    }).then(({data}) => {
      this.articles = data.data
      console.log(data)
    })
  },
  methods: {
    moveWrite() {
      this.$router.push({ name : "qnaBoardWriter"});
    }
  },
};
</script>
