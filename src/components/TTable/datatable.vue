<template>
  <div style="height:100%">
    <!-- <div class="flex">
      Hiển thị
      <t-input />
    </div>-->
    <div @scroll="handleScroll" ref="datatable" class="datatable">
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
            <th v-if="selected" style="width:30px" class="sorting_asc align-left">
              <vs-checkbox size="small" @click="onChangeSelected" color></vs-checkbox>
            </th>
          </tr>
        </thead>
        <tbody ref="tbody">
          <template v-for="(data,i) in datasource">
            <tr
              role="row"
              :key="i+'-parent'"
              @dblclick="dblclick(data)"
              :class="i%2==0?'old':'even'"
            >
              <td
                @click="onClickOpen"
                tabindex="0"
                class="sorting_1"
                :class="col.textAlign?col.textAlign:'align-left'"
                v-for="(col,key) in columnConfig"
                :key="key"
              >{{data[col.dataField]}}</td>
              <td v-if="selected" class="sorting_1">
                <vs-checkbox
                  :checked="isSelected"
                  size="small"
                  @input.native="onChangeSelectedRow(data)"
                />
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
    <div class="dataTables_paginate paging_simple_numbers" id="example_paginate">
      <div class="line"></div>
      <div class="flex align-end">
        <div
          class="paginate_button previous disabled"
          aria-controls="example"
          data-dt-idx="0"
          tabindex="-1"
          id="example_previous"
        >
          <img src="@/assets/previous.png" alt srcset />
        </div>
        <div class="flex">
          <div
            class="paginate_button current"
            aria-controls="example"
            data-dt-idx="1"
            tabindex="0"
          >1</div>
          <div class="paginate_button" aria-controls="example" data-dt-idx="2" tabindex="0">2</div>
          <div class="paginate_button" aria-controls="example" data-dt-idx="3" tabindex="0">3</div>
          <div class="paginate_button" aria-controls="example" data-dt-idx="4" tabindex="0">4</div>
          <div class="paginate_button" aria-controls="example" data-dt-idx="5" tabindex="0">5</div>
          <div class="paginate_button" aria-controls="example" data-dt-idx="6" tabindex="0">6</div>
        </div>
        <div
          class="paginate_button next"
          aria-controls="example"
          data-dt-idx="7"
          tabindex="0"
          id="example_next"
        >
          <img src="@/assets/next.png" alt srcset />
        </div>
      </div>
    </div>
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
      currentWidth: 0,
      isSelectedAll: [],
      isSelected: false,
      currentPage: ""
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
    dblclick(data) {
      this.$emit("dblclick", event, data);
    },
    /**
     * Ham xử lý click chọn 1 row
     */

    onChangeSelectedRow(dataRow) {
      let me = this;
      if (event.target.checked) {
        me.isSelectedAll.push(dataRow);
      } else {
        var x = me.isSelectedAll.indexOf(dataRow);
        me.isSelectedAll.splice(x, 1);
        console.log(me.isSelectedAll);
        console.log(x);
      }
      me.$emit("input", me.isSelectedAll);
    },
    /**
     * Hàm xử lý
     */
    onChangeSelected(data) {
      let me = this;
      if (event.target.checked) {
        me.isSelectedAll = me.datasource;
        me.isSelected = true;
      } else {
        me.isSelectedAll = [];
        me.isSelected = false;
      }
      me.$emit("input", me.isSelectedAll);
    },
    onClickOpen(event) {
      let el = event.currentTarget.parentElement;
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
      var table = this.$refs.datatable;
      if (
        thead.offsetTop < table.scrollTop &&
        tbody.offsetTop + tbody.offsetHeight > table.scrollTop
      ) {
        var tr = tbody.querySelectorAll("tr")[
          tbody.querySelectorAll("tr").length - 2
        ];

        var y =
          tr.offsetTop - thead.offsetHeight < table.scrollTop
            ? tr.offsetTop - thead.offsetHeight - thead.offsetTop
            : table.scrollTop - thead.offsetTop;

        thead.querySelectorAll("th").forEach(element => {
          element.style.transform = "translateY(" + y + "px)";
          element.style["-webkit-transform"] = "translateY(" + y + "px)";
          element.style["z-index"] = 40001;
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
  height: calc(100% - 32px);
  overflow: auto;
}
</style>

<style lang='scss' >
.tr-head {
  background: #ccc;
}
.paginate_button {
  width: 32px;
  height: 32px;
  border: 1px solid #ccc;
  padding: 4px;
  margin-right: 8px;
  justify-content: center;
  cursor: pointer;
  :hover {
    background: red;
  }
  img {
    width: 50%;
    // height: 100 %;
  }
}
</style>