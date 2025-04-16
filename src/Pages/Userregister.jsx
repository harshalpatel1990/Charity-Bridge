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
import { auth, db } from "../config/firebase"; // Import Firestore (db)
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions

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
  const [error, setError] = React.useState("");

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
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
      if (!data.name) {
        setError("Name is required");
        return;
      }
      if (!data.age) {
        setError("Age is required");
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
      if (!data.gender) {
        setError("Gender is required");
        return;
      }

      // Create user in Firebase Authentication
       await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Add user data to Firestore
      const userinfoCollectionRef = collection(db, "userinfo"); // Reference to the 'userinfo' collection
      await addDoc(userinfoCollectionRef, {
        username: data.username,
        email: data.email,
        name: data.name,
        age: data.age,
        city: data.city,
        contact: data.contact,
        gender: data.gender,
        verifyuser: false,
      });

      alert("User registered successfully!");
      navigate("/user/login"); // Redirect to login page
    } catch (error) {
      console.error("Error registering user: ", error);
      setError(error.message);
    }
  };

  return (
    <>
      <center>
        <Paper
          sx={{...styles.paper
          }}
        >
          <h4>User Register</h4>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={4} key={0}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                type="text"
                name="username"
                onChange={handlechange}
                sx={styles.textField}
              />
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={4} key={0}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                onChange={handlechange}
                sx={styles.textField}
              />
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={4} key={0}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                onChange={handlechange}
                sx={styles.textField}
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
                sx={styles.textField}
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
                sx={styles.textField}
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
                sx={styles.textField}
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
                sx={styles.textField}
              />
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={4} key={0}>
              <br />
              <FormControl
                sx={{ ...styles.textField }}
                size="large"
              >
                <InputLabel id="demo-select-small-label">Gender</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={data.gender}
                  label="Gender"
                  onChange={handlechange}
                  name="gender"
                  sx={styles.textField}
                >
                  <MenuItem value={"Male"} sx={styles.textField}>Male</MenuItem>
                  <MenuItem value={"Female"} sx={styles.textField}>Female</MenuItem>
                </Select>
              </FormControl>
              <br />
            </Grid>
          </Grid>
          <br />
          <Button variant="outlined" onClick={handleRegister} sx={styles.button}>
            Submit
          </Button>
          {error && <p style={styles.errorText}>{error}</p>}
          <br />
          <p>
            Already have an account?{" "}
            <a
              onClick={() => navigate("/user/login")}
              style={{
                cursor: "pointer",
                color: "#1a237e",
                textDecoration: "underline",
              }}
            >
              Click here!
            </a>
          </p>
        </Paper>
      </center>
    </>
  );
}

export default Useregister;
