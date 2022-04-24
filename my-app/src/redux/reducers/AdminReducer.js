import { LOAD_LISTFILM_ADMIN } from "../types/type-constant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    listFilmAdmin:[
        {
          "maPhim": '',
          "tenPhim": '',
          "biDanh": "",
          "trailer": "",
          "hinhAnh": "",
          "moTa": "",
          "maNhom": "",
          "ngayKhoiChieu": "",
          "danhGia": ''
        },
        
      ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LISTFILM_ADMIN:{
        return {...state,listFilmAdmin:action.data}
    }
  
    

  default: return { ...state}
  }
}
