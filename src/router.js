import Router from "vue-router";
import Vue from "vue";

import EntityManagementAdd from "@/views/EntityManagementAdd.vue";
import EntityManagementList from "@/views/EntityManagementList.vue";
import CustomerRequestDetail from "@/views/CustomerRequestDetail.vue";
import CustomerRequestList from "@/views/CustomerRequestList.vue";
import Container from "@/views/Container.vue";
import BaseView from "@/views/BaseView.vue";
import ReadCSV from "@/views/ReadCSV.vue";
import Test from "@/views/Test.vue";
import Truck from '@/views/Truck.vue';
import Mooc from '@/views/Mooc.vue';
import router from '@/views/TransportManagement/Transport.vue';
import Login from '@/views/Login/Login.vue';
import Register from '@/views/Login/Register.vue';
import DisplayDirection from '@/views/DisplayDirection.vue';
import ListTruckRouters from '@/views/ListTruckRouters.vue';
import datatable from '@/components/TTable/Datatable'
import darhboard from '@/views/Darhboard'
Vue.use(Router);
var routers = new Router({
    mode: 'history',
    base: '/',
    pathToRegexOptions: { strict: true },
    scrollBehavior: function (to) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    },
    routes: [

        {
            path: "/darhboard",
            name: "darhboard",
            component: darhboard,
        },
        {
            path: "/Login",
            name: "Login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/Register",
            name: "Register",
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: "/Entity/:entityName/Detail/:id",
            name: "EntityManagementAdd",
            component: EntityManagementAdd,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/Entity/:entityName",
            name: "EntityManagementList",
            component: EntityManagementList,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/CustomerRequest/:entityName",
            name: "CustomerRequestList",
            component: CustomerRequestList,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/CustomerRequest/:entityName/Detail/:id?",
            name: "CustomerRequestDetail",
            component: CustomerRequestDetail,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/Container",
            name: "Container",
            component: Container,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/Truck",
            name: "Truck",
            component: Truck,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/Mooc",
            name: "Mooc",
            component: Mooc,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/BaseView",
            name: "BaseView",
            component: BaseView,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/test",
            name: "test",
            component: ReadCSV,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },

        {
            path: "/Transport/router",
            name: "router",
            component: router,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/DisplayDirection",
            name: "DisplayDirection",
            component: DisplayDirection,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/ListTruckRouters",
            name: "ListTruckRouters",
            component: ListTruckRouters,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: "/datatable",
            name: "datatable",
            component: datatable,
            props: true,
            // meta: {
            //     requiresAuth: true
            // }
        },
    ],

});

routers.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next()
                }
                else {
                    next({ name: 'userboard' })
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        }
        else {
            next({ name: 'userboard' })
        }
    } else {
        next()
    }
})


export default routers;