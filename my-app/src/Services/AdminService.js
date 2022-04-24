import React, { Component } from 'react'
import { baseService } from './BaseServices';

export class AdminService extends baseService{
    constructor(){
        super()
    }

    //Get list films at admin page
    getListFilmAdmin = ()=>{
        return this.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP15')
    }
    //Add new film at admin page
    addNewFilmAdmin = (object)=>{
        return this.post('/api/QuanLyPhim/ThemPhimUploadHinh',object)
    }
}
export const adminService = new AdminService()