<template>
  <div>
    <qna-board-input-item type="write"></qna-board-input-item>
  </div>
</template>

<script>
import QnaBoardInputItem from "@/components/qnaboard/item/QnaBoardInputItem";

export default {
  name: "QnaBoardWriter",
  components: {
    QnaBoardInputItem,
  },
};
</script>