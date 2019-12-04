<template>
  <div class="w-full h-map">
    <google-map-component ref="map" @ready="load" v-on="$listeners"></google-map-component>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",

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
    return {
      markerArray: [],
      //Chứa cấc loại marker đang sử dụng
      IconMarker: {
        PORT: "port.png",
        WAREHOUSE: "warehouse.png",
        DEPOTTRUCK: "truck.png",
        DEPOTCONTAINER: "container.png",
        DEPOTTRAILER: "mooc.png"
      }
    };
  },
  watch: {
    /**
     * Thay đổi các
     */
    markersView(value) {
      this.changeArrayMarker(value);
    },
    centerCustom(current) {
      // this.$refs.map.setCenter(current);
    },
    //Hiển thị địa chỉ sang nếu có
    value() {
      if (value) {
        this.createdMarker(value, null, null, null, true);
        this.setCenter(value);
      }
    }
    // address(value) {
    //   let me = this;
    //   if (this.value) {
    //   } else {
    //     //Phân giải địa chỉ và hiện thị map
    //     this.$refs.map
    //       .geocode(value)
    //       .then(latlng => {
    //         me.setCenter(latlng);
    //         me.createdMarker(value, null, null, null, true);
    //       })
    //       .catch(err => {});
    //   }
    // }
  },

  mounted() {},

  methods: {
    /**
     * Thực hiện thay đổi dữ liệu trên bản đồ
     */
    changeArrayMarker(markerArray) {
      let me = this;
      me.markerArray.forEach(marker => {
        marker.setMap(null);
      });
      me.markerArray = [];
      markerArray.forEach(element => {
        var marker = me.$refs.map.createdMarker(
          element.position,
          null,
          element.title,
          element.content,
          false
        );
        me.$refs.map.setCenter(element.position);
        me.markerArray.push(marker);
      });
    },
    load() {
      var center = {
        lat: 10.173007011413574,
        lng: 105.93197631835938
      };
      this.$refs.map.setCenter(center);
      if (this.isView == false) {
        // var marker = this.$refs.map.createdMarker(
        //   center,
        //   null,
        //   null,
        //   null,
        //   true
        // );
        // this.markerArray.push(marke);
      } else {
        this.changeArrayMarker(this.markersView);
      }

      this.$emit("ready");
    }
  }
};
</script>