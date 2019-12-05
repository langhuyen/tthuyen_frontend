<template>
  <div class="wrap_content p-24-px">
    <div class="h-content list-content p-12-px">
      <div class="main-title">Danh sách Container</div>
      <div class="t-button-wrap mb-12-px">
        <vs-button color="rgb(26, 115, 232)" @click="Add()" type="filled">Thêm mới</vs-button>
      </div>
      <vs-table v-model="selected" @selected="handleSelected" :data="data">
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
    <vs-popup @close="entityData={}" title="Thêm Container" :active.sync="open">
      <div class="mb-12-px w-full">
        <div class="flex">
          <div class="w-1/3 mr-12-px">
            <t-input v-model="entityData.code" title="Mã" />
          </div>
          <div class="w-1/3 mr-12-px">
            <t-input v-model="entityData.name" title="Tên" />
          </div>
          <div class="w-1/3 mr-12-px">
            <t-input type="number" v-model="entityData.weight" title="Trọng tải" />
          </div>
        </div>
      </div>
      <div class="mb-12-px flex w-full">
        <div class="w-1/3 mr-12-px">
          <combobox
            multiple
            v-model="entityData.returnDepotCodes"
            title="Bãi chứa Container trả về"
            isServer
            urlPath="http://localhost:9000/entity/getType/:DEPOTCONTAINER"
            fieldValue="code"
            fieldText="code"
          />
        </div>
        <div class="w-1/3">
          <combobox
            v-model="entityData.depotLocationCode"
            title="Bãi chứa Container"
            isServer
            urlPath="http://localhost:9000/entity/getType/:DEPOTCONTAINER"
            fieldValue="locationCode"
            fieldText="code"
          />
        </div>
      </div>
      <div class="t-button-wrap flex">
        <vs-button color="dark" class="mr-8-px" @click="Cancel" type="border">Hủy</vs-button>
        <vs-button color="rgb(26, 115, 232)" class="mr-8-px" @click="AddAndClose" type="filled">Lưu</vs-button>
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
      var url = "http://localhost:9000/instance/getType/:" + type;
      this.api.getAll(url).then(result => {
        me.data = result.data.data;
      });
    },
    Cancel() {
      this.open = false;
      this.entityData = {};
    },
    Add() {
      let me = this;
      this.open = true;
      this.mode = Enum.Mode.Add;
      this.entityData.type = "CONTAINER";
      /**
       * them du lieu code
       *
       */
      var url = "http://localhost:9000/AutoGenerateCode/:CONTAINER";
      this.api.getAll(url).then(result => {
        if (result.data.code == 0) {
          me.entityData.code = result.data.data[0];
          // me.entityData.address = result.data.data[0];
        } else {
          alert("Không tìm thấy thực thể");
        }
      });
    },
    AddAndClose() {
      var me = this;
      if (this.mode == Enum.Mode.Add) {
        this.api
          .insert("http://localhost:9000/instance/insert", this.entityData)
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
          .update("http://localhost:9000/instance/update", this.entityData)
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
      this.$vs.dialog({
        type: "confirm",
        color: "success",
        title: `Xác nhận`,
        acceptText: "Đồng ý",
        cancelText: "Hủy bỏ",
        text: "Bạn có muốn xóa không",
        accept: function() {
          me.acceptUpdate(tr);
        }
      });
    },
    acceptUpdate(tr) {
      var url = "http://localhost:9000/instance/delete";
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
 