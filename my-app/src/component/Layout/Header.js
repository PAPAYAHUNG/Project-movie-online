import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import NabarMock from '../../pages/NabarMock';

export default function Header() {
    const { Option } = Select;
    const { t, i18n } = useTranslation()
    const handleChange = (value) => {
        i18n.changeLanguage(value)
        console.log(`selected ${value}`);
    }
    let location = useLocation()
    console.log({ location })

    //Add state to manage Width of class button group Responsive
    const [isClicked, setIsCLicked] = useState(false)
    let cssWidth = isClicked ? "width-100" : ""

    //Add state to manage blur header background
    const [scroll,setScroll] = useState(false)
    const displayBgHeader = ()=>{
        console.log(window.pageYOffset)
        if(window.scrollY>100){
            setScroll(true)
        }
        else{
            setScroll(false)
        }
    }
    useEffect(()=>{
        window.addEventListener('scroll',displayBgHeader)
        return ()=>{
            window.removeEventListener('scroll',displayBgHeader)
        }
    },[])

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
                <NavLink to='/SignIn' state={{from:location}} replace>
                    <button className="btn btn-warning mr-3" onClick={() => {
                        localStorage.removeItem('ACCESS_TOKEN_MOVIE')
                        localStorage.removeItem('USER_LOGIN_MOVIE')
                    }}>{t('Signout')}</button>
                </NavLink>
            </Fragment>
        }
    }
    return (
        <div className={`header ${scroll && "header-bg-reset"}`}>
            <nav className="  navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'linkImagee3f2fd' }}>
                <NavLink to="/" className="navbar-brand" href="Logo">
                    <img src="./Images/PngItem_33985.png" alt='134' style={{ height: 50 }} />
                </NavLink>
                <button
                    style={{ marginRight: "auto" }}
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => {
                        setIsCLicked(prev => !prev)
                    }}><i class="fa fa-list"></i></button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-start navbar-modified">
                        <li className="nav-item" >
                            <NavLink to="/" className="nav-link d-block" >{t('Home')} </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link d-block" >{t('Contact')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/news" className="nav-link d-block" >{t('News')}</NavLink>
                        </li>
                        <li className="nav-item d-block d-lg-none">
                            <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                                <Option value="en">Eng</Option>
                                <Option value="chi">Chi</Option>
                                <Option value="vi">Vi</Option>
                            </Select>
                        </li>

                    </ul>
                </div>
                <div className={`d-flex justify-content-end ${cssWidth}`}>
                    {renderLogin()}

                    <Select className='d-none d-lg-block' defaultValue="en" style={{ width: 80 }} onChange={handleChange}>
                        <Option value="en">Eng</Option>
                        <Option value="chi">Chi</Option>
                        <Option value="vi">Vi</Option>
                    </Select>
                </div>
            </nav>


        </div>
    )
}
