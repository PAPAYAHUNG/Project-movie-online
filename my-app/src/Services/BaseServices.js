import axios from "axios";
import { DOMAIN, TOKEN } from "../util/Settings/config";

export class baseService {
    put = (url,model)=>{
        let headers= {'Authorization': 'Bearer '+localStorage.getItem(TOKEN)}
        console.log(headers)
        return axios.put(`${DOMAIN}/${url}`,model,{headers:headers})
    }
    post = (url,model)=>{
       let headers= {'Authorization': 'Bearer '+localStorage.getItem(TOKEN)}
       console.log(headers)
        return axios.post(`${DOMAIN}/${url}`,model,{headers:headers})
    }
    delete = (url,model)=>{
       let headers= {'Authorization': 'Bearer '+localStorage.getItem(TOKEN)}
       console.log(headers)
        return axios.delete(`${DOMAIN}/${url}`,model,{headers:headers})
    }
    get = (url)=>{
       let headers= {'Authorization': 'Bearer '+localStorage.getItem(TOKEN)}
        return axios.get(`${DOMAIN}/${url}`,{headers:headers})
    }
}
// export class baseService {
//     put = (url,model)=>{
//         let headers= {'Authorization': 'Bearer '+localStorage.getItem(TOKEN)}
//         // console.log(headers)
//         return axios({
//             method: 'put',
//             baseURL: DOMAIN,
//             url: url,
//             data: {
//               model: model,
//             },
//             headers:headers})

//     }
//     post = (url,model)=>{
//         let headers= {'Authorization': 'Bearer '+localStorage.getItem(TOKEN)}
//         // console.log(headers)
//         return axios({
//             method: 'post',
//             baseURL: DOMAIN,
//             url: url,
//             data: {
//               model: model,
//             },
//             headers:headers})

//     }
//     delete = (url,model)=>{
//         let headers= {'Authorization': 'Bearer '+localStorage.getItem(TOKEN)}
//         // console.log(headers)
//         return axios({
//             method: 'delete',
//             baseURL: DOMAIN,
//             url: url,
//             data: {
//               model: model,
//             },
//             headers:headers})

//     }
//     get = (url,model)=>{
//         let headers= {'Authorization': 'Bearer '+localStorage.getItem(TOKEN)}
//         // console.log(headers)
//         return axios({
//             method: 'get',
//             baseURL: DOMAIN,
//             url: url,
//             data: {
//               model: model,
//             },
//             headers:headers})

//     }
  
// }