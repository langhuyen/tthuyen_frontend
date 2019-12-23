<template lang="html">
  <transition name="popup-t">
    <div
      v-show="active"
      ref="con"
      :class="[`vs-popup-${color}`,{'fullscreen':fullscreen}]"
      class="vs-component con-vs-popup"
      @click="close($event,true)">
      <div
        :style="styleCon"
        class="vs-popup--background"/>
      <div
        ref="popupx"
        :style="stylePopup"
        class="vs-popup">

        <!-- //header -->
        <header
          :style="styleHeader"
          class="vs-popup--header">
          <div class="vs-popup--title">
            <h3>{{ title }}</h3>
          </div>
          <div
            v-if="!buttonCloseHidden"
            ref="btnclose"
            :icon-pack="iconPack"
            :icon="iconClose"
            class="styleIcon"
            
            @click="close($event,true)"> X</div>
        </header>

        <!-- // slots  -->
        <div
          :style="styleContent"
          :class="classContent"
          class="vs-popup--content">
          <slot/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import _color from "../../utils/color.js";
export default {
  name: "TPopup",
  props: {
    color: {
      default: "primary",
      type: String
    },
    active: {
      default: false,
      type: Boolean
    },
    title: {
      default: "popup",
      type: String
    },
    buttonCloseHidden: {
      default: false,
      type: Boolean
    },
    fullscreen: {
      default: false,
      type: Boolean
    },
    backgroundColor: {
      default: null,
      type: String
    },
    backgroundColorPopup: {
      default: "rgb(255,255,255)",
      type: String
    },
    styleContent: {
      default: null,
      type: String
    },
    classContent: {
      default: null,
      type: String
    },
    iconPack: {
      default: "material-icons",
      type: String
    },
    iconClose: {
      default: "close",
      type: String
    }
  },
  computed: {
    styleHeader() {
      return {
        color: "rgb(26, 115, 232)"
      };
    },
    styleAfter() {
      return {
        background: "#212121"
      };
    },
    styleCon() {
      return {
        background: "#212121",
        opacity: 0.4
      };
    },
    stylePopup() {
      return {
        background: "white"
      };
    }
  },
  mounted() {
    this.insertBody();
  },
  methods: {
    giveColor(color) {
      return _color.rColor(color);
    },
    close(event, con) {
      if (con) {
        if (event.target.className.indexOf("vs-popup--background") != -1) {
          this.$emit("update:active", false);
          this.$emit("close", false);
        } else if (event.srcElement == this.$refs.btnclose) {
          this.$emit("update:active", false);
          this.$emit("close", false);
        }
      }
    },
    insertBody() {
      let elx = this.$refs.con;
      document.body.insertBefore(elx, document.body.firstChild);
    }
  }
};
</script>
<style lang="scss">
.styleIcon {
  width: 32px;
  /* background: white; */
  height: 32px;
  font-size: 32px;
  cursor: pointer;
}
</style>