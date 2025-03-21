// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { Grid } from "@mui/material";
// import {auth} from "../config/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";

// function Ngoregister() {

//   const[email,setemail] = useState("");
//   const[password,setpassword] = useState("");

//   const signIn = async() =>{
//     await createUserWithEmailAndPassword(auth,email,password)

//   }

//   const [data, setdata] = React.useState({
//     username: "",
//     email: "",
//     password: "",
//     ngoname: "",
//     yearofestablishment: "",
//     city: "",
//     contact: "",
//   });

//   const handlechange = (e) => {
//     setdata({ ...data, [e.target.name]: e.target.value });
//     setemail(e.target.value)
//     setpassword(e.target.value)

//   };

//   let gridstyle = {
//     padding: "7px",
//   };

//   return (
//     <>
//       <center>
//         <h1 style={{ fontFamily: "cursive" }}>NGO Register</h1>
//         <br />
//         <Grid container>
//                   <Grid item xs={12} sm={12} md={4} key={0}>

//         <TextField
//           id="outlined-basic"
//           label="Username"
//           variant="outlined"
//           type="text"
//           name="username"
//           onChange={handlechange}
//           sx={gridstyle}
//           />
//           </Grid>
//         <br />
//         <br />
//         <Grid item xs={12} sm={12} md={4} key={0}>

//         <TextField
//           id="outlined-basic"
//           label="Email"
//           variant="outlined"
//           type="email"
//           name="email"
//           onChange={handlechange}
//           sx={gridstyle}
//           />
//           </Grid>
//         <br />
//         <br />
//         <Grid item xs={12} sm={12} md={4} key={0}>
//         <TextField
//           id="outlined-basic"
//           label="Password"
//           variant="outlined"
//           type="text"
//           name="password"
//           onChange={handlechange}
//           sx={gridstyle}
//         />
//         </Grid>
//         <br />
//         <br />
//         <Grid item xs={12} sm={12} md={4} key={0}>

//         <TextField
//           id="outlined-basic"
//           label="Ngo Name"
//           variant="outlined"
//           type="text"
//           name="ngoname"
//           onChange={handlechange}
//           sx={gridstyle}
//           />
//           </Grid>
//         <br />
//         <br />
//         <Grid item xs={12} sm={12} md={4} key={0}>

//         <TextField
//           id="outlined-basic"
//           label="Year Of Establishment"
//           variant="outlined"
//           type="number"
//           name="yearofestablishment"
//           onChange={handlechange}
//           sx={gridstyle}
//         />
//         </Grid>
//         <br />
//         <br />
//         <Grid item xs={12} sm={12} md={4} key={0}>

//         <TextField
//           id="outlined-basic"
//           label="City"
//           variant="outlined"
//           type="text"
//           name="city"
//           onChange={handlechange}
//           sx={gridstyle}
//           />
//           </Grid>
//         <br />
//         <br />
//         <Grid item xs={12} sm={12} md={4} key={0}>

//         <TextField
//           id="outlined-basic"
//           label="Contact"
//           variant="outlined"
//           type="number"
//           name="contact"
//           onChange={handlechange}
//           sx={gridstyle}
//           />
//           </Grid>
//         </Grid>
//         <br />
//         <br />
//         <Button
//           variant="outlined"
//           onClick={() => {
//             localStorage.setItem("ngo", JSON.stringify(data) );
//             console.log({ data });
//             {signIn}

//           }}
//         >
//           Register
//         </Button>
//       </center>
//       <br />
//     </>
//   );
// }

// export default Ngoregister;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { Grid } from "@mui/material";
// import { auth } from "../config/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";

// function Ngoregister() {
//   const [data, setData] = React.useState({
//     username: "",
//     email: "",
//     password: "",
//     ngoname: "",
//     yearofestablishment: "",
//     city: "",
//     contact: "",
//   });

