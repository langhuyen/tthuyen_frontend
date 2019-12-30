<template>
  <div class="wrap_content p-24-px">
    <div class="loader" v-if="processing"></div>
    <div class="h-content list-content p-12-px">
      <div class="main-title flex align-center">
        <div class="mr-12-px">Danh sách {{title}}</div>
        <div>
          <t-input
            @keydown.enter="search"
            v-model="queryString"
            placeholder="Nhập tên, mã, địa chỉ để tìm kiếm"
          />
        </div>
        <div class="t-button-wrap flex flex-end">
          <vs-button
            color="#c1c1c1"
            class="mr-8-px"
            @click="ViewAllMap()"
            type="border"
          >Xem toàn cảnh</vs-button>

          <vs-button color="rgb(26, 115, 232)" @click="Add" type="filled">Thêm mới</vs-button>
        </div>
      </div>
      <div class="wrap-font-warning mb-12-px">
        <i class="fas font-warning fa-exclamation-circle"></i>
        <div class="align-left">
          <div>Click vào dòng chi tiết để hiện thị trên bản đồ.</div>
          <div>Click marker trên bản đồ để xem thông tin chi tiết.</div>
        </div>
      </div>

      <div class="flex" style="height:437px">
        <div style="height:390px" class="w-1/2 mr-12-px">
          <datatable
            @activeIndex="changePageIndex"
            :totalPage="totalPage"
            @select="selectedTable"
            v-model="selectedRows"
            :datasource="data"
            :columnConfig="column"
            @dblclick="onDblClick"
          >
            <template slot="contentsub" slot-scope="{ dataRow }">
              <div class="info-detail">
                <div class="row-detail flex">
                  <div class="flex icon-feature flex">
                    <div @click="Edit(dataRow)">
                      <i class="fas fa-edit icon-feature-detail"></i>
                    </div>
                    <div class="icon-feature-detail">/</div>
                    <div @click="Delete(dataRow)">
                      <i class="far fa-trash-alt icon-feature-detail"></i>
                    </div>
                  </div>
                  <div class="title-lable">
                    <div>Địa chỉ :</div>
                  </div>
                  <div class="row-content">
                    <div>{{dataRow.address}}</div>
                  </div>
                </div>
              </div>
            </template>
          </datatable>
        </div>
        <div class="view-map w-1/2">
          <google-map
            @dragend="onUpdateLocation"
            @clickmarker="onClickMarker"
            :centerCustom="centerCustom"
            isView
            :markersView="marker"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseList from "./BaseList";
export default {
  extends: BaseList,
  data() {
    return {
      processing: true,
      pageSize: 20,
      totalPage: 0,
      queryString: "",
      selectedRows: [],
      selected: [],
      data: [],
      markerArr: [],

      centerCustom: {},
      column: [
        {
          title: "MÃ",
          dataField: "code",
          width: "100px"
        },
        {
          title: "Tên",
          dataField: "name",
          width: "200px"
        }
      ],
      IconMarker: {
        PORT: "port.png",
        WAREHOUSE: "warehouse.png",
        DEPOTTRUCK: "truck.png",
        DEPOTCONTAINER: "container.png",
        DEPOTTRAILER: "mooc.png"
      }
    };
  },
  watch: {},
  methods: {
    changePageIndex(index) {
      this.getPaging(index, this.pageSize);
    },
    onUpdateLocation(event, marker) {
      var me = this;
      var mapType = {
        PORT: "Cảng",
        DEPOTTRUCK: "Bãi chứa đầu kéo",
        DEPOTCONTAINER: "Bãi chứa container",
        DEPOTTRAILER: "Bãi chứa mocc",
        WAREHOUSE: "Kho"
      };
      var content = marker.content;
      var message = `Bạn có muốn thay đổi tọa độ vị trí của ${
        mapType[content.type]
      } ${content.name}`;
      this.$vs.dialog({
        type: "confirm",
        color: " rgb(26, 115, 232)",
        title: `Xác nhận`,
        acceptText: "Đồng ý",
        cancelText: "Hủy bỏ",
        text: message,
        accept: function() {
          me.acceptUpdate(event, marker);
        },
        cancel: function() {
          me.cancelUpdate(marker);
        }
      });
    },
    cancelUpdate(marker) {
      marker.setPosition(marker.content.latLng);
      var icon = {
        url: marker.content.icon,
        size: new google.maps.Size(50, 50)
      };
      marker.setIcon(icon);
      marker.setDraggable(false);
    },
    acceptUpdate(event, marker) {
      var depotInstance = marker.content;
      depotInstance.latLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      var url = "http://localhost:9000/entity/update/postion";
      this.api
        .post(url, depotInstance)
        .then(result => {
          var icon = {
            url: marker.content.icon,
            size: new google.maps.Size(50, 50)
          };
          marker.setIcon(icon);
          this.$vs.notify({
            title: "Ban đã cập nhật vị trí thành công ",
            color: "success",
            position: "top-center"
          });
        })
        .catch(err => {});
    },
    //Xử lý sữa dữ liệu
    onDblClick(event, data) {
      var url = `${this.type}/Detail/${data.id}`;
      this.$router.push(url);
    },
    //Hiện thị các dialog chi tiết cho các depot
    onClickMarker(event, marker) {
      var me = this;
      var content = marker.content;
      var id = "div-" + content.id;
      var div = ` <div class="info-detail">
      <div class="row-detail flex">
        <div class="title-lable">
          <div>Mã:</div>
          <div>Tên:</div>
          <div>Địa chỉ:</div>
        </div>
        <div class="row-content">
          <div>${content.code}</div>
          <div>${content.name}</div>
          <div>${content.address}</div>
        </div>
      </div>
      <a id='${id}'>Click</a> và sau đó di kéo thả marker
      để thay đổi vị trí của các depot
    </div>`;
      var infowindow = new google.maps.InfoWindow({
        content: div,
        maxWidth: 350
      });
      infowindow.open(marker.getMap(), marker);
      me.$nextTick(function() {
        var infoDiv = document.getElementById(id);
        if (infoDiv != null) {
          infoDiv.addEventListener(
            "click",
            function() {
              me.onChangePosition(marker, infowindow);
            },
            false
          );
        }
      });
      google.maps.event.addListener(marker.getMap(), "click", function() {
        infowindow.close();
      });
    },
    onChangePosition(marker, infowindow) {
      infowindow.close();
      marker.setDraggable(true);
      marker.setIcon(null);
    },
    handleSelected(tr) {
      this.currentTr = tr;
    },
    selectedTable() {
      let me = this;
      me.markerArr = [];
      me.data.forEach(function(item) {
        if (item.latLng) {
          me.centerCustom = item.latLng;
          var obj = {};
          obj.icon = "../" + me.IconMarker[item.type];
          obj.position = item.latLng;
          obj.title = item.name;
          obj.type = item.type;
          obj.content = item;
          me.markerArr.push(obj);
        }
      });
    }
  },
  computed: {
    marker() {
      let me = this;
      var result = [];
      me.selectedRows.forEach(function(item) {
        if (item.latLng) {
          me.centerCustom = item.latLng;
          var obj = {};
          obj.icon = null; //"../" + me.IconMarker[item.type];
          obj.position = item.latLng;
          obj.title = item.name;
          obj.type = item.type;
          obj.content = item;
          result.push(obj);
        }
      });
      return result;
    }
  }
};
</script>

<style lang="scss">
.align-center {
  align-items: center;
}
</style>
 