<template lang="html">
    <div class='t-input'>
        <div v-if='title' class="t-title mb-8-px">
            {{title}}
        </div>
        <div class='t-content'>
            <input v-bind='$attrs' 
          
            v-on="listeners"
            :title="tooltip"
            :class='["t-input-content",{"t-input-focus":focus,"t-input-hover":hoverx,"t-input-error":error}]' 
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
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let me = this;
    return {
      error: false,
      tooltip: "",
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
      debugger;
      this.valueInput = val;
      // this.$emit("input", val);
    }
  },
  methods: {
    onInput(e) {
      this.focus = true;
      this.$emit("input", e.target.value);
    },
    onBlur(e) {
      this.focus = false;
      if (this.required && this.valueInput.trim().length == 0) {
        this.setError(this.title + " Không được bỏ trống");
      }
    },
    onFocus(e) {
      this.error = false;
      this.focus = true;
    },
    onchange(e) {
      this.$emit("change", e.target.value);
    },
    setError(title) {
      this.tooltip = title;
      this.error = true;
    }
  }
};
</script>

<style lang='scss'>
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
  border: 1px solid #ebebeb;
  border-radius: 5px;
  padding: 3px 10px;
}
.t-input-content:hover {
  border: 1px solid rgba(0, 0, 0, 0.4);
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

.t-input-error {
  border: 1px solid red;
}
</style>