import React, { Fragment, useEffect, useState } from 'react'
import { Tabs, Radio, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { getInfoFilmWhenClicked, getListBrandCinema, getListDetailedFilms } from '../../redux/action/ManagerAction';
import { compose } from 'redux';
import moment from 'moment'
import { GET_INFO_CLICKED_FILM } from '../../redux/types/type-constant';
import { NavLink, useNavigate } from 'react-router-dom';
export default function DetailFilmWithBrand() {

    const { TabPane } = Tabs;
    let [state, setState] = useState({
        tabPosition: 'left',
    })

    let navigate = useNavigate()

    let dispatch = useDispatch()

    let { listCinema } = useSelector(state => state.CinemaListReducer)
    // console.log('listCinema', listCinema)
    let { listDetailCinema } = useSelector(state => state.CinemaListReducer)
    // console.log("listDetailCinema", listDetailCinema)
    // console.log("listDetailCinema.", listDetailCinema)

    useEffect(() => {
        dispatch(getListBrandCinema())
        dispatch(getListDetailedFilms())
    }, [])
    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
    };
    const { tabPosition } = state;
    return (
        <div className="container-Mod-1 pt-4">
            <div className='container-Mod-1-overlay'></div>
           <div style={{position:"relative"}}>
                <Tabs tabPosition={tabPosition}>
                    {listCinema?.map((item, index) => {

                        return <TabPane tab={<div className="cinema-brand mt-5">
                            <img className="img-fluid" src={item.logo} alt='1234' style={{ width: 50, height: 50, borderRadius: '50%' }} />
                        </div>} key={index}>

                            <Tabs tabPosition={tabPosition}>
                                {listDetailCinema?.find(itemleft => itemleft.maHeThongRap === item.maHeThongRap)?.lstCumRap?.map((item2, index2) => {

                                    return <TabPane tab={<div className="itemFilm" >
                                        <div className="row">

                                            <div className="col-9">
                                                <div className="row">
                                                    <p>{item2.tenCumRap}</p>
                                                    <p>{item2.diaChi.length>40?`${item2.diaChi.slice(0,40)} ...`:item2.diaChi}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>} key={index2}>
                                        {item2?.danhSachPhim.map((itemRight, index3) => {
                                                
                                            return <Fragment key={index3}>
                                                <div className="row mt-3 item-to-book" onClick={ async()=>{
                                                    console.log( {itemRight})
                                                    console.log( 'maPhim2',itemRight.maPhim)
                                                  try{
                                                   await navigate(`${itemRight.maPhim}`)
                                                   dispatch(getInfoFilmWhenClicked(itemRight.maPhim))
                                                  }catch (err){
                                                      console.log(err)
                                                  }
                                                    
                                                }} >
                                                    <NavLink to={itemRight.maPhim.toString()} className="col-2 ">
                                                        <img src={itemRight.hinhAnh} alt={itemRight.hinhAnh} className='img-fluid logo-2d' onError={(e) => {e.target.onerror = null; e.target.src = 'https://picsum.photos/500'}} />
                                                        {/* <img className="img-fluid logo-2d" src="./Images/2D-512.webp" alt='1234' /> */}
                                                    </NavLink >
                                                    <div className="col-10">
                                                       <NavLink to={itemRight.maPhim.toString()}> <h4 className='text-white'>{itemRight?.tenPhim}</h4> </NavLink>
                                                        <div className="row justify-content-start ">
                                                            {itemRight?.lstLichChieuTheoPhim?.slice(0,6).map((timeShow, index) => {
                                                                return <div key={index} className="timeClock d-flex align-items-center mr-4">
                                                                    {/* <h3 className='text-success'>{ timeShow.ngayChieuGioChieu.slice(-8).slice(0, 5)}</h3> */}
                                                                    <h3 className='text-success'>{moment(timeShow.ngayChieuGioChieu).format('hh:mm A')}</h3>
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr style={{border:'1px solid white'}}/>
                                            </Fragment>
                                        })}
                                    </TabPane>

                                })}

                            </Tabs>
                        </TabPane>
                    })}

                </Tabs>
                </div>
       





        </div>
    )
}


