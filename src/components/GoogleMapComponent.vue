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
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import gmapsInit from "./gmaps";
import USGSOverlay from "./USGSOverlay.js";
export default {
  name: "GoogleMapComponent",
  data() {
    return {
      map: null,
      google: null,
      overlay: null
    };
  },
  computed: {},
  created() {
    let me = this;
    gmapsInit().then(() => {
      me.map = new google.maps.Map(me.$refs.map, me.option);

      me.map.setCenter(me.center);
      me.$emit("ready");
    });
  },

  props: {
    option: {
      type: Object,
      default: () => ({
        zoom: 9
      })
    },
    center: {
      type: Object,
      default: () => ({ lat: 21.0228161, lng: 105.801944 })
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
    createdMarker(position, iconurl, content, isDragable = false) {
      let me = this;
      var icon = null;
      if (iconurl) {
        icon = {
          url: iconurl,
          size: new google.maps.Size(50, 50)
        };
      }
      let marker1 = new google.maps.Marker({
        position: position,
        map: this.map,
        draggable: isDragable,
        icon: icon
      });
      marker1.content = content;
      marker1.addListener("click", function(event) {
        me.$emit("clickmarker", event, marker1);
      });
      marker1.addListener("dragend", function(event) {
        me.$emit("dragend", event, marker1);
      });

      return marker1;
    },

    //Hàm vẽ mũi tên chỉ đường
    createdArrow(path, color) {
      let me = this;
      var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeColor: color,
        fillColor: color,
        scale: 2
      };
      var circleSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "red",
        fillColor: "red",
        scale: 3
      };

      var icons = [
        {
          icon: lineSymbol,
          offset: "100%"
        }
      ];
      var iconsCircle = [
        {
          icon: circleSymbol,
          offset: "100%"
        }
      ];
      // Create the polyline and add the symbol via the 'icons' property.
      var i = 0;
      for (; i < path.length - 1; i++) {
        var line = new google.maps.Polyline({
          path: [path[i], path[i + 1]],
          strokeColor: color
        });
        if ((i + 1) % 20 == 0) {
          line.setOptions({ icons: icons });
        }
        line.setMap(me.map);
        me.setCenter(path[i]);
      }

      var line = new google.maps.Polyline({
        path: [path[i], path[i]],
        strokeColor: color,
        icons: iconsCircle
      });
      line.setMap(me.map);
      me.setCenter(path[i]);
    },
    /**
     * Lập lộ trình đi từ điểm A đến B,
     *
     */
    calcRoute(origin, destination, color) {
      let me = this;
      var directionsService = new google.maps.DirectionsService();
      // var directionsDisplay = new google.maps.DirectionsRenderer();
      // directionsDisplay.setOptions({
      //   polylineOptions: {
      //     strokeColor: color
      //   },
      //   suppressMarkers: true,
      //   draggable: false
      // });
      // directionsDisplay.setMap(this.map);
      // // directionsDisplay.setOption({});
      var request = {
        origin: origin.lat + "," + origin.lng,
        destination: destination.lat + "," + destination.lng,
        travelMode: "DRIVING"
      };

      directionsService.route(request, function(result, status) {
        if (status == "OK") {
          // var _route = result.routes[0].legs[0];
          var path = result.routes[0].overview_path;
          me.createdArrow(path, color);
        }
      });
    },
    geocode: function(address) {
      // var ưder = new google.maps.Geocoder();
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCgBE4hSryEhlwDwTlIagZSJXY-wpp_-N0`;

      var geocoder = new google.maps.Geocoder();
      var promiseObj = new Promise(function(resolve, reject) {
        // axios
        //   .get(url)
        //   .then(res => {
        //     if (res.data.status == "OK") {
        //       resolve(res.data.results[0].geometry.location);
        //     } else {
        //       reject(res);
        //     }
        //   })
        //   .catch(err => {
        //     reject(err);
        //   });
        geocoder
          .geocode(address)
          .then(res => {
            resolve(res.latLng);
          })
          .catch(err => {
            reject(err);
          });
      });

      return promiseObj;
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