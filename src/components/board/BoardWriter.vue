<template>
    <div>
        <div>꿀팁 내놔</div>
        <board-input-item type="write"></board-input-item>
    </div>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem.vue";

export default {
  name: "BoardWriter",
  components: {
    BoardInputItem,
  },
}
</script>