<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title">Danh sách {{title}}</div>
      <div class="t-button-wrap mb-12-px">
        <vs-button color="rgb(26, 115, 232)" @click="Add" type="filled">Thêm mới</vs-button>
      </div>
      <vs-table class="scoll" v-model="selected" @selected="handleSelected" :data="data">
        <template slot="thead">
          <!-- <vs-th>MÃ</vs-th> -->
          <vs-th>KHO</vs-th>
          <vs-th v-if="isPort">CẢNG</vs-th>
          <vs-th>Loại Container</vs-th>
          <vs-th>Số lượng</vs-th>
          <vs-th>TG đến sớm nhất</vs-th>
          <vs-th>TG đến muộn nhất</vs-th>
          <vs-th>TG vận chuyển sớm nhất</vs-th>
          <vs-th>TG vận chuyển muộn nhất</vs-th>
          <vs-th>Chức năng</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <!-- <vs-td :data="data[indextr].code">{{ data[indextr].code }}</vs-td> -->
            <vs-td
              style="text-align:left"
              :data="data[indextr].warehouse"
            >{{data[indextr].warehouseCode[0].code}}</vs-td>
            <vs-td
              style="text-align:left"
              v-if="isPort"
              :data="data[indextr].port"
            >{{data[indextr].portCode[0].code}}</vs-td>
            <vs-td
              style="text-align:left"
              :data="data[indextr].containerTypeCode"
            >{{data[indextr].containerCode[0].code}}</vs-td>
            <vs-td
              style="text-align:left"
              :data="data[indextr].quantity"
            >{{ data[indextr].quantity }}</vs-td>
            <vs-td
              style="text-align:left"
              :data="data[indextr].quantity"
            >{{ data[indextr].earlyPickupDateTime|formatDate }}</vs-td>
            <vs-td
              style="text-align:left"
              :data="data[indextr].quantity"
            >{{ data[indextr].latePickupDateTime|formatDate }}</vs-td>
            <vs-td
              style="text-align:left"
              :data="data[indextr].quantity"
            >{{ data[indextr].earlyDeliveryDateTime|formatDate }}</vs-td>
            <vs-td
              style="text-align:left"
              :data="data[indextr].quantity"
            >{{ data[indextr].lateDeliveryDateTime|formatDate }}</vs-td>

            <vs-td>
              <a @click="Edit(tr)">Sửa</a> /
              <a @click="Delete(tr)">Xóa</a>
            </vs-td>
          </vs-tr>
        </template>
        <br />

        <pre>{{ selected }}</pre>
      </vs-table>
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