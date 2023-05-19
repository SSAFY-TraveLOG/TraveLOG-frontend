<template>
  <tr>
    <td>{{firstImage}}</td>
    <th>
    <router-link 
      :to="{ name: 'attractionDetail', params: { contentId: contentId } }"
    >{{title}}</router-link>
    </th>
    <td>{{addr1}}</td>
    <td>{{attractionLike}}</td>
  </tr>
</template>

<script>
export default {
  name: "AttractionListItem",
  props: {
    contentId: Number,
    firstImage: String,
    title: String,
    addr1: String,
    attractionLike: String
  },
}
</script>

<style>

</style>