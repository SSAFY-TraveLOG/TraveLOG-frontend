<template>
  <v-sheet class="d-flex align-center justify-center">
    <v-carousel
      id="landscape"
      cycle
      height="500"
      hide-delimiter-background
      :show-arrows="false"
      interval="3000"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">{{ slide }} Slide</div>
            <!-- v-img 불러서 사진 한 5개 찾아서 에셋에 넣어놓기 -->
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-sheet>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
#landscape {
  width: 1200px;
  margin-top: 30px;
}
</style>
