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

// 백엔드에서 반환한 결과값을 가지고 로그인 성공 실패 여부를 vuex에 넣어준다.
const processLogin = (store, data) => {
  console.log("processLogin");
  console.log(data);
  setUserId(store, data.userId);
  setUserNo(store, data.userNo);
  setUserName(store, data.userName);
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
};
