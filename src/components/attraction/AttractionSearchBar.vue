<template>
  <div>
    <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="3"
        sm="3"
      >
        <v-select
          v-model="contentTypeId"
          :items="contentTypes"
          outlined
          item-text="type"
          item-value="id"
        ></v-select>
      </v-col>

      <v-col
        class="d-flex"
        cols="3"
        sm="3"
      >
        <v-select
          v-model="sidoCode"
          :items="sidos"
          outlined
          item-text="sido"
          item-value="code"
          @change="getGuguns()"
        ></v-select>
      </v-col>

      <v-col
        class="d-flex"
        cols="3"
        sm="3"
      >
        <v-select
          v-model="gugunCode"
          :items="guguns"
          outlined
          item-text="gugunName"
          item-value="gugunCode"
        ></v-select>
      </v-col>

      <!-- <v-col
          cols="12"
          sm="6"
          md="3"
        > -->
        <v-col
        class="d-flex"
        cols="3"
        sm="3"
      >
          <v-text-field
            v-model="word"
            outlined
          ></v-text-field>
        </v-col>
      
      <!-- <v-col
          cols="12"
          sm="6"
          md="3"
        > -->
        <v-col
        class="d-flex"
        cols="3"
        sm="3"
      >
          <v-btn @click="moveAttractionList()">검색</v-btn>
        </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import axios from "@/util/axios";
import { mapActions } from "vuex";

export default {
  name: 'AttractionSearchBar',
  data() {
    return {
      contentTypes: [
        {
          type: "관광지", id: 12
        },
        {
          type: "문화시설", id: 14
        },
        {
          type: "축제공연행사", id: 15
        },
        {
          type: "여행코스", id: 25
        },
        {
          type: "레포츠", id: 28
        },
        {
          type: "숙박", id: 32
        },
        {
          type: "쇼핑", id: 38
        },
        {
          type: "음식점", id: 39
        },
      ],
      sidos: [
        {
          sido: "서울", code: 1
        },
        {
          sido: "인천", code: 2
        },
        {
          sido: "대전", code: 3
        },
        {
          sido: "대구", code: 4
        },
        {
          sido: "광주", code: 5
        },
        {
          sido: "부산", code: 6
        },
        {
          sido: "울산", code: 7
        },
        {
          sido: "세종특별자치시", code: 8
        },
        {
          sido: "경기도", code: 31
        },
        {
          sido: "강원도", code: 32
        },
        {
          sido: "충청북도", code: 33
        },
        {
          sido: "충청남도", code: 34
        },
        {
          sido: "경상북도", code: 35
        },
        {
          sido: "경상남도", code: 36
        },
        {
          sido: "전라북도", code: 37
        },
        {
          sido: "전라남도", code: 38
        },
        {
          sido: "제주도", code: 39
        },
      ],
      guguns: [

      ],
      contentTypeId: null,
      sidoCode: null,
      gugunCode: null,
      word: null
    };
  },
  created() {
    this.searchAttractions({sidoCode : this.sidoCode, gugunCode:  this.gugunCode, contentTypeId : this.contentTypeId, word : this.word}); 
  },
  methods: {
    ...mapActions(["searchAttractions"]),
    moveAttractionList() {
      console.log(this.sidoCode)
      console.log(this.gugunCode)
      console.log(this.contentTypeId)
      console.log(this.word)
      this.searchAttractions({sidoCode : this.sidoCode, gugunCode:  this.gugunCode, contentTypeId : this.contentTypeId, word : this.word});      
    },
    getGuguns() {
      axios.get(`/attraction/sido/${this.sidoCode}`)
      .then(({data}) => {
        this.guguns = data.data;
      });
    }
  },
};
</script>

<style scoped></style>