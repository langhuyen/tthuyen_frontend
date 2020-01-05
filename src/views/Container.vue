<template>
  <div class="wrap_content p-24-px">
    <div class="loader" v-if="processing"></div>
    <div class="h-content list-content p-12-px">
      <!-- <div class="main-title">Danh sách Container</div>
      <div class="t-button-wrap mb-12-px">
        <vs-button color="rgb(26, 115, 232)" @click="Add()" type="filled">Thêm mới</vs-button>
      </div>-->
      <div class="main-title flex align-center">
        <div class="mr-12-px">Danh sách Container</div>
        <div>
          <t-input
            @keydown.enter="search"
            v-model="queryString"
            placeholder="Nhập tên, mã để tìm kiếm"
          />
        </div>
        <div class="t-button-wrap mb-12-px flex flex-end">
          <vs-button color="rgb(26, 115, 232)" @click="Add" type="filled">Thêm mới</vs-button>
        </div>
      </div>
      <div class="wrap-table">
        <vs-table
          v-model="selected"
          @selected="handleSelected"
          :data="data"
          noDataText="Không có dữ liệu"
        >
          <template slot="thead">
            <vs-th class="align-left">MÃ</vs-th>
            <vs-th class="align-left">TÊN</vs-th>
            <vs-th class="align-left">TRỌNG TẢI</vs-th>
            <vs-th class="align-left">GHI CHÚ</vs-th>
            <vs-th class="align-center">CHỨC NĂNG</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" @click="Edit(tr)" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="align-left" :data="data[indextr].code">{{ data[indextr].code }}</vs-td>
              <vs-td class="align-left" :data="data[indextr].name">{{ data[indextr].name }}</vs-td>
              <vs-td class="align-left" :data="data[indextr].code">{{ data[indextr].weight }}</vs-td>
              <vs-td class="align-left" :data="data[indextr].name">{{ data[indextr].description }}</vs-td>

              <vs-td class="align-center">
                <div class="flex icon-feature flex">
                  <div @click="Edit(tr)">
                    <i class="fas fa-edit icon-feature-detail"></i>
                  </div>
                  <div class="icon-feature-detail">/</div>
                  <div @click="Delete(tr)">
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

        <div class="flex">
          <div class="class-load"></div>
          <div class="flex align-end flex-1">
            <div class="lable-page">Hiển thị {{data.length}} trên {{totalPage}}</div>
            <div
              class="paginate_button previous disabled"
              aria-controls="example"
              data-dt-idx="0"
              tabindex="-1"
              id="example_previous"
              :class="{'disabled-button':activeIndex==1}"
              @click="previousPage"
            >
              <img src="@/assets/previous.png" alt srcset />
            </div>
            <div class="flex">
              <div
                v-for="i in total"
                class="paginate_button current"
                aria-controls="example"
                data-dt-idx="1"
                tabindex="0"
                :key="i"
                :class="{'active-page':activeIndex==i}"
                @click="activePage(i)"
              >{{i}}</div>
            </div>
            <div
              class="paginate_button next"
              aria-controls="example"
              data-dt-idx="7"
              tabindex="0"
              id="example_next"
              @click="nextPage"
              :class="{'disabled-button':activeIndex==total}"
            >
              <img src="@/assets/next.png" alt srcset />
            </div>
          </div>
        </div>
      </div>
    </div>
    <t-popup @close="entityData={}" title="Thêm Container" :active.sync="open">
      <div class="error mt-12-px" v-if="error">{{error}}</div>
      <div class="mb-12-px w-full">
        <div class="flex">
          <div class="w-1/2 mr-12-px">
            <t-input v-model="entityData.code" ref="code" required title="Mã" />
          </div>
          <div class="w-1/2 mr-12-px">
            <t-input v-model="entityData.name" ref="name" required title="Tên / Ký hiệu" />
          </div>
        </div>
      </div>
      <div class="mb-12-px flex w-full">
        <div class="w-1/2 mr-12-px">
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
        <div class="w-1/2">
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
      <div class="mb-12-px w-full">
        <t-textarea v-model="entityData.description" title="Ghi chú"></t-textarea>
      </div>
      <div class="mb-12-px w-full">
        <div class="flex">
          <div class="w-1/2 mr-12-px">
            <t-input
              type="number"
              v-model="entityData.weight"
              ref="weight"
              required
              title="Trọng tải (tấn)"
            />
          </div>
        </div>
      </div>
      <div class="t-button-wrap flex">
        <vs-button color="dark" class="mr-8-px" @click="Cancel" type="border">Hủy</vs-button>
        <vs-button color="rgb(26, 115, 232)" class="mr-8-px" @click="AddAndClose" type="filled">Lưu</vs-button>
      </div>
    </t-popup>
  </div>
