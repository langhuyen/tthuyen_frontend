<template lang="html">
    <div class='t-input'>
        <div v-if='title' class="t-title mb-8-px">
            {{title}}
        </div>
        <div class='t-content'>
            <input v-bind='$attrs' 
          
            v-on="listeners"
          
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
    let me = this;
    return {
      hoverx: false,
      focus: false,
      valueInput: me.value,
      listeners: {
        ...me.$listeners,
        change: me.onchange,
        input: me.onInput,
        focus: me.onFocus,
        blur: me.onBlur
      }
    };
  },
  watch: {
    value(val) {
      this.valueInput = val;
      this.$emit("input", val);
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
    },
    onchange(e) {
      this.$emit("change", e.target.value);
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
  padding: 3px 10px;
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
  border: 1px solid rgb(26, 115, 232);
  outline: none;
}
</style>