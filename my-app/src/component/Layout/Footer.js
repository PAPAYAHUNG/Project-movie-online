import React from 'react'
import { useSelector } from 'react-redux'

export default function Footer() {
    let { listCinema } = useSelector(state => state.CinemaListReducer)
    console.log({listCinema})
  return (
    <div className='footer'>
        <div className='footer-overlay'></div>
        <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-12 text-center">
                                <ul>
                                    <li>Blog</li>
                                    <li>Blog</li>
                                </ul>
                            </div>
                          
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row justify-content-between">
                            {listCinema?.map((item,index)=>{
                                return <div key={index} className="col-4 mt-3">
                                <img className="img-fluid" style={{ borderRadius: '50%',width:50 }} src={item.logo} alt='1234' />
                            </div>
                            })}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col-6">
                                <h4>Contact</h4>
                                <ul>
                                    <li><i className="fab fa-instagram" /></li>
                                    <li><i className="fab fa-facebook" /></li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <h4>Info</h4>
                                <ul>
                                    <li><i className="fab fa-instagram" /></li>
                                    <li><i className="fab fa-facebook" /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ border: '1px solid gray' }} />
                <div className="row">
                    <div className="col-2">
                        <img src="./Images/hiking-footwear-shoe.png" className="img-fluid" alt='1234' />
                    </div>
                    <div className="col-6">
                        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, beatae.</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam architecto quibusdam dolorum.</p>
                    </div>
                    <div className="col-4">
                        <img style={{ width: 150 }} src="./Images/boating-boat-symbol-sphere (1).png" className="img-fluid" alt='1234' />
                    </div>
                </div>
            </div>
    </div>
  )
}
