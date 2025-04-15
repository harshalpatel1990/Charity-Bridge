import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions
import { db } from "../config/firebase"; // Import your Firestore instance
import { signInWithEmailAndPassword } from "firebase/auth";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Userlogin() {
  const navigate = useNavigate();
  const [Error, setError] = React.useState("");
  const [data, setdata] = React.useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  console.log(auth?.currentUser?.email);
  const signIn = async () => {
    if (!data.email) {
      setError("Email is required");
      return Promise.reject(); // Return reject so login() knows something went wrong
    }
    if (!data.password) {
      setError("Password is required");
      return Promise.reject();
    }
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again."); // Set error message
      throw error; // Throw error so login() can catch it
    }
  };

  const login = async () => {
    try {
      const userQuery = query(
        collection(db, "userinfo"),
        where("email", "==", data.email.toLowerCase())
      );
      const userSnapshot = await getDocs(userQuery);
      
      if (userSnapshot.empty) {
        setError(
          "Email not found in user records. Please check your credentials."
        );
        return; // Stop further execution if email is not found
      }
      await signIn(); // First wait for sign-in
      const idToken = await auth.currentUser.getIdToken(); // Then get the access token
      console.log("Access Token:", idToken);
      localStorage.setItem("accessToken", idToken);
      navigate("/user/activities"); // Navigate only if login is successful
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials."); // Display error on screen
    }
  };

  return (
    <div>
      {" "}
      <center>
        <Paper
          sx={{
            padding: 5,
            background: "",
            borderRadius: 10,
            width: "30%",
            height: "100%",
            boxShadow: "10px 10px 20px",
            marginTop: "7%",
          }}
        >
          <h4 style={{fontFamily:"cursive",fontSize:"30px"}}>User Login</h4>
           <DotLottieReact
                          src='https://lottie.host/828acf0a-f662-4c4f-9329-9ba61bdf3dda/2exwJb1XH0.lottie'
                          loop
                          autoplay
                        />
          <br />
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            type='text'
            name='email'
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
            type='password'
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
          <Button variant='outlined' onClick={login}>
            Login
          </Button>
          {Error && <p style={{ color: "red" }}>{Error}</p>}
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
