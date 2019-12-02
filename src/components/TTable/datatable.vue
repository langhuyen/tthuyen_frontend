<template>
  <div @scroll="handleScroll" class="datatable">
    <table
      id="example"
      class="display nowrap dataTable dtr-inline collapsed"
      style="width: 100%;"
      role="grid"
      aria-describedby="example_info"
    >
      <thead ref="thead">
        <tr role="row tr-head">
          <th
            v-for="(col,key) in columnConfig"
            :key="key"
            :label="col.title"
            class="sorting_asc align-left"
            tabindex="0"
            aria-controls="example"
            rowspan="1"
            colspan="1"
            :style="{width: col.width}"
            :class="col.textAlign?col.textAlign:'align-left'"
            aria-sort="ascending"
            aria-label="Name: activate to sort column descending"
          >
            {{col.title}}
            <div class="resize" @mousedown.stop="onMouseDown"></div>
          </th>
          <th v-if="selected">
            <vs-checkbox v-model="isSelectedAll" @change.stop="onChangeSelected(data)"></vs-checkbox>
          </th>
        </tr>
      </thead>
      <tbody ref="tbody">
        <template v-for="(data,i) in datasource">
          <tr role="row" :key="i+'-parent'" @click="onClickOpen" :class="i%2==0?'old':'even'">
            <td
              tabindex="0"
              class="sorting_1"
              :class="col.textAlign?col.textAlign:'align-left'"
              v-for="(col,key) in columnConfig"
              :key="key"
            >{{data[col.dataField]}}</td>
            <td v-if="selected">
              <vs-checkbox v-model="isSelectedAll" @change.stop="onChangeSelected(data)" />
            </td>
          </tr>
          <tr class="child hoa" style="display:none" :key="i+'-child'">
            <td class="child" :colspan="selected?columnConfig.length+1:columnConfig.length">
              <slot name="contentsub" :dataRow="data" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import TrTree from "./TrTree.vue";
export default {
  name: "Datatable",

  components: { TrTree },
  data() {
    return {
      parentEl: null,
      currentPointer: 0,
      currentWidth: 0
    };
  },
  props: {
    datasource: {
      type: Array
    },
    columnConfig: {
      type: Array
    },
    selected: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * Hàm xử lý
     */
    onChangeSelected(dataRow) {
      console.log(dataRow);
    },
    onClickOpen(event) {
      let el = event.currentTarget;
      var sibling = el.nextSibling;
      // .classList.contains("child");
      //event.currentTarget.nextSibling.classList.add("child")
      //event.currentTarget.nextSibling.classList.remove("child")
      if (
        sibling.classList.contains("child") &&
        sibling.style.display != "none"
      ) {
        el.classList.remove("parent");
        sibling.style.display = "none";
      } else {
        sibling.style.display = "table-row";
        el.classList.add("parent");
      }
    },
    onMouseDown(event) {
      let me = this;
      me.currentPointer = event.pageX;
      me.parentEl = event.target.parentElement;
      me.currentWidth = me.parentEl.offsetWidth;
      document.addEventListener("mousemove", me.onMouseMove);
    },
    onMouseMove: function(event) {
      let me = this;
      me.resize(event);
      document.addEventListener("mouseup", me.onMouseUp, true);
    },
    resize(event) {
      let me = this;
      let offset = me.currentWidth + (event.pageX - me.currentPointer);
      if (me.parentEl != null) {
        if (offset < 120) {
          me.parentEl.style.width = 120 + "px";
        } else {
          me.parentEl.style.width =
            me.currentWidth + (event.pageX - me.currentPointer) + "px";
        }
      }
    },
    onMouseUp() {
      let me = this;
      document.removeEventListener("mousemove", me.onMouseMove);
      document.removeEventListener("mouseup", me.onMouseUp);
      me.parentEl = null;
      me.currentPointer = 0;
    },
    /**
     * Hàm scroll table
     */

    handleScroll() {
      var thead = this.$refs.thead;
      var tbody = this.$refs.tbody;
      if (
        thead.offsetTop < this.$el.scrollTop &&
        tbody.offsetTop + tbody.offsetHeight > this.$el.scrollTop
      ) {
        var tr = tbody.querySelectorAll("tr")[
            tbody.querySelectorAll("tr").length - 1
          ],
          y =
            tr.offsetTop - thead.offsetHeight < this.$el.scrollTop
              ? tr.offsetTop - thead.offsetHeight - thead.offsetTop
              : this.$el.scrollTop - thead.offsetTop;

        thead.querySelectorAll("th").forEach(element => {
          element.style.transform = "translateY(" + y + "px)";
          element.style["-webkit-transform"] = "translateY(" + y + "px)";
          element.style["z-index"] = 100;
          element.style.background = "#ccc";
        });
      } else {
        thead.querySelectorAll("th").forEach(element => {
          element.style.transform = "none";
          element.style["-webkit-transform"] = "none";
          element.style.background = "#ccc";
        });
      }
    }
  },
  mounted() {
    let me = this;
    window.addEventListener("mouseup", me.onMouseUp, true);
  },
  destroyed() {
    let me = this;
    window.removeEventListener("mouseup", me.onMouseUp);
  },
  computed: {}
};
</script>

<style lang="scss" >
@import "@/assets/scss/datatable.scss";
.datatable {
  height: 100%;
  overflow: auto;
}
</style>

<style >
.tr-head {
  background: #ccc;
}
</style>