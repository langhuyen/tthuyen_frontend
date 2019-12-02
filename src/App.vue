<template>
  <div id="app">
    <!-- <router-view :key="$route.fullPath" /> -->
    <navigation />
    <div style="display:flex">
      <!-- <div> -->
      <sidebar-menu ref="sidebar" :menu="menu" />
      <!-- </div> -->
      <div class="content-wrap-global">
        <router-view />
        <!-- <datatable /> -->
        <!-- :key="$route.fullPath" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import NavigationMenu from "@/layout/NavigationMenu";
import Navigation from "@/layout/Navigation";
import menu from "./menu.js";

export default {
  name: "app",
  data() {
    return {
      menu: menu
    };
  },
  computed: {
    width() {
      // var v = this.$refs.sidebar;
      // var sidebarWidth = v.sidebarWidth;
      // return `cacl(100% - ${sidebarWidth})`;
    }
  },
  components: {
    NavigationMenu,
    Navigation
  },
  methods: {
    handleScroll() {
      alert("hhh");
    }
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

.content-wrap-global {
  flex-grow: 1;
  height: calc(100vh - 48px);
  overflow-y: hidden;
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(189, 205, 241);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00adb3;
}
body {
  overflow: hidden;
}
</style>
