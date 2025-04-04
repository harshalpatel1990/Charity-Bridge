import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import { auth, db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const NgoProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    ngoname: "",
    yearofestablishment: "",
    city: "",
    contact: "",
  });
  // useEffect(() => {
  //   let x = localStorage.getItem("ngo");
  //   setFormData(JSON.parse(x));
  // }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ngocollectionref = collection(db, "ngoinfo");

  useEffect(() => {
    const getngoprofile = async () => {
      //red the data
      //set the data into fields
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.log("No user is logged in.");
          return;
        }
  
        const userEmail = currentUser.email; // Get the user's email
        console.log("Current User Email:", userEmail);
  
        // Query Firestore for the user document with the matching email
        const userQuery = collection(db, "ngoinfo");
       
          const data = await getDocs(userQuery);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })).filter((user) => user.email === userEmail); // Match the email
          if (filteredData.length > 0) {
            setFormData(filteredData[0]); // Set the user's data
          } else {
            console.log("No user data found for the current user.");
          }
      } catch (err) {
        console.log(err);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getngoprofile(); // Fetch user profile when logged in
      } else {
        console.log("User is not logged in.");
      }
    });
    return () => unsubscribe();
  }, []);
  console.log("FormData", formData);

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        style={{ padding: 20, background: "white", borderRadius: 10 }}
      >
        <Stack spacing={3} alignItems="center">
          <Grid container spacing={2}>
            {[
              { label: "Username", name: "username" },
              { label: "Email ID", name: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Name", name: "ngoname" },
              { label: "Address", name: "city" },
              { label: "Year of Establishment:", name: "yearofestablishment" },
              { label: "Mobile Number", name: "contact" },
            ].map((field) => (
              <Grid item xs={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={!isEditing}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#5DADE2" }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default NgoProfile;
