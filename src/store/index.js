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
  travelTitle: "",
  travelDescription: "",
  travelAuthority: 0,
  travelDate: [],
  travelParticipants: [],
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [createPersistedState()],
});
