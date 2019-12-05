<template>
  <div style="height:600px; width:600px">
    <button @click="load">Load</button>
    Hãy click vào vị trí trên bản đồ để biết thêm thông tin của hành trình
    <google-map-component @clickmarker="openHere" ref="google"></google-map-component>
  </div>
</template>

<script>
import api from "@/api/DetailAPI";
import axios from "axios";
export default {
  mounted() {
    // this.load();
  },
  data() {
    return {
      mapTypeAction: {
        START_TRUCK: "truck .png",
        START_MOOC: "mooc.png",
        START_CONT: "container.png",
        WAREHOUSE: "warehouse.png",
        END_TRUCK: "truck.png",
        PORT: "port.png"
      }
    };
  },
  methods: {
    openHere(event, marker) {
      console.log(marker);
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    load() {
      let me = this;
      axios
        .get("http://localhost:9000/transport/getRouter")
        .then(result => {
          console.log(result);
          for (var item in result.data) {
            if (item > 0) break;
            var nodes = result.data[item].nodes;

            var color = me.getRandomColor();
            var i = 0;
            for (; i < nodes.length - 1; i++) {
              // setTimeout(function(){{}})
              var origin = nodes[i].address[0].latLng;
              var des = nodes[i + 1].address[0].latLng;
              // console.log(origin);
              // // sleep(1000);

              var content = { ...nodes[i] };
              content.truck = result.data[item].truck;
              content.step = i + 1;
              console.log(content);
              me.$refs.google.createdMarker(
                nodes[i].address[0].latLng,
                this.mapTypeAction[nodes[i].action],
                nodes[i].address[0].address,

                content
              );
              me.$refs.google.calcRoute(origin, des, color);
            }
            var content = { ...nodes[i] };
            content.step = i + 1;
            content.truck = result.data[item].truck;
            me.$refs.google.createdMarker(
              nodes[i].address[0].latLng,
              me.mapTypeAction[nodes[i].action],
              nodes[i].address[0].address,
              content
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>