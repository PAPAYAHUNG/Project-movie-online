import { GET_LIST_FILMS } from "../types/type-constant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    listFilms:[
        {
        biDanh: "doctor-strange-2019",
        dangChieu: true,
        danhGia: 10,
        hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/doctor-strange-2019_gp01.jpg",
        hot: true,
        maNhom: "GP01",
        maPhim: 10147,
        moTa: "Doctor Strange: Phù thủy tối thượng là một phim của điện ảnh Hoa Kỳ dựa trên nhân vật cùng tên của hãng Marvel Comics, sản xuất bởi Marvel Studios và phân phối bởi Walt Disney Studios Motion Pictures. Đây là bộ phim thứ 14 trong Marvel Cinematic Universe.",
        ngayKhoiChieu: "2022-03-04T00:00:00",
        sapChieu: false,
        tenPhim: "Doctor Strange 2019",
        trailer: "https://www.youtube.com/watch?v=kmXjPbN-rYU"
    }
    ]
}

export default (state = initialState, action) => {
  switch (action.type) {
      case GET_LIST_FILMS:{
        return {...state,listFilms:action.data}
      }
 
   

  default:  return { ...state}
  }
}
