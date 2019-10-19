<template>
  <div class="nav-item" @click="directTo(to)">
    <div class="nav-icon">
      <slot></slot>
    </div>
    <div class="nav-title">{{title}}</div>
  </div>
</template>
<script>
export default {
  name: "NavigationItem",
  props: {
    to: {
      type: String
    },
    title: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    directTo(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style  scoped>
.nav-item {
  display: flex;
  font-size: 14px;
  color: #707070;
  background: inherit;
  opacity: 0.7;
  border-bottom: 1px solid #707070;
  padding: 8px 20px;
}
.nav-item:hover {
  color: white;
  opacity: 1;
  cursor: pointer;
}
</style>
