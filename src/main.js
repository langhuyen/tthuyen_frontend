import Vue from './global'
import App from './App.vue'
import router from './router'
import Vuesax from "vuesax";
import VueToast from 'vue-toast-notification';
import VueSidebarMenu from 'vue-sidebar-menu'


import 'vue-toast-notification/dist/index.css';
import "vuesax/dist/vuesax.css";
import '../node_modules/material-icons/iconfont/material-icons.scss'
import * as VueGoogleMaps from "vue2-google-maps";
import "@/assets/scss/common.scss"
import 'material-icons/css/material-icons.scss';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
var keyAPI = 'AIzaSyBfFB0Xva7w9CWsrTxEneaLMgPlWQA8rXc'

// import css
import 'vue-easytable/libs/themes-base/index.css'

// import table and pagination comp
import { VTable, VPagination } from 'vue-easytable'

// Register to global
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(VueSidebarMenu)

Vue.use(VueToast);
Vue.use(Vuesax);


Vue.use(VueGoogleMaps, {
    load: {
        key: keyAPI,
        libraries: "places",
        region: 'VI',
        language: 'vi',
    }
});


Vue.config.productionTip = false



new Vue({
    render: h => h(App),
    router,

}).$mount('#app')