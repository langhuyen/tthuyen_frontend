<template>
  <div>
    <navigation />
    <div style="display:flex">
      <!-- <div> -->
      <sidebar-menu ref="sidebar" :menu="menu" />
      <!-- </div> -->
      <div class="content-wrap-global">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>
<script>
import NavigationMenu from "@/layout/NavigationMenu";
import Navigation from "@/layout/Navigation";
import menu from "./../menu.js";
export default {
  data() {
    return {
      menu: menu
    };
  },
  components: {
    NavigationMenu,
    Navigation
  }
};
</script>