import React from 'react'
import { useSelector } from 'react-redux'

export default function Footer() {
    let { listCinema } = useSelector(state => state.CinemaListReducer)
    console.log({ listCinema })
    return (
        <div className='footer'>
            <div className='footer-overlay'></div>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-12 text-left">
                                <h4>About us</h4>
                                <ul className='text-left font-color'>
                                    <li style={{fontSize:16, fontWeight:500}}>Cenima Brand</li>
                                    <li style={{fontSize:16, fontWeight:500}}>Recruiments</li>
                                    <li style={{fontSize:16, fontWeight:500}}>Documents</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row justify-content-between">
                            {listCinema?.map((item, index) => {
                                return <div key={index} className="col-4 mt-3">
                                    <img className="img-fluid" style={{ borderRadius: '50%', width: 50 }} src={item.logo} alt='1234' />
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row justify-content-end">
                            <div className="col-6  ">
                                <div className='text-center' > 
                                    <h4>Contact</h4>
                                    <ul className=' font-color'>
                                        <li className=''><i style={{fontSize:40}}  className="fab fa-instagram" /></li>
                                        <li className=''><i style={{fontSize:40}} className="fab fa-facebook" /></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr style={{ border: '1px solid gray' }} />
                
                    <div className="text-center">
                        <h5>&#169; 2022 reserved by HUNG 	 </h5>
                    </div>
                  
            </div>
        </div>
    )
}
