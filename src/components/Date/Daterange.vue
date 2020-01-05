<template>
  <combobox @selected="onSelected" v-model="innerModel" :datas="data" />
</template>

<script>
import moment from "moment";
export default {
  name: "Daterange",
  data() {
    return {
      currentDate: moment(new Date()),
      innerModel: 0,
      data: [
        {
          text: "Hôm nay",
          value: 0
        },
        {
          text: "Hôm qua",
          value: 1
        },
        {
          text: "Cách đây 1 tuần",
          value: 2
        },
        {
          text: "Cách đây 1 tháng",
          value: 3
        },
        {
          text: "Cách đây 2 tuần",
          value: 4
        },
        {
          text: "Từ đầu tuần đến hiện tại",
          value: 5
        },
        {
          text: "Từ đầu tháng đến hiện tại",
          value: 6
        },
        {
          text: "Tùy chọn",
          value: 7
        }
      ]
    };
  },
  mounted() {
    this.$emit(
      "update:fromDate",
      this.currentDate
        .startOf("day")

        .toString()
    );
    this.$emit(
      "update:toDate",
      this.currentDate
        .endOf("day")

        .toString()
    );
    // var currentDate = moment("2015-01-31");
    // x = moment("01-12-2019", "DD/MM/YYYY", true);
    // console.log(x.format("DD-MM-YYYY"));
    // var futureMonth = moment(currentDate).add(7, "days");
    // var futureMonth = moment(currentDate).add(1, "M");
    // // console.log(currentDate.format('DD-MM-YYYY'));
    // let x = futureMonth.startOf("day").toString(); //Ok babay
    // console.log(x);
  },
  props: {
    toDate: {},
    fromDate: {}
  },
  methods: {
    onSelected(data) {
      switch (data.value) {
        case 0: {
          //Hôm nay
          this.$emit(
            "update:fromDate",
            this.currentDate
              .startOf("day")

              .toString()
          );
          this.$emit(
            "update:toDate",
            this.currentDate
              .endOf("day")

              .toString()
          );
          break;
        }
        case 1: {
          //Hôm qua
          let xCurrent = moment(this.currentDate);
          let yesterday = xCurrent.add(-1, "days");
          this.$emit(
            "update:toDate",
            yesterday
              .endOf("day")

              .toString()
          );
          this.$emit(
            "update:fromDate",
            yesterday
              .startOf("day")

              .toString()
          );
          break;
        }
        case 2: {
          let xCurrent = moment(this.currentDate);
          let yesterday = xCurrent.add(-7, "days");
          this.$emit(
            "update:fromDate",
            yesterday
              .startOf("day")

              .toString()
          );
          this.$emit(
            "update:toDate",
            moment(this.currentDate)
              .endOf("day")

              .toString()
          );
          //Cách đây 1 tuần.
          break;
        }
        case 3: {
          let xCurrent = moment(this.currentDate);
          let yesterday = xCurrent.add(-1, "M");
          this.$emit(
            "update:fromDate",
            yesterday
              .startOf("day")

              .toString()
          );
          this.$emit(
            "update:toDate",
            moment(this.currentDate)
              .endOf("day")

              .toString()
          );
          //Cách đây 1 tháng.
          break;
        }
        case 4: {
          let xCurrent = moment(this.currentDate);
          let yesterday = xCurrent.add(-14, "days");
          //Tim ngay hien tai.
          this.$emit(
            "update:fromDate",
            yesterday
              .startOf("day")

              .toString()
          );
          this.$emit(
            "update:toDate",
            moment(this.currentDate)
              .endOf("day")

              .toString()
          );
          //cách đây 2 tuần
          break;
        }
        case 5: {
          //Từ đầu tuan đến hiện tại
          let xCurrent = moment(this.currentDate);
          this.$emit(
            "update:toDate",
            xCurrent
              .endOf("day")

              .toString()
          );
          this.$emit(
            "update:fromDate",
            xCurrent
              .startOf("isoWeek")
              .startOf("day")

              .toString()
          );
          //Tim nhay hienj tai

          break;
        }
        case 6: {
          //Tim dau tuan hien tai
          //"Từ đầu tang đến hiện tại",
          let xCurrent = moment(this.currentDate);
          this.$emit(
            "update:toDate",
            xCurrent
              .endOf("day")

              .toString()
          );
          this.$emit(
            "update:fromDate",
            xCurrent
              .startOf("M")
              .startOf("day")

              .toString()
          );
          break;
        }
        case 7: {
          //"Tuy chon",
          break;
        }
      }
    }
  },

  computed: {}
};
</script>