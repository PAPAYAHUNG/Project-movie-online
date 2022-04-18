import { PUT_FILM_ITEM_CLICKED } from "../types/type-constant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
   contentFilm : {
    "heThongRapChieu": [
        {
            "cumRapChieu": [
                {
                    "lichChieuPhim": [
                        {
                            "maLichChieu": "44552",
                            "maRap": "476",
                            "tenRap": "Rạp 6",
                            "ngayChieuGioChieu": "2021-09-12T05:53:34",
                            "giaVe": 150000.0,
                            "thoiLuong": 120
                        }
                    ],
                    "maCumRap": "bhd-star-cineplex-pham-hung",
                    "tenCumRap": "BHD Star Cineplex - Phạm Hùng",
                    "hinhAnh": null
                },
                {
                    "lichChieuPhim": [
                        {
                            "maLichChieu": "44557",
                            "maRap": "451",
                            "tenRap": "Rạp 1",
                            "ngayChieuGioChieu": "2021-09-01T07:35:02",
                            "giaVe": 75000.0,
                            "thoiLuong": 120
                        },
                        {
                            "maLichChieu": "44779",
                            "maRap": "451",
                            "tenRap": "Rạp 1",
                            "ngayChieuGioChieu": "2021-09-08T12:29:09",
                            "giaVe": 75000.0,
                            "thoiLuong": 120
                        }
                    ],
                    "maCumRap": "bhd-star-cineplex-3-2",
                    "tenCumRap": "BHD Star Cineplex - 3/2",
                    "hinhAnh": null
                }
            ],
            "maHeThongRap": "BHDStar",
            "tenHeThongRap": "BHD Star Cineplex",
            "logo": "http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
        },
        {
            "cumRapChieu": [
                {
                    "lichChieuPhim": [
                        {
                            "maLichChieu": "44493",
                            "maRap": "542",
                            "tenRap": "Rạp 2",
                            "ngayChieuGioChieu": "2021-09-11T02:00:00",
                            "giaVe": 111111.0,
                            "thoiLuong": 120
                        }
                    ],
                    "maCumRap": "cgv-crescent-mall",
                    "tenCumRap": "CGV - Crescent Mall",
                    "hinhAnh": null
                },
                {
                    "lichChieuPhim": [
                        {
                            "maLichChieu": "44559",
                            "maRap": "515",
                            "tenRap": "Rạp 5",
                            "ngayChieuGioChieu": "2021-09-07T09:55:00",
                            "giaVe": 75000.0,
                            "thoiLuong": 120
                        },
                        {
                            "maLichChieu": "44597",
                            "maRap": "515",
                            "tenRap": "Rạp 5",
                            "ngayChieuGioChieu": "2021-11-14T15:30:00",
                            "giaVe": 85000.0,
                            "thoiLuong": 120
                        },
                        {
                            "maLichChieu": "44598",
                            "maRap": "516",
                            "tenRap": "Rạp 6",
                            "ngayChieuGioChieu": "2021-12-25T15:30:00",
                            "giaVe": 78000.0,
                            "thoiLuong": 120
                        }
                    ],
                    "maCumRap": "cgv-aeon-binh-tan",
                    "tenCumRap": "CGV - Aeon Bình Tân",
                    "hinhAnh": null
                }
            ],
            "maHeThongRap": "CGV",
            "tenHeThongRap": "cgv",
            "logo": "http://movie0706.cybersoft.edu.vn/hinhanh/cgv.png"
        }
    ],
    "maPhim": 1328,
    "tenPhim": "Lady 420",
    "biDanh": "lady-420",
    "trailer": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "hinhAnh": "http://movie0706.cybersoft.edu.vn/hinhanh/lady-420_gp01.jpg",
    "moTa": "không bậy bạ nhaaa",
    "maNhom": "GP01",
    "ngayKhoiChieu": "2021-09-14T19:51:50.727",
    "danhGia": 10
}
}

export default (state = initialState, action) => {
  switch (action.type) {
      case PUT_FILM_ITEM_CLICKED :{
        return {...state,contentFilm:action.data}
      }
 
   

  default:  return { ...state}
  }
}
