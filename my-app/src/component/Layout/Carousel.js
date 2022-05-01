/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Carousel } from 'antd';
import axios from 'axios'
import { SET_DATA_BANNER } from '../../redux/types/type-constant';
import { getCarouselAction } from '../../redux/action/CarouselAction';
import { getInfoFilmWhenClicked } from '../../redux/action/ManagerAction';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Carousels() {

  let navigate = useNavigate()

  let { content } = useSelector(state => state.BannerReducer)
  let dispatch = useDispatch()
  console.log(content)
  const contentStyle = {
    height: '700px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundPosition:'bottom',
    cursor:'pointer',
  };

  useEffect(() => {
      dispatch(getCarouselAction())
  }, [])

  
  return (
    <div>

      <Carousel autoplay>
        {content.map((item, index) => {
          return <div key={index}>
            <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
            onClick={ async()=>{
              await navigate(`${item.maPhim}`)
               dispatch(getInfoFilmWhenClicked(item.maPhim))
            }}>

              {/* <img src={item.hinhAnh} className="d-block w-100" alt="..." /> */}

            </div>
          </div>
        })}
      </Carousel>

    </div>
  )
}