</template>

<script>
import BaseList from "./BaseList";
import Enum from "@/ulties/enumrable.js";
import api from "@/api/DetailAPI";

export default {
  data() {
    return {
      error: null,
      processing: true,
      queryString: "",
      api: api,
      selected: [],
      entityData: {},
      open: false,
      mode: Enum.Mode.Edit,
      data: [],
      activeIndex: 1,
      pageSize: 1,
      type: "CONTAINER",
      totalPage: 0
    };
  },
  mounted() {
    this.load(this.type);
  },
  computed: {
    total() {
      return Math.ceil(this.totalPage / this.pageSize);
    }
  },

  methods: {
    validate() {
      var data = this.entityData;
      if (
        data.code == undefined ||
        data.code == null ||
        data.code.trim() == ""
      ) {
        this.error = "Mã không được bỏ trống";
        this.$refs.code.setError(this.error);
        return false;
      }
      if (
        data.name == undefined ||
        data.name == null ||
        data.name.trim() == ""
      ) {
        this.error = "Tên / Ký hiệu không được bỏ trống";
        this.$refs.name.setError(this.error);
        return false;
      }
      if (
        data.returnDepotCodes == undefined ||
        data.returnDepotCodes == null ||
        data.returnDepotCodes.length < 1
      ) {
        this.error = "Bãi chứa Container trả về không được bỏ trống";

        return false;
      }
      if (
        data.depotLocationCode == undefined ||
        data.depotLocationCode == null
      ) {
        this.error = "Bãi chứa Container không được bỏ trống";
        return false;
      }

      if (data.weight == undefined || data.weight == null) {
        this.error = "Trọng tải không được bỏ trống";
        this.$refs.weight.setError(this.error);
        return false;
      }

      return true;
    },
    handleSelected(tr) {
      this.currentTr = tr;
    },
    search() {
      let me = this;
      if (me.queryString) {
        this.processing = true;
        var url =
          "http://localhost:9000/instance/search?type=CONTAINER" +
          "&queryString=" +
          me.queryString;
        me.api
          .getAll(url)
          .then(result => {
            me.data = result.data.data.data;
            this.processing = false;
          })
          .catch(err => {
            this.processing = false;
          });
      } else {
        me.load("CONTAINER");
      }
    },
    nextPage() {
      if (this.activeIndex != this.total) {
        this.activeIndex++;
        this.getPaging(this.activeIndex, this.pageSize);
      }
    },
    previousPage() {
      if (this.activeIndex != 1) {
        this.activeIndex--;
        this.getPaging(this.activeIndex, this.pageSize);
      }
    },
    activePage(index) {
      this.activeIndex = index;
      this.getPaging(this.activeIndex, this.pageSize);
    },

    getPaging(pageIndex, pageSize = 20) {
      this.processing = true;
      var me = this;
      var url = `http://localhost:9000/instance/getTypePaging/:${me.type}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
      this.api
        .getAll(url)
        .then(result => {
          if (result.data.data.data) {
            me.data = result.data.data.data;
            me.totalPage = result.data.data.totalPage;
          } else {
            me.data = [];
          }
          this.processing = false;
        })
        .catch(err => {
          this.processing = false;
        });
    },
    load(type) {
      this.getPaging(1, this.pageSize);
    },
    Cancel() {
      this.open = false;
      this.entityData = {};
    },
    Add() {
      let me = this;
      me.error = null;

      /**
       * them du lieu code
       *
       */
      var url = "http://localhost:9000/AutoGenerateCode/:CONTAINER";
      this.api.getAll(url).then(result => {
        if (result.data.code == 0) {
          me.open = true;
          me.mode = Enum.Mode.Add;
          me.entityData.type = "CONTAINER";
          me.entityData.code = result.data.data.data[0];
          // me.entityData.address = result.data.data[0];
        } else {
          alert("Không tìm thấy thực thể");
        }
      });
    },
    AddAndClose() {
      var me = this;

      if (this.validate()) {
        me.error = null;
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
      }
    },
    Delete(tr) {
      let me = this;
      this.$vs.dialog({
        type: "confirm",
        color: " rgb(26, 115, 232)",
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
      this.api.delete(url, tr).then(result => {
        this.load(this.type);
      });
    },
    Edit(tr) {
      this.entityData = { ...tr };
      this.open = true;
      this.mode = Enum.Mode.Edit;
    }
  }
};
</script>
 