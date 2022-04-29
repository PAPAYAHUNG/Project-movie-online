import { Tabs } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LOAD_USER_NORMAL_INFO } from '../../redux/types/type-constant';
import { adminService } from '../../Services/AdminService';

export default function UserInfomation() {
    let userInfo = JSON.parse(localStorage.getItem('USER_LOGIN_MOVIE'))
    console.log({ userInfo })
    const { TabPane } = Tabs;

    let dispatch = useDispatch()

    // Fetch data info from server using redux thunk
    useEffect(() => {
        async function fetchUser() {
            try {
                let { data } = await adminService.GetInfoFilmNormal(userInfo.taiKhoan)
                console.log({ data })
                dispatch({
                    type: LOAD_USER_NORMAL_INFO,
                    data: data.content
                })
            } catch (err) {
                console.log(err.response.data)
            }
        }
        fetchUser()
    }, [])

    // Get data from store to UI
    let { user } = useSelector(state => state.UserManageReducer)
    console.log({ user })
    return (
        <div>
            <h3 className='text-center'>User Information</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>UserName</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user[0]?.hoTen}</td>
                        <td>{user[0]?.soDt}</td>
                        <td>{user[0]?.matKhau}</td>
                        <td>{user[0]?.email}</td>
                        <td>{user[0]?.taiKhoan}</td>
                    </tr>

                </tbody>
            </table>
            <div class="form-group text-right">
                <NavLink to="/userInfo/user-update">
                    <button type='submit' style={{ textDecoration: "underline", color: 'green' }} className='btn '>Update ?</button>
                </NavLink>
            </div>
        </div>
    )
}
