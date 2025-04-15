import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again.");
      throw error;
    }
  };
  const login = async () => {
    try {
      await signIn(); // First wait for sign-in
      const idToken = await auth.currentUser.getIdToken(); // Then get the access token
      console.log("Access Token:", idToken);
      localStorage.setItem("accessToken", idToken);
      navigate("/admin/verifyuser"); // Navigate only if login is successful
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials."); // Display error on screen
    }
  };

  return (
    <div>
      <center>
        <Paper
          sx={{
            padding: 7,
            borderRadius: 10,
            width: "33%",
            height: "100%",
            boxShadow: "10px 10px 20px",
            marginTop: "7%",
          }}
        >
          <h3 style={{fontFamily:"cursive",fontSize:"30px"}}>Admin Login</h3>
          <br />
          <DotLottieReact
            src="https://lottie.host/86b763ec-0e97-4fb2-a395-6e1fd9eabdd0/cTLQdtVVA9.lottie"
            loop
            autoplay
          />
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
          <Button variant="outlined" onClick={login}>
            Login
          </Button>
          {Error && <p style={{ color: "red" }}>{Error}</p>}
        </Paper>
      </center>
    </div>
  );
}

export default Adminlogin;
