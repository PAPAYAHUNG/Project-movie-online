import { SET_DATA_BANNER } from "../types/type-constant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    content:[
      
        {
            "maBanner": 3,
            "maPhim": 1284,
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png"
        }]
}


export default (state = initialState, action) => {
    switch (action.type) {

        case SET_DATA_BANNER:{
            return {...state,content:action.data}
        }
        default: return { ...state }


    }
}