//   const [error, setError] = React.useState("");

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     try {
//       await createUserWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password,
//         data.username,
//         data.ngoname,
//         data.yearofestablishment,
//         data.city,
//         data.contact
//       );
//       localStorage.setItem("ngo", JSON.stringify(data));
//       console.log({ data });
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   let gridstyle = {
//     padding: "7px",
//   };

//   return (
//     <>
//       <center>
//         <h1 style={{ fontFamily: "cursive" }}>NGO Register</h1>
//         <br />
//         <Grid container>
//           <Grid item xs={12} sm={12} md={4} key={0}>
//             <TextField
//               id="outlined-basic"
//               label="Username"
//               variant="outlined"
//               type="text"
//               name="username"
//               onChange={handleChange}
//               sx={gridstyle}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Grid item xs={12} sm={12} md={4} key={0}>
//             <TextField
//               id="outlined-basic"
//               label="Email"
//               variant="outlined"
//               type="email"
//               name="email"
//               onChange={handleChange}
//               sx={gridstyle}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Grid item xs={12} sm={12} md={4} key={0}>
//             <TextField
//               id="outlined-basic"
//               label="Password"
//               variant="outlined"
//               type="password"
//               name="password"
//               onChange={handleChange}
//               sx={gridstyle}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Grid item xs={12} sm={12} md={4} key={0}>
//             <TextField
//               id="outlined-basic"
//               label="Ngo Name"
//               variant="outlined"
//               type="text"
//               name="ngoname"
//               onChange={handleChange}
//               sx={gridstyle}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Grid item xs={12} sm={12} md={4} key={0}>
//             <TextField
//               id="outlined-basic"
//               label="Year Of Establishment"
//               variant="outlined"
//               type="number"
//               name="yearofestablishment"
//               onChange={handleChange}
//               sx={gridstyle}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Grid item xs={12} sm={12} md={4} key={0}>
//             <TextField
//               id="outlined-basic"
//               label="City"
//               variant="outlined"
//               type="text"
//               name="city"
//               onChange={handleChange}
//               sx={gridstyle}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Grid item xs={12} sm={12} md={4} key={0}>
//             <TextField
//               id="outlined-basic"
//               label="Contact"
//               variant="outlined"
//               type="number"
//               name="contact"
//               onChange={handleChange}
//               sx={gridstyle}
//             />
//           </Grid>
//         </Grid>
//         <br />
//         <br />
//         <Button variant="outlined" onClick={handleRegister}>
//           Register
//         </Button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {/* If error is truthy (i.e., it's not null, undefined, or an empty string),
//         then the paragraph element will be rendered with the error message
//         inside it, and the text will be displayed in red color. If error is
//         falsy (i.e., it's null, undefined, or an empty string), then the
//         paragraph element will not be rendered. */}
//       </center>
//       <br />
//     </>
//   );
// }

// export default Ngoregister;




import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Grid, Paper } from "@mui/material";

function Ngoregister() {
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    ngoname: "",
    yearofestablishment: "",
    city: "",
    contact: "",
  });

  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if (!data.username) {
        setError("Username is required");
        return;
      }
      if (!data.email) {
        setError("Email is required");
        return;
      }
      if (!data.password) {
        setError("Password is required");
        return;
      }
      if (!data.ngoname) {
        setError("NGO Name is required");
        return;
      }
      if (!data.yearofestablishment) {
        setError("Year of Establishment is required");
        return;
      }
      if (!data.city) {
        setError("City is required");
        return;
      }
      if (!data.contact) {
        setError("Contact is required");
        return;
      }

      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
        data.username,
        data.ngoname,
        data.yearofestablishment,
        data.city,
        data.contact
      );
      localStorage.setItem("ngo", JSON.stringify(data));
      console.log({ data });
    } catch (error) {
      setError(error.message);
    }
  };

  let gridstyle = {
    padding: "7px",
  };

  return (
    <>
      <center>
      <Paper sx = {{padding:10, background:"",borderRadius:10,width:"50%" , height:"100%", boxShadow:'10px 10px 20px'}}>
        <h1 style={{ fontFamily: "cursive" }}>NGO Register</h1>
        <br />
        <Grid container>
          <Grid item xs={12} sm={12} md={4} key={0}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              name="username"
              onChange={handleChange}
              sx={gridstyle}
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12} sm={12} md={4} key={0}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              onChange={handleChange}
              sx={gridstyle}
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12} sm={12} md={4} key={0}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={handleChange}
              sx={gridstyle}
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12} sm={12} md={4} key={0}>
            <TextField
              id="outlined-basic"
              label="Ngo Name"
              variant="outlined"
              type="text"
              name="ngoname"
              onChange={handleChange}
              sx={gridstyle}
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12} sm={12} md={4} key={0}>
            <TextField
              id="outlined-basic"
              label="Year Of Establishment"
              variant="outlined"
              type="number"
              name="yearofestablishment"
              onChange={handleChange}
              sx={gridstyle}
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12} sm={12} md={4} key={0}>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              type="text"
              name="city"
              onChange={handleChange}
              sx={gridstyle}
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12} sm={12} md={4} key={0}>
            <TextField
              id="outlined-basic"
              label="Contact"
              variant="outlined"
              type="number"
              name="contact"
              onChange={handleChange}
              sx={gridstyle}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <Button variant="outlined" onClick={handleRegister}>
          Register
        </Button>
        {/* if error occur that its true than the error will display to user in red colour */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        </Paper>
      </center>
      <br />
    </>
  );
}

export default Ngoregister;