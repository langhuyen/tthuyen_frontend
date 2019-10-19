<template lang="html">
    <div class='t-input'>
        <div class="t-title mb-8-px">
            {{title}}
        </div>
        <div class='t-content'>
            <input v-bind='$attrs' 
            @input="onInput" @focus='onFocus' @blur='onBlur' 
            :class='["t-input-content",{"t-input-focus":focus,"t-input-hover":hoverx}]' 
            v-model='valueInput' />    
        </div>
        
    </div>
</template>
<script>
export default {
  name: "TInput",
  props: {
    title: {
      type: String
    },
    value: {
      type: String
      // required: true
    }
  },
  data() {
    return {
      hoverx: false,
      focus: false,
      valueInput: this.value
    };
  },
  watch: {
    value(val) {
      debugger;
      this.valueInput = val;
    }
  },
  methods: {
    onInput(e) {
      this.focus = true;
      this.$emit("input", e.target.value);
    },
    onBlur(e) {
      this.focus = false;
    },
    onFocus(e) {
      this.focus = true;
    }
  }
};
</script>

<style >
.t-title {
  white-space: nowrap;
  font-size: 13px;
  text-align: left;
  font-weight: 600;
}
.mb-8-px {
  margin-bottom: 8px;
}
.t-input-content {
  width: 100%;
  height: 32px;
  border: 1px solid #c1c1c1;
}
.t-input-content::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-style: italic;
  font-size: 12px;
  color: #cccccc;
}
.t-input-content::-moz-placeholder {
  /* Firefox 19+ */
  font-style: italic;
  font-size: 12px;
  color: #cccccc;
}
.t-input-content:-ms-input-placeholder {
  /* IE 10+ */
  font-style: italic;
  font-size: 12px;
  color: #cccccc;
}
.t-input-content:-moz-placeholder {
  /* Firefox 18- */
  font-style: italic;
  font-size: 12px;
  color: #cccccc;
}
.t-input-focus {
  border: 1px solid #0bec03;
  outline: none;
}
</style>