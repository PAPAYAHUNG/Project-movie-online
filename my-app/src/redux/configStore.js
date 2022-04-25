import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import BannerReducer from './reducers/BannerReducer'
import GetListFilmReducer from './reducers/GetListFilmReducer'
import CinemaListReducer from './reducers/CinemaListReducer'
import ReducerFilmDetail from './reducers/ReducerFilmDetail'
import UIbookingReducer from './reducers/UIbookingReducer'
import UserLoginReducer from './reducers/UserLoginReducer'
import LoadingReducer from './reducers/LoadingReducer'
import AdminReducer from './reducers/AdminReducer'
const rootReducer = combineReducers({
    //state of app
    BannerReducer,
    GetListFilmReducer,
    CinemaListReducer,
    ReducerFilmDetail,
    UIbookingReducer,
    UserLoginReducer,
    LoadingReducer,
    AdminReducer,
})

const store = createStore(rootReducer,applyMiddleware(thunk))
export default store