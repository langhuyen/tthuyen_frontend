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
      this.title = Enum.RequestType[type].Title;
    }
  },
  methods: {
    ViewAllMap() {
      var me = this;
      var url = "http://localhost:9000/CustomerRequest/get";
      this.api.getAll(url).then(result => {
        me.data = result.data.data;
        me.$router.push({
          name: "BaseView",
          params: {
            data: result.data.data
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
      var url = "http://localhost:9000/CustomerRequest/delete";
      this.api.delete(url, tr);
      this.load(this.type);
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
      var url = "http://localhost:9000/CustomerRequest/getType/:" + type;
      this.api.getAll(url).then(result => {
        me.data = result.data.data;
      });
    }
  }
};
</script>