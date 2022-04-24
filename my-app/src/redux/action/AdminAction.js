import { adminService } from "../../Services/AdminService"
import { LOAD_LISTFILM_ADMIN } from "../types/type-constant"

export const LoadListFilmAdminAction = ()=>{
    return async (dispatch)=>{
        try{
            let {data} = await adminService.getListFilmAdmin()
            console.log({data})
            dispatch({
                type:LOAD_LISTFILM_ADMIN,
                data:data.content
            })
        }catch (err){
            console.log(err)
        }
    }
}
export const AddFilmAdminAction = (FormData)=>{
    return async (dispatch)=>{
        try{
            let {data} = await adminService.addNewFilmAdmin(FormData)
            console.log({data})
            alert('Add new film succeed')
            // dispatch({
              
            // })
        }catch (err){
            alert('Add new film failed')
            console.log(err)
        }
    }
}