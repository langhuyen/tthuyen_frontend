<template>
  <div id="app">
    <navigation />
    <div style="display:flex">
      <div style="width:200px">
        <sidebar-menu :menu="menu" />
      </div>
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import NavigationMenu from "@/layout/NavigationMenu";
import Navigation from "@/layout/Navigation";
import menu from './menu.js'

export default {
  name: "app",
  data() {
    return {
      menu:menu
    };
  },
  components: {
    NavigationMenu,
    Navigation
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/menu.scss";
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
// .v-sidebar-menu {
//   width: 200px;
//   background-color: #11115b;
//   height: calc(100vh - 48px);
//   top: 48px;
// }
.v-sidebar-menu.vsm_expanded {
}
.v-sidebar-menu.vsm_collapsed {
}
.v-sidebar-menu.vsm_rtl {
}
.v-sidebar-menu .vsm--item {
}
.v-sidebar-menu .vsm--item.vsm--item_open {
}
.v-sidebar-menu .vsm--link {
}
.v-sidebar-menu .vsm--link.vsm--link_active {
}
.v-sidebar-menu .vsm--link.vsm--link_exact-active {
}
.v-sidebar-menu .vsm--link.vsm--link_mobile-item {
}
.v-sidebar-menu .vsm--link.vsm--link_level-[n] {
}
.v-sidebar-menu .vsm--link.vsm--link_disabled {
}
.v-sidebar-menu .vsm--title {
}
.v-sidebar-menu .vsm--icon {
  // background-color: #11115b;
}
.v-sidebar-menu .vsm--arrow {
}
.v-sidebar-menu .vsm--arrow.vsm--arrow_open {
}
.v-sidebar-menu .vsm--badge {
}
.v-sidebar-menu .vsm--header {
}
.v-sidebar-menu .vsm--list {
}
.v-sidebar-menu .vsm--dropdown > .vsm--list {
}
.v-sidebar-menu .vsm--mobile-item {
}
.v-sidebar-menu .vsm--mobile-bg {
}
.v-sidebar-menu .vsm--toggle-btn {
  // background-color: #11115b !important;
}
</style>
