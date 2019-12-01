<template>
  <div>
    <table>
      <thead>
        <tr>
          <!-- Sử dụng muiltiple để cho chọn nhiều -->
          <th v-if="multiple"></th>
          <th v-for="(item ,index)in columns" :key="index">
            {{item.title}}
            <slot name="th-slot" />
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Object
    },
    multiple: false
  },

  data() {
    return {
      columns: [
        {
          title: "Tên",
          datafield: "name",
          width: 100
        },
        {
          title: "Tên",
          datafield: "name",
          width: 100
        }
      ]
    };
  },
  methods: {}
};
</script>