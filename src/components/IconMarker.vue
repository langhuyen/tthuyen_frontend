<template>
  <div class="marker-wrap">
    <div class="title">{{title}}</div>
    <div @mouseover="onHover" class="img-wrap">
      <img v-if="type=='DEPOTCONTAINER'" class="img" src="../assets/marker/container.png" />
      <img v-else-if="type=='DEPOTTRAILER'" class="img" src="../assets/marker/mooc.png" />
      <img v-else-if="type=='PORT'" class="img" src="../assets/marker/port.png" />
      <img v-else-if="type=='WAREHOUSE'" class="img" src="../assets/marker/warehouse.png" />
      <img v-else-if="type=='DEPOTTRUCK'" class="img" src="../assets/marker/trailer.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "IconMarker",
  props: {
    type: {},
    title: {
      default: "hello"
    }
  },
  methods: {
    onHover() {}
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.img-wrap {
  width: 30px;
  height: 30px;
}
.img {
  height: 100%;
  width: 100%;
}
.title {
  background: red;
  color: white;
  opacity: 0.8;
  font-size: 7px;
  border: none;
  border-radius: 3px;
  padding: 3px;
  margin-bottom: 3px;
}
.marker-wrap {
  align-items: center;
  display: flex;
  flex-flow: column;
}
</style>