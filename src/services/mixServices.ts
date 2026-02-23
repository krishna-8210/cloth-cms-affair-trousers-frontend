import { api_arg_type } from "@/types/index.ts";
import { baseurl, headerFunctions } from "./connection.ts"


import Axios from "axios"


const presetApi = (route: string) => {
    return {
        create: async (data: api_arg_type) => await Axios.post(baseurl + '/' + route, data.data, { headers: headerFunctions() }),
        list: async (data: api_arg_type) => await Axios.get(baseurl + '/' + route + '?' + data.query, { headers: headerFunctions() }),
        details: async (data: api_arg_type) => await Axios.get(baseurl + '/' + route + '/' + data.id, { headers: headerFunctions() }),
        update: async (data: api_arg_type) => await Axios.put(baseurl + '/' + route + '/' + data.id, data.data, { headers: headerFunctions() }),
        delete: async (data: api_arg_type) => await Axios.delete(baseurl + '/' + route + '/' + data.id, { headers: headerFunctions() }),
    }
}


export const work_api_service = {
    ...presetApi('work'),

}
export const worker_api_service = {
    ...presetApi('worker')
}


// workers
export const product_api_service = {
    ...presetApi('worker')
}

export const worker_role_api_service = {
    ...presetApi('worker_role')
}
export const worker_transction_api_service = {
    ...presetApi('worker_transaction'),
    individual_credit_amount: async (data: api_arg_type) => await Axios.post(baseurl + '/worker_transaction/' + 'credit_individual', data.data, { headers: headerFunctions() }),
    debit_amount: async (data: api_arg_type) => await Axios.post(baseurl + '/worker_transaction/' + 'debit', data.data, { headers: headerFunctions() }),
    list: async (data: api_arg_type) => await Axios.get(baseurl + '/worker_transaction/' + data.id, { headers: headerFunctions() }),
    details: async (data: api_arg_type) => await Axios.get(baseurl + '/worker_transaction/details/' + data.id, { headers: headerFunctions() }),
}

export const work_status_record_api_service = {//action like assign,submission and complete action handle by this
    ...presetApi('work_status_recored'),
    work_status_list: async (data: api_arg_type) => await Axios.get(baseurl + '/work_status_recored/list/work/' + data.id, { headers: headerFunctions() }),
    submitted_work_status_list: async (data: api_arg_type) => await Axios.get(baseurl + '/work_status_recored/work/submitted/' + data.id, { headers: headerFunctions() }),
    worker_work_list: async (data: api_arg_type) => await Axios.get(baseurl + '/work_status_recored/worker_work_list/' + data.id, { headers: headerFunctions() }),
    update_work_worker_unit_rate: async (data: api_arg_type) => await Axios.put(baseurl + '/work_status_recored/update_work_worker_unit_rate/' + data.id, data.data, { headers: headerFunctions() }),
    range_match: async (data: api_arg_type) => await Axios.get(baseurl + '/work_status_recored/range-match/' + data.id, { headers: headerFunctions() }),
}

// inventry
export const inventry_api_service = {
    ...presetApi('inventry'),
    details_via_range: async (data: api_arg_type) => await Axios.get(baseurl + '/inventry/details_via_range/' + data.id, { headers: headerFunctions() }),
    inventry_record_list: async (data: api_arg_type) => await Axios.get(baseurl + '/inventry/record/' + data.id + '?' + data.query, { headers: headerFunctions() }),
}



//customers
export const customer_api_service = {
    ...presetApi('customer'),
    credit_balance: async (data: api_arg_type) => await Axios.post(baseurl + '/customer/credit_amount', data.data, { headers: headerFunctions() }),
}

export const compnay_api_service = {
    ...presetApi('company'),
    credit_balance: async (data: api_arg_type) => await Axios.post(baseurl + '/customer/credit_amount', data.data, { headers: headerFunctions() }),
}
//invoice
export const invoice_api_service = {
    ...presetApi('invoice'),
    pdf_download: async (data: api_arg_type) => await Axios.get(baseurl + '/invoice/pdf/' + data.id, { headers: headerFunctions(), responseType: 'blob' }),
    create_return_invoice: async (data: api_arg_type) => await Axios.post(baseurl + '/invoice_return',data.data, { headers: headerFunctions(), }),
}

//agent
export const agent_api_service = {
    ...presetApi('agent'),
        incentive_list: async (data: api_arg_type) => await Axios.get(baseurl + '/agent/incentive-list/' + data.id+'?'+data.query, { headers: headerFunctions() }),
        debit_money: async (data: api_arg_type) => await Axios.post(baseurl + '/agent/debit-money/' + data.id,data.data ,{ headers: headerFunctions() }),

    }
export const color_api_service = {
    ...presetApi('color')
}
export const transaction_api_service = {
    transaction_list_via_id: async (data: api_arg_type) => await Axios.get(baseurl + '/transaction/list/' + data.id, { headers: headerFunctions() }),
}
// export const signupService = async ({ email, password, name, mobile }) => {
//     console.log('signupService')
//     const resp = await Axios.post(baseurl x+ "/auth/signup", {
//         email, password, name, mobile
//     })
//     return resp
// }

