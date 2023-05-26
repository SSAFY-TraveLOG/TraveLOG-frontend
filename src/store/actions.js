import axios from "@/util/axios";

let setUserId = (store, data) => {
  store.commit("UserId", data);
};

let setUserNo = (store, data) => {
  store.commit("UserNo", data);
};

let setUserName = (store, data) => {
  store.commit("UserName", data);
};

let setUserImage = (store, data) => {
  store.commit("UserImage", data);
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

let setTravelSidoCode = (store, data) => {
  store.commit("TravelSidoCode", data);
};

let setTravelGugunCode = (store, data) => {
  store.commit("TravelGugunCode", data);
};

let setTravelRoutes = (store, data) => {
  store.commit("TravelRoutes", data);
};

let setPlanNo = (store, data) => {
  store.commit("PlanNo", data);
};

let setPlanHandle = (store, data) => {
  store.commit("PlanHandle", data);
};

// 백엔드에서 반환한 결과값을 가지고 로그인 성공 실패 여부를 vuex에 넣어준다.
const processLogin = (store, data) => {
  console.log("processLogin");
  console.log(data);
  setUserId(store, data.userId);
  setUserNo(store, data.userNo);
  setUserName(store, data.userName);
  setUserImage(store, data.image);
  // localStorage.setItem('user',JSON.stringify(userData));
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.token.accessToken}`;
  localStorage.setItem("accessToken", data.token.accessToken);
  localStorage.setItem("refreshToken", data.token.refreshToken);
};

const loginApi = async (store, { userId, password }) => {
  axios
    .post(`/auth/check`, {
      userId: userId,
      password: password,
    })
    .then((response) => {
      processLogin(store, response.data.data);
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
  processLogin,
  setTravelTitle,
  setTravelDescription,
  setTravelAuthority,
  setTravelDate,
  setTravelParticipants,
  setUserName,
  setTravelSidoCode,
  setTravelGugunCode,
  setTravelRoutes,
  setPlanNo,
  setPlanHandle,
};
