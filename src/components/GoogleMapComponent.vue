<!--
option={
  center:{
    lat:10,
    lng:10,
  },
  zoom:10,
  maxZoom:11,
  minZoom:9,
  disableDefaultUI:false,
  draggable:true,
  mapTypeId:google.maps.MapTypeId.ROADMAP,
  zoomControlOptions:{
    position:google.maps.ControlPosition.LEFT_BOTTOM,
    style:google.maps.ZoomControlStyle.DEFAULT,
  },
  panControlOptions:{
    position:google.maps.ControlPosition.LEFT_BOTTOM,
  }
}

-->
<template>
  <div class="map" style="height:100%; width:100%" ref="map"></div>
  <!-- <div class="infomation">
      <div class="row mb-12-px">
        <div class="title-info">Xuất phát:</div>
        <div class="data-info">hà nội</div>
      </div>
      <div class="row mb-12-px">
        <div class="title-info">Xuất phát:</div>
        <div class="data-info">hà nội</div>
      </div>
      <div class="row mb-12-px">
        <div class="title-info">Xuất phát:</div>
        <div class="data-info">hà nội</div>
      </div>
      <div class="row mb-12-px">
        <div class="title-info">Xuất phát:</div>
        <div class="data-info">hà nội</div>
      </div>
  </div>-->
  <!-- ] -->
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
  created() {
    let me = this;
    this.google = gmapsInit().then(() => {
      me.map = new google.maps.Map(me.$refs.map, me.option);
      me.map.setCenter(me.center);
      me.createdMarker(me.center);
      // this.map.addLis;
    });
    // var chicago = new this.google.maps.LatLng(41.850033, -87.6500523);
    // this.calcRoute();
  },

  props: {
    option: {
      type: Object,
      default: () => ({
        zoom: 15
      })
    },
    center: {
      type: Object,
      default: () => ({
        lat: 10.173007011413574,
        lng: 105.93197631835938
      })
    }
  },
  methods: {
    /**
     * Xử lý lắng nghe sự kiện
     */
    handleEvent() {
      this.map.addListener("center_changed", function(event, item) {
        me.$emit();
      });
      this.map.addListener("click", function(event, item) {
        me.$emit("click", event);
      });
    },
    /**
     *
     */
    setCenter(center) {
      this.map.setCenter(center);
    },

    /**
     * TThuyen
     * Tao 1 marker
     */
    createdMarker(position, iconurl, label, content, isDragable = false) {
      let me = this;
      var icon = null;
      // if (iconurl) {
      icon = {
        url: "./" + iconurl
        // This marker is 20 pixels wide by 32 pixels high.
        // size: new google.maps.Size(50, 50)
        // The origin for this image is (0, 0).
        // origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        // anchor: new google.maps.Point(0, 32)
      };
      // }
      // var text = {
      //   color: "#212121",
      //   fontSize: "12px",
      //   fontWeight: "bold",
      //   text: text,
      //   top: "-10px"
      // };
      var infowindow = new google.maps.InfoWindow({
        content: label,
        color: "#c1c1c1",
        fontSize: "8px",
        fontWeight: "bold"
      });
      let marker1 = new google.maps.Marker({
        position: position,
        map: this.map,
        draggable: isDragable,
        icon: icon
      });
      marker1.content = content;
      marker1.addListener("click", function(event) {
        infowindow.open(this.map, marker1);
        me.$emit("clickmarker", event, marker1);
      });
      marker1.addListener("dragend", function(event) {
        me.$emit("dragend", event, marker1);
      });

      return marker1;
    },
    /**
     * Lập lộ trình đi từ điểm A đến B,
     *
     */
    calcRoute(origin, destination, color) {
      let me = this;
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setOptions({
        polylineOptions: {
          strokeColor: color
        },
        suppressMarkers: true,
        draggable: false
      });
      directionsDisplay.setMap(this.map);
      // directionsDisplay.setOption({});
      var request = {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING"
      };
      directionsService.route(request, function(result, status) {
        if (status == "OK") {
          var _route = result.routes[0].legs[0];
          var path = result.routes[0].overview_path;

          // me.createdMarker(_route.start_location, icon);
          // me.createdMarker(_route.end_location, origin);
          directionsDisplay.setDirections(result);
          console.log(directionsDisplay.getDirections());
          directionsDisplay.addListener("directions_changed", e => {
            console.log(directionsDisplay.getDirections());
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.google-map {
  display: flex;
}
.row,
.flex {
  display: flex;
}
</style>