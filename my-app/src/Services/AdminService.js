import React, { Component } from 'react'
import { GROUP } from '../redux/types/type-constant';
import { baseService } from './BaseServices';

export class AdminService extends baseService{
    constructor(){
        super()
    }

    //Get list films at admin page
    getListFilmAdmin = (keyWord="")=>{
        if(keyWord.trim() !== ""){
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}&tenPhim=${keyWord}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`)
    }
    //Add new film at admin page
    addNewFilmAdmin = (object)=>{
        return this.post('/api/QuanLyPhim/ThemPhimUploadHinh',object)
    }
    //Get info of Edit film at admin page
    GetInfoEditFilmAdmin = (idFilm)=>{
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`)
    }
    //Update edited film onto server
    UpdateEditedFilmAdmin = (formData)=>{
        return this.post('api/QuanLyPhim/CapNhatPhimUpload',formData)
    }
    //Delete film onto server
    DeleteFilmAdmin = (filmID)=>{
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${filmID}`)
    }
    //Search film onto server
    SearchFilmAdmin = (name)=>{
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}&tenPhim=${name}`)
    }
    //Create showtime film
    AddShowtimeFilmAdmin = (objectFilm)=>{
        return this.post(`api/QuanLyDatVe/TaoLichChieu`,objectFilm)
    }



    //---------------USER NORMAL MANAGE -----------
    GetInfoFilmNormal = (userName)=>{
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}&tuKhoa=${userName}`)
    }
    UpdateUserInfoNormal = (user)=>{
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,user)
    }

    //---------------USER ADMIN MANAGE -----------
    FetchUserAdmin = (keyWord="")=>{
        if(keyWord !== ""){
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}&tuKhoa=${keyWord}`)
        }
        else{
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}`)
        }
    }
    FetchTypeUser = ()=>{
        return this.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung')
    }
    AddUserAtAdminPage = (newUser)=>{
        return this.post('api/QuanLyNguoiDung/ThemNguoiDung',newUser)
    }
    UpdateUserAtAdminPage = (updateUser)=>{
        return this.put('api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',updateUser)
    }
    DeleteUserAtAdminPage = (User)=>{
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${User}`)
    }

}
export const adminService = new AdminService()