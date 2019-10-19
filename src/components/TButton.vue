<template lang="html">
    <div class='t-button'>
        <button  class='t-content' @click='directTo(to)'>{{title}}</button>
        
    </div>
</template>
<script>
export default {
  name: "TButton",
  props: {
    title: {
      type: String
    },
    to: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    directTo(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style  scoped>
.t-content {
  border: none;
  height: 36px;
  padding: 8px 20px;
  color: white;
  background: #0bec03;
  opacity: 0.6;
  border-radius: 3px;
  cursor: pointer;
}

.t-content:hover {
  opacity: 1;
}
</style>