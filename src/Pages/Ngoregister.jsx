import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

function Ngoregister() {
  const [data, setdata] = React.useState({
    username: "",
    email: "",
    password: "",
    ngoname: "",
    yearofestablishment: "",
    city: "",
    contact: "",
  });

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  let gridstyle = {
    padding: "7px",
  };

  return (
    <>
      <center>
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
          onChange={handlechange}
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
          onChange={handlechange}
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
          type="text"
          name="password"
          onChange={handlechange}
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
          onChange={handlechange}
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
          onChange={handlechange}
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
          onChange={handlechange}
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
          onChange={handlechange}
          sx={gridstyle}
          />
          </Grid>
        </Grid>
        <br />
        <br />
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.setItem("ngo", JSON.stringify(data) );
            console.log({ data });

          }}
        >
          Submit
        </Button>
      </center>
      <br />
    </>
  );
}

export default Ngoregister;
