import Item from 'antd/lib/list/Item'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { BookingTicket, getHistoryUser, getListShownFilms } from '../../../redux/action/ManagerAction'
import { BOOKING_TICKET, CHANGE_TAB_ACTIVE } from '../../../redux/types/type-constant'
import _ from 'lodash'
import { UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import moment from 'moment'

export default function UItoBookingTicket(props) {
    let dispatch = useDispatch()
    let { infoBooking } = useSelector(state => state.UIbookingReducer)
    console.log(infoBooking)
    const { gioChieu, hinhAnh, maLichChieu, ngayChieu, tenCumRap, tenPhim, tenRap } = infoBooking?.thongTinPhim

    let userinfo = JSON.parse(localStorage.getItem("USER_LOGIN_MOVIE"))
    console.log('USER TAI KHOAN', userinfo)



    let { listSeatSelecting } = useSelector(state => state.UIbookingReducer)
    console.log({ listSeatSelecting })



    const param = useParams()
    console.log('iddddddd', param)

    console.log(maLichChieu)
    let idTranfer = localStorage.getItem('maLichCHieu')
    useEffect(() => {
        dispatch(getListShownFilms(idTranfer))
        dispatch(getHistoryUser(userinfo.taiKhoan))

    }, [])
    const { TabPane } = Tabs;

    function callback(key) {
        dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: key
        })
    }

    // Get tab num for transfer tab after handle done
    let { tabNum } = useSelector(state => state.UIbookingReducer)
    console.log({ tabNum })
    return (
        <div>
            <div>
                <div className="bookingUI">
                    <div className="overlay">
                        {/* Navbar */}
                        <nav className="navbar navbar-expand-md navbar-light  ">
                            <a className="navbar-brand" href="#">
                                <img style={{ width: 100, height: 60 }} src="./Images/PngItem_33985.png" alt="111" />
                            </a>
                            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="collapsibleNavId">
                                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 align-item-center">
                                    <li className="nav-item">
                                        <NavLink to='/'  >
                                            HOME
                                        </NavLink >
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <div className="userinfo ml-auto ">
                                                <div className="d-flex align-items-center ">
                                                    <h5>{userinfo.hoTen} <i className="fa fa-arrow-down" /></h5>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </nav>

                        {/* Tab nav zone */}

                        <Tabs defaultActiveKey="1" activeKey={tabNum} onChange={callback}>
                            <TabPane tab="BOOKING" key="1" >
                                {/* seat-choosing */}
                                <div className="timeToChoose pb-5">
                                    <div className="row">
                                        <div className="col-4">
                                            <h4 className="ml-4">
                                                {ngayChieu}-{gioChieu}
                                            </h4>
                                        </div>
                                        <div className="col-4 text-center">
                                            <h4>Choosing time left</h4>
                                            <h1 className="text-warning">02:06</h1>
                                        </div>
                                    </div>
                                    {/* main-zone */}
                                    <div className="row mt-4">
                                        <div className="col-7 text-center">
                                            <div className="monitorx"> </div>
                                            <div className="list-audience">
                                                <div className="row justify-content-between mt-4 listChair">
                                                    {infoBooking?.danhSachGhe?.map((chair, index) => {
                                                        let cssVip = chair.loaiGhe === 'Vip' ? 'vip-seat-big' : ''
                                                        let cssSelected = chair.daDat ? 'selected-seat-big' : ''
                                                        //Check seat is being book
                                                        let indexOnselectingSeat = listSeatSelecting?.findIndex(item => item.maGhe === chair.maGhe)
                                                        let cssOnselectingSeat = ''
                                                        if (indexOnselectingSeat !== -1) {
                                                            console.log('index', listSeatSelecting[indexOnselectingSeat])
                                                            cssOnselectingSeat = 'selecting-seat-big'
                                                        }
                                                        //Check seat have been booked by ourself
                                                        let cssYourSelection = chair.taiKhoanNguoiDat === userinfo.taiKhoan ? 'chosen-by-us' : ''
                                                        return <button key={index} onClick={() => {
                                                            console.log(chair)

                                                            dispatch({
                                                                type: BOOKING_TICKET,
                                                                chair
                                                            })
                                                        }}
                                                            disabled={chair.daDat} className={`chair ${cssSelected} ${cssVip} ${cssOnselectingSeat} ${cssYourSelection}`}>
                                                            {chair.daDat ? cssYourSelection != '' ? <UserOutlined /> : 'X' : chair.tenGhe}

                                                        </button>

                                                    })}
                                                </div>

                                            </div>
                                            <div className="explaination list-audience">
                                                <div className="row justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <div className="normal-seat mx-2" />
                                                        <h5>Normal seat</h5>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="vip-seat mx-2" />
                                                        <h5>Vip seat</h5>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="selecting-seat mx-2" />
                                                        <h5>Selecting seat</h5>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="selected-seat mx-2 text-danger"></div>
                                                        <h5>Your selected seat</h5>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="other-selected-seat mx-2 ">X</div>
                                                        <h5>On seleteted by others</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Bill zone */}
                                        <div className="col-5">
                                            <div className="bill-zone">
                                                <h3 className="p-4 text-center">{tenPhim}</h3>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="p-3">Time on show</td>
                                                            <td className="p-3">{ngayChieu}
                                                                <span className="text-warning font-weight-bold">{gioChieu}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3">Cenima</td>
                                                            <td className="p-3"> {tenCumRap} </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3">Theater Cup</td>
                                                            <td className="p-3">{tenRap}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-3">Seat</td>
                                                            <td className="p-3">
                                                                <div>
                                                                    {_.sortBy(listSeatSelecting, 'stt').map((item, index) => {
                                                                        return <span key={index} style={{ position: 'relative', top: '50%' }} className="text-warning font-weight-bold p-2">{item.tenGhe}</span>
                                                                    })}
                                                                </div>

                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className="p-3">Total</td>
                                                            <td className="p-3"
                                                            >
                                                                <span className="text-warning font-weight-bold">
                                                                    {listSeatSelecting.reduce((total, item) => {
                                                                        total += item.giaVe
                                                                        return total
                                                                    }, 0).toLocaleString()}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button onClick={() => {
                                                    let userinfo = JSON.parse(localStorage.getItem("USER_LOGIN_MOVIE"))
                                                    console.log('USER TAI KHOAN 2', userinfo.taiKhoan)
                                                    let seatInfo = {
                                                        maLichChieu: maLichChieu,
                                                        danhSachVe: listSeatSelecting,
                                                        taiKhoanNguoiDung: userinfo.taiKhoan
                                                    }
                                                    console.log({ seatInfo })
                                                    dispatch(BookingTicket(seatInfo, idTranfer))

                                                }} className="btn btn-danger w-100 p-3">BOOKING TICKET</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="PAYMENT" key="2">
                                <BookingUI {...props} />
                            </TabPane>
                        </Tabs>



                    </div>
                </div>
                {/* footer */}
                <footer>
                    <div className="row pt-5 pb-5">
                        <div className="col-8 text-center ">
                            <div style={{ width: '50%', margin: 'auto' }}>
                                <img src="./Images/PngItem_33985.png" style={{ width: 100 }} alt="111" />
                                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, distinctio!</h5>
                                <p>Contact: (+84) 39 454 777</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col-6">
                                    <h3>Policy</h3>
                                    <ul>
                                        <li>Policy docs</li>
                                        <li>Security</li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <h3>Acount</h3>
                                    <ul>
                                        <li>My account</li>
                                        <li>Execution</li>
                                        <li>Exit</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div></footer>
            </div>
        </div>

    )
}

