import React from 'react'
import Carousels from '../Carousel'
import DetailFilmWithBrand from '../DetailFilmWithBrand'
import ListFilm from '../ListFilm'

export default function HomeLayOut() {
    return (
        <div>
            {/* Carousel  */}
            <Carousels />

            {/* <!-- List film --> */}
            <ListFilm />

            {/* <!-- status of cinema brand and detail film--> */}
            <DetailFilmWithBrand />
        </div>
    )
}
