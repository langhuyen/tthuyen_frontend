<template>
  <div></div>
</template>

<script>
import api from "@/api/DetailAPI";
import Enum from "@/ulties/enumrable.js";
export default {
  data() {
    return {
      data: [],
      api: api,
      currentTr: {},
      type: "",
      title: ""
    };
  },
  mounted() {
    this.type = this.$route.params.entityName;
    if (this.type) {
      this.load(this.type);
      var type = this.type;
      this.title = Enum.EntityType[type].Title;
    }
  },
  methods: {
    /**
     * Thực hiện search theo mã tên địa chỉ
     */
    search() {
      let me = this;
      if (me.queryString) {
        this.processing = true;
        var url =
          "http://localhost:9000/entity/search?type=" +
          me.type +
          "&queryString=" +
          me.queryString;
        me.api.getAll(url).then(result => {
          me.data = result.data.data.data;
          this.processing = false;
        });
      } else {
        me.load(me.type);
      }
    },
    ViewAllMap() {
      var me = this;
      this.processing = true;
      var url = "http://localhost:9000/entity/get";
      this.api.getAll(url).then(result => {
        me.data = result.data.data.data;
        this.processing = false;
        me.$router.push({
          name: "BaseView",
          params: {
            data: result.data.data.data
          }
        });
      });
    },
    ViewMap() {
      var me = this;
      me.$router.push({
        name: "BaseView",
        params: {
          data: me.selected
        }
      });
    },

    Delete(tr) {
      let me = this;
      this.$vs.dialog({
        type: "confirm",
        color: " rgb(26, 115, 232)",
        title: `Xác nhận`,
        acceptText: "Đồng ý",
        cancelText: "Hủy bỏ",
        text: `Bạn có muốn xóa không ${tr.name}`,
        accept: function() {
          me.acceptDelete(tr);
        }
      });
    },
    acceptDelete(tr) {
      var url = "http://localhost:9000/entity/delete";
      let me = this;

      this.api.delete(url, tr).then(result => {
        console.log(result);
        me.load(this.type);
      });
    },
    Add() {
      //Click vào thêm mới
      var url = `${this.type}/Detail/0`;
      this.$router.push(url);
    },
    Edit(tr) {
      var url = `${this.type}/Detail/${tr.id}`;
      this.$router.push(url);
    },
    load(type) {
      var me = this;
      me.getPaging(1);
    },
    getPaging(pageIndex, pageSize = 20) {
      this.processing = true;
      var me = this;
      var url = `http://localhost:9000/entity/getTypePaging/:${me.type}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
      this.api
        .getAll(url)
        .then(result => {
          me.data = result.data.data.data;
          me.totalPage = result.data.data.totalPage;
          this.processing = false;
        })
        .catch(err => {
          this.processing = false;
        });
    }
  }
};
</script>