<template>
  <div class="t-input">
    <div v-if="title" class="t-title mb-8-px">{{title}}</div>
    <div ref="formDate" class="FormDate">
      <input
        class="date-input-content"
        v-model="valueDate"
        v-imask="mask"
        @accept="onAccept"
        @complete="onComplete"
      />
      <span @click="openDatepicker" id="icon-datepicker"></span>
    </div>

    <datepicker
      class="datepicker"
      v-show="isDatepicker"
      :style="{left:left,top:top,right:right}"
      ref="datepicker"
      v-model="valueDatepicker"
      @close="updateDatepicker"
      :useTime="useTime"
    ></datepicker>
  </div>
</template>

<script>
import Datepicker from "./Datepicker.vue";
import { IMaskDirective } from "vue-imask";
import IMask from "imask";
export default {
  name: "Date",
  props: {
    title: {
      type: String
    },
    value: {
      type: [Date, String]
    },
    useTime: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      left: null,
      top: "0px",
      right: "0px",
      valueDate: this.value ? this.formatDate(this.value) : "",
      valueDatepicker: `${this.value ? this.value : ""}`,
      mask: {
        mask: this.useTime ? "dd{/}MM{/}YYYY{ }HH{:}mm{:}ss" : "dd{/}MM{/}YYYY",
        blocks: {
          dd: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2
          },
          YYYY: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 9999,
            maxLength: 4
          },
          HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23,
            maxLength: 2
          },
          mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
            maxLength: 2
          },
          ss: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
            maxLength: 2
          }
        },
        overwrite: true,
        // autofix: true,
        lazy: false
      },
      isDatepicker: false
    };
  },
  created() {
    let me = this;
    window.addEventListener("click", function(e) {
      if (
        e.target.closest(".datepicker") ||
        e.target.closest("#icon-datepicker")
      ) {
      } else {
        me.isDatepicker = false;
      }
    });
  },
  watch: {
    value(val) {
      this.valueDate = this.formatDate(val);
      this.valueDatepicker = val;
    },
    valueDatepicker(val) {
      if (this.valueDate != this.formatDate(val)) {
        this.valueDate = this.formatDate(val);
        this.$emit(`input`, val);
      }
    }
  },
  directives: {
    imask: IMaskDirective
  },
  components: {
    Datepicker
  },
  methods: {
    /**
     * TTHuyen-5/10/2019
     * Thực hiện tính tọa độ và hiện thị datepicker
     */
    openDatepicker(e) {
      let me = this;
      this.isDatepicker = !this.isDatepicker;
      me.$nextTick(() => {
        //Tình ô cửa sổ của trình duyệt,Tính theo thẻ Body
        let bodyWidth = document.body.offsetWidth;
        let bodyHeight = document.body.offsetHeight;
        let elWidth = me.$refs.datepicker.$el.offsetWidth;
        let elHeight = me.$refs.datepicker.$el.offsetHeight;
        let poiterX = e.screenX;
        let poiterY = e.screenY;
        /**
         * Xử lý khi ô con trỏ ở gần
         */
        if (poiterY + elHeight > bodyHeight) {
          me.top = -elHeight + 20 + "px";
        } else {
          me.top = 52 + "px";
        }
      });
    },
    onAccept(e) {},
    onComplete(e) {
      if (this.useTime) {
        const maskRef = e.detail;
        maskRef.updateValue();
        this.valueDate = maskRef.unmaskedValue;
        let arr = this.valueDate.split(" ");
        let date = arr[0]
          .split("/")
          .reverse()
          .join("-");
        var dateFormate = date + " " + arr[1];
        const timestamp = Date.parse(dateFormate);
        if (Number.isNaN(timestamp)) return;
        this.$emit(`input`, timestamp);
        // Update gia tri datepicker
        this.valueDatepicker = timestamp;
      } else {
        const maskRef = e.detail;
        maskRef.updateValue();
        this.valueDate = maskRef.unmaskedValue;
        let arr = this.valueDate.split(" ");
        let date = arr[0]
          .split("/")
          .reverse()
          .join("-");
        var dateFormate = date;
        const timestamp = Date.parse(dateFormate);
        if (Number.isNaN(timestamp)) return;
        this.$emit(`input`, timestamp);
        // Update gia tri datepicker
        this.valueDatepicker = timestamp;
      }
    },
    formatDate(val) {
      if (this.useTime) {
        let valuedate = new Date(val);
        let date =
          valuedate.getDate() < 10
            ? "0" + valuedate.getDate()
            : valuedate.getDate();
        let month =
          valuedate.getMonth() < 9
            ? "0" + (valuedate.getMonth() + 1)
            : valuedate.getMonth() + 1;
        return (
          date +
          "/" +
          month +
          "/" +
          valuedate.getFullYear() +
          " " +
          this.formateTime(val)
        );
      } else {
        let valuedate = new Date(val);
        let date =
          valuedate.getDate() < 10
            ? "0" + valuedate.getDate()
            : valuedate.getDate();
        let month =
          valuedate.getMonth() < 9
            ? "0" + (valuedate.getMonth() + 1)
            : valuedate.getMonth() + 1;
        return date + "/" + month + "/" + valuedate.getFullYear();
      }
    },
    formateTime(val) {
      let valuedate = new Date(val);
      let hour =
        valuedate.getHours() < 10
          ? "0" + valuedate.getHours()
          : valuedate.getHours();
      let min =
        valuedate.getMinutes() < 10
          ? "0" + valuedate.getMinutes()
          : valuedate.getMinutes();
      let second =
        valuedate.getSeconds() < 10
          ? "0" + valuedate.getSeconds()
          : valuedate.getSeconds();
      let result = hour + ":" + min + ":" + second;
      return result;
    },

    updateDatepicker() {
      this.isDatepicker = !this.isDatepicker;

      this.valueDate = this.formatDate(this.valueDatepicker);
      this.$emit(`input`, this.valueDatepicker);
    }
  }
};
</script>

<style lang="scss">
.t-input {
  position: relative;
}
.date-input-content {
  width: 100%;
  height: 30px;
  border: none;
  padding-left: 8px;
  font-weight: normal !important;
}
input {
  border: none;
}
.FormDate {
  border: 1px solid #e5e5e5;
  display: flex;
  widows: 100%;
}
#icon-datepicker {
  margin-left: 5px;
  width: 30px;

  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 2px;
  background-image: url("../../assets/datepicker.png");
}

.datepicker {
  position: absolute;
}
</style>