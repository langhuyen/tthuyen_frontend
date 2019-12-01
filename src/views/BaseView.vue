<template>
  <div class="wrap_content p-24-px">
    <div class="h-content t-content p-12-px">
      <google-map :centerCustom="centerCustom" isView :markersView="marker" />
    </div>
  </div>
</template>
<script>
export default {
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