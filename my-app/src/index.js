import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './redux/configStore'
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import * as signalR from'@microsoft/signalr'
import { DOMAIN } from './util/Settings/config';
import './i18n'

//Code to connect to server to listen to the change on each client
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}>
        </Route>
      </Routes>
    </BrowserRouter>

  </Provider>

);

reportWebVitals();

