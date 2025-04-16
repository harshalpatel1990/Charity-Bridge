import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { auth, db } from "../config/firebase"; // Import Firestore (db)
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions
import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  paper: {
    padding: { xs: 4, md: 7 },
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 4,
    marginTop: "6%",
    width: { xs: "70%", sm: "70%", md: "40%" },
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 8px 32px rgba(26, 35, 126, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  title: {
    color: "#1a237e",
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.5rem",
    marginBottom: "2rem",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -10,
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "3px",
      backgroundColor: "#1a237e",
      borderRadius: "2px",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "all 0.3s",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
      "& fieldset": {
        borderColor: "rgba(26, 35, 126, 0.2)",
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
      fontFamily: "'Playfair Display', serif",
    },
    width: { xs: "100%", sm: "80%", md: "100%" },
  },
  button: {
    backgroundColor: "#1a237e",
    color: "white",
    padding: "12px 40px",
    borderRadius: "30px",
    fontSize: "1.1rem",
    fontFamily: "'Playfair Display', serif",
    textTransform: "none",
    boxShadow: "0 4px 12px rgba(26, 35, 126, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#283593",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 15px rgba(26, 35, 126, 0.3)",
    },
  },
  errorText: {
    color: "#f44336",
    marginTop: "1rem",
    fontFamily: "'Playfair Display', serif",
    fontSize: "0.9rem",
  },
  grid: {
    gap: 3,
  },
};

function Ngoregister() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    ngoname: "",
    yearofestablishment: "",
    city: "",
    contact: "",
  });

  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      // Validation checks
      if (!data.username) {
        setError("Username is required");
        return;
      }
      if (!data.email) {
        setError("Email is required");
        return;
      }
      if (!data.password) {
        setError("Password is required");
        return;
      }
      if (!data.ngoname) {
        setError("NGO Name is required");
        return;
      }
      if (!data.yearofestablishment) {
        setError("Year of Establishment is required");
        return;
      }
      if (!data.city) {
        setError("City is required");
        return;
      }
      if (!data.contact) {
        setError("Contact is required");
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Add user data to Firestore
      const ngoinfoCollectionRef = collection(db, "ngoinfo"); // Reference to the 'ngoinfo' collection
      await addDoc(ngoinfoCollectionRef, {
        username: data.username,
        email: data.email,
        ngoname: data.ngoname,
        yearofestablishment: data.yearofestablishment,
        city: data.city,
        contact: data.contact,
        verifyngo: false,
      });

      alert("NGO registered successfully!");
      navigate("/ngo/login"); // Redirect to login page
    } catch (error) {
      console.error("Error registering NGO: ", error);
      setError(error.message);
    }
  };

  let gridstyle = {
    padding: "7px",
  };

  return (
    <>
      <center>
        <Paper sx={styles.paper}>
          <h1 style={styles.title}>NGO Register</h1>
          <br />
          <Grid
            container
            sx={{
              ...styles.grid,
              justifyContent: "center", // Center items horizontally
              alignItems: "center", // Center items vertically
            }}
          >
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                type="text"
                name="username"
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                id="outlined-basic"
                label="Ngo Name"
                variant="outlined"
                type="text"
                name="ngoname"
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                id="outlined-basic"
                label="Year Of Establishment"
                variant="outlined"
                type="number"
                name="yearofestablishment"
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                type="text"
                name="city"
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                id="outlined-basic"
                label="Contact"
                variant="outlined"
                type="number"
                name="contact"
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Button
            variant="outlined"
            onClick={handleRegister}
            sx={styles.button}
          >
            Register
          </Button>
          {/* Display error message */}
          {error && <p style={styles.errorText}>{error}</p>}
          <br />
          <p>Already have Account <a href="/ngo/login" style={{ color: "#1A237e", textDecoration: "underline", cursor: "pointer" }}>
          Click here!</a></p>
          
        </Paper>
      </center>
      <br />
    </>
  );
}

export default Ngoregister;
