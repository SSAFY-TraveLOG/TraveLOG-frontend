<template>
  <div class="container">
    <p>AttractionList</p>

    <div v-if="attractions.length">
      <table>
        <thead>
          <tr>
            <th>대표이미지</th>
            <th>관광지명</th>
            <th>주소</th>
            <th>저장</th>
          </tr>
        </thead>
        <tbody>
          <AttractionListItem
            v-for="attraction in attractions" :key="attraction.contentId" v-bind="attraction"
          ></AttractionListItem>
        </tbody>
      </table>
    </div>
    <div v-else>조건에 맞는 관광지가 없습니다.</div>
  </div>
</template>

<script>
import AttractionListItem from "@/components/attraction/AttractionListItem"
import { mapGetters } from "vuex";

export default {
  name: 'AttractionList',
  components: {
    AttractionListItem
  },
  data() {
    return {
    };
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(["attractions"]),
  }
};
</script>

<style scoped></style>