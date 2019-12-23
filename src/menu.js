var menu = [

    {
        href: "/darhboard",
        title: "Tổng quan",
        icon: "fa fa-chart-line"
    },
    {
        href: "/Entity/WAREHOUSE",
        title: "Quản lý kho",
        icon: "fa fa-warehouse"
    },
    {

        title: "Quản lý đầu kéo",
        icon: "fa fa-truck",
        child: [{
            href: '/Entity/DEPOTTRUCK',
            title: 'Bãi chứa truck'
        },
        {
            href: "/Truck",
            title: 'Danh sach truck'
        },
        {
            href: "/ListTruckRouters",
            title: 'Xe được lập lịch'
        },
        ]
    },
    {
        href: "/Entity/PORT",
        title: "Quản lý cảng",
        icon: "fa fa-anchor"
    },
    {

        title: "Container",
        icon: "fa fa-box-open",
        child: [{
            href: '/Entity/DEPOTCONTAINER',
            title: 'Bãi chứa'
        },
        {
            href: "/Container",
            title: 'Danh sách container'
        }
        ]
    },
    {
        // href: "/Entity/DEPOTTRAILER",
        title: "Quản lý Mooc",
        icon: "fa fa-luggage-cart",
        child: [{
            href: '/Entity/DEPOTTRAILER',
            title: 'Bãi chứa mooc'
        },
        {
            href: "/Mooc",
            title: 'Danh sach mooc'
        }
        ]
    },
    {
        title: "Yêu cầu vận chuyển",
        icon: "fa  fa-american-sign-language-interpreting",
        child: [{
            href: '/CustomerRequest/ImportLadenRequest',
            title: 'Container hàng từ cảng về kho'
        },
        {
            href: '/CustomerRequest/ImportEmptyRequest',
            title: 'Container rỗng từ kho về bãi'
        },
        {
            href: '/CustomerRequest/ExportLadenRequest',
            title: 'Container hàng từ kho về cảng'
        },
        {
            href: '/CustomerRequest/ExportEmptyRequest',
            title: 'Container rỗng từ bãi đến kho'
        },
        ]
    },
    /**
     * Chức năng tiến hành vận tải các tuyến đường trong từng ngày
     * <i class="fas fa-map-marked-alt"></i>
     */
    {
        href: "/Transport/router",
        title: "Quản lý vận tải",
        icon: "fa fa-map-marked-alt"
    },

    {
        title: "Quản lý tài khoản",
        icon: "fa  fa-users",
        child: [{
            href: '/logout',
            title: 'Đăng xuất'
        },

        ]
    },

    /**
     * Chức năng xem lịch sử các tuyến hàng
     */

];

export default menu