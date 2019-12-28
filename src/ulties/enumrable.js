var Enum = {
    Mode: {
        Add: "Thêm",
        Edit: "Sửa",
    },
    EntityType: {
        PORT: {
            Title: "Cảng",
            Value: "PORT"
        },
        WAREHOUSE: {
            Title: "kho",
            Value: "WAREHOUSE"
        },
        DEPOTTRAILER: {
            Title: "Bãi chứa Mooc",
            Value: "DEPOTTRAILER"
        },
        DEPOTTRUCK: {
            Title: "Bãi chứa Đầu kéo",
            Value: "DEPOTTRUCK"
        },
        DEPOTCONTAINER: {
            Title: "Bãi chứa container",
            Value: "DEPOTCONTAINER"
        },

    },
    RequestType: {
        ImportLadenRequest: {
            Title: "Vận chuyển container hàng từ cảng về kho",
            Value: "ImportLadenRequest "
        },
        ImportEmptyRequest: {
            Title: "Vận chuyển container rỗng từ kho về bãi",
            Value: "ImportEmptyRequest "
        },
        ExportLadenRequest: {
            Title: "Vận chuyển container hàng từ kho về cảng",
            Value: "ExportLadenRequest"
        },
        ExportEmptyRequest: {
            Title: "Vận chuyển container rỗng từ bãi đến kho",
            Value: "ExportEmptyRequest "
        },
    },
};

export default Enum;