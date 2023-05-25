<template>
  <div>
    <b-alert show variant="danger">삭제처리중...</b-alert>
  </div>
</template>

<script>
import axios from "@/util/axios";

export default {
  name: "PlanDelete",
  created() {
    axios.delete(`/plan/${this.$route.params.planNo}`).then(({ data }) => {
      let msg = "삭제 처리시 문제가 발생했습니다.";
      if (data.status == "OK") {
        msg = "삭제가 완료되었습니다.";
      }
      alert(msg);
      // 현재 route를 /list로 변경.
      this.$router.push({ name: "planList" });
    });
  },
};
</script>

<style></style>
