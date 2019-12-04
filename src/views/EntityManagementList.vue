<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title flex">
        Danh sách {{title}}
        <div class="t-button-wrap mb-12-px flex flex-end">
          <vs-button
            color="#c1c1c1"
            class="mr-8-px"
            @click="ViewAllMap()"
            type="border"
          >Xem toàn cảnh</vs-button>
          <vs-button color="#c1c1c1" class="mr-8-px" @click="selectedTable" type="border">Xem</vs-button>
          <vs-button color="rgb(26, 115, 232)" @click="Add" type="filled">Thêm mới</vs-button>
        </div>
      </div>

      <div class="flex">
        <div style="height:437px" class="w-1/2 mr-12-px">
          <datatable
            @select="selectedTable"
            v-model="selectedRows"
            :datasource="data"
            :columnConfig="column"
            @dblclick="onDblClick"
          >
            <template slot="contentsub" slot-scope="{ dataRow }">
              <div class="info-detail">
                <div class="row-detail flex">
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
  watch: {
    // selectedRows(currentTr, old) {
    //   debugger;
    // }
  },
  methods: {
    //Xử lý sữa dữ liệu
    onDblClick(event, data) {
      var url = `${this.type}/Detail/${data.id}`;
      this.$router.push(url);
    },
    //Hiện thị các dialog chi tiết cho các depot
    onClickMarker(event, marker) {},
    handleSelected(tr) {
      this.currentTr = tr;
    },
    test() {
      alert("ok");
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
 