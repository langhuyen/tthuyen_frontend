<template>
  <div class="login-content flex">
    <div class="login-logo">
      <img src="@/assets/logo.png" alt />
    </div>
    <div class="title mb-12-px">Đăng nhập</div>
    <div class="sub-title">
      <a @click="redirect('/register')">Đăng ký</a> để sử dụng TM.com
    </div>
    <div class="login-form">
      <div class="mb-12-px">
        <t-input v-model="user.user" placeholder="email" title="Tên đăng nhập" />
      </div>
      <div class="mb-12-px">
        <t-input v-model="user.password" placeholder="mật khẩu" title="Mật khẩu" type="password" />
      </div>
      <div class="mb-12-px flex">
        <vs-button color="rgb(26, 115, 232)" @click="login">ĐĂNG NHẬP</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    redirect(url) {
      this.$router.push(url);
    },
    login() {
      let me = this;
      var url = `http://localhost:9000/oauth/token?username=${this.user.user}&password=${this.user.password}&grant_type=password`;
      axios
        .post(url, null, {
          headers: {
            Authorization: "Basic " + btoa("loginservice:loginservice"),
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(result => {
          console.log(result);
          localStorage.setItem("access_token", result.data.access_token);
          localStorage.setItem("refresh_token", result.data.refresh_token);
          console.log(localStorage.getItem("access_token"));
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");
          me.$router.push({ name: "darhboard" });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-background {
  background: url("../../assets/background.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.login-content {
  //   color: #212121;
  box-shadow: 2px 1px 6px 1px rgba(0, 0, 255, 0.2);
  flex-flow: column;
  background: white;
  width: 400px;
  height: 443px;
  border-radius: 3px;
  .login-logo {
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
  .login-form {
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

