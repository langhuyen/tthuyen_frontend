<template lang="html">
    <div>
        
    </div>
</template>

<script>
import Enum from "@/ulties/enumrable.js";
import api from "@/api/DetailAPI";

export default {
  created() {},
  mounted() {
    this.type = this.$route.params.entityName;
    if (this.type) {
      this.entityData.type = this.type;
      var type = this.type;
      this.title = Enum.RequestType[type].Title;
    }
    var key = this.$route.params.id;
    if (!key || key == 0) {
      this.mode = Enum.Mode.Add;
      this.key = 0;
    } else {
      this.mode = Enum.Mode.Edit;
      this.key = key;
    }
    this.load();
  },
  data() {
    return {
      // mode: Enum.Mode.Add,
      api: api,
      entityName: "", //Tên bảng dữ liệu
      key: "",
      entityData: {
        code: ""
      },
      isView: false,
      type: "",
      title: ""
    };
  },
  methods: {
    //Thêm dữ liệu lên serve
    Add() {
      var me = this;
      if (this.mode == Enum.Mode.Add) {
        this.api
          .insert(
            "http://localhost:9000/CustomerRequest/insert",
            this.entityData
          )
          .then(result => {
            if (result.data.code == 0) {
              this.$vs.notify({
                title: "Thêm mới thành công",
                color: "success",
                position: "top-center"
              });
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
          .update(
            "http://localhost:9000/CustomerRequest/update",
            this.entityData
          )
          .then(result => {
            if (result.data.code == 0) {
              me.entityData = {};
            }
          });
      }
    },
    Cancel() {
      var me = this;
      this.$router.push("/CustomerRequest/" + me.type);
    },
    AddAndClose() {
      var me = this;
      if (this.mode == Enum.Mode.Add) {
        var type = me.type;
        this.api
          .insert(
            "http://localhost:9000/CustomerRequest/insert",
            this.entityData
          )
          .then(result => {
            if (result.data.code == 0) {
              me.$router.push("/CustomerRequest/" + me.type);
            }
          });
      } else if (this.mode == Enum.Mode.Edit) {
        var type = me.type;
        this.api
          .update(
            "http://localhost:9000/CustomerRequest/update",
            this.entityData
          )
          .then(result => {
            if (result.data.code == 0) {
              me.$router.push("/CustomerRequest/" + me.type);
            }
          });
      }
    },
    Edit() {},
    Delete() {},
    load() {
      var me = this;
      if (this.mode == Enum.Mode.Edit) {
        this.api
          .getById("http://localhost:9000/CustomerRequest/detail", this.key)
          .then(result => {
            if (result.data.code == 0) {
              me.entityData = result.data.data.data[0];
            } else {
              alert("Không tìm thấy thực thể");
            }
          });
      } else {
        /**
         * Auto generate code
         */
        var url = "http://localhost:9000/AutoGenerateCode/:" + this.type;
        this.api.getAll(url).then(result => {
          if (result.data.code == 0) {
            me.entityData.code = result.data.data.data[0];
            // me.entityData.address = result.data.data[0];
          } else {
            alert("Không tìm thấy thực thể");
          }
        });
      }
    }
  }
};
</script>
