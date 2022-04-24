import axios from "axios"
import { DOMAIN } from "../../util/Settings/config"
import { BOOKING_TICKET, COMPLETE_BOOKING, GET_LIST_CINEMA, GET_LIST_CINEMA_REDUX, GET_LIST_DETAIL_FILMS_REDUX, GET_LIST_FILMS, GET_USER_BOOKING_HISTORY, HIDE_LOADING, PUT_FILM_ITEM_CLICKED, SET_DATA_BANNER, SET_INFO_UI_BOOK_FILMS, SET_USER_INFO, SHOW_LOADING, TURN_TAB_AFTER_BOOKING } from "../types/type-constant"
import { manageFilmnServie } from "../../Services/ManageFilmService"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { history } from "../../App"
import React from 'react'
import { connection } from "../.."

export const getListFilm = (params) => {
    return async (dispatch) => {
        try {
            const { data } = await manageFilmnServie.getbListFilmsService()
            console.log(data)
            dispatch({
                type: GET_LIST_FILMS,
                data: data.content
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getListBrandCinema = (params) => {
    return async (dispatch) => {
        try {
            let { data } = await manageFilmnServie.getCinemaBrand()
            console.log(data)
            dispatch({
                type: GET_LIST_CINEMA_REDUX,
                data: data.content
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const getListDetailedFilms = (params) => {
    return async (dispatch) => {
        try {
            let { data } = await manageFilmnServie.getCinemaDetailFilms()
            console.log("data", data)
            dispatch({
                type: GET_LIST_DETAIL_FILMS_REDUX,
                data: data.content
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const getInfoFilmWhenClicked = (params) => {
    console.log(params)
    return async (dispatch) => {
        try {
            let { data } = await manageFilmnServie.getinFoWhenClicked(params)
            console.log("data xxxx", data)
            dispatch({
                type: PUT_FILM_ITEM_CLICKED,
                data: data.content
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getListShownFilms = (params) => {
    return async (dispatch) => {
        try {
            let { data } = await manageFilmnServie.getListFilmsShown(params)
            console.log("data listfilm", data)
            dispatch({
                type: SET_INFO_UI_BOOK_FILMS,
                data: data.content
            })
        } catch (err) {
            console.log(err)
        }
    }
}
// --------------User management-----------------

export const SignUp = (params) => {
    return async (dispatch) => {
        try {
            let { data } = await manageFilmnServie.userSignUp(params)
            console.log("data User", data)
            // dispatch({
            //     type:SET_INFO_UI_BOOK_FILMS,
            //     data:data.content
            // })
        } catch (err) {
            console.log(err)
        }
    }
}
export function SignIn(params) {
    // let navigate = useNavigate()
    return async (dispatch) => {
        try {
            let { data } = await manageFilmnServie.userSignIn(params)
            console.log("data User Login", data)
            if (data.statusCode === 200) {
                dispatch({
                    type:SET_USER_INFO,
                    data
                })
              

            }
        } catch (err) {
            console.log(err)
        }
    }
}

// --------------Booking ticket management------------
export const BookingTicket = (seatInfo,idTranfer)=>{
    return async (dispatch)=>{
        console.log({idTranfer})
        try{
            dispatch({
                type:SHOW_LOADING
            })
            let {data} = await manageFilmnServie.bookingTicket(seatInfo)
            //if booking success ->reload the page
            if(data.statusCode===200){
                await dispatch(getListShownFilms(idTranfer))
            }
           await dispatch({type:COMPLETE_BOOKING })
           await dispatch({type:HIDE_LOADING })
            dispatch({type:TURN_TAB_AFTER_BOOKING })
        }catch (err){
            dispatch({
                type:HIDE_LOADING
            })
            console.log(err.response.data)
        }

    }
}
export const getHistoryUser = (params)=>{
    return async (dispatch)=>{
        console.log({params})
        try{
            let {data} = await manageFilmnServie.getHistoryUser(params)
            console.log("GetUserHistory",data)
            if(data.statusCode===200){
               dispatch({
                    type:GET_USER_BOOKING_HISTORY,
                    data:data.content
                })
            }
        }catch (err){
            console.log(err.response.data)
        }

    }
}

//Handle web socket realtime
export const updateSeatRealTime = (chair,maLichCHieu,taiKhoan)=>{
    return async (dispatch,getState)=>{
        //Send info of this selecting seat onto reducer
       await dispatch({
        type: BOOKING_TICKET,
        chair,
        maLichCHieu
    }) 
    //Call api to backend
    let listSeatBeingSelectingFromStore = getState().UIbookingReducer.listSeatSelecting
    console.log({listSeatBeingSelectingFromStore})
    console.log({maLichCHieu})
    console.log({taiKhoan})

    //Turn into string
    let listSeatBeingSelectingFromStoreString= JSON.stringify(listSeatBeingSelectingFromStore)
    //Call api of signalR
    //  connection.invoke('datGhe',taiKhoan,listSeatBeingSelectingFromStoreString,maLichCHieu)
    }
}

