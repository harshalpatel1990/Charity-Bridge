import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Paper, Grid } from "@mui/material";
function Useregister() {
   const navigate = useNavigate();
  const [data, setdata] = React.useState({
    username: "",
    email: "",
    password: "",
    name: "",
    age: "",
    city: "",
    contact: "",
    gender: "",
  });

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
    
      <center>
      <Paper sx = {{padding:7, background:"",borderRadius:10,width:"50%" , height:"100%", boxShadow:'10px 10px 20px', marginTop:'2%',}}>
        <h4>Register</h4>
        <br/>
        <Grid container  spacing={1}>
          <Grid item xs={12} sm={12} md={4} key={0}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          onChange={handlechange}
        />
        <br />
        </Grid>
        <Grid item xs={12} sm={12} md={4}  key={0}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          onChange={handlechange}

        />
        <br />
        </Grid>
        <Grid item xs={12} sm={12} md={4} key={0}>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="text"
          name="password"
          onChange={handlechange}
        />
        <br />
        </Grid>
        <Grid item xs={12} sm={12} md={4} key={0}>
        <br />

        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          onChange={handlechange}
        />
        <br />
        </Grid>
        <Grid item xs={12} sm={12} md={4} key={0}>
        <br />
        <TextField
          id="outlined-basic"
          label="Age"
          variant="outlined"
          type="number"
          name="age"
          onChange={handlechange}
        />
        <br />
        </Grid>
        <Grid item xs={12} sm={12} md={4} key={0}>
        <br />
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          type="text"
          name="city"
          onChange={handlechange}
        />
        <br />
        </Grid>
        <Grid item xs={12} sm={12} md={4} key={0}>
        <br />
        <TextField
          id="outlined-basic"
          label="Contact"
          variant="outlined"
          type="number"
          name="contact"
          onChange={handlechange}
        />

        <br />
        </Grid>
        <Grid item xs={12} sm={12} md={4} key={0}>
        <br />
        <FormControl sx={{ minWidth: 221, height:'50%',marginTop:'0%' }} size="large">
          <InputLabel id="demo-select-small-label">Gender</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={data.gender}
            label="Gender"
            onChange={handlechange}
            name="gender"
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>

        <br />
        </Grid>
          </Grid>
          <br/>
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.setItem("user", JSON.stringify(data) );
            console.log({ data });
            navigate("/user/login")
          }}
        >
          Submit
        </Button>
        </Paper>
      </center>
    </>
  );
}

export default Useregister;