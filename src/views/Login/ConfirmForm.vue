<template>
  <div class="register-background">
    <div class="loader" v-if="processing"></div>
    <div class="register-content flex">
      <div class="register-logo">
        <img src="@/assets/logo.png" alt />
      </div>
      <div class="title mb-12-px">Xác thực</div>
      <div class="sub-title mt-12-px">
        <pre> Mã xác thực được gửi tới email mà bạn đã đăng ký!
              Vui lòng điền mã xác thực để xác thực</pre>
        <div class="sub-title">
          <a @click="backToRegister">Đăng ký</a> tài khoản
        </div>
      </div>
      <div class="error" v-if="error">{{error}}</div>
      <div class="register-form">
        <div class="flex align-end">
          <div @click="sendTokenEmail" class="class-load"></div>
        </div>
        <div class="mb-12-px">
          <t-input v-model="tokenEmail" placeholder="Mã" title="Mã" @keydown.enter="confirm" />
        </div>
        <vs-button color="rgb(26, 115, 232)" @click="confirm">XÁC THỰC</vs-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/DetailAPI";
export default {
  data() {
    return {
      tokenEmail: "",
      error: null,
      api: api,
      processing: false
    };
  },
  methods: {
    sendTokenEmail() {
      let me = this;
      this.processing = true;
      let userId = localStorage.getItem("userId");
      if (userId) {
        var url = "http://localhost:9000/user/sendTokenEmail?userId=" + userId;
        this.api
          .post(url)
          .then(result => {
            me.processing = false;
            this.$vs.notify({
              title: "Gửi mã xác thực thành công. Hãy kiểm tra email.",
              color: "success",
              position: "top-center"
            });
          })
          .catch(err => {
            this.$vs.notify({
              title: "Gửi mã xác thực thất bại. Vui lòng thử lại sau.",
              color: "red",
              position: "top-center"
            });
            me.processing = false;
          });
      } else {
        this.$vs.notify({
          title: "Gửi mã xác thực thất bại. Vui lòng thử lại sau.",
          color: "red",
          position: "top-center"
        });
        this.processing = false;
      }
    },
    confirm() {
      let me = this;
      let userId = localStorage.getItem("userId");
      if (me.validData()) {
        this.error = "";
        var url =
          "http://localhost:9000/user/verifyUser?id=" +
          userId +
          "&tokenEmail=" +
          me.tokenEmail;
        this.api.post(url).then(result => {
          if (result.data.code == 0) {
            if (result.data.data.data[0]) {
              me.$emit("input", 3);
            } else {
              me.error = "Mã xác thực không đúng.Xin thử lại";
            }
          } else {
            me.error = "Mã xác thực không đúng.Xin thử lại";
          }
        });
      }
    },
    validData() {
      return true;
    },
    backToRegister() {
      let me = this;
      me.$emit("input", 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.mt-12-px {
  margin-top: 12px;
}
.error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin: 0px 30px 0px 30px;
}
.register-background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.register-content {
  box-shadow: 2px 1px 6px 1px rgba(0, 0, 255, 0.2);
  //   color: #212121;
  flex-flow: column;
  background: white;
  width: 400px;
  //   height: 443px;
  border-radius: 3px;
  .register-logo {
    width: 100px;
    height: 56px;
    img {
      width: 100%;
    }
  }
  .title {
    font-size: 28px;
    font-weight: bolder;
  }
  .sub-title {
    font-size: 12px;
    font-style: italic;
    a {
      color: rgb(26, 115, 232);
    }
  }
  .register-form {
    padding: 30px;
    width: 100%;
  }
  button {
    width: 100%;
    background: rgb(26, 115, 232);
    font-weight: bolder;
  }
}
</style>

