import React from 'react'
import { Outlet } from 'react-router-dom'
import Carousel from '../component/Layout/Carousel'
import DetailFilmWithBrand from '../component/Layout/DetailFilmWithBrand'
import Footer from '../component/Layout/Footer'
import Header from '../component/Layout/Header'
import ListFilm from '../component/Layout/ListFilm'
import './movie.css'
export default function Homes() {
    return (
        <div>

            {/* header */}
            <Header />

            <Outlet/>
           


            {/* <!-- Footer --> */}
            <Footer />


        </div>
    )
}
