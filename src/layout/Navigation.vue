<template lang="html">
    <div class='nav flex'>
      <div class="logo">
        <img src="../assets/logo.png" alt="" class='logo-img' srcset="">
      </div>
        <div class='name'>{{userName}}</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      userName: localStorage.getItem("username")
    };
  }
};
</script>

<style scope>
.nav {
  background: #11115b;
  width: 100%;
  height: 48px;
}

.logo {
  width: 48px;
  height: 100%;
}
.logo-img {
  width: 100%;
  height: 100%;
}

.name {
  color: white;
  /* justify-content: center; */
  display: flex;
  align-items: center;
  margin-left: 12px;
}
</style>