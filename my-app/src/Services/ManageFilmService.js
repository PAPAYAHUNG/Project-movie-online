import { baseService } from "./BaseServices"

export class ManageFilmSerivce extends baseService {
    constructor() {
        super()
    }
    //--------------UI Ceniam management--------------
    getbBannerService = () => {
        return this.get('/api/QuanLyPhim/LayDanhSachBanner')
    }
    getbListFilmsService = () => {
        return this.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01')
    }
    getAllCenima = ()=>{
        return this.get('/api/QuanLyRap/LayThongTinHeThongRap')
    }
    getCinemaBrand = () => {
        return this.get('/api/QuanLyRap/LayThongTinHeThongRap')
    }
    getCinemaGroup = (maHeThongRap) => {
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
    getCinemaDetailFilms = () => {
        return this.get('/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP15')
    }
    getinFoWhenClicked = (id) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    }
    getListFilmsShown = (id) => {
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
    }

    //    ------------- user management ----------
    userSignUp = (user) => {
        return this.post('/api/QuanLyNguoiDung/DangKy',user)
    }
    userSignIn = (user) => {
        return this.post('/api/QuanLyNguoiDung/DangNhap',user)
    }

    // -----------------Booking ticket management-----------
    bookingTicket = (seatInfo)=>{
        return this.post('api/QuanLyDatVe/DatVe',seatInfo)
    }

    getHistoryUser = (user)=>{
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan',user)
    }
}

export const manageFilmnServie = new ManageFilmSerivce()