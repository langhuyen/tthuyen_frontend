<template>
  <div>
    <button @click="insertDB">InsertDB</button>
    <img :src="url" />
    <input type="file" ref="file" id="input" @change="test" multiple />
    <div>
      json
      <input
        type="file"
        ref="fileJson"
        id="input"
        placeholder="Read file json"
        @change="readJson"
        multiple
      />
    </div>
    <google-map ref="google" />
    <google-map ref="google" />
  </div>
</template>
<script>
import Excel from "exceljs";
import { fs } from "fs";
import readXlsxFile from "read-excel-file";
import api from "@/api/DetailAPI";
import axios from "axios";
export default {
  data() {
    return {
      selected: [],
      url: "",
      api: api,
      lst: [],
      marked: {},
      markedMoocArr: [],
      markedContainerArr: [],
      markedWarehouseArr: [],
      markedTruckArr: [],
      markedPortArr: []
    };
  },

  methods: {
    //Read File json
    readJson() {
      var me = this;
      var count = 0;
      var markedPort = {},
        markedPortArr = [];
      var markedWarehouse = {},
        markedWarehouseArr = [];
      var markedContainer = {},
        markedContainerArr = [];
      var markedTruck = {},
        markedTruckArr = [];
      var markedMooc = {},
        markedMoocArr = [];

      var files = this.$refs.fileJson.files;
      Object.keys(files).forEach(function(key) {
        axios.get("./" + files[key].name).then(function(resp) {
          //Loc du lieu lay nhung
          if (resp.data.ports) {
            resp.data.ports.forEach(item => {
              if (!markedPort.hasOwnProperty(item.code)) {
                me.markedPortArr.push(item.code);
                markedPort[item.code] = 1;
              }
            });
          }
          if (resp.data.warehouses) {
            resp.data.warehouses.forEach(item => {
              if (!markedWarehouse.hasOwnProperty(item.code)) {
                me.markedWarehouseArr.push(item.code);
                markedWarehouse[item.code] = 1;
              }
            });
          }
          if (resp.data.depotContainers) {
            resp.data.depotContainers.forEach(item => {
              if (!markedContainer.hasOwnProperty(item.code)) {
                me.markedContainerArr.push(item.code);
                markedContainer[item.code] = 1;
              }
            });
          }
          if (resp.data.depotTrucks) {
            resp.data.depotTrucks.forEach(item => {
              if (!markedTruck.hasOwnProperty(item.code)) {
                me.markedTruckArr.push(item.code);
                markedTruck[item.code] = 1;
              }
            });
          }
          if (resp.data.depotMoocs) {
            resp.data.depotMoocs.forEach(item => {
              if (!markedMooc.hasOwnProperty(item.code)) {
                me.markedMoocArr.push(item.code);
                markedMooc[item.code] = 1;
              }
            });
          }
        });
      });
      console.log(
        markedMoocArr,
        markedPortArr,
        markedWarehouseArr,
        markedTruckArr,
        markedPortArr
      );
    },
    readTextFile(path, cb) {
      let me = this;
      var xhr = new XMLHttpRequest();
      // xhr.responseType = "arraybuffer";
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          // The request is done; did it work?
          if (xhr.status == 200) {
            // ***Yes, use `xhr.responseText` here***
            // callback(xhr.responseText);
          } else {
            // ***No, tell the callback the call failed***
            // callback(null);
          }
        }
      };
      xhr.open("GET", path);
      xhr.onload = function() {
        // Create an array of 8-bit unsigned integers
        var arr = new Uint8Array(this.response);

        // String.fromCharCode returns a 'string' from the specified sequence of Unicode values
        var raw = String.fromCharCode.apply(null, arr);

        //btoa() creates a base-64 encoded ASCII string from a String object
        var b64 = btoa(raw);

        var dataType = "png";
        //ta-da your image data url!
        me.url = "data:image/" + dataType + ";base64," + b64;
      };
      xhr.send();
    },
    handleSelected(tr) {
      this.currentTr = tr;
    },
    geocode: function(address) {
      // var geocoder = new google.maps.Geocoder();
      var geocoder = new google.maps.Geocoder();
      var promiseObj = new Promise(function(resolve, reject) {
        geocoder.geocode({ address: address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results[0].geometry.location);
          } else {
            reject("Không phân giải được tên");
          }
        });
      });
      return promiseObj;
    },
    insertEntity(entity) {
      //   //Xử lý cảng
      let me = this;
      me.$refs.google
        .geocode(entity.address)
        .then(latlng => {
          var latLngObj = {
            lat: latlng.lat(),
            lng: latlng.lng()
          };

          entity.latLng = latLngObj;
          me.api.insert("http://localhost:9000/entity/insert", entity);
        })
        .catch(err => {
          alert(err);
        });
    },
    test(input) {
      let me = this;
      var files = this.$refs.file.files;
      Object.keys(this.$refs.file.files).forEach(function(key) {
        readXlsxFile(files[key]).then(rows => {
          // `rows` is an array of rows
          // each row being an array of cells.
          debugger;
          console.log("tag", rows);
          rows.forEach(function(item, index) {
            if (index == 0) return;
            //Xử lý kho
            if (item[31]) {
              if (!me.marked.hasOwnProperty(item[31])) {
                me.marked[item[31]] = {
                  code: item[31],
                  name: item[32],
                  address: item[33]
                };
                me.lst.push({
                  code: item[31],
                  name: item[32],
                  address: item[33]
                });
              }
            }
            if (item[34]) {
              if (!me.marked.hasOwnProperty(item[34])) {
                me.marked[item[34]] = {
                  code: item[34],
                  name: item[35],
                  address: item[36]
                };
                me.lst.push({
                  code: item[34],
                  name: item[35],
                  address: item[36]
                });
              }
            }
            if (item[54]) {
              if (!me.marked.hasOwnProperty(item[54])) {
                me.marked[item[54]] = {
                  code: item[54],
                  name: item[55],
                  address: item[56]
                };
                me.lst.push({
                  code: item[54],
                  name: item[55],
                  address: item[56]
                });
              }
            }
          });
        });
      });
    },
    insertDB() {
      let me = this;
      me.markedMoocArr.forEach(mooc => {
        if (me.marked.hasOwnProperty(mooc)) {
        } else {
          console.log("mooc not map", mooc);
        }
      });
      me.markedContainerArr.forEach(mooc => {
        if (me.marked.hasOwnProperty(mooc)) {
        } else {
          console.log("container not map", mooc);
        }
      });
      me.markedTruckArr.forEach(mooc => {
        if (me.marked.hasOwnProperty(mooc)) {
        } else {
          console.log("truck not map", mooc);
        }
      });
      me.markedWarehouseArr.forEach(mooc => {
        if (me.marked.hasOwnProperty(mooc)) {
        } else {
          console.log("warehouse not map", mooc);
        }
      });
      me.markedPortArr.forEach(mooc => {
        if (me.marked.hasOwnProperty(mooc)) {
        } else {
          console.log("port not map", mooc);
        }
      });
    }
  }
};
</script>
