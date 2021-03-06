import { BOOKING_TICKET, CHANGE_TAB_ACTIVE, COMPLETE_BOOKING, GET_USER_BOOKING_HISTORY, SET_INFO_UI_BOOK_FILMS, TURN_TAB_AFTER_BOOKING } from "../types/type-constant"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    infoBooking: {
        "thongTinPhim": {
            "maLichChieu": "",
            "tenCumRap": "",
            "tenRap": "",
            "diaChi": "",
            "tenPhim": "",
            "hinhAnh": "",
            "ngayChieu": "",
            "gioChieu": ""
        },
        "danhSachGhe": [
        
        ]
    },
    listSeatSelecting: [],
    userHistory: {
        "taiKhoan": "",
        "matKhau": "",
        "hoTen": "",
        "email": "",
        "soDT": null,
        "maNhom": "",
        "loaiNguoiDung": null,
        "thongTinDatVe": [

        ]
    },
    tabNum:'1',
    listSeatSelectingByOthers:[{maGhe:56333},{maGhe:56334}]

}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_INFO_UI_BOOK_FILMS: {
            console.log('inreducer later', action.data)
            return { ...state, infoBooking: action.data }
        }

        case BOOKING_TICKET: {
            console.log('chair', action.chair)
            let cloneSeatSelectedList = [...state.listSeatSelecting]
            let index = cloneSeatSelectedList.findIndex(item => item.maGhe === action.chair.maGhe)

            if (index !== -1) {
                cloneSeatSelectedList.splice(index, 1)
            }
            else {
                cloneSeatSelectedList.push(action.chair)
            }
            state.listSeatSelecting = cloneSeatSelectedList
            console.log('lissssssst', state.listSeatSelecting)
            return { ...state }
        }
        case GET_USER_BOOKING_HISTORY: {
            return { ...state, userHistory: action.data }
        }
        case COMPLETE_BOOKING: {
            state.listSeatSelecting = []
            return { ...state }
        }
        case TURN_TAB_AFTER_BOOKING:{
            return {...state,tabNum:'2'}
        }
        case CHANGE_TAB_ACTIVE:{
            return {...state,tabNum:action.number.toString()}
        }

        default: return { ...state }
    }
}
