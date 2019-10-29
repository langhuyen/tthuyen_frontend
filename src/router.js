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
import Truck from '@/views/Truck.vue'
import Mooc from '@/views/Mooc.vue'

Vue.use(Router);
export default new Router({

    mode: 'history',
    base: '/',
    pathToRegexOptions: { strict: true },
    routes: [{
        path: "/Entity/:entityName/Detail/:id",
        name: "EntityManagementAdd",
        component: EntityManagementAdd,
        props: true
    },
    {
        path: "/Entity/:entityName",
        name: "EntityManagementList",
        component: EntityManagementList,
        props: true
    },
    {
        path: "/CustomerRequest/:entityName",
        name: "CustomerRequestList",
        component: CustomerRequestList,
        props: true
    },
    {
        path: "/CustomerRequest/:entityName/Detail/:id?",
        name: "CustomerRequestDetail",
        component: CustomerRequestDetail,
        props: true
    },
    {
        path: "/Container",
        name: "Container",
        component: Container,
        props: true
    },
    {
        path: "/Truck",
        name: "Truck",
        component: Truck,
        props: true
    },
    {
        path: "/Mooc",
        name: "Mooc",
        component: Mooc,
        props: true
    },
    {
        path: "/BaseView",
        name: "BaseView",
        component: BaseView,
        props: true
    },
    {
        path: "/test",
        name: "test",
        component: Test,
        props: true
    },
    ],

})