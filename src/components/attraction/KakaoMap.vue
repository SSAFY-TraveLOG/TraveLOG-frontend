<template>
  <div id="map" class="mt-3" style="width: 100%; height: 400px"></div>
</template>

<script>
export default {
  name: "KakaoMap",
  props: {
  },
  data() {
    return {
      map: null,
      imageSrc: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      markers: [],
    }
  },
  created() {
    this.loadScript();
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=34b2b54b0d95de95256f503879af6ed1&autoload=false";
      script.onload = () => {
        window.kakao.maps.load(this.loadMap);
      };
      document.head.appendChild(script);
    },
    loadMap(attractions) {
      console.log(`loadMap`)
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 5,
      };
      this.map = new window.kakao.maps.Map(container, options);
      if (attractions?.length)
        this.loadMarker(attractions.slice(0, Math.min(attractions.length, 10)));
    },
    loadMarker(attractions) {
      console.log(`loadMarker`)
      console.log(attractions.length)
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      const positions = [];
      attractions.forEach((attraction) => {
        positions.push({title: attraction.title, latlng: new window.kakao.maps.LatLng(attraction.latitude, attraction.longitude)});
      });
      this.markers.splice(0);
      positions.forEach((position) => {
        const imageSize = new window.kakao.maps.Size(24, 35);
        const markerImage = new window.kakao.maps.MarkerImage(this.imageSrc, imageSize);
        const marker = new window.kakao.maps.Marker({
          map: this.map,
          position: position.latlng,
          title: position.title,
          image: markerImage,
        });
        marker.setMap(this.map);
        this.markers.push(marker);
      });
      console.log(positions)
      this.moveCenter(positions[0].latlng.getLat(), positions[0].latlng.getLng());
    },
    moveCenter(lat, lng) {
      this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
      this.map.setLevel(5);
    }
  },
}
</script>

<style>

</style>