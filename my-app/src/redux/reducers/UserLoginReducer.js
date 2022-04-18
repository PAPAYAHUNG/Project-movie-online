import { SET_USER_INFO } from "../types/type-constant"

/* eslint-disable import/no-anonymous-default-export */



const initialState = {
   userInfo: {

   }
}


export default (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_INFO :{
            localStorage.setItem('USER_LOGIN_MOVIE', JSON.stringify(action.data.content))
            localStorage.setItem('ACCESS_TOKEN_MOVIE', action.data.content.accessToken)
            return {...state,userInfo:action.data}
        }
        default: return { ...state }


    }
}
