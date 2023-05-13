<template>
  <div>
    <TheHeader />
    <div>
      <router-view />
    </div>
  </div>
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
* {
  margin: 0;
}
</style>
