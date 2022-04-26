import Item from 'antd/lib/list/Item'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { BookingTicket, getHistoryUser, getListShownFilms, updateSeatRealTime } from '../../../redux/action/ManagerAction'
import { BOOKING_TICKET, CHANGE_TAB_ACTIVE } from '../../../redux/types/type-constant'
import _ from 'lodash'
import { UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import moment from 'moment'
import { connection } from '../../..'

export default function UItoBookingTicket(props) {
    let dispatch = useDispatch()
    let { infoBooking } = useSelector(state => state.UIbookingReducer)
    console.log(infoBooking)
    const { gioChieu, hinhAnh, maLichChieu, ngayChieu, tenCumRap, tenPhim, tenRap } = infoBooking?.thongTinPhim

    let userinfo = JSON.parse(localStorage.getItem("USER_LOGIN_MOVIE"))
    console.log('USER TAI KHOAN', userinfo)

    console.log("aaaaaaaaaaaa", userinfo.taiKhoan.slice(0, 1))

    let { listSeatSelecting } = useSelector(state => state.UIbookingReducer)
    console.log({ listSeatSelecting })



    const param = useParams()
    console.log('iddddddd', param)

    console.log(maLichChieu)
    let idTranfer = localStorage.getItem('maLichCHieu')

    useEffect(()=>{
        window.scrollTo(0,0)
    })

    useEffect(() => {
        dispatch(getListShownFilms(idTranfer))
        dispatch(getHistoryUser(userinfo.taiKhoan))

        //When 1st coming to the page load all seat of server
        connection.on('loadDanhSachGhe', maLichChieu)
        //Load list seat being book by others from server-Always listen to server if any action from other users
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
            console.log('danhSachGheKhachDat', dsGheKhachDat);


        })

    }, [])
    const { TabPane } = Tabs;

    function callback(key) {
        dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: key
        })
    }

    // Get tab num for transfer tab after handle done
    let { tabNum, listSeatSelectingByOthers } = useSelector(state => state.UIbookingReducer)
    console.log({ tabNum })
    console.log({ listSeatSelectingByOthers })

    // Operation to get extracontent
    const operation = <Fragment>
    </Fragment>

    //After a redirect to home, should reset the tabNum of active key on reducer
    //So use unmount after we navigate to others page then dispatch this action
    useEffect(() => {
        return () => {
            dispatch({
                type: CHANGE_TAB_ACTIVE,
                number: "1"
            })

        }
    }, [])
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
                                    <li className="nav-item text-booking d-flex" >
                                        <NavLink to='/' className='mx-4 d-flex justify-content-center align-items-center' >
                                            <h5>Home</h5>
                                        </NavLink >
                                    </li>
                                    <li className="nav-item text-booking">
                                        <NavLink to='/userInfo'  >
                                            <div className="userinfo ml-auto ">
                                                <div className="d-flex align-items-center ">
                                                    <h5>{userinfo.taiKhoan} </h5>

                                                    <h5 className='mx-3 bg-light d-flex justify-content-center align-items-center' style={{ width: 50, height: 50, borderRadius: "50%" }}>{userinfo.taiKhoan.toString().slice(0, 1)}</h5>
                                                </div>
                                            </div>
                                        </NavLink >
                                    </li>
                                    <li className="nav-item text-booking d-flex" >
                                        <NavLink to='/' className='mx-4 d-flex justify-content-center align-items-center' >
                                            <button onClick={() => {
                                                localStorage.removeItem('ACCESS_TOKEN_MOVIE')
                                                localStorage.removeItem('USER_LOGIN_MOVIE')
                                                window.location.reload()
                                            }} className='btn btn-danger'>Log Out</button>
                                        </NavLink >
                                    </li>


                                </ul>
                            </div>
                        </nav>

                        {/* Tab nav zone */}

                        <Tabs tabBarExtraContent={operation} defaultActiveKey="1" activeKey={tabNum} onChange={callback}>
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

                                                        //Check seat have been selecting by others
                                                        let cssOnselectingSeatByOthers = ''
                                                        let indexOthers = listSeatSelectingByOthers.findIndex(item => item.maGhe === chair.maGhe)
                                                        if (indexOthers !== -1) {
                                                            cssOnselectingSeatByOthers = 'selecting-seat_by_other_big'
                                                        }

                                                        //Render content of seat
                                                        const renderSeatContent = () => {
                                                            if (chair.daDat && cssYourSelection != '') {
                                                                return <UserOutlined />
                                                            }
                                                            if (chair.daDat) {
                                                                return 'X'
                                                            }
                                                            else {
                                                                return chair.tenGhe
                                                            }
                                                        }
                                                        return <Fragment  key={index}>
                                                            <button onClick={() => {
                                                            console.log(chair)
                                                            const action = updateSeatRealTime(chair, maLichChieu, userinfo.taiKhoan)
                                                            dispatch(action)
                                                        }}
                                                            disabled={chair.daDat || cssOnselectingSeatByOthers != ''}
                                                            className={`chair ${cssSelected} 
                                                                                ${cssVip} ${cssOnselectingSeat}
                                                                                ${cssYourSelection} 
                                                                                ${cssOnselectingSeatByOthers}`}>
                                                            {/* {chair.daDat ? cssYourSelection != '' ? <UserOutlined /> : 'X' : chair.tenGhe} */}
                                                            {renderSeatContent()}
                                                        </button>
                                                            {(index + 1) % 16==0 ? <br/> : ''}
                                                        </Fragment>

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
                                                        <h5>Seleteted by others</h5>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="selecting-seat_by_other mx-2 ">X</div>
                                                        <h5>Selecting by others</h5>
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
                            <TabPane tab={<NavLink to="/"><div><i class="fa fa-home"></i></div></NavLink>} key="3">

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

