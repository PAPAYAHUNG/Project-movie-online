import { adminService } from "../../Services/AdminService"
import { LOAD_FILM_INFO_ADMIN, LOAD_LISTFILM_ADMIN } from "../types/type-constant"

export const LoadListFilmAdminAction = (keyWord = "") => {
    return async (dispatch) => {
        try {
            let { data } = await adminService.getListFilmAdmin(keyWord)
            console.log({ data })
            dispatch({
                type: LOAD_LISTFILM_ADMIN,
                data: data.content
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const AddFilmAdminAction = (FormData) => {
    return async (dispatch) => {
        try {
            let { data } = await adminService.addNewFilmAdmin(FormData)
            console.log({ data })
            alert('Add new film succeed')
            // dispatch({

            // })
        } catch (err) {
            alert('Add new film failed')
            console.log(err)
        }
    }
}
export const getInfoEditFilmAdminAction = (idFilm) => {
    return async (dispatch) => {
        try {
            let { data } = await adminService.GetInfoEditFilmAdmin(idFilm)
            console.log({ data })
            dispatch({
                type: LOAD_FILM_INFO_ADMIN,
                data: data.content
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const UpdateInfoEditFilmAdminAction = (formData, navigate) => {
    return async (dispatch) => {
        try {
            let { data } = await adminService.UpdateEditedFilmAdmin(formData)
            console.log({ data })
            alert('Update film succeed')
            await navigate('/admin/films-admin')
             dispatch(LoadListFilmAdminAction())
        } catch (err) {
            console.log(err.response.data)
         
            alert(`Update film failed -  ${err.response.data.content}`)
        }
    }
}
export const DeleteFilmAdminAction = (id) => {
    return async (dispatch) => {
        try {
            let { data } = await adminService.DeleteFilmAdmin(id)
            console.log({ data })
            await alert('Delete film succeed')
            dispatch(LoadListFilmAdminAction())
        } catch (err) {
            console.log(err.response.data)
            alert('This function is temparory blocked as some issue in Server!')
        }
    }
}
export const SearchFilmAdminAction = (keyWord) => {
    return async (dispatch) => {
        try {
            let { data } = await adminService.getListFilmAdmin(keyWord)
            console.log("listAfterSearch", data.content)

        } catch (err) {
            console.log(err.response?.data)
        }
    }
}

//------------User Normal---------

export const fetchUserInfoAction = (userName) => {
    return async (dispatch) => {
        try {
            let { data } = adminService.GetUserInfoAdmin(userName)
            console.log({ data })
        } catch (err) {
            console.log(err)
        }
    }
}

export const UpdateNewUserAction = (userUpdated) => {
    return async (dispatch) => {
        try {
            let { data } = await adminService.UpdateUserInfoNormal(userUpdated)
            console.log({ data })
            alert('Update user succeed')
            
        } catch (err) {
            console.log(err.response.data)
        }

    }
}

export const AddNewUserAdmin = (newUser, navigate) => {
    console.log({ newUser })
    console.log({ navigate })
    return async (dispatch) => {
        try {
            let { data } = await adminService.AddUserAtAdminPage(newUser)
            console.log({ data })
            await alert('Add user succeed')
    
        } catch (err) {
            console.log(err.response.data)
            alert(`Add user Failed - ${err.response.data.content}`)
        }

    }
}
export const UpdateUserAdmin = (updatedUser, navigate) => {
    console.log({ updatedUser })
    console.log({ navigate })
    return async (dispatch) => {
        try {
            let { data } = await adminService.UpdateUserAtAdminPage(updatedUser)
            console.log({ data })
            await alert('Add user succeed')
            navigate('/admin/user-admin')
        } catch (err) {
            console.log(err.response.data)
            alert(`Update user Failed - ${err.response.data.content}`)
        }

    }
}
export const DeleteUserAdmin = (userName) => {
    console.log({userName})
    return async (dispatch) => {
        try {
            let { data } = await adminService.DeleteUserAtAdminPage(userName)
            console.log({ data })
             alert('Delete user succeed')
        } catch (err) {
            console.log(err.response.data)
            alert(`Delete user Failed -This function have some errors as server`)
        }
    }
}