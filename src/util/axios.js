import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://15.164.228.215:8080",
  headers: {
    "Content-type": "application/json",
  },
});