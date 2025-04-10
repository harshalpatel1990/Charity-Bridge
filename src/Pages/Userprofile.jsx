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
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Userprofile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    age: "",
    city: "",
    contact: "",
    gender: "",
  });
  const [userDocId, setUserDocId] = useState(null); // Store the document ID

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.log("No user is logged in.");
          return;
        }

        const userEmail = currentUser.email; // Get the user's email
        console.log("Current User Email:", userEmail);

        // Query Firestore for the user document with the matching email
        const userQuery = collection(db, "userinfo");
        const data = await getDocs(userQuery);
        const filteredData = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((user) => user.email === userEmail); // Match the email

        if (filteredData.length > 0) {
          setFormData(filteredData[0]); // Set the user's data
          setUserDocId(filteredData[0].id); // Store the document ID
        } else {
          console.log("No user data found for the current user.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserProfile(); // Fetch user profile when logged in
      } else {
        console.log("User is not logged in.");
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const handleSave = async () => {
    if (!userDocId) {
      console.log("No document ID found for the user.");
      return;
    }

    try {
      const userDocRef = doc(db, "userinfo", userDocId); // Reference to the user's document
      await updateDoc(userDocRef, formData); // Update the document with the new data
      console.log("Profile updated successfully!");
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      console.log("Error updating profile:", err);
    }
  };

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
              { label: "Name", name: "name" },
              { label: "Address", name: "city" },
              { label: "Age", name: "age" },
              { label: "Mobile Number", name: "contact" },
              { label: "Gender", name: "gender" },
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
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Userprofile;