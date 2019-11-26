<template>
  <div class="register-background">
    <div class="register-content flex">
      <div class="register-logo">
        <img src="@/assets/logo.png" alt />
      </div>
      <div class="title mb-12-px">Đăng Ký</div>
      <!-- <div class="sub-title">
        <a>Đăng ký</a> để sử dụng TM.com
      </div> -->
      <div class='error'> Lỗi </div>
      <div class="register-form">
        <div class="mb-12-px">
          <t-input v-model="user.user" placeholder="Tên" title="Tên đăng nhập" />
        </div>
        <div class="mb-12-px">
          <t-input v-model="user.email" placeholder="Email" title="Email" />
        </div>
        <div class="mb-12-px">
          <t-input v-model="user.password" placeholder="Mật khẩu" title="Mật khẩu" type="password" />
        </div>
        <div class="mb-12-px">
          <t-input v-model="user.passwordRepeat" placeholder="Mật khẩu" title="Xác nhận mật khẩu" type="password" />
        </div>
        <div class="mb-12-px flex">
          <vs-button color="rgb(26, 115, 232)">ĐĂNG KÝ</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.error{
    color:red;
    font-size:13px;
    text-align:left;
    margin:0px  30px 0px 30px;
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
    box-shadow: 2px 1px 6px 1px rgba(0, 0, 255, .2);
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

