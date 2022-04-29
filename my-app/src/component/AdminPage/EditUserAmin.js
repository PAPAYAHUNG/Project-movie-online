import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../Services/AdminService'

export default function EditUserAmin() {
    let dispatch = useDispatch()

    let navigate = useNavigate()

    const [state,setState] = useState({
        listType:[]
    })

    //Get user info from localStorage
    let userInfo = JSON.parse(localStorage.getItem('itemUser'))
    console.log({userInfo})

    useEffect(()=>{
        async function FetctType (){
          try{
            let {data} = await adminService.FetchTypeUser()
            console.log({data})
            setState({
                ...state,listType:data.content
            })
          }catch (err){
              console.log(err)
          }
        }
        FetctType()
    },[])

    //Using useFormik to collect info from the form
    let formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userInfo.taiKhoan,
            matKhau: userInfo.matKhau,
            email: userInfo.email,
            soDt: userInfo.soDt,
            maNhom: "GP15",
            maLoaiNguoiDung: "KhachHang",
            hoTen: userInfo.hoTen
        },
        onSubmit:  (values) => {
            console.log({ values })
            
          
            
        }
    })

  return (
    <div>
        <form onSubmit={formik.handleSubmit} className='container'>
        <h3>Add User</h3>
        <div className='row mt-5'>
            <div className="form-group col-6">
                <label >User name</label>
                <input type="text"
                    className="form-control" name="taiKhoan"
                    onChange={formik.handleChange}
                    value={formik.values.taiKhoan} />
            </div>
            <div className="form-group col-6">
                <label >Email</label>
                <input type="text"
                    className="form-control" name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email} />
            </div>
            <div className="form-group col-6">
                <label >Full name</label>
                <input type="text"
                    className="form-control" name="hoTen"
                    onChange={formik.handleChange}
                    value={formik.values.hoTen} />
            </div>
            <div className="form-group col-6">
                <label >Phone</label>
                <input type="number"
                    className="form-control" name="soDt"
                    onChange={formik.handleChange}
                    value={formik.values.soDt} />
            </div>

            <div className="form-group col-6">
                <label >Password</label>
                <input type="text"
                    className="form-control" name="matKhau"
                    onChange={formik.handleChange}
                    value={formik.values.matKhau} />
            </div>
            <div className="form-group col-6">
                <label >User Type</label>
              <select className='form-control'
              name='maLoaiNguoiDung'
              onChange={formik.handleChange}
              value={formik.values.maLoaiNguoiDung}  >
                  {state.listType.map((item,index)=>{
                      return <option value={item.maLoaiNguoiDung} key={index}>{item.tenLoai}</option>
                  })}
                  
              </select>
            </div>

        </div>
        <div className="form-group text-right">
            <button type='submit' className='btn btn-success'>Add User </button>
        </div>
        <div className="form-group ">
            <button type='button' className='btn text-warning'><i className="fa fa-backward"></i> Back </button>
        </div>

    </form>
    </div>
  )
}
