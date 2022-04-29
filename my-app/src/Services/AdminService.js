import React, { Component } from 'react'
import { baseService } from './BaseServices';

export class AdminService extends baseService{
    constructor(){
        super()
    }

    //Get list films at admin page
    getListFilmAdmin = (keyWord="")=>{
        if(keyWord.trim() !== ""){
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=GP15&tenPhim=${keyWord}`)
        }
        return this.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP15')
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
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=GP15&tenPhim=${name}`)
    }
    //Create showtime film
    AddShowtimeFilmAdmin = (objectFilm)=>{
        return this.post(`api/QuanLyDatVe/TaoLichChieu`,objectFilm)
    }



    //---------------USER NORMAL MANAGE -----------
    GetInfoFilmNormal = (userName)=>{
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP15&tuKhoa=${userName}`)
    }
    UpdateUserInfoNormal = (user)=>{
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,user)
    }

    //---------------USER ADMIN MANAGE -----------
    FetchUserAdmin = (keyWord="")=>{
        if(keyWord !== ""){
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP15&tuKhoa=${keyWord}`)
        }
        else{
            return  this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP15`)
        }
    }

}
export const adminService = new AdminService()