function BookingUI(props) {
    let dispatch = useDispatch()
    let userinfo = JSON.parse(localStorage.getItem("USER_LOGIN_MOVIE"))

    let { userHistory } = useSelector(state => state.UIbookingReducer)
    console.log({ userHistory })
    useEffect(() => {
        dispatch(getHistoryUser(userinfo.taiKhoan))

    }, [])
    return <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Booking History</h1>
                <h4 className="lg:w-2/3 mx-auto leading-relaxed text-base">Please check your booking status!</h4>

            </div>

        </div>
        <div className='container'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Showing Date</th>
                        <th>Cinema</th>
                        <th>Group</th>
                        <th>Seat</th>
                    </tr>
                </thead>
                <tbody>
                    {userHistory.thongTinDatVe?.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.tenPhim}</td>
                            <td>{moment(item.ngayDat).format('YYYY-MM-DD HH-MM A')}</td>
                            <td>{item.danhSachGhe[0].tenHeThongRap}</td>
                            <td>{item.danhSachGhe[0].tenCumRap}</td>
                            <td>{item.danhSachGhe?.map((item, index) => {
                                return <span key={index} className='p-2'>{item.tenGhe}</span>
                            })}</td>
                        </tr>
                    })}


                </tbody>
            </table>

        </div>
    </section>

}

