<template>
  <div>
    <t-input />
    <div @keydown="onFocus" class="hello" tabindex="0">Huyen</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    onFocus() {
      onFocus;
      alert("heheh");
    }
  }
};
</script>
<style  scoped>
.hello:focus {
  color: red;
}
</style>