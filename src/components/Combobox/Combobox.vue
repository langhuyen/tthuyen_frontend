<template lang="html">

    <div class="t-input">
    <div class="t-title mb-8-px">{{title}}</div>
      <vs-select noData="Không tìm thấy dữ liệu" v-model='valueCombox' autocomplete>
        <vs-select-item v-for='item in datax' :text='item.text' :value='item.value'></vs-select-item>     
        </vs-select>
    </div>
</template>
<script>
import api from "@/api/DetailAPI";

export default {
  watch: {
    value(value) {
      this.valueCombox = value;
    },
    valueCombox(value) {
      this.$emit("input", value);
    }
  },
  name: "Combobox",
  props: {
    title: {},
    value: {},
    /**{
     *  title:''
     *  dataField:''
     * }
     *
     */
    columnsDeclaration: {
      type: Object
    },
    datas: {
      type: Array
    },
    isServer: {
      type: Boolean
    },
    fieldValue: {
      type: String
    },
    fieldText: {
      type: String
    },
    urlPath: {
      type: String
    }
  },
  data() {
    return {
      datax: this.datas ? this.datas : [],
      api: api,
      valueCombox: this.value ? this.value : ""
    };
  },
  created() {},
  mounted() {
    //Load data:
    let me = this;
    if (me.isServer) {
      let url = me.urlPath;
      me.api
        .getAll(url)
        .then(result => {
          result.data.data.forEach(item => {
            let objItem = {
              text: item[me.fieldText],
              value: item[me.fieldValue]
            };
            me.datax.push(objItem);
          });
        })
        .catch(err => {
          me.datax = [];
        });
    }
  },
  methods: {
    generateText() {
      let me = this;
    }
  },
  computed: {}
};
</script>

 <<style scoped>
 
 </style>