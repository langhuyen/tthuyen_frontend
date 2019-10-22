<template>
  <div class="map" style="height:600px; width:600px" ref="map"></div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import gmapsInit from "./gmaps";
export default {
  name: "GoogleMapComponent",
  data() {
    return {
      map: null,
      google: null
    };
  },
  computed: {},
  async created() {
    this.google = await gmapsInit();
    var chicago = new this.google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom: 7,
      center: chicago
    };
    this.map = new this.google.maps.Map(this.$refs.map, mapOptions);
    this.createdMarker(chicago, "./mooc.png");
  },
  props: {},
  methods: {
    /**
     * TThuyen
     * Tao 1 marker
     */
    createdMarker(position, iconurl) {
      var icon = null;
      if (iconurl) {
        icon = {
          url: iconurl,
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(50, 50)
          // The origin for this image is (0, 0).
          // origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          // anchor: new google.maps.Point(0, 32)
        };
      }
      var text = {
        color: "red",
        fontSize: "12px",
        fontWeight: "bold",
        text: "Cang hai Phong",
        top: "-10px"
      };
      var infowindow = new google.maps.InfoWindow({
        content: "Cang hai Phong",
        color: "red",
        fontSize: "12px",
        fontWeight: "bold"
      });
      let marker1 = new this.google.maps.Marker({
        position: position,
        map: this.map,
        // label: text,
        draggable: true,
        icon: icon
      });

      infowindow.open(this.map, marker1);
    }
  }
};
</script>
