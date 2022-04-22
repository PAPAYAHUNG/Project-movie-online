import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Tabs, Radio, Space } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import { getListShownFilms } from '../../redux/action/ManagerAction';

export default function DetailOfFilms() {
    const { TabPane } = Tabs;
    let { contentFilm } = useSelector(state => state.ReducerFilmDetail)
    console.log("contentFilm", contentFilm.hinhAnh)
    console.log("contentFilm", contentFilm)
    console.log("hethongRapChieu", contentFilm.heThongRapChieu)

    const [state, setState] = useState({ tabPosition: 'left' })

    useEffect(()=>{
        window.scrollTo(0,0)
    })

    const changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };

    const { tabPosition } = state

    let dispatch = useDispatch()
    let param = useParams()


    return (
        <div>
            <div className='film-detail'>
                <div>
                    <div className="d-flex">
                        <h3 style={{ borderRight: '1px solid gray' }} className=" p-3 text-center font-weight-bold">Home</h3>
                        <h3 className="p-3 text-center font-weight-bold">{contentFilm.tenPhim}</h3>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <img style={{ border: '3px solid gray' }} src={contentFilm.hinhAnh} className="img-fluid" alt="13214" onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/2000' }} />
                        </div>
                        <div className="col-8">
                            <h3>{contentFilm.tenPhim}</h3>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Showing date</td>
                                        <td>{moment(contentFilm.ngayKhoiChieu).format('dd:hh:mm A')}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{contentFilm.moTa}</td>
                                    </tr>
                                    <tr>
                                        <td>Actor</td>
                                        <td>{contentFilm.danhGia}</td>
                                    </tr>


                                </tbody>
                            </table>
                            <div className='mt-5'>
                                <button className="btn btn-success ">WATCH TRAILER</button>
                                <button className="btn btn-success ml-4">TICKET NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <Tabs tabPosition={tabPosition}>
                    {contentFilm.heThongRapChieu?.map((item, index) => {
                        console.log('rapchieu', item)
                        return <TabPane tab={<div className='d-flex align-items-center'>
                            <div className="cinema-brand ">
                                <img className="img-fluid mr-3" src={item.logo} alt='1234' style={{ width: 50, height: 50, borderRadius: '50%' }} />
                            </div>
                            <h4 style={{ margin: 0, padding: 0 }}>{item.tenHeThongRap}</h4>
                        </div>} key={index}>

                            {item.cumRapChieu?.map((itemRight, index3) => {

                                return <Fragment key={index3}>
                                    <div className="row mt-3" onClick={() => {

                                        console.log(itemRight)

                                    }} >
                                        <div className="col-3 ">
                                            <img src={itemRight.hinhAnh} alt={itemRight.hinhAnh} className='img-fluid logo-2d' onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/500' }} />
                                            {/* <img className="img-fluid logo-2d" src="./Images/2D-512.webp" alt='1234' /> */}
                                        </div >
                                        <div className="col-9">
                                            <div >
                                                <h5>{itemRight.tenCumRap}</h5>
                                                <p>{itemRight.diaChi}</p>
                                            </div>
                                           
                                            <div className="row justify-content-start">
                                                {itemRight.lichChieuPhim?.slice(0, 6).map((timeShow, index) => {
                                                    return <div key={index} className="timeClock d-flex align-items-center mr-4">
                                                        {/* <h3 className='text-success'>{ timeShow.ngayChieuGioChieu.slice(-8).slice(0, 5)}</h3> */}
                                                       <NavLink to={`/booking${timeShow.maLichChieu}`} replace onClick={()=>{
                                                           console.log("timeShow",timeShow)
                                                           console.log({param})
                                                           localStorage.setItem('maLichCHieu',timeShow.maLichChieu)
                                                        //    dispatch(getListShownFilms(timeShow.maLichChieu))
                                                       }}> 
                                                           <h3 className='text-success'>{moment(timeShow.ngayChieuGioChieu).format('hh:mm A')}</h3>
                                                       </NavLink>
                                                    </div> 
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                    <hr style={{ border: '1px solid gray' }} />
                                </Fragment>
                            })}

                        </TabPane>
                    })}
                </Tabs>
            </div>
        </div>
    )
}
