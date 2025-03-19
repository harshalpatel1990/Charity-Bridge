//

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, InputAdornment, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

function Ngologin() {
  const [data, setdata] = React.useState({
    username: "",
    password: "",
  });

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  let loginstyle = {
    padding: "7px",
    width: "100%",
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
          background: "",
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
                label="Username"
                variant="outlined"
                type="text"
                name="username"
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
              onClick={() => {
                console.log({ data });
              }}
            >
              Submit
            </Button>
          </div>
        </Grid>
      </Paper>
    </center>
  );
}
export default Ngologin;
