<template>
  <div class="nav">
    <navigation-item
      v-for="(item,index) in items"
      :key="index"
      :title="item.title"
      :to="item.path"
    />
  </div>
</template>

<script>
import NavigationItem from "./NavigationItem";
import items from "./item";
export default {
  name: "Navigation",
  components: {
    NavigationItem
  },
  data() {
    return {
      items: items
    };
  }
};
</script>
<style  scoped>
.nav {
  width: 200px;
  background: #11115b;
  height: calc(100vh - 48px);
}
</style>