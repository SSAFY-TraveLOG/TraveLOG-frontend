<template>
  <td class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          {{description.title}}
        </div>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          관광지 상세 정보
        </v-card-title>

        <img :src="description.firstImage" alt="이미지" width="100%">

        <v-card-text>
          {{description.title}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{description.attractionDescription}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </td>
</template>

<script>
import axios from "@/util/axios";

export default {
  name: "AttractionTitle",
  props: {
    contentId: Number,
  },
  data() {
    return {
      dialog: false,
      description: {},
    }
  },
  created() {
    axios.get(`/attraction/${this.contentId}`)
    .then(({data}) => {
      this.description = data.data;
    });
  }
}
</script>

<style>

</style>