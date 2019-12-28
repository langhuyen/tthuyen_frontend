<template>
  <div class="login-background">
    <component :is="login" />
  </div>
</template>
<script>
import login from "@/views/Login/LoginForm";
export default {
  data() {
    return {
      user: {},
      login: login
    };
  }
};
</script>

<style lang="scss" scoped>
.login-background {
  background: url("../../assets/background.png");
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

