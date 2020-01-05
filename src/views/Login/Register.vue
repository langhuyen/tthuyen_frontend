
 <!--
 Hiện thị trang đăng ký với 3 bước đang ký xac thực vào đăng nhập
 -->
<template>
  <div class="bg-white w-full">
    <div class="w-full">
      <div class="flex step flex-end w-full">
        <div class="relation">
          <div class="title-step">Tạo tài khoản</div>
          <div class="cricle active"></div>
        </div>
        <div class="stoke w-1/2 relation" :class="{'active-stoke':step>1}">
          <div class="absolute arrow"></div>
        </div>
        <div class="relation">
          <div class="title-step">Xác thực</div>
          <div class="cricle" :class="{active:step>1}"></div>
        </div>
        <div class="stoke w-1/2 relation" :class="{'active-stoke':step>2}">
          <div class="absolute arrow"></div>
        </div>
        <div class="relation">
          <div class="title-step">Đăng nhập</div>
          <div class="cricle" :class="{active:step>2}"></div>
        </div>
      </div>
      <div class="content-form">
        <component :is="registerForm" v-model="step"></component>
      </div>
    </div>
  </div>
</template>


<script>
import registerForm from "@/views/Login/RegisterForm";
import confirmForm from "@/views/Login/ConfirmForm";
import login from "@/views/Login/LoginForm";
export default {
  mounted() {
    let userId = localStorage.getItem("userId");
    if (userId) {
      this.registerForm = confirmForm;
      this.step = 2;
    } else {
      this.registerForm = registerForm;
      this.step = 1;
    }
  },
  data() {
    return {
      step: 1,
      registerForm: registerForm,
      id: null
    };
  },
  watch: {
    step(val) {
      if (val == 1) {
        this.registerForm = registerForm;
      } else if (val == 2) {
        this.registerForm = confirmForm;
      } else if (val == 3) {
        this.registerForm = login;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.content-form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.step {
  margin-bottom: 24px;
}
.bg-white {
  padding: 60px 150px;
  background: white;
  //  background: url("../../assets/background.jpg");
}
.cricle {
  border: 1px solid #c1c1c1;
  border-radius: 50%;
  width: 16px;
  height: 16px;
}
.active {
  border-color: rgb(26, 115, 232);
  background: rgb(26, 115, 232);
}

.stoke {
  height: 1px;
  margin-bottom: 8px;
  border: 1px dashed #c1c1c1;
}
.flex-end {
  align-items: flex-end;
}
.relation {
  position: relative;
}
.title-step {
  position: absolute;
  transform: translateX(-50%);
  top: -20px;
  white-space: nowrap;
}

.absolute {
  position: absolute;
}
.arrow {
  top: -5px;
  right: 0;
  width: 10px;
  height: 10px;
  border-top: 2px solid #c1c1c1;
  border-left: 2px solid #c1c1c1;
  transform: rotate(135deg);
  border-color: inherit;
}
.active-stoke {
  border-color: rgb(26, 115, 232);
}
</style>