import { HIDE_LOADING, SHOW_LOADING } from "../types/type-constant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isLoading:false 
}

export default (state = initialState, action) => {
  switch (action.type) {

  case HIDE_LOADING:{
      return { ...state,isLoading:false }
  }
  case SHOW_LOADING:{
      return { ...state,isLoading:true }
  }

  default:return {...state}
    
  }
}
