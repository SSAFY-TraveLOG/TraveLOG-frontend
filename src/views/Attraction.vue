<template>
  <div>
    <AttractionSearchBar/>
    <div>여기 관광지 검색 만들어야함</div>
    <AttractionList />
  </div>
</template>

<script>
import AttractionSearchBar from '@/components/attraction/AttractionSearchBar';
import AttractionList from '@/components/attraction/AttractionList'

export default {
  name: "AttractionPage",
  components: {
    AttractionSearchBar,
    AttractionList,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
