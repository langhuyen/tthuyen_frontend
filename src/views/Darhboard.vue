
<template>
  <div class="m-30-px">
    <div class="over-view flex">
      <div class="item-over-view w-1/4">
        <div>{{totalContainer}}</div>
        <div>Tổng số Container</div>
      </div>
      <div class="item-over-view w-1/4">
        <div>{{totalMooc}}</div>
        <div>Tổng số Mooc</div>
      </div>
      <div class="item-over-view w-1/4">
        <div>{{totalTruck}}</div>
        <div>Tổng số truck</div>
      </div>
      <div class="item-over-view w-1/4">
        <div>{{totalTrip}}</div>
        <div>Tổng số Chuyến</div>
      </div>
      <div class="item-over-view w-1/4">
        <div>{{totalRequest}}</div>
        <div>Tổng số YC</div>
      </div>
    </div>
    <div class="class-chart">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
// import CanvasJS from "canvasjs/dist/canvasjs.js";
import Chart from "chart.js";
import api from "@/api/DetailAPI";
import moment from "moment";
export default {
  mounted() {
    this.load();
  },
  data() {
    return {
      //   CanvasJS: CanvasJS
      api: api,
      totalContainer: 0,
      totalTruck: 0,
      totalMooc: 0,
      totalTrip: 0,
      totalRequest: 0,
      chart: null
    };
  },
  methods: {
    getStatistical() {
      var url = "http://localhost:9000/overview/statistical";
      let me = this;
      this.api
        .getAll(url)
        .then(result => {
          let data = result.data.data;
          me.totalContainer = data.totalContainer;
          me.totalTruck = data.totalTruck;
          me.totalMooc = data.totalMooc;
          me.totalTrip = data.totalTrip;
          me.totalRequest = data.totalRequest;
        })
        .catch(err => {});
    },
    displayChart() {
      var url = "http://localhost:9000/overview";
      let me = this;
      this.api
        .getAll(url)
        .then(result => {
          let dataRequest = result.data.data.Request;
          let dataTruck = result.data.data.Truck;
          let labelDictinct = {};
          dataRequest.forEach(element => {
            let labelItem = moment(element._id)
              .format("DD/MM/YYYY")
              .toString();
            if (!labelDictinct.hasOwnProperty(labelItem)) {
              labelDictinct[labelItem] = {};
              labelDictinct[labelItem].Request = element.count;
              labelDictinct[labelItem].Truck = 0;
            } else {
              labelDictinct[labelItem].Request += element.count;
              labelDictinct[labelItem].Truck = 0;
            }
          });
          dataTruck.forEach(element => {
            let labelItem = moment(element._id)
              .format("DD/MM/YYYY")
              .toString();
            if (!labelDictinct.hasOwnProperty(labelItem)) {
              labelDictinct[labelItem] = {};
              labelDictinct[labelItem].Truck = element.count;
              labelDictinct[labelItem].Request = element.count;
            } else {
              labelDictinct[labelItem].Truck += element.count;
            }
          });
          let label = [],
            dataTruckChart = [],
            dataRequestChart = [];

          for (var key in labelDictinct) {
            if (key == "Invalid Date") continue;
            label.push(key);
            dataTruckChart.push(labelDictinct[key].Truck);
            dataRequestChart.push(labelDictinct[key].Request);
          }
          me.chart.data.datasets[0].data = [];
          me.chart.data.datasets[0].data = dataTruckChart;
          me.chart.data.datasets[1].data = [];
          me.chart.data.datasets[1].data = dataRequestChart;
          me.chart.data.labels = label;
          me.chart.update();
        })
        .catch(err => {});
    },
    load() {
      var ctx = document.getElementById("myChart").getContext("2d");
      this.chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: [],
          datasets: [
            {
              label: "Chuyến",
              backgroundColor: "transparent",
              borderColor: "blue",
              data: []
            },
            {
              label: "YC vận chuyển",
              backgroundColor: "transparent",
              borderColor: "red",
              data: []
            }
          ]
        },

        // Configuration options go here
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
      this.chart.canvas.parentNode.style.height = "300px";
      this.chart.canvas.parentNode.style.width = "800px";
      this.getStatistical();
      this.displayChart();
    },
    toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }
};
</script>
<style lang="scss">
.class-chart {
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>