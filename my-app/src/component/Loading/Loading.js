import React from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {
    let { isLoading } = useSelector(state => state.LoadingReducer)
    return (
        isLoading ?
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%',
                height: '100%', backgroundColor: 'rgba(0,0,0,0.7)',
                zIndex: 10
            }}
                className='d-flex justify-content-center align-items-center'
            >
                <div><h1 className='text-white'>Loading...</h1></div>
            </div>
            : ''
    )
}
