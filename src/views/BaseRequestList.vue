<template>
  <div></div>
</template>

<script>
import api from "@/api/DetailAPI";
import Enum from "@/ulties/enumrable.js";
export default {
  data() {
    return {
      processing: true,
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
      this.processing = true;
      var url = "http://localhost:9000/CustomerRequest/get";
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
      this.processing = true;
      var url =
        "http://localhost:9000/CustomerRequest/getTypePaging/:" +
        type +
        "?pageIndex=1&pageSize=20";
      this.api
        .getAll(url)
        .then(result => {
          me.data = result.data.data.data;
          this.processing = false;
        })
        .catch(err => {
          this.processing = false;
        });
    }
  }
};
</script>