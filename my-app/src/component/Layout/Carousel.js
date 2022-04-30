/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Carousel } from 'antd';
import axios from 'axios'
import { SET_DATA_BANNER } from '../../redux/types/type-constant';
import { getCarouselAction } from '../../redux/action/CarouselAction';
export default function Carousels() {

  let { content } = useSelector(state => state.BannerReducer)
  let dispatch = useDispatch()
  console.log(content)
  const contentStyle = {
    height: '700px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%'
  };

  useEffect(() => {
      dispatch(getCarouselAction())
  }, [])

  
  return (
    <div>

      <Carousel autoplay>
        {content.map((item, index) => {
          return <div key={index}>
            <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>

              {/* <img src={item.hinhAnh} className="d-block w-100" alt="..." /> */}

            </div>
          </div>
        })}
      </Carousel>

    </div>
  )
}
