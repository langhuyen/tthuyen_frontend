<template lang="html">
    <div class="wrap_content  p-24-px flex">
  
      <div class=" left-content  mr-20-px h-content list-content p-12-px ">  
            <div class='main-title'>
              {{title}}
              </div>
            
          <div class='flex'>
            <div class='w-408-px  mr-20-px'>
            
                <div class="mb-12-px w-200-px ">

                  <t-input v-model='entityData.code' title='Mã'/>
                </div>
              
                <div class='flex mb-12-px  '>

                    <div class="w-200-px mr-8-px">
                    <date v-model="entityData.earlyPickupDateTime" title='TG đến sớm nhất'/>
                    </div>
                    <div class='w-200-px'>
                    <date v-model="entityData.latePickupDateTime" title='TG đến  muộn nhất'/>
                    </div>
                    
                </div>
                <div class='flex mb-12-px '>

                    <div class="w-200-px mr-8-px">
                    <date v-model="entityData.earlyDeliveryDateTime" title='TG vận chuyển sớm nhất'/>
                    </div>
                    <div class='w-200-px'>
                    <date v-model="entityData.lateDeliveryDateTime" title='TG vận chuyển muộn nhất'/>
                    </div>
                    
                </div>
                <div class='flex mb-12-px  ' v-if="isPort">
                    <div class=" mr-8-px ">
                      
                      <combobox    @selected='onSelectedPort'  v-model="entityData.portCode" title='Cảng' isServer urlPath='http://localhost:9000/entity/getType/:PORT' fieldValue='id' fieldText='name'/>
                    
                    </div>
                    <div class="">
                      <combobox  @selected='onSelectedWarehouse' v-model="entityData.warehouseCode" title='Kho' isServer urlPath='http://localhost:9000/entity/getType/:WAREHOUSE' fieldValue='id' fieldText='name'/>
                    
                    </div>
                </div>
                <div class='flex mb-12-px  ' v-if="!isPort">
                   
                    <div class="mr-8-px">
                      <combobox  @selected='onSelectedWarehouse'  v-model="entityData.warehouseCode" title='Kho' isServer urlPath='http://localhost:9000/entity/getType/:WAREHOUSE' fieldValue='id' fieldText='name'/>
                    
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

                    <t-input type="number" v-model="entityData.weight" title='Trọng tải (tấn)'/>
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
    onSelectedContainer(data) {},
    //Chonj doi tuong
    onSelectedPort(data) {
      console.log(data);
      let me = this;
      if (me.port) {
        me.port.setMap(null);
      }
      this.port = me.$refs.map.$refs.map.createdMarker(
        data.latlng,
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
        data.latlng,
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

      // me.loadDepot();
    },
    selectedEvent(data) {
      console.log(data);
    },

    loadDepot() {
      var me = this,
        url = "http://localhost:9000/entity/get";
      me.marker = [];
      this.api.getAll(url).then(result => {
        if (me.isPort) {
          var arr = result.data.data.filter(
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
          var arr = result.data.data.filter(i => i.type == "WAREHOUSE");
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