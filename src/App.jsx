import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./Components/navbar";
import Ngoregister from "./Pages/ngoregister";
import Ngologin from "./Pages/ngologin";
import Ngoactivities from "./Pages/Ngoactivities";
import Ngoactivitydetail from "./Pages/ngoactivitydetail";
import Ngoprofile from "./Pages/ngoprofile";
import Ngodashboard from "./Pages/ngodashboard";

import Useractivities from "./Pages/Useractivities";
import Useractivitydetail from "./Pages/Useractivitydetail";
import Userdashboard from "./Pages/userdashboard";
import Userlogin from "./Pages/userlogin";
import Userreciepts from "./Pages/userreciepts";
import Userrecognition from "./Pages/userrecognition";
import Userregister from "./Pages/userregister";
import Userprofile from "./Pages/Userprofile";
import Adminlogin from "./Pages/Adminlogin"


import Verifyngo from "./Pages/verifyngo";
import Verifyuser from "./Pages/verifyuser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <br />
        <br />
        <br />
        <br />
        <Routes>
          <Route path="/ngo/register" Component={Ngoregister}></Route>
          <Route path="/ngo/login" Component={Ngologin}></Route>
          <Route path="/ngo/activities" Component={Ngoactivities}></Route>
          <Route
            path="/ngo/activitydetail"
            Component={Ngoactivitydetail}
          ></Route>
          <Route path="/ngo/profile" Component={Ngoprofile}></Route>
          <Route path="/ngo/dasboard" Component={Ngodashboard}></Route>

          <Route path="/user/login" Component={Userlogin}></Route>
          <Route path="/user/register" Component={Userregister}></Route>
          <Route path="/user/activities" Component={Useractivities}></Route>
          <Route path="/user/profile" Component={Userprofile}></Route>

          <Route
            path="/user/activitydetail"
            Component={Useractivitydetail}
          ></Route>
          <Route path="/user/reciepts" Component={Userreciepts}></Route>
          <Route path="/user/recognition" Component={Userrecognition}></Route>
          <Route path="/user/dasboard" Component={Userdashboard}></Route>

          <Route path="/admin/login" Component={Adminlogin}></Route>
          <Route path="/admin/verifyuser" Component={Verifyuser}></Route>
          <Route path="/admin/verifyngo" Component={Verifyngo}></Route>
         
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
