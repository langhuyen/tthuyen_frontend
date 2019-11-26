<template lang="html">
    <div class="wrap_content p-24-px">
      <div class="h-content t-content p-12-px">

        <div class="left-content mr-20-px">
         
            
          <div class='main-title'>
            Thêm {{title}}
            </div>
         

            
            <div class="mb-12-px w-full">

              <t-input v-model='entityData.code' title='Mã'/>
            </div>
            <div class="mb-12-px w-full">

              <t-input v-model='entityData.name' title='Tên'/>
            </div>
            <div class="mb-12-px w-full">
              <t-input v-model='entityData.address' title='Địa chỉ'/>
            </div>
            <div class="t-button-wrap">
              
              <vs-button color="#c1c1c1" class='mr-8-px'  @click='Cancel' type="border">Hủy</vs-button>
              <vs-button color="#c1c1c1" class='mr-8-px'  @click='Add' type="border">Lưu Và Thêm mới</vs-button>
              <vs-button color="rgb(26, 115, 232)" class='mr-8-px' @click='AddAndClose' type="filled">Lưu</vs-button>
            </div>
        </div>
        <div class="right-content ">
             <google-map v-model="entityData.latLng" :address.sync="entityData.address" />
        </div>
      </div>
     
    </div>
</template>

<script>
import BaseDetail from "./BaseDetail";
export default {
  extends: BaseDetail,
  created() {
    // this.entityName=this.$router.param.entityName;
  },
  data() {
    return {
      address: "ha noi",
      code: "00102",
      latlng: { lat: 21.0278, lng: 105.8342 }
    };
  }
};
</script>