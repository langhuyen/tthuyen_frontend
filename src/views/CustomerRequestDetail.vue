<template lang="html">
    <div class="wrap_content p-24-px">
      <div class="h-content list-content p-12-px ">  
            <div class='main-title'>
              {{title}}
              </div>
          <div class='w-408-px'>
          
              <div class="mb-12-px ">

                <t-input v-model='entityData.code' title='Mã'/>
              </div>
               <div class='flex mb-12-px  '>
              <div v-if="isPort" class=" mr-8-px ">
                 
                 <combobox   v-model="entityData.portCode" title='Cảng' isServer urlPath='http://localhost:9000/entity/getType/:PORT' fieldValue='id' fieldText='name'/>
               
              </div>
              <div class="">
                <combobox v-model="entityData.warehouseCode" title='Kho' isServer urlPath='http://localhost:9000/entity/getType/:WAREHOUSE' fieldValue='id' fieldText='name'/>
               
              </div>
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
                  <date v-model="entityData.lateDeliveryDateTime" title='TGVC vận chuyển muộn nhất'/>
                  </div>
                  
              </div>
              <div class='flex mb-12-px '>

                  <div class="w-200-px mr-8-px">
                    <combobox v-model="entityData.containerTypeCode" title='Loại container' isServer urlPath='http://localhost:9000/entity/getType/:CONTAINER' fieldValue='id' fieldText='code'/>
               
                  </div>
                  <div class='w-200-px'>

                  <t-input type="number" v-model="entityData.quantity" title='Số lượng'/>
                  </div>
                  
              </div>
              <div class="t-button-wrap">
                
                <vs-button color="dark" class='mr-8-px'  @click='Cancel' type="border">Hủy</vs-button>
                <vs-button color="#0BEC03" class='mr-8-px'  @click='Add' type="border">Lưu Và Thêm mới</vs-button>
                <vs-button color="#0BEC03" class='mr-8-px' @click='AddAndClose' type="filled">Lưu</vs-button>
              </div>
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
      address: "ha noi",
      code: "00102",
      latlng: { lat: 21.0278, lng: 105.8342 }
    };
  }
};
</script>