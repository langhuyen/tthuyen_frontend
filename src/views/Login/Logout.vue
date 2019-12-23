<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    this.$router.push({ name: "Login" });
  }
};
</script>