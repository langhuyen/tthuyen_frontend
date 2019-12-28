<template>
  <div class="wrap_content p-24-px">
    <div class="loader" v-if="processing"></div>
    <div class="h-content list-content p-12-px">
      <div class="main-title flex">
        Danh sách xe lập lịch
        <div class="t-date-wrap t-button-wrap mb-12-px flex flex-end">
          <div class="mr-12-px">Khoảng thời gian</div>
          <div class="mr-12-px">
            <!-- <vs-select v-model="valueCombox">
              <vs-select-item text="Hôm nay" value="toDay"></vs-select-item>
            </vs-select>-->
            <daterange />
          </div>
          <div class="mr-12-px">Từ ngày</div>
          <div class="w-130-px mr-12-px">
            <date :useTime="false" v-model="date" />
          </div>
          <div class="mr-12-px">Đến ngày</div>
          <div class="w-130-px mr-12-px">
            <date :useTime="false" v-model="date" />
          </div>
          <div>
            <vs-button color="#c1c1c1" class="mr-8-px" type="border">Lọc</vs-button>
          </div>
        </div>
      </div>
      <div class="wrap-font-warning mb-12-px">
        <i class="fas font-warning fa-exclamation-circle"></i>
        <div class="align-left">
          <div>Chọn từng dòng chi tiết để hiển thị lộ trình trên bản đô.</div>
          <div>Click vào marker trên bản đồ để xem chi tiếp từng điểm dừng</div>
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
          <datatable
            :totalPage="totalPage"
            v-model="selectedRows"
            :columnConfig="columns"
            :datasource="data"
            @changeGrid="changeGrid"
          >
            <template slot="contentsub" slot-scope="{ dataRow }">
              <!-- Ve chi tiet tung xe 1  -->
              <div class="info-detail">
                <div class="row-detail flex">
                  <div class="title-lable">
                    <div>Biển số xe:</div>
                    <div>Trọng tải</div>
                    <div>Số trạng đi qua</div>
                    <div>Điểm xuất phát</div>
                    <div>Đích đến:</div>
                    <div>Tổng quảng đường di chuyển:</div>
                    <div>Tổng thời gian di chuyển (dự kiến):</div>
                  </div>
                  <div class="row-content">
                    <div>Biển số xe:</div>
                    <div>{{dataRow.truck.weight}} tấn</div>
                    <div>{{dataRow.nbStops}}</div>
                    <div>{{dataRow.start}}</div>
                    <div>{{dataRow.end}}</div>
                    <div>{{dataRow.distances|formatDistance}}</div>
                    <div>{{dataRow.duration|formatDuration}}</div>
                  </div>
                </div>

                <div class="row-detail">
                  <div class="title-lable special-title">Chi tiết các chặng đường đi qua</div>
                  <div
                    class="row-content step-direction flex"
                    v-for="(node,index) in dataRow.nodes"
                    :key="index"
                  >
                    <div class="view-map" @click="viewMap(node)"></div>
                    <!-- <button@click="viewMap(node)">viewMap</button> -->
                    <div class="step-content-icon">
                      <img src="@/assets/pin.png" alt />
                    </div>
                    <div class="step-content">
                      <div class="flex">
                        <div class="title-lable">Hành động :</div>
                        <div class="row-content">{{mapTypeAction[node.action]}}</div>
                      </div>
                      <div class="flex">
                        <div class="title-lable">Địa chỉ :</div>
                        <div class="row-content">{{node.address[0]?node.address[0].address:''}}</div>
                      </div>
                    </div>
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
      processing: true,
      valueCombox: "toDay",
      totalPage: 0,
      queryString: "",
      date: new Date(),
      selected: [],
      data: [],
      api: api,
      selectedRows: [],
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
      ],
      mapTypeAction: {
        START_TRUCK: "Đến bãi chứa truck",
        START_MOOC: "Đến bãi chưa mooc",
        START_CONT: "Đến bãi container",
        WAREHOUSE: "Đến nhà kho",
        END_TRUCK: "Trở về bãi chứa truck",
        PORT: "Đến cảng"
      },
      mapTypeIcon: {
        START_TRUCK: "./truck.png",
        START_MOOC: "./mooc.png",
        START_CONT: "./container.png",
        WAREHOUSE: "./warehouse.png",
        END_TRUCK: "./truck.png",
        PORT: "./port.png"
      },
      markerList: []
    };
  },
  watch: {
    selectedRows() {
      // this.displayDirection();
    }
  },
  filters: {
    formatDistance(val) {
      return Math.floor(val / 1000) + "km" + " " + Math.ceil(val % 1000) + "m";
    },
    formatDuration(val) {
      return Math.floor(val / 60) + "giờ " + Math.ceil(val % 60) + " phút";
    }
  },
  methods: {
    //Kiểm tra ô nhập liệu đã
    viewMap(node) {
      console.log(node);
      let marker = node.marker;
      if (marker) {
        if (marker.infowindow) {
          marker.infowindow.open(marker.getMap(), marker);
        } else {
          var me = this;
          var content = marker.content;

          var id = "div-" + content.code;
          var actionName = me.mapTypeAction[content.action],
            address = content.address[0].address,
            truck = "",
            container = "",
            mooc = "",
            step = content.step;
          content.truck.instance.forEach(item => {
            if (item.type == "TRUCK") truck = item.name;
          });
          content.container.forEach(item => {
            if (item.type == "CONTAINER") container = item.name;
          });
          content.mooc.forEach(item => {
            if (item.type == "MOOC") mooc = item.name;
          });
          var div = ` <div class="info-detail">
        <div class="row-detail flex">
          <div class="title-lable">
            <div>Hành động :</div>
            <div>Địa chỉ:</div>
            <div>Truck:</div>
            <div>Container:</div>
            <div>Mooc:</div>
            <div>Chặng số:</div>
            <div>Thời gian d/c:</div>
            <div>Khoảng cách:</div>
          </div>
          <div class="row-content">
            <div>${actionName}</div>
            <div>${address}</div>
            <div>${truck}</div>
            <div>${container}</div>
            <div>${mooc}</div>
            <div>${step}</div>
            <div>${content.duration ? content.duration.text : ""}</div>
            <div>${content.distance ? content.distance.text : ""}</div>
          </div>
        </div>
      
      </div>`;
          var infowindow = new google.maps.InfoWindow({
            content: div,
            maxWidth: 350
          });
          marker.infowindow = infowindow;
          infowindow.open(marker.getMap(), marker);

          google.maps.event.addListener(marker.getMap(), "click", function() {
            infowindow.close();
          });
        }
      }
    },
    //Thay đổi trên grid

    changeGrid(isSelectedAll, deleteArray) {
      let me = this;
      deleteArray.forEach(element => {
        var nodes = element.nodes;
        var i = 0;
        for (; i < nodes.length - 1; i++) {
          if (element.nodes[i].pathArray != undefined) {
            me.$refs.google.clearPath(
              element.nodes[i].pathArray,
              element.nodes[i].marker
            );
          }
        }
      });
      me.displayDirection(isSelectedAll);
    },
    /**
     * Tìm kiếm các truck đã được lập lịch
     */
    search() {},
    openHere(event, marker) {
      var me = this;
      var content = marker.content;

      var id = "div-" + content.code;
      var actionName = me.mapTypeAction[content.action],
        address = content.address[0].address,
        truck = "",
        container = "",
        mooc = "",
        step = content.step;
      content.truck.instance.forEach(item => {
        if (item.type == "TRUCK") truck = item.name;
      });
      content.container.forEach(item => {
        if (item.type == "CONTAINER") container = item.name;
      });
      content.mooc.forEach(item => {
        if (item.type == "MOOC") mooc = item.name;
      });
      var div = ` <div class="info-detail">
      <div class="row-detail flex">
        <div class="title-lable">
          <div>Hành động :</div>
          <div>Địa chỉ:</div>
          <div>Truck:</div>
          <div>Container:</div>
          <div>Mooc:</div>
          <div>Chặng số:</div>
          <div>Thời gian d/c:</div>
          <div>Khoảng cách:</div>
        </div>
        <div class="row-content">
          <div>${actionName}</div>
          <div>${address}</div>
          <div>${truck}</div>
          <div>${container}</div>
          <div>${mooc}</div>
          <div>${step}</div>
          <div>${content.duration ? content.duration.text : ""}</div>
          <div>${content.distance ? content.distance.text : ""}</div>
        </div>
      </div>
    
    </div>`;
      var infowindow = new google.maps.InfoWindow({
        content: div,
        maxWidth: 350
      });
      marker.infowindow = infowindow;
      infowindow.open(marker.getMap(), marker);

      google.maps.event.addListener(marker.getMap(), "click", function() {
        infowindow.close();
      });
    },
    /**
     * Hiển thị các quãng đường đi của mỗi truck
     */
    displayDirection(data) {
      let me = this;
      for (var item in data) {
        var nodes = data[item].nodes;

        var color = me.getRandomColor();
        var i = 0;
        if (data[item].distances == undefined) {
          data[item].distances = 0;
        }
        if (data[item].duration == undefined) {
          data[item].duration = 0;
        }
        for (; i < nodes.length - 1; i++) {
          var origin = nodes[i].address[0].latLng;
          var des = nodes[i + 1].address[0].latLng;

          var content = { ...nodes[i] };
          content.truck = data[item].truck;
          content.step = i + 1;

          if (data[item].nodes[i].pathArray == undefined) {
            var marker = me.$refs.google.createdMarker(
              origin,
              this.mapTypeIcon[nodes[i].action],
              content,
              null
            );
            data[item].nodes[i].marker = marker;
            me.$refs.google.calcRoute(
              origin,
              des,
              color,
              data[item].nodes[i],
              data[item]
            );
          } else {
            me.$refs.google.setPathMap(
              data[item].nodes[i].pathArray,
              data[item].nodes[i].marker
            );
          }
        }
        var content = { ...nodes[i] };
        content.step = i + 1;
        content.truck = data[item].truck;
        var marker = me.$refs.google.createdMarker(
          nodes[i].address[0].latLng,
          me.mapTypeIcon[nodes[i].action],
          content,
          null
        );
        me.markerList.push(marker);
        me.$refs.google.setCenter(nodes[i].address[0].latLng);
        me.$refs.google.map.setZoom(15);
      }
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
    },
    load() {
      var url = "http://localhost:9000/transport/getRouter";
      var date = new Date();
      var me = this;
      me.processing = true;
      this.api
        .getAll(url)
        .then(result => {
          // me.totalPage = result.result.data //
          // me.data = result.data;
          result.data.forEach(element => {
            var obj = { ...element };
            obj.truckCode = me.truckCode(element);
            obj.truckName = me.truckName(element);
            obj.start = me.start(element);
            obj.end = me.end(element);
            obj.isSelected = false;
            obj.duration = 0;
            obj.distances = 0;
            me.data.push(obj);
          });
          me.processing = false;
        })
        .catch(err => {
          me.processing = false;
        });
    }
  },

  mounted() {
    this.load();
  }
};
</script>
 

 <style lang='scss' >
.t-date-wrap {
  align-items: center;
}
.info-detail {
  font-size: 12px;
  .title-lable {
    font-weight: bold;
    text-align: left;
  }
  .row-content {
    font-style: italic;
    text-align: left;
  }
  .special-title {
  }
  .step-direction {
    margin-left: 32px;
  }
  // .step-content-icon {
  //   background: url("@/assets/pin.png");
  // }
  .step-content-icon {
    height: 24px;
    width: 24px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .step-content {
    font-style: normal;
  }
  .emphase {
    font-weight: bold;
  }
}
</style>