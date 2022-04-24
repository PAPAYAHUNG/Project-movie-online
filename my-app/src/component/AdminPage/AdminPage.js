import React, { Fragment, useState } from 'react'
import _ from 'lodash'
import UserInfo from '../Layout/BigLayout/UserInfo'
import { NavLink, Outlet } from 'react-router-dom'

export default function AdminPage() {
    //Check user login or not from local storage
    let userinfo = JSON.parse(localStorage.getItem("USER_LOGIN_MOVIE"))
    console.log('USER TAI KHOAN', userinfo)

    let [isShown, setIshown] = useState(false)
    return (
        <div>
            <div className="adminPage">
                <div className="sidebar-admin">
                    <div className>
                        <img src="./Images/PngItem_33985.png" style={{ width: 150 }} alt="AdminImage" />
                        <ul>
                            <NavLink to="user-admin">
                                <li>
                                    <i className="fa fa-user" /> User
                                </li>
                            </NavLink>
                            <NavLink to="films-admin" onClick={() => {
                                setIshown(prevCheck => !prevCheck)
                            }}>
                                <li>
                                    <i className="fa fa-film" /> Films
                                </li>
                            </NavLink>

                            {isShown ? <Fragment>
                                <NavLink to="add-films">
                                    <li className="ml-3"><i className="fa fa-plus" /> Add more</li>
                                </NavLink>
                            </Fragment> : ""}

                            <li><i className="fa fa-tv" /> Show more </li>
                        </ul>
                    </div>
                </div>
                <div className="mainzone-admin ">
                    <div className='cover-admin container-fluid'>
                        <div className='header-admin text-right'>
                            {!_.isEmpty(userinfo) ? <Fragment>
                                <div className='d-flex justify-content-end'>
                                    <div className='bg-dark d-flex justify-content-center align-items-center mx-4'
                                        style={{ width: 50, height: 50, borderRadius: '50%', fontSize: 35, fontWeight: 'bold' }}>
                                        {userinfo.taiKhoan.slice(0, 1)}</div>
                                    <button className='btn btn-danger' onClick={() => {
                                        localStorage.removeItem('ACCESS_TOKEN_MOVIE')
                                        localStorage.removeItem('USER_LOGIN_MOVIE')
                                        window.location.reload()
                                    }}>Log Out</button>
                                </div>
                            </Fragment>

                                : ""}
                        </div>

                    </div>
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}
