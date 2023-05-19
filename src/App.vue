<template>
  <v-app>
    <TheHeader />
    <div>
      <router-view />
    </div>
  </v-app>
</template>
<script>
import TheHeader from "./components/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
#app {
  font-family: "Nanum Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
}
* {
  margin: 0;
}
</style>
