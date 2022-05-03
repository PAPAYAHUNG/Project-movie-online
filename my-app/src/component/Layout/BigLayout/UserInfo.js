import React, { useEffect } from 'react'
import Header from '../Header'
import { Tabs } from 'antd';
import { BookingUI } from './UItoBookingTicket';
import { adminService } from '../../../Services/AdminService';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_NORMAL_INFO } from '../../../redux/types/type-constant';
import { Outlet, useNavigate } from 'react-router-dom';
import { UpdateNewUserAction } from '../../../redux/action/AdminAction';



export default function UserInfo(props) {
  let userInfo = JSON.parse(localStorage.getItem('USER_LOGIN_MOVIE'))
  console.log({ userInfo })
  const { TabPane } = Tabs;

  const navigate = useNavigate()



  function callback(key) {
    console.log(key);
  }
  return (
    <div className='Info-hello'>
      <div className='Info-hello-overlay'></div>
      <Header />
      <h3 style={{ marginTop: 150, position: 'relative' }} className='display-4 text-center text-white '>Welcome {userInfo.hoTen}!!! </h3>
      <div className='container-fluid'>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="User Info" key="1">
            <Outlet />
          </TabPane>
          <TabPane tab="Booking History" key="2">
            <BookingUI />
          </TabPane>

        </Tabs>
      </div>
    </div>
  )

}

export function UserUpdate(props) {
  let userInfo = JSON.parse(localStorage.getItem('USER_LOGIN_MOVIE'))
  console.log({ userInfo })

  const navigate = useNavigate()
  let dispatch = useDispatch()

  //Get data from store to UI
  let { user } = useSelector(state => state.UserManageReducer)
  console.log({ user })
  //Show info on the screen using useFormik
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: user[0]?.taiKhoan,
      matKhau: user[0]?.matKhau,
      email: user[0]?.email,
      soDt: user[0]?.soDt,
      maNhom: "GP15",
      maLoaiNguoiDung: user[0]?.maLoaiNguoiDung,
      hoTen: user[0]?.hoTen
    },
    onSubmit: async (values) => {
      console.log({ values })
     await navigate(-1)
      dispatch(UpdateNewUserAction(values))
    }
  })
  return <div className='container' style={{ position: 'relative' }}>
    <h3 className='text-white text-center'>User Edit</h3>
    <form onSubmit={formik.handleSubmit} >
      <div className='row'>
        <div class="form-group col-6">
          <label className='text-white' >Email</label>
          <input type="text"
            class="form-control" name="email"
            onChange={formik.handleChange}
            value={formik.values.email} />
        </div>
        <div class="form-group col-6">
          <label className='text-white' >Full name</label>
          <input type="text"
            class="form-control" name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen} />
        </div>
        <div class="form-group col-6">
          <label className='text-white' >Phone</label>
          <input type="number"
            class="form-control" name="soDt"
            onChange={formik.handleChange}
            value={formik.values.soDt} />
        </div>
        <div class="form-group col-6">
          <label className='text-white' >User name</label>
          <input disabled type="text"
            class="form-control" name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan} />
        </div>
        <div class="form-group col-6">
          <label className='text-white' >Password</label>
          <input type="text"
            class="form-control" name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau} />
        </div>

      </div>
      <div className='d-flex justify-content-between'>
        <div >
          <button onClick={() => {
            navigate(-1)
          }} type='button' className='btn text-warning'><i className="fa fa-backward"></i> Back </button>
        </div>
        <div >
          <button type='submit' className='btn btn-success'>Update </button>
        </div>
      </div>

    </form>

  </div>
}

