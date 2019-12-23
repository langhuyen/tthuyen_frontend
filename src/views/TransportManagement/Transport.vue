<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title flex">
        <div class="wrap-font-warning">
          <i class="fas font-warning fa-exclamation-circle"></i>
          Chọn từng dòng chi tiết để tạo chuyến lập lịch
        </div>
        <div class="t-date-wrap t-button-wrap mb-12-px flex flex-end">
          <div class="mr-12-px">
            <t-input
              @keydown.enter="search"
              v-model="queryString"
              placeholder="Nhập tên, mã, địa chỉ để tìm kiếm"
            />
          </div>
          <div class="mr-12-px">Thời gian lập Y/C</div>
          <div class="w-130-px mr-12-px">
            <date :useTime="false" v-model="date" />
          </div>
          <div class>
            <!-- <vs-button color="#c1c1c1" class="mr-8-px" @click="ViewAllMap()" type="border">Xem toàn cảnh</vs-button>
            <vs-button color="#c1c1c1" class="mr-8-px" @click="ViewMap" type="border">Xem</vs-button> --->
            <vs-button color="rgb(26, 115, 232)" @click="computedData" type="filled">Tạo tuyến</vs-button>
          </div>
        </div>
      </div>
      <div class="wrap-table">
        <vs-table
          v-model="selected"
          :multiple="data==null||data.length==0?false:true"
          @selected="handleSelected"
          :data="data"
        >
          <template slot="thead">
            <!-- <vs-th>MÃ</vs-th> -->
            <vs-th class="align-left w-120-px">LOẠI</vs-th>
            <vs-th class="align-left w-120-px">MÃ</vs-th>
            <vs-th class="align-left w-150-px">TÊN</vs-th>
            <vs-th class="align-left w-120-px">KHO</vs-th>
            <vs-th class="align-left w-120-px">CẢNG</vs-th>
            <vs-th class="align-left w-120-px">CONTAINER</vs-th>
            <vs-th class="align-left w-120-px">TRỌNG TẢI</vs-th>
            <vs-th class="align-left w-200-px">TG ĐẾN SỚM NHẤT</vs-th>
            <vs-th class="align-left w-200-px">TG ĐẾN MUỘN NHẤT</vs-th>
            <vs-th class="align-left w-250-px">TG VẬN CHUYỂN SỚM NHÂT</vs-th>
            <vs-th class="align-left w-250-px">TG VẬN CHUYỂN MUỘN NHẤT</vs-th>
            <vs-th class="align-left w-300-px">GHI CHÚ</vs-th>
            <vs-th class="align-left w-300-px">DIỄN GIẢI</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].type"
              >{{ requestType[data[indextr].type].value }}</vs-td>
              <vs-td class="align-left w-120-px" :data="data[indextr].code">{{ data[indextr].code }}</vs-td>
              <vs-td class="align-left w-150-px" :data="data[indextr].code">{{ data[indextr].name }}</vs-td>
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].warehouse"
              >{{data[indextr].warehouseCode[0]?data[indextr].warehouseCode[0].code:''}}</vs-td>
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].port"
              >{{data[indextr].portCode[0]?data[indextr].portCode[0].code:''}}</vs-td>
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].containerCode"
              >{{data[indextr].containerCode[0]?data[indextr].containerCode[0].code:''}}</vs-td>
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].weight"
              >{{ data[indextr].weight||0 }} tấn</vs-td>
              <vs-td
                class="align-center w-150-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].earlyPickupDateTime|formatDate }}</vs-td>
              <vs-td
                class="align-center w-150-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].latePickupDateTime|formatDate }}</vs-td>
              <vs-td
                class="align-center w-150-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].earlyDeliveryDateTime|formatDate }}</vs-td>
              <vs-td
                class="align-center w-150-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].lateDeliveryDateTime|formatDate }}</vs-td>
              <vs-td
                class="align-left w-150-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].description}}</vs-td>
              <vs-td
                class="align-left w-150-px"
                :data="data[indextr].quantity"
              >{{ requestType[data[indextr].type].des }}</vs-td>
            </vs-tr>
          </template>
          <br />

          <pre>{{ selected }}</pre>
        </vs-table>
      </div>
      <div class="dataTables_paginate paging_simple_numbers" id="example_paginate">
        <div class="line"></div>
        <div class="flex align-end">
          <div
            class="paginate_button previous disabled"
            aria-controls="example"
            data-dt-idx="0"
            tabindex="-1"
            id="example_previous"
          >
            <img src="@/assets/previous.png" alt srcset />
          </div>
          <div class="flex">
            <div
              class="paginate_button current"
              aria-controls="example"
              data-dt-idx="1"
              tabindex="0"
            >1</div>
            <div class="paginate_button" aria-controls="example" data-dt-idx="2" tabindex="0">2</div>
            <div class="paginate_button" aria-controls="example" data-dt-idx="3" tabindex="0">3</div>
            <div class="paginate_button" aria-controls="example" data-dt-idx="4" tabindex="0">4</div>
            <div class="paginate_button" aria-controls="example" data-dt-idx="5" tabindex="0">5</div>
            <div class="paginate_button" aria-controls="example" data-dt-idx="6" tabindex="0">6</div>
          </div>
          <div
            class="paginate_button next"
            aria-controls="example"
            data-dt-idx="7"
            tabindex="0"
            id="example_next"
          >
            <img src="@/assets/next.png" alt srcset />
          </div>
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
      selected: [],
      data: [],
      api: api,
      requestType: {
        ImportLadenRequest: {
          value: "ImportLaden",
          des: "Vận chuyển container hàng từ cảng về kho"
        },
        ImportEmptyRequest: {
          value: "ImportEmpty",
          des: "Vận chuyển container rỗng từ kho về bãi"
        },
        ExportLadenRequest: {
          value: "ExportLaden",
          des: "Vận chuyển container hàng từ kho về cảng"
        },
        ExportEmptyRequest: {
          value: "ExportLaden",
          des: " Vận chuyển container rỗng từ bãi đến kho"
        }
      },
      dataEntity: {
        imLadenRequests: [],
        imEmptyRequests: [],
        exEmptyRequests: [],
        exLadenRequests: [],
        depotContainers: [],
        depotMoocs: [],
        depotTrucks: [],
        warehouses: [],
        trucks: [],
        moocs: [],
        ports: [],
        containers: [],
        distance: [],
        params: {
          cutMoocDuration: 1800,
          linkMoocDuration: 1800,
          unlinkEmptyContainerDuration: 1800,
          unlinkLoadedContainerDuration: 1800,
          linkEmptyContainerDuration: 1800,
          linkLoadedContainerDuration: 1800,
          hourPrev: 1,
          hourPost: 1,
          constraintDeliveryTime: true,
          constraintWarehouseTractor: true,
          constraintWarehouseDriver: true,
          constraintWarehouseVendor: true,
          constraintWarehouseBreaktimes: true,
          constraintWarehouseHard: true,
          constraintDriverBalance: true,
          currentTime: new Date()
        }
      }
    };
  },
  filters: {
    formatDate(val) {
      let valuedate = new Date(val);
      let date =
        valuedate.getDate() < 10
          ? "0" + valuedate.getDate()
          : valuedate.getDate();
      let month =
        valuedate.getMonth() < 9
          ? "0" + (valuedate.getMonth() + 1)
          : valuedate.getMonth() + 1;
      return (
        date +
        "/" +
        month +
        "/" +
        valuedate.getFullYear() +
        " " +
        valuedate.getHours() +
        ":" +
        valuedate.getMinutes() +
        ":" +
        valuedate.getSeconds()
      );
    }
  },

  methods: {
    handleSelected(tr) {
      this.currentTr = tr;
    },
    convertRequest() {
      //Thực hiện map từu request sang dữ liệu;
      let me = this;
      this.selected.forEach((item, index) => {
        //Thực hiện thêm warehouse container và port
        if (item.warehouseCode[0]) {
          var warehouse = {
            code: item.warehouseCode[0].code,
            locationCode: item.warehouseCode[0].locationCode,
            hardConstraintType: 0,
            vehicleConstraintType: -1,
            drivers: [],
            vehicles: [],
            checkin: [],
            breaktimes: []
          };
          me.dataEntity.warehouses.push(warehouse);
        }
        if (item.portCode[0]) {
          var port = {
            code: item.portCode[0].code,
            locationCode: item.portCode[0].locationCode
          };
          me.dataEntity.ports.push(port);
        }
        if (item.containerCode[0]) {
          var container = {
            code: me.removeFirstLetter(item.containerCode[0].code),
            weight: item.containerCode[0].weight,
            categoryCode: "40HC",
            depotContainerCode: item.containerCode[0].depotLocationCode,
            returnDepotCodes: item.containerCode[0].returnDepotCodes
          };
          me.dataEntity.containers.push(container);
        }
        if (item.type == "ImportLadenRequest") {
          var obj = {
            id: index,
            isBreakRomooc: true,
            containerCategory: "20DC",
            containerCode: me.removeFirstLetter(item.containerCode[0].code),
            containerNo: item.containerCode[0].code,
            orderCode: "410119020221",
            customerCode: "C0015",
            customerName: "KAO",
            requestDate: me.convertDate(item.requestDate),
            earlyDateTimePickupAtPort: me.convertDate(item.earlyPickupDateTime),
            lateDateTimePickupAtPort: me.convertDate(item.latePickupDateTime),
            earlyDateTimeUnloadAtWarehouse: me.convertDate(
              item.earlyDeliveryDateTime
            ),
            lateDateTimeUnloadAtWarehouse: me.convertDate(
              item.lateDeliveryDateTime
            ),
            moocCode: null,
            weight: item.weight,
            portCode: item.portCode[0].code,
            wareHouseCode: item.warehouseCode[0].code
          };
          me.dataEntity.imLadenRequests.push(obj);
        } else if (item.type == "ImportEmptyRequest") {
          var obj = {
            id: index,
            isBreakRomooc: true,
            containerCategory: "20DC",
            containerCode: me.removeFirstLetter(item.containerCode[0].code),
            containerNo: item.containerCode[0].code,
            orderCode: "510719020358",
            customerCode: "C0982",
            customerName: "JAKOB",
            requestDate: me.convertDate(item.requestDate),
            earlyDateTimeAttachAtWarehouse: me.convertDate(
              item.earlyPickupDateTime
            ),
            lateDateTimeReturnEmptyAtDepot: me.convertDate(
              item.lateDeliveryDateTime
            ),
            moocCode: "51R-07630",
            weight: item.weight,
            wareHouseCode: item.warehouseCode[0].code,
            depotContainerCode: item.containerCode[0].depotCode
          };
          me.dataEntity.imEmptyRequests.push(obj);
        } else if (item.type == "ExportEmptyRequest") {
          var obj = {
            id: index,
            isBreakRomooc: true,
            containerCategory: "40HC",
            containerCode: me.removeFirstLetter(item.containerCode[0].code),
            containerNo: item.containerCode[0].code,
            orderCode: "510719020360",
            customerCode: "C0148",
            customerName: "TAE YOUNG",
            requestDate: me.convertDate(item.requestDate),
            earlyDateTimePickupAtDepot: me.convertDate(
              item.earlyPickupDateTime
            ),
            lateDateTimePickupAtDepot: me.convertDate(item.latePickupDateTime),
            earlyDateTimeLoadAtWarehouse: me.convertDate(
              item.earlyDeliveryDateTime
            ),
            lateDateTimeLoadAtWarehouse: me.convertDate(
              item.lateDeliveryDateTime
            ),
            moocCode: null,
            weight: item.weight,
            depotContainerCode: item.containerCode[0].depotCode,
            wareHouseCode: item.warehouseCode[0].code
          };
          me.dataEntity.exEmptyRequests.push(obj);
        } else if (item.type == "ExportLadenRequest") {
          var obj = {
            id: index,
            isBreakRomooc: true,
            containerCategory: "20DC",
            containerCode: me.removeFirstLetter(item.containerCode[0].code),
            containerNo: item.containerCode[0].code,
            orderCode: "110119020067",
            customerCode: "C0015",
            customerName: "KAO",
            requestDate: me.convertDate(item.requestDate),
            earlyDateTimeAttachAtWarehouse: me.convertDate(
              item.earlyPickupDateTime
            ),
            lateDateTimeUnloadAtPort: me.convertDate(item.lateDeliveryDateTime),
            moocCode: "51R-323.02",
            weight: item.weight,
            portCode: item.portCode[0].code,
            wareHouseCode: item.warehouseCode[0].code
          };
          me.dataEntity.exLadenRequests.push(obj);
        }
      });
    },
    convertDate(val) {
      var valuedate = new Date(val);
      let date =
        valuedate.getDate() < 10
          ? "0" + valuedate.getDate()
          : valuedate.getDate();
      let month =
        valuedate.getMonth() < 9
          ? "0" + (valuedate.getMonth() + 1)
          : valuedate.getMonth() + 1;
      let hours =
        valuedate.getHours() < 10
          ? "0" + valuedate.getHours()
          : valuedate.getHours();
      let min =
        valuedate.getMinutes() < 10
          ? "0" + valuedate.getMinutes()
          : valuedate.getMinutes();
      let second =
        valuedate.getSeconds() < 10
          ? "0" + valuedate.getSeconds()
          : valuedate.getSeconds();
      return (
        valuedate.getFullYear() +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        min +
        ":" +
        second
      );
    },
    removeFirstLetter(str) {
      return str.replace(/[A-Za-z]/g, 1);
    },
    convertToInstance(arr) {
      let me = this;
      this.dataEntity.trucks = [];
      this.dataEntity.moocs = [];
      this.dataEntity.containers = [];
      arr.forEach((item, index) => {
        if (item.type == "MOOC") {
          var obj = {
            id: index,
            code: me.removeFirstLetter(item.code),
            categoryId: 5,
            category: "Mooc xuong 40",
            weight: 23.199,
            status: item.status,
            statusId: 5,
            depotMoocCode: item.depotCode,
            depotMoocLocationCode: item.depotLocationCode,
            returnDepotCodes: item.returnDepotCodes,
            intervals: item.intervals
          };
          me.dataEntity.moocs.push(obj);
        }
        //Các mooc

        //Các truck
        else if (item.type == "TRUCK") {
          var obj = {
            id: index,
            code: me.removeFirstLetter(item.code),
            weight: item.weight,
            driverID: 73,
            driverCode: "NV228",
            driverName: "TRẦN QUỐC TOÀN",
            depotTruckCode: item.depotCode,
            depotTruckLocationCode: item.depotLocationCode,
            startWorkingTime: null,
            endWorkingTime: null,
            status: item.status,
            returnDepotCodes: item.returnDepotCodes,
            intervals: item.intervals
          };
          me.dataEntity.trucks.push(obj);
        }
      });
    },
    convertToDepot(arr) {
      let me = this;
      this.dataEntity.depotContainers = [];
      this.dataEntity.depotMoocs = [];
      this.dataEntity.depotTrucks = [];
      arr.forEach((item, index) => {
        if (item.type == "DEPOTTRUCK") {
          //depotTrucks
          var obj = {
            code: item.code,
            locationCode: item.locationCode
          };
          me.dataEntity.depotTrucks.push(obj);
        } else if (item.type == "DEPOTCONTAINER") {
          var obj = {
            code: item.code,
            locationCode: item.locationCode,
            pickupContainerDuration: 0,
            deliveryContainerDuration: 0
          };
          //depotContainers
          me.dataEntity.depotContainers.push(obj);
        } else if (item.type == "DEPOTTRAILER") {
          //depotMoocs
          var obj = {
            code: item.code,
            locationCode: item.locationCode,
            pickupMoocDuration: 0,
            deliveryMoocDuration: 0
          };
          me.dataEntity.depotMoocs.push(obj);
        }
      });
    },
    /**
     * Thực hiện tính inputjson
     */
    async computedData() {
      //Load Distance giữa các điểm
      let me = this;
      var url = "http://localhost:9000/Distance/get";
      this.api.post(
        "http://localhost:9000/transport/createdTrip",
        this.selected
      );
      var resultDistance = await this.api.getAll(url);
      if (resultDistance.data.code == 0) {
        me.dataEntity.distance = resultDistance.data.data;
      }
      var resultInstance = await this.api.getAll(
        "http://localhost:9000/instance/getInstanceFreeByType"
      );
      if (resultInstance.data.code == 0) {
        this.convertToInstance(resultInstance.data.data);
      }
      var resultDepot = await this.api.getAll(
        "http://localhost:9000/entity/getDepot"
      );
      if (resultDepot.data.code == 0) {
        this.convertToDepot(resultDepot.data.data);
      }
      this.convertRequest();
      console.log(JSON.stringify(this.dataEntity));
    }
  },
  mounted() {
    var url = "http://localhost:9000/CustomerRequest/getAllDay";
    var date = new Date(2019, 10, 11);
    var me = this;
    this.api.post(url, date).then(result => {
      me.data = result.data.data;
    });
  }
};
</script>
 