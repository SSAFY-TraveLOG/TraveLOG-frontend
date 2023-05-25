<template>
  <v-sheet
    class="ma-5 pa-4 d-flex flex-column"
    color="white"
    elevation="5"
    min-height="800px"
    rounded
  >
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-sheet>
            <v-row>
              <v-col cols="3">
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
              </v-col>
              <v-col cols="3">
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
              </v-col>
              <v-col cols="3">
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
              </v-col>
              <v-col cols="23">
                <v-text-field
                  hide-details="true"
                  v-model="word"
                  label="Search"
                  clearable
                  solo
                  single-line
                  @keyup.enter="pressSearch()"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <KakaoMap ref="kakaoMapRef" />

            <div class="d-flex flex-column" v-if="attractions.length">
              <v-data-table
                class="align-self-center"
                style="width: 100%"
                :headers="headers"
                :items="attractions"
                :items-per-page="10"
                hide-default-footer
                :page.sync="page"
                @page-count="pageCount = $event"
              >
                <template v-slot:item="{ item }">
                  <tr :key="item.contentId" @click="moveCenter(item.displayNo)">
                    <td>{{ item.displayNo }}</td>
                    <AttractionTitle :contentId="item.contentId" />
                    <td>{{ item.addr1 }}</td>
                    <td>{{ item.attractionLike }}</td>
                    <td>
                      <v-btn
                        @click="
                          addRoute({
                            contentId: item.contentId,
                            firstImage: item.firstImage,
                            title: item.title,
                            addr1: item.addr1,
                          })
                        "
                        >추가</v-btn
                      >
                    </td>
                  </tr>
                </template>
              </v-data-table>
              <div class="text-center pt-2">
                <v-pagination
                  v-model="page"
                  total-visible="7"
                  :length="pageCount"
                ></v-pagination>
              </div>
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
        </v-col>
        <v-col cols="6">
          <span class="text-center">
            <v-row>
              <v-col>
                <h1>여행 경로 리스트</h1>
              </v-col>
              <v-col cols="1">
                <v-btn @click="writePlan">저장</v-btn>
              </v-col>
            </v-row>
          </span>
          <div v-for="i in duration" :key="i">
            <v-card @click="focus = i" :class="{ active: focus === i }">
              <v-card-title>Day {{ i }}</v-card-title>
              <v-card-subtitle>{{ days[i - 1] }}</v-card-subtitle>
              <draggable
                :list="routes[i - 1]"
                handle=".handle"
                group="route"
                style="margin: 0 10px;"
              >
                <div
                  class="handle"
                  v-for="(element, idx) in routes[i - 1]"
                  :key="element.contentId"
                >
                  <v-row>
                    <v-col
                      cols="1"
                      style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <font-awesome-icon :icon="['fas', 'align-justify']" />
                    </v-col>
                    <v-col cols="5">
                      <img
                        :src="element.firstImage"
                        alt="이미지"
                        width="100%"
                      />
                    </v-col>
                    <v-col cols="5">
                      <v-row>
                        <v-col>
                          {{ element.title }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          {{ element.addr1 }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <input
                            type="text"
                            class="form-control"
                            v-model="element.description"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1"
                      style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <font-awesome-icon
                        :icon="['fas', 'xmark']"
                        @click="removeAt(i, idx)"
                      />
                    </v-col>
                  </v-row>
                </div>
              </draggable>
              <rawDisplayer class="col-3" :value="routes[i - 1]" title="List" />
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
import AttractionTitle from "@/components/attraction/AttractionTitle";
import KakaoMap from "@/components/attraction/KakaoMap";

export default {
  name: "RouteInput",
  components: {
    AttractionTitle,
    KakaoMap,
    draggable,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      focus: 1,
      days: [],
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
        {
          text: "추가",
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
          type: "관광지",
          id: 12,
        },
        {
          type: "문화시설",
          id: 14,
        },
        {
          type: "축제공연행사",
          id: 15,
        },
        {
          type: "여행코스",
          id: 25,
        },
        {
          type: "레포츠",
          id: 28,
        },
        {
          type: "숙박",
          id: 32,
        },
        {
          type: "쇼핑",
          id: 38,
        },
        {
          type: "음식점",
          id: 39,
        },
      ],
      sidos: [
        {
          sido: "서울",
          code: 1,
        },
        {
          sido: "인천",
          code: 2,
        },
        {
          sido: "대전",
          code: 3,
        },
        {
          sido: "대구",
          code: 4,
        },
        {
          sido: "광주",
          code: 5,
        },
        {
          sido: "부산",
          code: 6,
        },
        {
          sido: "울산",
          code: 7,
        },
        {
          sido: "세종특별자치시",
          code: 8,
        },
        {
          sido: "경기도",
          code: 31,
        },
        {
          sido: "강원도",
          code: 32,
        },
        {
          sido: "충청북도",
          code: 33,
        },
        {
          sido: "충청남도",
          code: 34,
        },
        {
          sido: "경상북도",
          code: 35,
        },
        {
          sido: "경상남도",
          code: 36,
        },
        {
          sido: "전라북도",
          code: 37,
        },
        {
          sido: "전라남도",
          code: 38,
        },
        {
          sido: "제주도",
          code: 39,
        },
      ],
      guguns: [],
      contentTypeId: null,
      sidoCode: null,
      gugunCode: null,
      word: null,
      duration: 0,
      routes: [],
    };
  },
  created() {
    console.log(this.description);
    console.log(this.participants);
    axios.get("/attraction/search").then(({ data }) => {
      let idx = 1;
      if (data.data != null) {
        data.data.forEach((element) => {
          element.displayNo = idx++;
        });
      }
      this.attractions = data.data;
      this.$refs.kakaoMapRef.loadMarker(
        this.attractions.slice(
          this.page * 10 - 10,
          Math.min(this.attractions.length, this.page * 10)
        )
      );
    });

    this.duration =
      Math.floor(
        (new Date(this.travelDate[1]) - new Date(this.travelDate[0])) /
          1000 /
          60 /
          60 /
          24
      ) + 1;

    const startDate = new Date(this.travelDate[0]);
    for (let i = 0; i < this.duration; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      this.days.push(currentDate.toISOString().slice(0, 10));

      this.routes.push([]);
    }
    console.log(this.routes);
  },
  methods: {
    getGuguns() {
      axios.get(`/attraction/sido/${this.sidoCode}`).then(({ data }) => {
        this.guguns = data.data;
      });
    },
    pressSearch() {
      this.attractions.splice(0);
      let query = `/attraction/search?`;
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
      axios.get(query).then(({ data }) => {
        let idx = 1;
        if (data.data != null) {
          data.data.forEach((element) => {
            element.displayNo = idx++;
          });
        }
        this.attractions = data.data;
        this.page = 1;
        this.$refs.kakaoMapRef.loadMarker(
          this.attractions.slice(
            this.page * 10 - 10,
            Math.min(this.attractions.length, this.page * 10)
          )
        );
      });
    },
    moveCenter(index) {
      index--;
      this.$refs.kakaoMapRef.moveCenter(
        this.attractions[index].latitude,
        this.attractions[index].longitude
      );
    },
    addRoute(route) {
      this.routes[this.focus - 1].push(route);
      console.log(this.routes);
    },
    deleteRoute(i, index) {
      console.log(i);
      console.log(index);
      this.routes[i - 1].splice(index, 1);
      console.log(this.routes);
    },
    removeAt(index, idx) {
      this.routes[index - 1].splice(idx, 1);
    },
    writePlan() {
      const routes = this.makeRoutes();
      console.log({
        title: this.title,
        description: this.description,
        authority: this.authority,
        hostNo: this.userNo,
        startDate: this.travelDate[0],
        endDate: this.travelDate[1],
        participants: this.participants,
        routes: routes,
        sidoCode: this.travelSidoCode,
        gugunCode: this.travelGugunCode,
      });
      axios
        .post(`/plan`, {
          title: this.title,
          description: this.description,
          authority: this.authority,
          hostNo: this.userNo,
          startDate: this.travelDate[0],
          endDate: this.travelDate[1],
          participants: this.participants,
          routes: routes,
          sidoCode: this.travelSidoCode,
          gugunCode: this.travelGugunCode,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.status === "OK") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
    moveList() {
      this.$router.push({ name: "planList" });
    },
    makeRoutes() {
      const routes = [];
      const startDate = new Date(this.travelDate[0]);
      this.routes.forEach((route, i) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        console.log(currentDate);

        route.forEach((r, j) => {
          routes.push({
            planOrder: j + 1,
            contentId: r.contentId,
            visitDate: currentDate.toISOString().slice(0, 10),
            description: r.description,
          });
        });
      });
      console.log(routes);
      return routes;
    },
  },
  computed: {
    ...mapGetters({
      userNo: "getUserNo",
      travelDate: "getTravelDate",
      title: "getTravelTitle",
      description: "getTravelDescription",
      authority: "getTravelAuthority",
      participants: "getTravelParticipants",
      travelSidoCode: "getTravelSidoCode",
      travelGugunCode: "getTravelGugunCode",
    }),
  },
  watch: {
    page(newPage) {
      this.$refs.kakaoMapRef.loadMarker(
        this.attractions.slice(
          newPage * 10 - 10,
          Math.min(this.attractions.length, newPage * 10)
        )
      );
    },
  },
};
</script>

<style scoped>
.col {
  padding: 6px;
}
.active {
  border: 1px solid black;
  margin: 20px 0;
}
</style>
