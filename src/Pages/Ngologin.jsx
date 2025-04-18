import * as React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, InputAdornment, IconButton, Grid2 } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions
import { db } from "../config/firebase"; // Import your Firestore instance
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
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
     padding:'5px',
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
      // Check if the email exists in the ngoinfo collection
      const ngoQuery = query(
        collection(db, "ngoinfo"), // Replace "ngoinfo" with your collection name
        where("email", "==", data.email.toLowerCase())
      );
      const ngoSnapshot = await getDocs(ngoQuery);

      if (ngoSnapshot.empty) {
        setError(
          "Email not found in NGO records. Please check your credentials."
        );
        return; // Stop further execution if email is not found
      }

      // Retrieve the ngoId from the query result
      const ngoDoc = ngoSnapshot.docs[0]; // Get the first document
      const ngoId = ngoDoc.id; // The document ID is the ngoId

      // Proceed with sign-in
      await signInWithEmailAndPassword(auth, data.email, data.password);

      // Store the ngoId in localStorage
      localStorage.setItem("ngoid", ngoId);
      localStorage.setItem("accessToken", await auth.currentUser.getIdToken());
      localStorage.setItem("email", data.email.toLowerCase());
      console.log("Access Token:", localStorage.getItem("accessToken"));

      // Navigate to the NGO activities page
      navigate("/ngo/activities");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your email and password."); // Display error on screen
    }
  };
  const handleBackToHome = () => {
      navigate("/");
    };

  return (
    <center>
       <IconButton
                onClick={handleBackToHome}
                sx={{
                  position: "absolute",
                  top: "100px",
                  left: "20px",
                  color: "#1a237e",
                  "&:hover": {
                    backgroundColor: "rgba(93, 173, 226, 0.1)",
                  },
                }}
              >
                <KeyboardBackspaceOutlinedIcon />
              </IconButton>
      <Paper
        sx={{
          padding: 7,
          background: "re",
          borderRadius: 10,
          width: "26%",
          height: "30%",
          marginTop: "6%",
        }}
        elevation={5}
      >
        <h1 style={{ fontFamily: "cursive" }}>NGO Login</h1>
        <br />

        <Grid container justifyContent='center' >
          <div>
            <Grid item xs={12} sm={12} md={12} key={0}>
              <DotLottieReact
                src='https://lottie.host/0dd0333a-ce18-481a-bd7a-5b5acf483129/TADIRP0kgk.lottie'
                loop
                autoplay
              />
           </Grid>

              <Grid item xs={12} sm={12} lg={12} md={12} key={1} style={loginstyle}>
              <TextField

                id='outlined-basic'
                label='Email'
                variant='outlined'
                type='text'
                name='email'
                onChange={handlechange}
                sx={{
                  width: "200px",
                  ...loginstyle,
                  "& .MuiOutlinedInput-root": {
                    color: "#1a237e",
                    "& fieldset": {
                      borderColor: "rgba(26, 35, 126, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1a237e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1a237e",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#1a237e",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#1a237e",
                  },
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: "#1a237e",
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} lg={12} md={12} key={1} style={loginstyle}>
              <TextField
                id='outlined-basic'
                label='Password'
                variant='outlined'
                type='password'
                name='password'
                onChange={handlechange}
                sx={{
                  
                  ...loginstyle,
                  "& .MuiOutlinedInput-root": {
                    color: "#1a237e",
                    "& fieldset": {
                      borderColor: "rgba(26, 35, 126, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1a237e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1a237e",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#1a237e",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#1a237e",
                  },
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: "#1a237e",
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Button 
              variant="contained"
              onClick={login}
              sx={{
                bgcolor: "#1a237e",
                color: "white",
                px: 4,
                py: 1,
                my: 2,
                borderRadius: "25px",
                fontSize: "1.1rem",
                fontFamily: "'Playfair Display', serif",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(26, 35, 126, 0.2)",
                "&:hover": {
                  bgcolor: "#283593",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 15px rgba(26, 35, 126, 0.3)",
                }
              }}
            >
              Login
            </Button>
            {Error && <p style={{ color: "red" }}>{Error}</p>}
            <p>
              Don't have account to register{" "}
              <a
                onClick={() => navigate("/ngo/register")}
                style={{
                  cursor: "pointer",
                  color: "#1a237e",
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
