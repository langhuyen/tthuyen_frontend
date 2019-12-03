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
      // // me.createdMarker(me.center, "@/../public/mooc.png");
      // var marker = me.createdMarker(me.center, null);
      me.map.setCenter(me.center);
      // me.$emit("ready");
      // USGSOverlay.prototype = new google.maps.OverlayView();
      // var bounds = new google.maps.LatLngBounds(
      //   new google.maps.LatLng(21.0228161, 105.801944),
      //   new google.maps.LatLng(21.0228161, 105.801944)
      // );
      // // InfoWindow content
      // var content =
      //   '<div ref="refid" class="iw-container">' +
      //   '<a href="https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Classes" class="iw-title">Porcelain Factory of Vista Alegre</a>' +
      //   '<div class="iw-content">' +
      //   '<div class="iw-subTitle">History</div>' +
      //   '<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
      //   '<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.</p>' +
      //   '<div class="iw-subTitle">Contacts</div>' +
      //   "<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>" +
      //   "<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>" +
      //   "</div>" +
      //   '<div class="iw-bottom-gradient"></div>' +
      //   "</div>";

      // // A new Info Window is created and set content
      // var infowindow = new google.maps.InfoWindow({
      //   content: content,

      //   // Assign a maximum value for the width of the infowindow allows
      //   // greater control over the various content elements
      //   maxWidth: 350
      // });
      // google.maps.event.addListener(marker, "click", function() {
      //   infowindow.open(me.map, marker);
      //   me.$nextTick(function() {
      //     var infoDiv = document.querySelectorAll(".iw-container");
      //     infoDiv.forEach(el =>
      //       el.addEventListener("click", function() {
      //         alert("haa");
      //       })
      //     );
      //   });
      // });

      // var srcImage =
      //   "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwixsK3k_ZbmAhV_yosBHST_BbwQjRx6BAgBEAQ&url=https%3A%2F%2Fhinhanhdephd.com%2Fmeo-con-dep-voi-nhung-anh-nen-meo-con-de-thuong%2F&psig=AOvVaw2oPfl0sKeXkRAEbyJrJM6d&ust=1575376729329058";

      // me.overlay = new USGSOverlay(bounds, srcImage, me.map);
    });
    // var chicago = new this.google.maps.LatLng(41.850033, -87.6500523);
    // this.calcRoute();
  },

  props: {
    option: {
      type: Object,
      default: () => ({
        zoom: 9
      })
    },
    //21.0228161,105.801944
    center: {
      type: Object,
      default: () => ({ lat: 21.0228161, lng: 105.801944 })
    }
  },
  methods: {
    /**
     * Tao infowindow custom
     */
    createdInfoWindow() {
      google.maps.event.addListener(map, "click", function() {
        infowindow.close();
      });
    },

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
      if (iconurl) {
        icon = {
          url: "./" + iconurl,
          size: new google.maps.Size(50, 50)
        };
      }
      // var text = {
      //   color: "#212121",
      //   fontSize: "12px",
      //   fontWeight: "bold",
      //   text: text,
      //   top: "-10px"
      // };
      if (label) {
        var infowindow = new google.maps.InfoWindow({
          content: label,
          color: "#c1c1c1",
          fontSize: "8px",
          fontWeight: "bold"
        });
      }
      let marker1 = new google.maps.Marker({
        position: position,
        map: this.map,
        draggable: isDragable,
        icon: icon
      });
      marker1.content = content;
      marker1.addListener("click", function(event) {
        // infowindow.open(this.map, marker1);
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

      var icons = [
        {
          icon: lineSymbol,
          offset: "100%"
        }
      ];
      // Create the polyline and add the symbol via the 'icons' property.
      for (var i = 0; i < path.length; i++) {
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
        origin: origin.lat + "," + origin.lng,
        destination: destination.lat + "," + destination.lng,
        travelMode: "DRIVING"
      };

      directionsService.route(request, function(result, status) {
        if (status == "OK") {
          var _route = result.routes[0].legs[0];
          var path = result.routes[0].overview_path;

          console.log(path[Math.ceil(path.length / 2)]);
          // for (var i = 0; i < path.length; i++) {
          me.createdArrow(path, color);
          // }
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