<template lang="html">
    <div class="wrap_content p-24-px">
      <div class="h-content t-content p-12-px">

        <div class="left-content mr-20-px">
         
            
            <div class='main-title'>
            Thêm {{title}}
            </div>
            <div class="wrap-font-warning mb-12-px">
              <i class="fas font-warning fa-exclamation-circle"></i>
              <div class="align-center">
                  <div> Nhập địa chỉ sau đó sử dụng marker để điều</div>
                <div>chỉnh vị trí trên bản đồ nếu chưa đúng.</div>
              </div>
           </div>
         

            
            <div class="mb-12-px w-full">

              <t-input v-model='entityData.code' title='Mã'/>
            </div>
            <div class="mb-12-px w-full">

              <t-input v-model='entityData.name' title='Tên'/>
            </div>
            <div class="mb-12-px w-full">
              <t-input v-model='entityData.address' @change='changeAdrress' title='Địa chỉ'/>
            </div>
            <div class="mb-12-px w-full">
              <t-textarea v-model='entityData.description' title='Ghi chú'/>
            </div>
            <div class="t-button-wrap">
              
              <vs-button color="#c1c1c1" class='mr-8-px'  @click='Cancel' type="border">Hủy</vs-button>
              <vs-button color="#c1c1c1" class='mr-8-px'  @click='Add' type="border">Lưu Và Thêm mới</vs-button>
              <vs-button color="rgb(26, 115, 232)" class='mr-8-px' @click='AddAndClose' type="filled">Lưu</vs-button>
            </div>
        </div>
        <div class="right-content ">
             <google-map @ready='onReady' ref='map'  @dragend="changeLocation" />
        </div>
      </div>
     
    </div>
</template>

<script>
import BaseDetail from "./BaseDetail";
import axios from "axios";
export default {
  extends: BaseDetail,
  created() {
    // this.entityName=this.$router.param.entityName;
  },
  mounted() {},
  data() {
    return {
      address: "ha noi",
      code: "00102",
      latlng: { lat: 21.0278, lng: 105.8342 },
      keyAPI: "AIzaSyBfFB0Xva7w9CWsrTxEneaLMgPlWQA8rXc",
      marker: null
    };
  },
  methods: {
    onReady() {
      if (this.entityData.latLng) {
        this.setdefaultMarker();
      }
    },
    setdefaultMarker() {
      var me = this,
        latlng = me.entityData.latLng;
      me.$refs.map.$refs.map.setCenter(latlng);
      if (me.marker) {
        me.marker.setMap(null);
      }

      me.marker = me.$refs.map.$refs.map.createdMarker(
        latlng,
        null,
        null,
        true
      );
    },
    validate() {
      var data = this.entityData;
      if (
        data.code == undefined ||
        data.code == null ||
        data.code.trim() == ""
      ) {
        return false;
      }
      if (
        data.name == undefined ||
        data.name == null ||
        data.name.trim() == ""
      ) {
        return false;
      }
      if (
        data.address == undefined ||
        data.address == null ||
        data.address.trim() == ""
      ) {
        return false;
      }
      return true;
    },
    geocode: function(address) {
      var geocoder = new google.maps.Geocoder();
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.keyAPI}`;
      var geocoder = new google.maps.Geocoder();
      var promiseObj = new Promise(function(resolve, reject) {
        // axios
        //   .get(url)
        //   .then(res => {
        //     if (res.data.status == "OK") {
        //       resolve(res.data.results[0].geometry.location);
        //     } else {
        //       reject(res);
        //     }
        //   })
        //   .catch(err => {
        //     reject(err);
        //   });
        geocoder.geocode({ address: address }, function(results, status) {
          if (status == "OK") {
            resolve(results[0].geometry.location);
          } else {
            reject(status);
          }
        });
      });

      return promiseObj;
    },
    //Thay đổi vị trí
    changeLocation(event, marker) {
      var latlng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.entityData.latLng = latlng;
    },
    changeAdrress(value) {
      let me = this;
      if (value) {
        me.geocode(value)
          .then(latlng => {
            console.log(latlng);
            me.entityData.latLng = latlng;
            me.$refs.map.$refs.map.setCenter(latlng);
            if (me.marker) {
              me.marker.setMap(null);
            }
            me.marker = me.$refs.map.$refs.map.createdMarker(
              latlng,
              null,
              null,
              true
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>