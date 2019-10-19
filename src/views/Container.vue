<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title">Danh sách Container</div>
      <div class="t-button-wrap">
        <vs-button color="#0BEC03" @click="Add()" type="filled">Thêm mới</vs-button>
      </div>
      <vs-table v-model="selected" multiple @selected="handleSelected" :data="data">
        <template slot="thead">
          <vs-th>MÃ</vs-th>
          <vs-th>TÊN</vs-th>
          <vs-th>Chức năng</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" @click="Edit(tr)" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].code">{{ data[indextr].code }}</vs-td>

            <vs-td :data="data[indextr].name">{{ data[indextr].name }}</vs-td>

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
    <vs-popup title="Thêm container" :active.sync="open">
      <div class="mb-12-px w-full">
        <t-input v-model="entityData.code" title="Mã" />
      </div>
      <div class="mb-12-px w-full">
        <t-input v-model="entityData.name" title="Tên" />
      </div>
      <div class="t-button-wrap flex">
        <vs-button color="dark" class="mr-8-px" @click="Cancel" type="border">Hủy</vs-button>
        <vs-button color="#0BEC03" class="mr-8-px" @click="AddAndClose" type="filled">Lưu</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import BaseList from "./BaseList";
import Enum from "@/ulties/enumrable.js";
import api from "@/api/DetailAPI";

export default {
  data() {
    return {
      api: api,
      selected: [],
      entityData: {},
      open: false,
      mode: Enum.Mode.Edit,
      data: []
    };
  },
  mounted() {
    this.load("CONTAINER");
  },

  methods: {
    handleSelected(tr) {
      this.currentTr = tr;
    },
    load(type) {
      var me = this;
      var url = "http://localhost:9000/entity/getType/:" + type;
      this.api.getAll(url).then(result => {
        me.data = result.data.data;
      });
    },
    Cancel() {
      this.open = false;
      this.entityData = {};
    },
    Add() {
      this.open = true;
      this.mode = Enum.Mode.Add;
      this.entityData.type = "CONTAINER";
    },
    AddAndClose() {
      var me = this;
      if (this.mode == Enum.Mode.Add) {
        this.api
          .insert("http://localhost:9000/entity/insert", this.entityData)
          .then(result => {
            if (result.data.code == 0) {
              this.$vs.notify({
                title: "Thêm mới thành công",
                color: "success",
                position: "top-center"
              });
              this.load("CONTAINER");
              this.open = false;
              me.entityData = {};
            } else {
              this.$vs.notify({
                title: "Thêm mới thất bại",
                color: "red",
                position: "top-center"
              });
            }
          })
          .catch(err => {});
      } else if (this.mode == Enum.Mode.Edit) {
        this.api
          .update("http://localhost:9000/entity/update", this.entityData)
          .then(result => {
            if (result.data.code == 0) {
              me.entityData = {};
              this.load("CONTAINER");
              this.open = false;
            }
          });
      }
    },
    Delete(tr) {
      var url = "http://localhost:9000/entity/delete";
      this.api.delete(url, tr);
      this.load(this.type);
    },
    Edit(tr) {
      this.entityData = tr;
      this.open = true;
      this.mode = Enum.Mode.Edit;
    }
  }
};
</script>
 