// export const create_category_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/category/create`,data,{headers:headerFunctions()})
//     return resp
// }

// export const category_list_service=async (data)=>{
//     const resp=await Axios.get(baseurl+`/category/list?${data?.query?data.query:""}`,{headers:headerFunctions()})
//     return resp
// }
// export const category_all_list_service=async ()=>{
//     const resp=await Axios.get(baseurl+`/category/all_list`,{headers:headerFunctions()})
//     return resp
// }
// export const category_delete_service=async (id)=>{
//     const resp=await Axios.get(baseurl+`/category/delete/`+id,{headers:headerFunctions()})
//     return resp
// }

// export const sub_category_create_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/sub-category/create`,data,{headers:headerFunctions()})
//     return resp
// }
// export const sub_category_list_service=async (data)=>{
//     const resp=await Axios.get(baseurl+`/sub-category/list?${data.query?data.query:""}`,{headers:headerFunctions()})
//     return resp
// }

// // metals

// export const metal_quality_type_create_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/metal/type/create`,data,{headers:headerFunctions()})
//     return resp
// }


// export const metal_quality_type_list_service=async (data)=>{
//     const resp=await Axios.get(baseurl+`/metal/type/list`,{headers:headerFunctions()})
//     return resp
// }

// // rate update
// export const metal_rate_update_service=async (data)=>{
//         const resp=await Axios.post(baseurl+`/metal/rate/update`,data,{headers:headerFunctions()})
//     return resp
// }
// export const metal_rate_get_service=async ()=>{
//         const resp=await Axios.get(baseurl+`/metal/rate/get`,{headers:headerFunctions()})
//     return resp
// }

// // product group
// export const product_create_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/product/create`,data,{headers:headerFunctions()})
//     return resp
// }

// export const product_list_service=async (data)=>{
//     const resp=await Axios.get(baseurl+`/product/list`,{headers:headerFunctions()})
//     return resp
// }


// // making charge
// export const making_charge_create_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/mkaing_charge/create`,data,{headers:headerFunctions()})
//     return resp
// }

// export const making_charge_list_service=async (data)=>{
//     const resp=await Axios.get(baseurl+`/mkaing_charge/list`,{headers:headerFunctions()})
//     return resp
// }




// // item create
// export const item_create_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/item/create`,data,{headers:headerFunctions()})
//     return resp
// }
// export const item_list_service=async (data)=>{
//     const resp=await Axios.get(baseurl+`/item/list`,{headers:headerFunctions()})
//     return resp
// }
// export const item_delete_service=async (id)=>{
//     const resp=await Axios.delete(baseurl+`/item/delete/`+id,{headers:headerFunctions()})
//     return resp
// }
// export const item_details_service=async (id)=>{
//     const resp=await Axios.get(baseurl+`/item/details/`+id,{headers:headerFunctions()})
//     return resp
// }
// // uploads
// export const upload_image_service=async (data)=>{
//     const resp=await Axios.get(baseurl+`/upload/imagekit/key-generate`,{headers:headerFunctions()})
//     return resp
// }



// // website setting
// export const website_editor_homepage_setting_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/websiteEditor/save/homepage-template`,data,{headers:headerFunctions()})
//     return resp
// }



// // media folder
// export const media_folder_create_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/media/folder/create`,data,{headers:headerFunctions()})
//     return resp
// }

// export const media_folder_list_service=async (data)=>{
//     const resp=await Axios.get(baseurl+`/media/folder/list`,{headers:headerFunctions()})
//     return resp
// }
// export const media_upload_link_entry_service=async (data)=>{
//     const resp=await Axios.post(baseurl+`/media/link/save`,data,{headers:headerFunctions()})
//     return resp
// }
// export const media_folder_details_service=async (id)=>{
//     const resp=await Axios.get(baseurl+`/media/folder/imagelist/`+id,{headers:headerFunctions()})
//     return resp
// }


// // website editor template
// export const website_editor_component_save_service=async (data:any)=>{
//     const resp=await Axios.post(baseurl+`/website_editor/template/create`,data,{headers:headerFunctions()})
//     return resp
// }
// export const website_editor_component_list_service=async (data:string)=>{
//     const resp=await Axios.get(baseurl+`/website_editor/template/list/`+data,{headers:headerFunctions()})
//     return resp
// }
// export const website_editor_mobile_template_uplaod_service=async (data:string)=>{
//     const resp=await Axios.post(baseurl+`/website_editor/mobile_template/upload`,data,{headers:headerFunctions()})
//     return resp
// }

// export const website_category_template_save_service=async (data:string)=>{
//     const resp=await Axios.post(baseurl+`/website_editor/save/category`,data,{headers:headerFunctions()})
//     return resp
// }
// export const website_category_template_fetch_service=async (data:string)=>{
//     const resp=await Axios.get(baseurl+`/website_editor/fetch/category`,{headers:headerFunctions()})
//     return resp
// }


