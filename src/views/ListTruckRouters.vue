<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title flex">
        Danh sách {{title}}
        <div class="t-button-wrap mb-12-px flex flex-end">
          Ngày lập lịch
          <date v-model="date" />
        </div>
      </div>

      <!-- <vs-table v-model="selected" :multiple="data==null||data.length==0?false:true" :data="data">
        <template slot="thead">
    
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
      </vs-table>-->
      <div class="flex">
        <div style="height:437px" class="w-1/2 mr-12-px">
          <datatable :columnConfig="columns" :datasource="data">
            <template slot="contentsub" slot-scope="{ dataRow }">
              <!-- Ve chi tiet tung xe 1  -->
              <div>
                <div class="row-detail flex">
                  <div class="title-lable">Biển số xe:</div>
                  <div class="row-content">010101010</div>
                </div>
                <div class="row-detail flex">
                  <div class="title-lable">Trọng tải:</div>
                  <div class="row-content">{{dataRow.weight}}</div>
                </div>
                <div class="row-detail flex">
                  <div class="title-lable">Sỗ chặng đi qua:</div>
                  <div class="row-content">{{dataRow.nbStops}}</div>
                </div>
                <div class="row-detail flex">
                  <div class="title-lable">Điểm xuất phát:</div>
                  <div class="row-content">{{dataRow.start}}</div>
                </div>
                <div class="row-detail flex">
                  <div class="title-lable">Đích đến:</div>
                  <div class="row-content">{{dataRow.end}}</div>
                </div>
                <div class="row-detail flex">
                  <div class="title-lable">Tổng quảng đường di chuyển:</div>
                  <div class="row-content">{{dataRow.start}}</div>
                </div>
                <div class="row-detail flex">
                  <div class="title-lable">Tổng thời gian di chuyển (dự kiến):</div>
                  <div class="row-content">{{dataRow.end}}</div>
                </div>
                <div class="row-detail">
                  <div class="title-lable">Chi tiết các chặng đường đi qua</div>
                  <div class="row-content step-direction">
                    <div>Hành động : Đến bãi chứa truck</div>
                    <!-- <div>Thời gian đến :</div>
                    <div>Thời gian khởi hành:</div>
                    <div>Container:</div>
                    <div>Mooc:</div>-->
                    <div>Địa chỉ:</div>
                    <!-- <div>
                      Tên bãi :
                      Mã bãi:
                    </div>-->
                  </div>
                </div>
              </div>
            </template>
          </datatable>
        </div>
        <div class="w-1/2">
          <google-map-component @clickmarker="openHere" ref="google"></google-map-component>
        </div>
      </div>
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
      date: new Date(),
      selected: [],
      data: [],
      api: api,
      columns: [
        {
          title: "MÃ",
          dataField: "truckCode",
          width: "100px"
        },
        {
          title: "Tên",
          dataField: "truckName",
          width: "200px"
        }
      ]
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
    /**
     * Thực hiện tính inputjson
     */
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
      // me.data = result.data;
      result.data.forEach(element => {
        var obj = { ...element };
        obj.truckCode = me.truckCode(element);
        obj.truckName = me.truckName(element);
        obj.start = me.start(element);
        obj.end = me.end(element);
        me.data.push(obj);
      });
    });
  }
};
</script>
 