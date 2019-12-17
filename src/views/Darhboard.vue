
<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
// import CanvasJS from "canvasjs/dist/canvasjs.js";
import Chart from "chart.js";
export default {
  mounted() {
    this.load();
  },
  data() {
    return {
      //   CanvasJS: CanvasJS
    };
  },
  methods: {
    load() {
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: [1, 2, 3, 4, "5", "6", "7"],
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "transparent",
              borderColor: "blue",
              data: [10, 8, 10, 7, 40, 30, 70]
            },
            {
              label: "My First dataset2",
              backgroundColor: "transparent",
              borderColor: "red",
              data: [20, 16, 20, 14, 50, 40, 60]
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
      // let me = this;
      // var chart = new CanvasJS.Chart("chartContainer", {
      //   animationEnabled: true,
      //   title: {
      //     text: "Daily High Temperature at Different Beaches"
      //   },
      //   axisX: {
      //     valueFormatString: "DD MMM,YY"
      //   },
      //   axisY: {
      //     title: "Temperature (in °C)",
      //     includeZero: false,
      //     suffix: " °C"
      //   },
      //   legend: {
      //     cursor: "pointer",
      //     fontSize: 16,
      //     itemclick: me.toggleDataSeries
      //   },
      //   toolTip: {
      //     shared: true
      //   },
      //   data: [
      //     {
      //       name: "Myrtle Beach",
      //       type: "spline",
      //       yValueFormatString: "#0.## °C",
      //       showInLegend: true,
      //       dataPoints: [
      //         { x: new Date(2017, 6, 24), y: 31 },
      //         { x: new Date(2017, 6, 25), y: 31 },
      //         { x: new Date(2017, 6, 26), y: 29 },
      //         { x: new Date(2017, 6, 27), y: 29 },
      //         { x: new Date(2017, 6, 28), y: 31 },
      //         { x: new Date(2017, 6, 29), y: 30 },
      //         { x: new Date(2017, 6, 30), y: 29 }
      //       ]
      //     },
      //     {
      //       name: "Martha Vineyard",
      //       type: "spline",
      //       yValueFormatString: "#0.## °C",
      //       showInLegend: true,
      //       dataPoints: [
      //         { x: new Date(2017, 6, 24), y: 20 },
      //         { x: new Date(2017, 6, 25), y: 20 },
      //         { x: new Date(2017, 6, 26), y: 25 },
      //         { x: new Date(2017, 6, 27), y: 25 },
      //         { x: new Date(2017, 6, 28), y: 25 },
      //         { x: new Date(2017, 6, 29), y: 25 },
      //         { x: new Date(2017, 6, 30), y: 25 }
      //       ]
      //     },
      //     {
      //       name: "Nantucket",
      //       type: "spline",
      //       yValueFormatString: "#0.## °C",
      //       showInLegend: true,
      //       dataPoints: [
      //         { x: new Date(2017, 6, 24), y: 22 },
      //         { x: new Date(2017, 6, 25), y: 19 },
      //         { x: new Date(2017, 6, 26), y: 23 },
      //         { x: new Date(2017, 6, 27), y: 24 },
      //         { x: new Date(2017, 6, 28), y: 24 },
      //         { x: new Date(2017, 6, 29), y: 23 },
      //         { x: new Date(2017, 6, 30), y: 23 }
      //       ]
      //     }
      //   ]
      // });
      // chart.render();
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