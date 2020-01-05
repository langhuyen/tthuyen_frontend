<template>
  <div class="wrap_content p-24-px">
    <div class="h-content t-content p-12-px">
      <google-map
        :centerCustom="centerCustom"
        @clickmarker="onClickMarker"
        isView
        :markersView="marker"
      />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
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
    }
  },
  mounted() {
    var me = this;
    if (this.$route.params.data) {
      this.$route.params.data.forEach(function(item) {
        if (item.latLng) {
          me.centerCustom = item.latLng;
          var obj = {};
          obj.position = item.latLng;
          obj.title = item.name;
          obj.type = item.type;
          obj.content = item;
          me.marker.push(obj);
        }
      });
    } else {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      marker: [],
      centerCustom: {}
    };
  }
};
</script>