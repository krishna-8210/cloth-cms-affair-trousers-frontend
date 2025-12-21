import { baseurl } from "./connection.ts"
import { headerFunctions } from "./connection.ts"

import Axios from "axios"
export const loginService = async ({ email, password }:any) => {
    console.log('loginService')
    const resp = await Axios.post(baseurl + "/auth/login", {
        email,password
    })
    // console.log(resp)
    return resp
}
export const signupService = async ({ email, password, name, mobile }:any) => {
    console.log('signupService')
    const resp = await Axios.post(baseurl + "/auth/signup", {
        email, password, name, mobile
    })
    return resp
}

// export const class_list_service=async (page)=>{
//     const resp=await Axios.get(baseurl+`/student/class/list/`+page,{headers:headerFunctions()})
//     return resp
// }