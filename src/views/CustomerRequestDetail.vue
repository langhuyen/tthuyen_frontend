<template lang="html">
    <div class="wrap_content  p-24-px flex">
  
      <div class=" left-content  mr-20-px h-content list-content p-12-px ">  
            <div class='main-title'>
              {{title}}
              </div>
            
          <div class='flex'>
            <div class='w-408-px  mr-20-px'>
                  <div class="error mt-12-px" v-if="error">{{error}}</div>
                <div class="mb-12-px w-200-px ">

                  <t-input ref='code' required v-model='entityData.code' title='Mã'/>
                </div>
              
                <div class='flex mb-12-px  '>

                    <div class="w-200-px mr-8-px">
                    <date  ref='earlyPickupDateTime' required v-model="entityData.earlyPickupDateTime" title='TG đến sớm nhất'/>
                    </div>
                    <div class='w-200-px'>
                    <date ref='latePickupDateTime' required v-model="entityData.latePickupDateTime" title='TG đến  muộn nhất'/>
                    </div>
                    
                </div>
                <div class='flex mb-12-px '>

                    <div class="w-200-px mr-8-px">
                    <date ref='earlyDeliveryDateTime' required v-model="entityData.earlyDeliveryDateTime" title='TG vận chuyển sớm nhất'/>
                    </div>
                    <div class='w-200-px'>
                    <date ref='lateDeliveryDateTime' required  v-model="entityData.lateDeliveryDateTime" title='TG vận chuyển muộn nhất'/>
                    </div>
                    
                </div>
                <div class='flex mb-12-px  ' v-show="isPort">
                    <div class=" mr-8-px ">
                      
                      <combobox    @selected='onSelectedPort'  v-model="entityData.portCode" title='Cảng' isServer urlPath='http://localhost:9000/entity/getType/:PORT' fieldValue='id' fieldText='code'/>
                    
                    </div>
                    <div class="">
                    <combobox  @selected='onSelectedWarehouse'  v-model="entityData.warehouseCode" title='Kho' isServer urlPath='http://localhost:9000/entity/getType/:WAREHOUSE' fieldValue='id' fieldText='code'/>
                    
                    </div>
                </div>
                <div class='flex mb-12-px ' v-show='!isPort'>
                   
                    <div class="mr-8-px">
                      <combobox  @selected='onSelectedWarehouse'  v-model="entityData.warehouseCode" title='Kho' isServer urlPath='http://localhost:9000/entity/getType/:WAREHOUSE' fieldValue='id' fieldText='code'/>
                    
                    </div>
                    <div class="w-200-px ">
                      <combobox   @selected='onSelectedContainer' v-model="entityData.containerCode" title='Container' isServer urlPath='http://localhost:9000/instance/getType/:CONTAINER' fieldValue='id' fieldText='code'/>
                    </div>
                </div>

                <div class="mb-12-px w-full">
                <t-textarea v-model='entityData.description' title='Ghi chú'/>
                </div>

                <div class='flex mb-12-px ' v-if="isPort">

                    <div class="w-200-px mr-8-px">
                      <combobox v-model="entityData.containerCode" title='Container' isServer urlPath='http://localhost:9000/instance/getType/:CONTAINER' fieldValue='id' fieldText='code'/>
                    </div>
                    <div class='w-200-px'>

                    <t-input type="number" ref='weight' required  v-model="entityData.weight" title='Trọng tải (tấn)'/>
                    </div>
                    
                </div>
                <div class="t-button-wrap">
                  
                  <vs-button color="dark" class='mr-8-px'  @click='Cancel' type="border">Hủy</vs-button>
                  <vs-button color="rgb(26, 115, 232)" class='mr-8-px'  @click='Add' type="border">Lưu Và Thêm mới</vs-button>
                  <vs-button color="rgb(26, 115, 232)" class='mr-8-px' @click='AddAndClose' type="filled">Lưu</vs-button>
                </div>
            </div>
            <div class='right-content'>

              <google-map @ready='onReady' ref='map'   @clickmarker="onClickMarker" :centerCustom="latlng" isView :markersView="marker" />
            </div>
         </div>
            
      </div>
      

     
    </div>
</template>

