// const BASE_URL = 'https://ecovyst.herokuapp.com';
const BASE_URL = 'https://zebra-hospital.herokuapp.com';
// const BASE_URL = 'http://172.16.83.107:5000';
// const BASE_URL = 'http://localhost:5000'
// const BASE_URL = "https://7005-103-225-51-7.ngrok.io";
const Path = {
    GET_ALL_USERS: `${BASE_URL}/user/get/all`,
    GET_MAP_FILTER: `${BASE_URL}/mapFilter/get`,
    ADD_MAP_FILTER: `${BASE_URL}/mapFilter/add`,
    GET_ITEM_MASTER: `${BASE_URL}/assetDetailRoutes/getItemMaster`,
    GET_ITEM_MASTER_QUERY: `${BASE_URL}/assetDetailRoutes/get`,
    DELETE_USER: `${BASE_URL}/user/delete`,
    LOGIN: `${BASE_URL}/user/login`,
    GET_ALL_SITE: `${BASE_URL}/site/get`,
    ADD_ROLE: `${BASE_URL}/role/add`,
    UPLOAD_DATA: `${BASE_URL}/assetDetailRoutes/upload_assets`,
    GET_ROLE: `${BASE_URL}/role/get`,
    GET_HAND_HELD: `${BASE_URL}/handHeld/get`,
    ADD_HAND_HELD: `${BASE_URL}/handHeld/add`,
    EDIT_HAND_HELD: `${BASE_URL}/handHeld/edit`,
    DELETE_HAND_HELD: `${BASE_URL}/HandHeld/delete`,
    ADD_USER: `${BASE_URL}/user/signup`,
    GET_FILTERS: `${BASE_URL}/assetDetailRoutes/getFilters`,
    GET_RETAGGING_ASSETS: `${BASE_URL}/assetDetailRoutes/getReTagging`,
    DELETE_ROLE: `${BASE_URL}/role/delete`,
    EDIT_USER: `${BASE_URL}/user/edit`,
    EDIT_ROLE: `${BASE_URL}/role/edit`,
    GET_ASN: `${BASE_URL}/asn/get`,
    GET_ASN_BY_IBT: `${BASE_URL}/asset/get_Assets_by_asn`,
    GET_BATCH_BY_IBT: `${BASE_URL}/asset/getAssetsByAsn`,
    GET_BATCH: `${BASE_URL}/batch/get`,
    GET_COUNTED_ITEMS: `${BASE_URL}/countedItems/get`,
    GET_EPC_DETAIL: `${BASE_URL}/activity/get/by`,
    GET_ASN_BY_EPC: `${BASE_URL}/activity/by/epc`,
    GET_ASSETS_SOH: `${BASE_URL}/asset/getSoh`,
    GET_ASSETS_SITE_REF: `${BASE_URL}/asset/get_Asset_by_site/61b62968c72421b96dd9281b`,
    GET_ASSETS: `${BASE_URL}/activity/get/all`,
    GET_ASSETS_SITE: `${BASE_URL}/asset/get_Asset_by_site_zone_ref/61b62968c72421b96dd9281b`,
    GET_ASSETS_DETAILS: `${BASE_URL}/assetDetailRoutes/getScans`,
    GET_ASSETS_DETAILS_BY_EPC: `${BASE_URL}/assetDetailRoutes/getByEpc`,
    GET_ASSETS_DETAILS_BY_ALL: `${BASE_URL}/assetDetailRoutes/get`,
    GET_ASSETS_DETAILS_BY_FILTER: `${BASE_URL}/assetDetailRoutes/getFilters`,
    GET_ZONE_ALL: `${BASE_URL}/zone/get`,

};

export { Path };
export { BASE_URL }