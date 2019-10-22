<template>
  <div class="map" style="height:30px; width:300px" ref="map">Coongj hoa xa hoi chu nghia Viet Nam</div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return { map: null };
  },
  created() {
    var mapOptions = {
      zoom: 7,
      center: chicago
    };
    // this.map = new google.maps.Map(this.$refs.map, mapOptions);
  },
  props: {},
  methods: {
    /**
     * TThuyen
     * Tao 1 marker
     */
    createdMarker(position, icon) {}
  },
  computed: {}
};
</script>
