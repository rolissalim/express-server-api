export const QueryParams = () => {
    return {
        default: QueryParamsDefault(),
        provinsi: QueryParamsProvince(),
        kota_kab: QueryParamsProvince(),

    }
}

export const QueryParamsDefault = () => {
    return {
        keywords: null,
        // provinsi_id: null,
        // kota_kab_id: null,
        // kecamatan_id: null,
        // kelurahan_id: null,
        // workspace_id: null,
        // dapil_id: null,
        // caleg_id: null,
        // role_id: null,
        // workspace_type: null,
        // workspace_level: null,
        is_active: true,
    }
}

export const QueryParamsProvince = () => {
    return {
        keywords: null,
        is_active: true,
    }
}









