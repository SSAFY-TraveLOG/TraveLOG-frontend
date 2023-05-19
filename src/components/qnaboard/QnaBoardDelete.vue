<template>
  <div>
    <h3>글목록</h3>
    <b-alert show variant="danger">삭제처리중...</b-alert>
  </div>
</template>

<script>
import axios from "@/util/axios";

export default {
  name: "QnaBoardDelete",
  created() {
    axios.delete(`/qna/delete/${this.$route.params.articleNo}`).then(({ data }) => {
      let msg = "삭제 처리시 문제가 발생했습니다.";
      if (data === "OK") {
        msg = "삭제가 완료되었습니다.";
      }
      alert(msg);
      // 현재 route를 /list로 변경.
      this.$router.push({ name: "qnaBoardList" });
    });
  },
};
</script>

<style></style>
