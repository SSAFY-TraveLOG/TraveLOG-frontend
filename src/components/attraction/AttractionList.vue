<template>
  <v-sheet
    class="ma-5 pa-4 d-flex flex-column"
    color="white"
    elevation="5"
    min-height="800px"
    rounded
  >
    <h1 class="align-self-center mb-5">관광지 검색</h1>
    <v-sheet
      class="d-flex flex-row align-center align-self-center justify-center ma-1"
      color="white"
      height="50px"
      width="100%"
    >
      <v-sheet width="150px">
        <v-select
          v-model="contentTypeId"
          hide-details="true"
          label="컨텐트타입"
          :items="contentTypes"
          item-text="type"
          item-value="id"
          solo
        >
        </v-select>
      </v-sheet>
      <v-sheet width="150px">
        <v-select
          v-model="sidoCode"
          hide-details="true"
          label="시도"
          :items="sidos"
          item-text="sido"
          item-value="code"
          solo
          @change="getGuguns()"
        >
        </v-select>
      </v-sheet>
      <v-sheet width="150px">
        <v-select
          v-model="gugunCode"
          hide-details="true"
          label="구군"
          :items="guguns"
          item-text="gugunName"
          item-value="gugunCode"
          solo
        >
        </v-select>
      </v-sheet>
      <v-text-field
        class="ml-3 mr-3 align-center"
        hide-details="true"
        v-model="word"
        label="Search"
        clearable
        solo
        single-line
        @keyup.enter="pressSearch()"
      >
      </v-text-field>
      <v-btn elevation="2" height="50px" width="100px" @click="pressSearch()"
        >검색</v-btn
      >
    </v-sheet>

    <KakaoMap ref="kakaoMapRef"/>

    <div class="d-flex flex-column" v-if="attractions.length">
      <v-data-table
        class="align-self-center"
        style="width: 100%"
        :headers="headers"
        :items="attractions"
        :items-per-page="10"
        
      >
        <template v-slot:item="{item}">
          <tr :key="item.contentId" @click="moveCenter(item.displayNo)">
            <td>{{item.displayNo}}</td>
            <AttractionTitle :contentId="item.contentId"/>
            <td>{{item.addr1}}</td>
            <td>{{item.attractionLike}}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div v-else>
      <div class="d-flex flex-column">
        <v-data-table
          style="width: 100%"
          :headers="headers"
          :items="emptyAttraction"
          :items-per-page="10"
        ></v-data-table>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import AttractionTitle from "@/components/attraction/AttractionTitle"
import KakaoMap from '@/components/attraction/KakaoMap';

export default {
  name: "AttractionList",
  components: {
    AttractionTitle,
    KakaoMap,
},
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "번호",
        value: "displayNo",
        sortable: false,
        width: "10%",
        align: "center",
      },
      {
        text: "관광지명",
        value: "title",
        sortable: false,
        width: "10%",
        align: "center",
      },
      {
        text: "주소",
        value: "addr1",
        sortable: false,
        width: "15%",
        align: "center",
      },
      {
        text: "저장",
        value: "attractionLike",
        sortable: false,
        width: "10%",
        align: "center",
      },
    ],
    attractions: [],
    emptyAttraction: [
      {
        contentId: "",
        displayNo: "",
        title: "등록된 글이 없습니다.",
        addr1: "",
        firstImage: "",
        attactionLike: "",
      },
    ],
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
      word: null,
  }),
  created() {
    axios.get("/attraction/search")
    .then(({ data }) => {
      let idx = 1;
      if (data.data != null) {
        data.data.forEach((element) => {
          element.displayNo = idx++;
        });
      }
      this.attractions = data.data;
      this.$refs.kakaoMapRef.loadMap(this.attractions);
    });
  },
  methods: {
    getGuguns() {
      axios.get(`/attraction/sido/${this.sidoCode}`)
      .then(({data}) => {
        this.guguns = data.data;
      });
    },
    pressSearch() {
      this.attractions.splice(0);
      let query = `/attraction/search?`
      if (this.sidoCode != null) {
          query += `sido=${this.sidoCode}&`;
      }
      if (this.gugunCode != null) {
          query += `gugun=${this.gugunCode}&`;
      }
      if (this.contentTypeId != null) {
          query += `id=${this.contentTypeId}&`;
      }
      if (this.word != null) {
          query += `word=${this.word}&`;
      }
      axios.get(query)
      .then(({ data }) => {
        let idx = 1;
        if (data.data != null) {
          data.data.forEach((element) => {
            element.displayNo = idx++;
          })
        }
        this.attractions = data.data;
        this.$refs.kakaoMapRef.loadMap(this.attractions);
      });
    },
    moveCenter(index) {
      index--;
      this.$refs.kakaoMapRef.moveCenter(this.attractions[index].latitude, this.attractions[index].longitude);
    }
  },
};
</script>