<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title">Danh sách</div>

      <vs-table v-model="selected" :multiple="data==null||data.length==0?false:true" :data="data">
        <template slot="thead">
          <!-- <vs-th>MÃ</vs-th> -->
          <vs-th>MÃ TRUCK</vs-th>
          <vs-th>TÊN TRUCK</vs-th>
          <vs-th>SỐ CHẶNG ĐI QUA</vs-th>
          <vs-th>ĐIỂM BẮT ĐẦU</vs-th>
          <vs-th>ĐIỂM KẾT THÚC</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td
              style="text-align:left"
              :data="data[indextr].warehouse"
            >{{data[indextr]|truckCode}}</vs-td>
            <vs-td style="text-align:left" :data="data[indextr].port">{{data[indextr]|truckName}}</vs-td>
            <vs-td
              style="text-align:left"
              :data="data[indextr].containerCode"
            >{{data[indextr].nbStops}}</vs-td>
            <vs-td
              style="text-align:left"
              :data="data[indextr].containerCode"
            >{{data[indextr]|start}}</vs-td>
            <vs-td style="text-align:left" :data="data[indextr].containerCode">{{data[indextr]|end}}</vs-td>
          </vs-tr>
        </template>
        <br />

        <pre>{{ selected }}</pre>
      </vs-table>
    </div>
  </div>
</template>

<script>
// import BaseList from "./BaseList";
import api from "@/api/DetailAPI";
export default {
  //   extends: BaseList,
  data() {
    return {
      selected: [],
      data: [],
      api: api
    };
  },

  methods: {
    /**
     * Thực hiện tính inputjson
     */
  },
  filters: {
    truckCode(val) {
      console.log(val);
      var truck = val.truck.instance;
      for (var i = 0; i < truck.length; i++) {
        if (truck[i].type == "TRUCK") {
          return truck[i].code;
        }
      }
    },
    truckName(val) {
      var truck = val.truck.instance;
      for (var i = 0; i < truck.length; i++) {
        if (truck[i].type == "TRUCK") {
          return truck[i].name;
        }
      }
    },
    start(val) {
      var start = val.nodes[0];
      return start.address[0].address;
    },
    end(val) {
      var end = val.nodes[val.nodes.length - 1];
      return end.address[0].address;
    }
  },
  mounted() {
    var url = "http://localhost:9000/transport/hello";
    var date = new Date(2019, 10, 11);
    var me = this;
    this.api.getAll(url).then(result => {
      me.data = result.data;
    });
  }
};
</script>
 