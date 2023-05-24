<template>
  <v-container class="">
    <v-card class="pa-2" color="#eeeeee" elevation="2">
      <h6>{{ comment.userName }} | {{ comment.registerTime }}</h6>
      <span>
        {{ comment.content }}
      </span>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: "QnaBoardCommentItem",
  data() {
    return {
    };
  },
  props: {
    comment: {},
  },
  created() {
    
  },
};
</script>

<style>
</style>