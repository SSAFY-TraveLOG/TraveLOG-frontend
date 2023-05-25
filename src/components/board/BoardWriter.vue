<template>
  <v-sheet class="d-flex align-center justify-center" width="100%">
    <board-input-item type="write"></board-input-item>
  </v-sheet>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem.vue";

export default {
  name: "BoardWriter",
  components: {
    BoardInputItem,
  },
};
</script>