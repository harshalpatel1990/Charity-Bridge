import * as React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, InputAdornment, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



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
      return;
    }
    if (!data.password) {
      setError("Password is required");
      return;
    }
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (Error) {
      console.error(Error);
    }
  };
  const login = () => {
    navigate("/ngo/dashboard");
    signIn();
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

        <Grid container justifyContent="center">
          <div>
            <Grid item xs={12} sm={12} md={12} key={0}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="text"
                name="email"
                onChange={handlechange}
                style={loginstyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} key={1} style={loginstyle}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                onChange={handlechange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Button
              variant="outlined"
              onClick={login}
            >
              Login
            </Button>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
          </div>
        </Grid>
      </Paper>
    </center>
  );
}
export default Ngologin;




