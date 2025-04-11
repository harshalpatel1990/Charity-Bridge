import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Adminlogin() {
  const navigate = useNavigate();
  const [Error, setError] = React.useState("");
  const [data, setdata] = React.useState({
    email: "",
    password: "",
  });

  // Replace this with your admin email
  const adminEmail = "harshalpatel26@gmail.com";

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

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

      // Check if the entered email matches the admin email
      if (data.email !== adminEmail) {
        setError("Unauthorized access. Only the admin can log in.");
        return;
      }

      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/admin/dashboard"); // Navigate to the admin dashboard on successful login
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
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
          <h3>Admin Login</h3>
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="text"
            name="email"
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
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
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
          <Button variant="outlined" onClick={signIn}>
            Login
          </Button>
          {Error && <p style={{ color: "red" }}>{Error}</p>}
        </Paper>
      </center>
    </div>
  );
}

export default Adminlogin;
