<template>
  <div>
    <combobox @selected="onSelected" v-model="innerModel" :datas="data" />
  </div>
</template>

<script>
export default {
  name: "Daterange",
  data() {
    return {
      currentDate: new Date(),
      innerModel: 0,
      data: [
        {
          text: "Hôm nay",
          value: 0
        },
        {
          text: "Hôm qua",
          value: 2
        },
        {
          text: "Cách đây 1 tuần",
          value: 3
        },
        {
          text: "Cách đây 1 tháng",
          value: 4
        },
        {
          text: "Từ đầu tuần đến hiện tại",
          value: 5
        },
        {
          text: "Cách đây 2 tuần",
          value: 6
        },
        {
          text: "Hôm nay",
          value: 7
        },
        {
          text: "Từ đầu tháng đến hiện tại",
          value: 8
        },
        {
          text: "Tùy chọn",
          value: 9
        }
      ]
    };
  },
  mounted() {},
  methods: {
    onSelected(data) {
      console.log(data);
    }
  },
  computed: {}
};
</script>