<template>
  <div class="container">
    <p>BoardList</p>

    <div>
      <select name="" id="" v-model="key">
        <option v-for="obj in keys" :key="obj.articleNo" :value="obj.name">
          {{obj.desc}}
        </option>
      </select>
      <input type="text" v-model="word">
      <button @click="searchArticles">검색</button>
    </div>

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
      key: 'subject',
      keys: [
        {
          name: "subject", desc: "제목"
        },
        {
          name: "content", desc: "내용"
        },
        {
          name: "userName", desc: "작성자"
        },
      ],
      word: '',
    }
  },
  created() {
    axios({
      url: "/board/search",
      method: "get"
    }).then(({data}) => {
      this.articles = data.data
    })
  },
  methods: {
    moveWrite() {
      this.$router.push({ name : "boardWriter"});
    },
    searchArticles() {
      axios.get(`/board/search?key=${this.key}&word=${this.word}`)
      .then(({data}) => {
        console.log(data.data);
        this.articles = data.data;
      });
    }
  },
};
</script>
