<template>
  <transition>
    <tr role="row" key="0" @click="onClickOpen" :class="{parent:open}" class="odd">
      <td tabindex="0" class="sorting_1" style>Ashton Cox</td>
      <td>Junior Technical Author</td>
      <td>San Francisco</td>
      <td class="dt-body-right">66</td>
    </tr>
    <tr class="child" v-if="open">
      <td class="child" colspan="4">chỗ này để slot nhé</td>
    </tr>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  methods: {
    onClickOpen() {
      this.open = !this.open;
    }
  }
};
</script>