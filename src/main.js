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
var keyAPI = 'AIzaSyCgBE4hSryEhlwDwTlIagZSJXY-wpp_-N0'


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