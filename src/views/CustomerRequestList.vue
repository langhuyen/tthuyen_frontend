<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title flex align-center">
        <div class="mr-12-px">Danh sách {{title}}</div>
        <div>
          <t-input
            @keydown.enter="search"
            v-model="queryString"
            placeholder="Nhập tên, mã, địa chỉ để tìm kiếm"
          />
        </div>
        <div class="t-button-wrap flex flex-end">
          <vs-button color="rgb(26, 115, 232)" @click="Add" type="filled">Thêm mới</vs-button>
        </div>
      </div>
      <div class="wrap-table">
        <vs-table class="scoll" v-model="selected" @selected="handleSelected" :data="data">
          <template slot="thead">
            <!-- <vs-th>MÃ</vs-th> -->
            <vs-th class="align-left w-120-px">MÃ</vs-th>
            <vs-th class="align-left w-120-px">KHO</vs-th>
            <vs-th class="align-left w-120-px" v-if="isPort">CẢNG</vs-th>
            <vs-th class="align-left w-120-px">CONTAINER</vs-th>
            <vs-th class="align-left w-120-px">TRỌNG TẢI</vs-th>
            <vs-th class="align-center w-200-px">TG ĐẾN SỚM NHẤT</vs-th>
            <vs-th class="align-center w-200-px">TG ĐẾN MUỘN NHẤT</vs-th>
            <vs-th class="align-center w-200-px">TG VẬN CHUYỂN SỚM NHẤT</vs-th>
            <vs-th class="align-center w-200-px">TG VẬN CHUYỂN MUỘN NHẤT</vs-th>
            <vs-th class="align-left w-300-px">GHI CHÚ</vs-th>
            <vs-th class="align-center w-120-px">CHỨC NĂNG</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <!-- <vs-td :data="data[indextr].code">{{ data[indextr].code }}</vs-td> -->
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].warehouse"
              >{{data[indextr].code}}</vs-td>
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].warehouse"
              >{{data[indextr].warehouseCode[0].code}}</vs-td>
              <vs-td
                class="align-left w-120-px"
                v-if="isPort"
                :data="data[indextr].port"
              >{{data[indextr].portCode[0].code}}</vs-td>
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].containerTypeCode"
              >{{data[indextr].containerCode[0].code}}</vs-td>
              <vs-td
                class="align-left w-120-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].weight||0 }} tấn</vs-td>
              <vs-td
                class="align-center w-200-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].earlyPickupDateTime|formatDate }}</vs-td>
              <vs-td
                class="align-center w-200-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].latePickupDateTime|formatDate }}</vs-td>
              <vs-td
                class="align-center w-200-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].earlyDeliveryDateTime|formatDate }}</vs-td>
              <vs-td
                class="align-center w-200-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].lateDeliveryDateTime|formatDate }}</vs-td>
              <vs-td
                class="align-left w-300-px"
                :data="data[indextr].quantity"
              >{{ data[indextr].description }}</vs-td>

              <vs-td>
                <div class="flex icon-feature flex">
                  <div @click="Edit(dataRow)">
                    <i class="fas fa-edit icon-feature-detail"></i>
                  </div>
                  <div class="icon-feature-detail">/</div>
                  <div @click="Delete(dataRow)">
                    <i class="far fa-trash-alt icon-feature-detail"></i>
                  </div>
                </div>
              </vs-td>
            </vs-tr>
          </template>
          <br />

          <pre>{{ selected }}</pre>
        </vs-table>
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
  </div>
</template>

<script>
import BaseRequestList from "./BaseRequestList";
export default {
  extends: BaseRequestList,
  data() {
    return {
      selected: []
    };
  },
  computed: {
    isPort() {
      return (
        this.type == "ExportLadenRequest" || this.type == "ImportLadenRequest"
      );
    }
  },
  filters: {
    formatDate(val) {
      let valuedate = new Date(val);
      let date =
        valuedate.getDate() < 10
          ? "0" + valuedate.getDate()
          : valuedate.getDate();
      let month =
        valuedate.getMonth() < 9
          ? "0" + (valuedate.getMonth() + 1)
          : valuedate.getMonth() + 1;
      return (
        date +
        "/" +
        month +
        "/" +
        valuedate.getFullYear() +
        " " +
        valuedate.getHours() +
        ":" +
        valuedate.getMinutes() +
        ":" +
        valuedate.getSeconds()
      );
    }
  },
  methods: {
    handleSelected(tr) {
      this.currentTr = tr;
    },
    test() {
      alert("ok");
    }
  }
};
</script>
 <style >
.disabled
  i.vs-icon.notranslate.icon-scale.icon-select.vs-select--icon.material-icons.null {
  display: none;
}
.disabled input.input-select.vs-select--input {
  border: none;
}
.scoll {
  overflow: auto;
}
.disabled .con-select.autocompletex {
  width: 120px;
}
</style>