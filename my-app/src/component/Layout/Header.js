import React, { Fragment } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
export default function Header() {
    const { Option } = Select;
    const { t, i18n } = useTranslation()
    const handleChange = (value) => {
        i18n.changeLanguage(value)
        console.log(`selected ${value}`);
    }
    let location = useLocation()
    console.log({ location })

    //Check user login or not from local storage
    let userinfo = JSON.parse(localStorage.getItem("USER_LOGIN_MOVIE"))
    console.log('USER TAI KHOAN', userinfo)

    //Render login button with authorization
    const renderLogin = () => {
        if (_.isEmpty(userinfo)) {
            return <Fragment>
                <NavLink to='signUp'>
                    <button className="btn btn-success mr-3">{t('signup')}</button>
                </NavLink>
                <NavLink to='signIn'>
                    <button className="btn btn-primary mr-3">{t('signin')}</button>
                </NavLink>
            </Fragment>
        }
        else {
            return <Fragment>
                {location.pathname !== '/userInfo' ?
                    <NavLink to='/userInfo'>
                        <button className="btn btn-success mr-3">{`${t('Hello')}! ${userinfo.taiKhoan}`}</button>
                    </NavLink> : ''}
                <NavLink to='SignIn'>
                    <button className="btn btn-warning mr-3" onClick={() => {
                        localStorage.removeItem('ACCESS_TOKEN_MOVIE')
                        localStorage.removeItem('USER_LOGIN_MOVIE')
                    }}>{t('Signout')}</button>
                </NavLink>
            </Fragment>
        }
    }
    return (
        <div className='header'>
            <nav  className="  navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: 'linkImagee3f2fd' }}>
                <NavLink to="/" className="navbar-brand" href="Logo">
                    <img src="./Images/PngItem_33985.png" alt='134' style={{ height: 50 }} />
                </NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="linkImagecollapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center navbar-modified">
                        <li className="nav-item ">
                            <NavLink to="/" className="nav-link" >{t('Home')} </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link" >{t('Contact')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="news" className="nav-link" >{t('News')}</NavLink>
                        </li>

                    </ul>
                </div>
                <div className="d-flex">
                    {renderLogin()}

                    <Select defaultValue="en" style={{ width: 60 }} onChange={handleChange}>
                        <Option value="en">Eng</Option>
                        <Option value="chi">Chi</Option>
                        <Option value="vi">Vi</Option>
                    </Select>
                </div>
            </nav>
        </div>
    )
}
