import axios from "@/util/axios";

let setUserId = ({ commit }, data) => {
  commit("UserId", data);
};

let setUserNo = ({ commit }, data) => {
  commit("UserNo", data);
};

let setUserName = ({ commit }, data) => {
  commit("UserName", data);
};

let setTravelTitle = (store, data) => {
  store.commit("TravelTitle", data);
};

let setTravelDescription = (store, data) => {
  store.commit("TravelDescription", data);
};

let setTravelAuthority = (store, data) => {
  store.commit("TravelAuthority", data);
};

let setTravelDate = (store, data) => {
  store.commit("TravelDate", data);
};

let setTravelParticipants = (store, data) => {
  store.commit("TravelParticipants", data);
};

// 백엔드에서 반환한 결과값을 가지고 로그인 성공 실패 여부를 vuex에 넣어준다.
let processResponse = (store, response) => {
  setUserId(store, response.userId);
  setUserNo(store, response.userNo);
  setUserName(store, response.userName);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.token.accessToken}`;
  localStorage.setItem("accessToken", response.token.accessToken);
  localStorage.setItem("refreshToken", response.token.refreshToken);
};

const loginApi = async (store, { userId, password }) => {
  axios
    .post(`/auth/check`, {
      userId: userId,
      password: password,
    })
    .then((response) => {
      processResponse(store, response.data.data);
    });

  return store.getters.getUserId; // 로그인 결과를 리턴한다
};

const logoutApi = async (store) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  setUserId(store, null);
  setUserNo(store, null);
  setUserName(store, null);

  delete axios.defaults.headers.common["Authorization"];
};

export default {
  loginApi,
  logoutApi,
  setTravelTitle,
  setTravelDescription,
  setTravelAuthority,
  setTravelDate,
  setTravelParticipants,
};
