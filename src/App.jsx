import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./Components/Navbar";

import Ngoregister from "./Pages/Ngoregister";
import Ngologin from "./Pages/ngologin";
import Ngoactivities from "./Pages/Ngoactivities";
import Ngoactivitydetail from "./Pages/Ngoactivitydetail";
import Ngoprofile from "./Pages/ngoprofile";
// import Ngodashboard from "./Pages/ngodashboard";

import Useractivities from "./Pages/Useractivities";
import Useractivitydetail from "./Pages/Useractivitydetail";
// import Userdashboard from "./Pages/userdashboard";
import Userlogin from "./Pages/userlogin";
import Userreciepts from "./Pages/userreciepts";
import Userrecognition from "./Pages/Userrecognition";
import Userregister from "./Pages/Userregister";
import Userprofile from "./Pages/Userprofile";

import Adminlogin from "./Pages/Adminlogin";
import Verifyngo from "./Pages/Verifyngo";
import Verifyuser from "./Pages/Verifyuser";
import PrivateRoute from "./Privateroutes";
import MainLogin from "./Pages/mainlogin";
import HomePage from "./Pages/HomePage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        
        

        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/mainlogin" Component={MainLogin}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/ngo/activities" Component={Ngoactivities}></Route>
            <Route
              path="/ngo/activitydetail"
              Component={Ngoactivitydetail}
            ></Route>
            <Route path="/ngo/profile" Component={Ngoprofile}></Route>
            {/* <Route path="/ngo/dashboard" Component={Ngodashboard}></Route> */}
            <Route path="/user/activities" Component={Useractivities}></Route>
            <Route path="/user/profile" Component={Userprofile}></Route>

            <Route
              path="/user/activitydetail"
              Component={Useractivitydetail}
            ></Route>
            <Route path="/user/reciepts" Component={Userreciepts}></Route>
            <Route path="/user/recognition" Component={Userrecognition}></Route>
            {/* <Route path="/user/dashboard" Component={Userdashboard}></Route> */}
          </Route>

          <Route path="/ngo/register" Component={Ngoregister}></Route>
          <Route path="/ngo/login" Component={Ngologin}></Route>

          <Route path="/user/login" Component={Userlogin}></Route>
          <Route path="/user/register" Component={Userregister}></Route>

          <Route path="/admin/login" Component={Adminlogin}></Route>
          <Route path="/admin/verifyuser" Component={Verifyuser}></Route>
          <Route path="/admin/verifyngo" Component={Verifyngo}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
