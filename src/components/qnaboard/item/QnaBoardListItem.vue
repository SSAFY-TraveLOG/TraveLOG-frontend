<template>
  <tr>
    <td>{{articleNo}}</td>
    <th>
    <router-link 
      :to="{ name: 'qnaBoardDetail', params: { articleNo: articleNo } }"
    >{{subject}}</router-link>
    </th>
    <td>{{userName}}</td>
    <td>{{registerTime}}</td>
    <td>{{readCount}}</td>
  </tr>
</template>

<script>
import moment from "moment";

export default {
  name: "QnaBoardListItem",
  props: {
    articleNo: Number,
    subject: String,
    userName: String,
    registerTime: String,
    readCount: Number,
  },
  filters: {
    dateFormat(registerTime) {
      return moment(new Date(registerTime)).format("YY.MM.DD");
    },
  },
}
</script>

<style>

</style>