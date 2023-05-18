<template>
    <div>
        여기 게시판 만들어야함
        <!-- <router-view
        :articles="articles"
        @get-articles="getArticles"
        @write-articles="writeArticle"
        ></router-view>
        <hr>
        <board-list></board-list>

        <router-link>글 쓰기</router-link> -->
        <router-view></router-view>
    </div>
</template>

<script>
// import axios from "axios";
// import BoardList from '@/components/board/BoardList.vue';

// const baseUrl = `http://15.164.228.215:8080/board`
export default {
    name: "QnaBoardPage",
    // components: {BoardList},
    // data() {
    //     return {
    //         articles: [],
    //     };
    // },
    // created() {
    //     this.getArticles();
    // },
    // methods: {
    //     getArticles() {
    //         axios({
    //             url: baseUrl + `/search`,
    //             method: "get"
    //         })
    //         .then((response) => {
    //             console.log(response);
    //             this.articles = response.data.data;
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //     },
    //     writeArticle(article) {
    //         axios({
    //             url: baseUrl + `/write`,
    //             method: "post",
    //             data: article,
    //         })
    //         .then(() => {
    //             this.getArticles()
    //             this.$router.push("/board")
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //     }
    // },
};
</script>

<style scoped></style>