<script>
import BaseRequestDetail from "./BaseRequestDetail";
export default {
  extends: BaseRequestDetail,
  created() {
    // this.entityName=this.$router.param.entityName;
  },
  computed: {
    isPort() {
      return (
        this.type == "ExportLadenRequest" || this.type == "ImportLadenRequest"
      );
    }
  },
  data() {
    return {
      error: null,
      marker: [],
      address: "ha noi",
      code: "00102",
      latlng: { lat: 21.0278, lng: 105.8342 },
      IconMarker: {
        PORT: "port.png",
        WAREHOUSE: "warehouse.png",
        DEPOTTRUCK: "truck.png",
        DEPOTCONTAINER: "container.png",
        DEPOTTRAILER: "mooc.png"
      },
      warehouse: null,
      port: null
    };
  },
  mounted() {
    // this.loadDepot();
  },
  methods: {
    //Validate
    validate() {
      var data = this.entityData;
      if (
        data.code == undefined ||
        data.code == null ||
        data.code.trim() == ""
      ) {
        this.error = "Mã không được bỏ trống";
        this.$refs.code.setError(this.error);
        return false;
      }
      //Thời gian

      if (
        data.earlyPickupDateTime == undefined ||
        data.earlyPickupDateTime == null
      ) {
        this.error = "TG đến sớm nhất không được bỏ trống";

        return false;
      }
      if (
        data.latePickupDateTime == undefined ||
        data.latePickupDateTime == null
      ) {
        this.error = "TG đến  muộn nhất không được bỏ trống";

        return false;
      }
      if (
        data.earlyDeliveryDateTime == undefined ||
        data.earlyDeliveryDateTime == null
      ) {
        this.error = "TG vận chuyển sớm nhất không được bỏ trống";

        return false;
      }
      if (
        data.lateDeliveryDateTime == undefined ||
        data.lateDeliveryDateTime == null
      ) {
        this.error = "TG vận chuyển muộn nhất không được bỏ trống";

        return false;
      }

      if (data.warehouseCode == undefined || data.warehouseCode == null) {
        this.error = "Kho không được bỏ trống";

        return false;
      }
      if (data.containerCode == undefined || data.containerCode == null) {
        this.error = "Container không được bỏ trống";
        return false;
      }

      //Cảng, trọng tải ==>> yêu cầu  isPorrt
      if (this.isPort) {
        if (data.portCode == undefined || data.portCode == null) {
          this.error = "Cảng không được bỏ trống";

          return false;
        }
        if (data.weight == undefined || data.weight == null) {
          this.error = "Trọng tải không được bỏ trống";
          this.$refs.weight.setError(this.error);
          return false;
        }
      }
      return true;
    },
    onSelectedContainer(data) {},
    //Chonj doi tuong
    onSelectedPort(data) {
      let me = this;
      if (me.port) {
        me.port.setMap(null);
      }
      this.port = me.$refs.map.$refs.map.createdMarker(
        data.latLng,
        null,
        null,
        false
      );
    },
    onSelectedWarehouse(data) {
      let me = this;
      if (me.warehouse) {
        me.warehouse.setMap(null);
      }
      this.warehouse = me.$refs.map.$refs.map.createdMarker(
        data.latLng,
        null,
        null,
        false
      );
    },
    onClickMarker(event, marker) {
      var me = this;
      var content = marker.content;
      var id = "div-" + content.id;
      var div = ` <div class="info-detail">
      <div class="row-detail flex">
        <div class="title-lable">
        Mã: 
        </div>
         <div class="row-content">
          ${content.code}
         </div>
        
        </div>
      <div class="row-detail flex">
        <div class="title-lable">
        Tên: 
        </div>
         <div class="row-content">
          ${content.name || ""}
         </div>
        
        </div>
      <div class="row-detail flex">
        <div class="title-lable">
        Địa chỉ: 
        </div>
         <div class="row-content">
          ${content.address}
         </div>
        
        </div>
       
      </div>
    </div>`;
      var infowindow = new google.maps.InfoWindow({
        content: div,
        maxWidth: 350
      });
      infowindow.open(marker.getMap(), marker);

      google.maps.event.addListener(marker.getMap(), "click", function() {
        infowindow.close();
      });
    },
    onReady() {
      let me = this;

      me.loadDepot();
    },
    selectedEvent(data) {},

    loadDepot() {
      var me = this,
        url = "http://localhost:9000/entity/get";
      me.marker = [];
      this.api.getAll(url).then(result => {
        if (me.isPort) {
          var arr = result.data.data.data.filter(
            i => i.type == "PORT" || i.type == "WAREHOUSE"
          );

          arr.forEach(function(item) {
            if (item.latLng) {
              me.latlng = item.latLng;
              var obj = {};
              obj.icon = "./../../../../" + me.IconMarker[item.type];
              obj.position = item.latLng;
              obj.title = item.name;
              obj.type = item.type;
              obj.content = item;
              me.marker.push(obj);
            }
          });
        } else {
          var arr = result.data.data.data.filter(i => i.type == "WAREHOUSE");
          arr.forEach(function(item) {
            if (item.latLng) {
              me.latlng = item.latLng;
              var obj = {};
              obj.icon = "./../../../../" + me.IconMarker[item.type];
              obj.position = item.latLng;
              obj.title = item.name;
              obj.type = item.type;
              obj.content = item;
              me.marker.push(obj);
            }
          });
        }
      });
      //Load depot trên bản đò cho ng dùng xem
    }
  }
};
</script>
<style lang="scss">
.left-content {
  width: 45%;
}
.right-content {
  flex-grow: 1;
}
</style>