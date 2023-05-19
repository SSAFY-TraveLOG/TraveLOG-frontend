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

let setAttractions = ({ commit }, data) => {
    commit("Attractions", data);
};

// 백엔드에서 반환한 결과값을 가지고 로그인 성공 실패 여부를 vuex에 넣어준다.
let processResponse = (store, response) => {
    setUserId(store, response.userId);
    setUserNo(store, response.userNo);
    setUserName(store, response.userName);
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
            console.log("before", store);
            processResponse(store, response.data.data);

            console.log("after", store);
        });

    return store.getters.getUserId; // 로그인 결과를 리턴한다
};

const logoutApi = async (store) => {
    console.log("logoutApi");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserId(store, null);
    setUserNo(store, null);
    setUserName(store, null);

    console.log(store);
};

const searchAttractions = async (store, { sidoCode, gugunCode, contentTypeId, word }) => {
    let query = `/attraction/search?`
    if (sidoCode != null) {
        query += `sido-code=${sidoCode}&`;
    }
    if (gugunCode != null) {
        query += `gugun-code=${gugunCode}&`;
    }
    if (contentTypeId != null) {
        query += `content-type-id=${contentTypeId}&`;
    }
    if (word != null) {
        query += `word=${word}&`;
    }
    axios.get(query.slice(0, -1))
      .then(({data}) => {
        console.log(query.slice(0, -1))
        console.log(`searchAttractions`)
        console.log(sidoCode, gugunCode, contentTypeId, word);
        console.log(data)
        setAttractions(store, data.data);
      });
};

export default {
    loginApi,
    logoutApi,
    searchAttractions,
};
