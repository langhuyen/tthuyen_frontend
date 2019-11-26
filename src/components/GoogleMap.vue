<template>
  <div class="w-full h-map">
    <gmap-map
      ref="map"
      @click="onClick"
      :center="center"
      @center_changed="updateCenter"
      :zoom="8"
      style="width:100%"
      class="h-map"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: true
      }"
      draggable
    >
      <div v-if="!isView">
        <gmap-marker
          @dragend="onDragend"
          draggable
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></gmap-marker>
      </div>
      <gmap-custom-marker
        v-else
        v-for="(m, index) in markersView"
        :key="index"
        :position="m.position"
        @click="center=m.position"
        :marker="m.position"
        @dragend="onDragend"
        @dragstart="onDragend"
        draggable
      >
        <icon-marker :type="m.type" :title="m.title" />
      </gmap-custom-marker>
    </gmap-map>
  </div>
</template>

<script>
import GmapCustomMarker from "vue2-gmap-custom-marker";
import IconMarker from "@/components/IconMarker.vue";
export default {
  name: "GoogleMap",
  components: {
    "gmap-custom-marker": GmapCustomMarker,
    IconMarker
  },
  props: {
    centerCustom: {
      type: Object
    },
    value: {
      type: Object
    },
    address: {
      type: String
    },
    isView: {
      default: false,
      type: Boolean
    },
    markersView: {
      type: Array
    }
  },
  data: function() {
    var center = { lat: 45.508, lng: -73.587 };
    if (this.value) {
      center = { ...this.value };
    }

    return {
      path: [],
      icon: "./mooc.png",
      //mặc định là Montreal
      center: center,
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  watch: {
    centerCustom(val) {
      this.updateCenter(val);
    },
    address(val) {
      if (val) {
        this.geocode(val)
          .then(latlng => {
            this.setMarker(latlng);
            var latLngObj = {
              lat: latlng.lat(),
              lng: latlng.lng()
            };
            this.$emit("input", latLngObj);
          })
          .catch(err => {
            // alert(err);
          });
      }
    }
  },

  mounted() {
    this.geolocate();
    this.setMarker(this.center);
  },

  methods: {
    //ham update center
    onDragend(e) {
      debugger;
      console.log("onDragend");
      var latLng = e.latLng;
      var latLngObj = {
        lat: latLng.lat(),
        lng: latLng.lng()
      };
      this.$emit("input", latLngObj);
      this.reverseGeocoding(e.latLng)
        .then(address => {
          this.$emit("update:address", address);
        })
        .catch(err => {
          this.$emit("update:address", "");
          Vue.$toast.error(err);
        });
    },

    updateCenter(center) {
      this.center = {
        lat: center.lat,
        lng: center.lng
      };
    },
    onClick(e) {
      console.log("tag", "chay");
      console.log("tag", e);
      var latLngObj = {
        lat: parseFloat(e.latLng.lat()),
        lng: parseFloat(e.latLng.lng())
      };
      this.setMarker(latLngObj);
      this.$emit("input", latLngObj);
      this.reverseGeocoding(e.latLng)
        .then(address => {
          this.$emit("update:address", address);
        })
        .catch(err => {
          this.$emit("update:address", "");
          Vue.$toast.error(err);
        });
    },
    // nhận địa điểm thông qua autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    //đánh dấu 1 marker

    setMarker(location) {
      this.markers = [];
      this.markers.push({ position: location });
      this.center = location;
    },
    addMarker(location) {
      this.markers.push({ position: location });
      this.center = marker;
    },
    creatRoad(directionResult) {
      this.path = directionResult.routes[0].overview_path;
      // var line = new google.maps.Polyline({
      //   path: directionResult.routes[0].overview_path,
      //   stokeColor: "#FF0000",
      //   strokeWeight: 3
      // });
      // line.setMap(this.$refs.map.$mapObject);
      // for (var i = 0; i < line.getPath().length; i++) {
      //   var marker = new google.maps.Marker({
      //     icon: {
      //       path: google.maps.SymbolPath.CIRCLE,
      //       scale: 3
      //     },
      //     position: line.getPath().getAt(i),
      //     map: this.$refs.map.$mapObject
      //   });
      // }
    },
    //Chi duong
    getDirection: function(origin, destination) {
      let me = this;
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.$refs.map.$mapObject);

      //google maps API's direction service
      function calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        start,
        destination
      ) {
        directionsService.route(
          {
            origin: start,
            destination: destination,
            travelMode: "DRIVING"
          },
          function(response, status) {
            if (status === "OK") {
              directionsDisplay.setDirections(response);
              // me.creatRoad(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }
      calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        origin,
        destination
      );
    },
    //Phan giai vi tri
    geocode: function(address) {
      var geocoder = new google.maps.Geocoder();
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBfFB0Xva7w9CWsrTxEneaLMgPlWQA8rXc`;
      var promiseObj = new Promise(function(resolve, reject) {
        geocoder.geocode({ address: address }, function(results, status) {
          console.log(results, status);
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results[0].geometry.location);
          } else {
            reject("Không phân giải được tên");
          }
        });
      });
      return promiseObj;
    },
    //Convert tu coordition to address
    reverseGeocoding: function(latlng) {
      return new Promise(function(resolve, reject) {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location: latlng }, function(results, status) {
          if (status === "OK") {
            if (results[0]) {
              resolve(results[0].formatted_address);
            } else {
              reject("Không có địa chỉ thích hợp");
            }
          } else {
            reject("Geocoder failed due to: " + status);
          }
        });
      });
    },
    geolocate: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log("tag", position);
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.setMarker(this.center);
        });
      } else {
        // no can do
      }
    }
  }
};
</script>