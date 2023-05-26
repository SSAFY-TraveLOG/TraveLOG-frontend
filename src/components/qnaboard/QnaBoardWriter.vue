<template>
  <v-sheet class="d-flex align-center justify-center" width="100%">
    <qna-board-input-item type="write"></qna-board-input-item>
  </v-sheet>
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