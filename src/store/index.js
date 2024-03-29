import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  userId: "",
  userName: "",
  userNo: "",
  userImage: "",
  travelTitle: "",
  travelDescription: "",
  travelAuthority: 0,
  travelDate: [],
  travelParticipants: [],
  travelSidoCode: 0,
  travelGugunCode: 0,
  travelRoutes: [],
  planNo: 0,
  planHandle: "",
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [createPersistedState()],
});
