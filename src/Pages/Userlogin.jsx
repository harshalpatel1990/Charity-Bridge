import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Userlogin() {
  const navigate = useNavigate();
  const [data, setdata] = React.useState({
    username: "",
    password: "",
  });

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {" "}
      <center>
        <Paper
          sx={{
            padding: 10,
            background: "",
            borderRadius: 10,
            width: "50%",
            height: "100%",
            boxShadow: "10px 10px 20px",
            marginTop: "5%",
          }}
        >
          <h4>Login</h4>
          <br />
          <TextField
            id='outlined-basic'
            label='Username'
            variant='outlined'
            type='text'
            name='username'
            onChange={handlechange}
            sx={{
              width: "300px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3f51b5",
                },
              },
            }}
          />
          <br />
          <br />
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            type='text'
            name='password'
            onChange={handlechange}
            sx={{
              width: "300px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3f51b5",
                },
              },
            }}
          />
          <br />
          <br />
          <Button
            sx={{ marginBottom: "20px" }}
            variant='outlined'
            onClick={() => {
              console.log({ data });
            }}
          >
            Submit
          </Button>
          <p>
            Don't have account to register{" "}
            <a
              onClick={() => navigate("/user/register")}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Click here!
            </a>
          </p>
        </Paper>
      </center>
    </div>
  );
}
export default Userlogin;