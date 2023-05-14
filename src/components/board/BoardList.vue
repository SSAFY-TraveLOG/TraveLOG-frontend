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
          <board-list-item
            v-for="article in articles" :key="article.articleNo" v-bind="article"
          ></board-list-item>
        </tbody>
      </table>
    </div>
    <div v-else>등록된 게시글이 없습니다.</div>

    <button @click="moveWrite()">등록</button>
  </div>
</template>
<script>
import axios from "@/util/axios";
import BoardListItem from "@/components/board/item/BoardListItem"

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  data() {
    return {
      articles: [],
    }
  },
  created() {
    axios({
      url: "/board/search",
      method: "get"
    }).then(({data}) => {
      this.articles = data.data
      console.log(data)
    })
  },
  methods: {
    moveWrite() {
      this.$router.push({ name : "boardWriter"});
    }
  },
};
</script>
