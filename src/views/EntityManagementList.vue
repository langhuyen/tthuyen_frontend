<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title">Danh sách {{title}}</div>
      <div class="t-button-wrap">
        <vs-button color="#c1c1c1" class="mr-8-px" @click="ViewAllMap()" type="border">Xem toàn cảnh</vs-button>
        <vs-button color="#c1c1c1" class="mr-8-px" @click="ViewMap" type="border">Xem</vs-button>
        <vs-button color="#0BEC03" @click="Add" type="filled">Thêm mới</vs-button>
      </div>
      <vs-table v-model="selected" multiple @selected="handleSelected" :data="data">
        <template slot="thead">
          <vs-th>MÃ</vs-th>
          <vs-th>TÊN</vs-th>
          <vs-th>ĐỊA CHỈ</vs-th>
          <vs-th>Chức năng</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].code">{{ data[indextr].code }}</vs-td>

            <vs-td :data="data[indextr].name">{{ data[indextr].name }}</vs-td>

            <vs-td :data="data[indextr].address">{{ data[indextr].address }}</vs-td>

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
import BaseList from "./BaseList";
export default {
  extends: BaseList,
  data() {
    return {
      selected: []
    };
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
 