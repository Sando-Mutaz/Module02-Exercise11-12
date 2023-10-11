import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./Pages/login";
import Register from "./Pages/register";
import UserData from "./Pages/UserData";
import Timeline from "./Pages/Timeline";
import {Provider} from 'react-redux'
import {store} from './Redux/Store'
import Auth from './Components/Auth'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <Provider store={store}>
  //   <Auth>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-data" element={<UserData/>} />
          <Route path="/timeline" element={<Timeline/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    // </Auth>
    // </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
