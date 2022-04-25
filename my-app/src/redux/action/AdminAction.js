import { adminService } from "../../Services/AdminService"
import { LOAD_FILM_INFO_ADMIN, LOAD_LISTFILM_ADMIN } from "../types/type-constant"

export const LoadListFilmAdminAction = (keyWord="")=>{
    return async (dispatch)=>{
        try{
            let {data} = await adminService.getListFilmAdmin(keyWord)
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
export const getInfoEditFilmAdminAction = (idFilm)=>{
    return async (dispatch)=>{
        try{
            let {data} = await adminService.GetInfoEditFilmAdmin(idFilm)
            console.log({data})
            dispatch({
              type:LOAD_FILM_INFO_ADMIN,
              data:data.content
            })
        }catch (err){
            console.log(err)
        }
    }
}
export const UpdateInfoEditFilmAdminAction = (formData,navigate)=>{
    return async (dispatch)=>{
        try{
            let {data} = await adminService.UpdateEditedFilmAdmin(formData)
            console.log({data})
            alert('Update film succeed')
          await  dispatch(LoadListFilmAdminAction())
            navigate('/admin/films-admin')
        }catch (err){
            console.log(err)
            alert('Update film failed')
        }
    }
}
export const DeleteFilmAdminAction = (id)=>{
    return async (dispatch)=>{
        try{
            let {data} = await adminService.DeleteFilmAdmin(id)
            console.log({data})
            await alert('Delete film succeed')
            dispatch(LoadListFilmAdminAction())
        }catch (err){
            console.log(err.response.data)
            alert('Delete film failed')
        }
    }
}
export const SearchFilmAdminAction = (keyWord)=>{
    return async (dispatch)=>{
        try{
            let {data} = await adminService.getListFilmAdmin(keyWord)
            console.log("listAfterSearch",data.content)
            
        }catch (err){
            console.log(err.response?.data)
        }
    }
}