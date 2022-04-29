/* eslint-disable import/no-anonymous-default-export */
import { LOAD_USER_NORMAL_INFO } from "../types/type-constant"

const initialState = {
    user: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "",
        maLoaiNguoiDung: "",
        hoTen: ""
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case LOAD_USER_NORMAL_INFO: {
            console.log({action})
            return { ...state, user: action.data }
        }


        default: return { ...state }
    }
}
