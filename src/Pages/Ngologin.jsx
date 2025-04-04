import * as React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, InputAdornment, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Ngologin() {
  const navigate = useNavigate();

  const [Error, setError] = React.useState("");

  const [data, setdata] = React.useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  let loginstyle = {
    padding: "7px",
    width: "100%",
  };
  console.log(auth?.currentUser?.email);
  const signIn = async () => {
    try {
      if (!data.email) {
        setError("Email is required");
        return Promise.reject("");
      }
      if (!data.password) {
        setError("Password is required");
        return Promise.reject("");
      }
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (Error) {
      console.error(Error);
      throw Error;
    }
  };
  const login = async () => {
    try {
      await signIn(); // First wait for sign-in
      const idToken = await auth.currentUser.getIdToken(); // Then get the access token
      console.log("Access Token:", idToken);
      localStorage.setItem("accessToken", idToken);
      navigate("/ngo/dashboard"); // Navigate only if login is successful
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your email and password."); // Display error on screen
    }
  };

  return (
    <center>
      <Paper
        sx={{
          padding: 10,
          background: "re",
          borderRadius: 10,
          width: "30%",
          height: "50%",
        }}
        elevation={5}
      >
        <h1 style={{ fontFamily: "cursive" }}>NGO Login</h1>
        <br />

        <Grid container justifyContent='center'>
          <div>
            <Grid item xs={12} sm={12} md={12} key={0}>
              <DotLottieReact
                src='https://lottie.host/0dd0333a-ce18-481a-bd7a-5b5acf483129/TADIRP0kgk.lottie'
                loop
                autoplay
              />
              <TextField
                id='outlined-basic'
                label='Email'
                variant='outlined'
                type='text'
                name='email'
                onChange={handlechange}
                style={loginstyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} key={1} style={loginstyle}>
              <TextField
                id='outlined-basic'
                label='Password'
                variant='outlined'
                type='password'
                name='password'
                onChange={handlechange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Button variant='outlined' onClick={login}>
              Login
            </Button>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <p>
              Don't have account to register{" "}
              <a
                onClick={() => navigate("/ngo/register")}
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                Click here!
              </a>
            </p>
          </div>
        </Grid>
      </Paper>
    </center>
  );
}
export default Ngologin;
