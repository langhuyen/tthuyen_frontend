<template>
  <div class="ms-tooltip">
    <div class ref="parentTooltip">
      <div
        v-show="isShow"
        ref="tooltip"
        :style="{top:top,left:left}"
        class="tooltip"
        id="tooltip-content"
      >{{tooltip}}</div>
    </div>

    <div @mouseover="onHover" class="tooltip-content" @mouseleave="onBlur">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    tooltip: {
      default: "Đây là tooltip"
    }
  },
  data() {
    return {
      isShow: false,
      top: "50px",
      left: "300px"
    };
  },
  mounted() {},
  methods: {
    onHover() {
      this.top = Math.floor(Math.random() * 10) + "px";
      this.isShow = true;
      let parent = this.$refs.parentTooltip;
      let elx = this.$refs.tooltip;
      try {
        parent.removeChild(elx);
      } catch (error) {}
      this.insertBody();
    },
    onBlur() {
      this.isShow = false;
      let elx = this.$refs.tooltip;
      let parent = this.$refs.parentTooltip;
      try {
        document.body.removeChild(elx);
      } catch (error) {}
      parent.insertBefore(elx, parent.firstChild);
    },
    insertBody() {
      let elx = this.$refs.tooltip;
      document.body.insertBefore(elx, document.body.firstChild);
    }
  }
};
</script>
<style>
.tooltip {
  position: absolute;
  height: 32px;
  width: auto;
}
</style>