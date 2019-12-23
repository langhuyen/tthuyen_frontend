<template>
  <div class="t-input">
    <div v-if="title" class="t-title mb-8-px">{{title}}</div>
    <div class="t-content">
      <vs-textarea v-model="textArea" height="200px"></vs-textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "TTextarea",
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
      textArea: me.value,
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