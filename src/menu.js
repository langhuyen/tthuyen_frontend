var menu = [{
        href: "/Entity/WAREHOUSE",
        title: "Quản lý kho",
        icon: "fa fa-warehouse"
    },
    {
        href: "/Entity/DEPOTTRUCK",
        title: "Quản lý đầu kéo",
        icon: "fa fa-truck",
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
                title: 'Loại'
            }
        ]
    },
    {
        href: "/Entity/DEPOTTRAILER",
        title: "Quản lý Mooc",
        icon: "fa fa-luggage-cart"
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
];

export default menu