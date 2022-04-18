import React, { useEffect } from 'react'
import { Rate, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoFilmWhenClicked, getListFilm } from '../../redux/action/ManagerAction';
import SimpleSlider from './SlideListFilms';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styleSlick from './SlideListFilm.module.css'
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
// import './SlideListFilm.css'

export default function ListFilm() {
    const { TabPane } = Tabs;

    const callback = (key) => {
        console.log(key);
    }

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getListFilm())
    }, [])

    let { listFilms } = useSelector(state => state.GetListFilmReducer)
    // console.log(listFilms)


    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "red" }}
                onClick={onClick}
            />
        );
    }

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        margin: "100px",
        centerPadding:'60px',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />

    };
    const renderFilms = (item,index)=>{
        return <div className="col-2 mt-3  itemFilmx" key={index}>
        <NavLink to={item.maPhim.toString()} onClick={()=>{
            console.log(item)
            dispatch(getInfoFilmWhenClicked(item.maPhim))
        }} className="card text-white bg-primary">
            <img style={{ height: 350 }} className="card-img-top" src={item.hinhAnh} alt='imga' />
            <div className="card-body">
                <h4 style={{ minHeight: 60 }} className="card-title">{item.tenPhim.length > 20 ? <span>{item.tenPhim.slice(0, 20)}...</span> : <span>{item.tenPhim}</span>}</h4>
                {/* <p className="card-text">Text</p> */}
                <div className="d-flex justify-content-between">
                    <div>
                        <span>{item.danhGia}/10</span>
                    </div>
                    {/* <div className="rating">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half" />
                    </div> */}
                    <Rate allowHalf defaultValue={item.danhGia/2} />
                </div>
            </div>

            {/* <div className="icon">
                2%
            </div> */}
            <button onClick={()=>{
                console.log('maPhim', item)
            }}  className='btn btn-danger w-100'>BOOK TICKET</button>
        </NavLink>
           {/* <NavLink to={item.maPhim}> <button onClick={()=>{
                console.log('maPhim', item)
            }}  className='btn btn-danger w-100'>BOOK TICKET</button>
            </NavLink> */}
           {/* <button onClick={()=>{
                console.log('maPhim', item.maPhim)
                history.push(`/booking`)
            }}  className='btn btn-warning w-100'>BOOK TICKET</button> */}
          
    </div>

    }

  
    return (
        <div className='mb-5'>

            <div className='list-audience'>
                <div>
                    <h2> Burning Tickets</h2>
                    <Slider {...settings}>
                        {listFilms.filter(item => item.dangChieu).map((item, index) => {
                            return <div className="flip-card" key={index}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        {/* <img src="img_avatar.png" alt="Avatar" style={{ width: 300, height: 300 }} /> */}
                                        <div className="  itemFilmxx" key={index}>
                                            <div className="card text-white bg-primary">
                                                <img style={{ height: 350 }} className="card-img-top" src={item.hinhAnh} alt='imga' />
                                                <div className="card-body">
                                                    <h4 style={{ minHeight: 60 }} className="card-title">{item.tenPhim}</h4>
                                                    {/* <p className="card-text">Text</p> */}
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <span>{item.danhGia}/10</span>
                                                        </div>
                                                        <div className="rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-half" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="icon">
                                            2%
                                        </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flip-card-back">

                                        {/* <div style={{backgroundImage:`url("${item.hinhAnh}")`,backgroundPosition:'center',backgroundSize:'100%'}}></div> */}

                                        <img style={{ height: 486,width:'100%' }}  src={item.hinhAnh} alt='imga' />
                                        <div style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}></div>

                                        <div className='text-center' style={{ position: 'absolute', left: 0, bottom: 100,width:'100%' }}>
                                            <h1 className='zIndex:10'>{item.tenPhim}</h1>
                                            <button className='button-play' style={{ backgroundColor: 'unset', border: 'unset' }}> <i style={{ fontSize: 100 }} class="fa fa-play-circle "></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        })}
                    </Slider>
                </div>
            </div>



            <div className="container-Mod">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane className='xxx' tab="Hot Films" size={{size:'large'}} key="1">
                        <div className="row">
                            {listFilms.filter(item => item.hot).map((item, index) => {
                                return renderFilms(item,index)
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="On Showing"  size='large' key="2">
                        <div className="row">
                            {listFilms.filter(item => item.dangChieu).map((item, index) => {
                                return  renderFilms(item,index)
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="Coming Soon" key="3">
                        <div className="row">
                            {listFilms.filter(item => item.sapChieu).map((item, index) => {
                            
                                return renderFilms(item,index)
                            })}
                        </div>
                    </TabPane>
                </Tabs>
               
            </div>

        </div>
    )
}




