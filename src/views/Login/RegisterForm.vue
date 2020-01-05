<template>
  <div class="register-background">
    <div class="register-content flex">
      <div class="register-logo">
        <img src="@/assets/logo.png" alt />
      </div>
      <div class="title mb-12-px">Đăng Ký</div>
      <div class="sub-title">
        <a @click="redirect('/login')">Đăng nhập</a> để sử dụng TM.com
      </div>
      <div class="error mt-12-px" v-if="error">{{error}}</div>
      <div class="register-form">
        <div class="mb-12-px">
          <t-input ref="username" v-model="user.username" placeholder="Tên" title="Tên đăng nhập" />
        </div>
        <div class="mb-12-px">
          <t-input ref="email" v-model="user.email" placeholder="Email" title="Email" />
        </div>
        <div class="mb-12-px">
          <t-input
            ref="password"
            v-model="user.password"
            placeholder="Mật khẩu"
            title="Mật khẩu"
            type="password"
          />
        </div>
        <div class="mb-12-px">
          <t-input
            ref="passwordRepeat"
            v-model="user.passwordRepeat"
            placeholder="Mật khẩu"
            title="Xác nhận mật khẩu"
            type="password"
            @keydown.enter="register"
          />
        </div>
        <div class="mb-12-px flex">
          <vs-button color="rgb(26, 115, 232)" @click="register">ĐĂNG KÝ</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/DetailAPI";
export default {
  data() {
    return {
      user: {},
      error: null,
      api: api
    };
  },
  methods: {
    //Xử lý đăng ký
    register() {
      let me = this;
      if (me.validData()) {
        this.error = "";
        var url = "http://localhost:9000/user/register";
        var entity = {
          ...me.user
        };
        this.api.post(url, entity).then(result => {
          if (result.data.code == 0) {
            localStorage.setItem("userId", result.data.data.data[0].id);
            localStorage.setItem("userName", result.data.data.data[0].username);
            me.$parent.id = result.data.data.data[0].id;
            me.$emit("input", 2);
          } else {
            me.error = result.data.data.data[0].validation;
          }
        });
      }
    },
    validData() {
      let me = this,
        data = me.user;
      if (me.emptyObject(data.username)) {
        this.error = "Tên đăng nhập không được để trống";
        this.$refs.username.setError(this.error);
        return false;
      }
      if (me.emptyObject(data.email)) {
        this.error = "Email không được để trống";
        this.$refs.email.setError(this.error);
        return false;
      }
      if (me.emptyObject(data.password)) {
        this.error = "Mật khẩu không được để trống";
        this.$refs.password.setError(this.error);
        return false;
      }
      if (data.password !== data.passwordRepeat) {
        this.error = "Mật khẩu không khớp nhau";
        this.$refs.passwordRepeat.setError(this.error);
        return false;
      }
      if (me.validateEmail(data.email)) {
        this.error = "Email không hợp lệ.";
        this.$refs.email.setError(this.error);
        return false;
      }

      return true;
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(String(email).toLowerCase());
    },
    emptyObject(object) {
      return object == undefined || object == null || object.trim() == "";
    },
    redirect(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin: 0px 30px 0px 30px;
}
.mt-12-px {
  margin-top: 12px;
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

