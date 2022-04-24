import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';
import Homes from './pages/Homes';
import LoginForm from './component/Modal/LoginForm';
import SignInForm from './component/Modal/SignInForm';
import ListFilm from './component/Layout/ListFilm';
import DetailFilmWithBrand from './component/Layout/DetailFilmWithBrand';
import Carousels from './component/Layout/Carousel';
import HomeLayOut from './component/Layout/BigLayout/HomeLayOut';
import DetailOfFilms from './component/Layout/DetailOfFilms';
import UIWhenClicked from './component/Layout/BigLayout/UIWhenClicked';
// import UItoBookingTicket from './component/Layout/BigLayout/UItoBookingTicket';
import { Suspense, lazy } from 'react';
import ProtectedRoutes from './component/Layout/BigLayout/ProtectedRoutes';
import Loading from './component/Loading/Loading';
import UserInfo from './component/Layout/BigLayout/UserInfo';
import AdminPage from './component/AdminPage/AdminPage';
import FilmsAdmin from './component/AdminPage/FilmsAdmin';
import UserAdmin from './component/AdminPage/UserAdmin';
import AddNewFilms from './component/AdminPage/AddNewFilms';
export const history = createBrowserHistory()

const UItoBookingTicketLazy = lazy(() => import('./component/Layout/BigLayout/UItoBookingTicket'))
function App() {
  return (
    <div>
        <Loading/>
      <Suspense fallback={<h1>Loading ...</h1>} >
        <Routes history={history}>
          <Route element={<ProtectedRoutes />}>
            <Route path='/booking:maPhim' element={<UItoBookingTicketLazy />} />
            <Route path='/userInfo' element={<UserInfo />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='admin' element={<AdminPage />} >
                <Route path='films-admin' element={<FilmsAdmin/>}/>
                <Route path='user-admin' element={<UserAdmin/>}/>
                <Route path='add-films' element={<AddNewFilms/>}/>
                {/* <Route index element={<UserAdmin/>}/> */}
            </Route>
          </Route>
          <Route path='/' element={<Homes />}>
            <Route path='/' element={<HomeLayOut />} />
            <Route path=':detailID' element={<UIWhenClicked />} />
          </Route>
          <Route path='signUp' element={<LoginForm />} />
          <Route path='signIn' element={<SignInForm />} />
          <Route path='signUp/signIn' element={<SignInForm />} />
          <Route path='signIn/signUp' element={<LoginForm />} />

        </Routes>
      </Suspense>
    </div>

  );
}

export default App;
{/* <Router history={history}>
aloooo
</Router> */}

{/* <Router >
<Routes>
  <Route path='/' element={<Homes/>}/>
</Routes>
</Router> */}