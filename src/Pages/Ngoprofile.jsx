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
  const [ngoDocId, setNgoDocId] = useState(null); // Store the document ID

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getNgoProfile = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.log("No user is logged in.");
          return;
        }

        const userEmail = currentUser.email; // Get the user's email
        console.log("Current User Email:", userEmail);

        // Query Firestore for the NGO document with the matching email
        const ngoQuery = collection(db, "ngoinfo");
        const data = await getDocs(ngoQuery);
        const filteredData = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((ngo) => ngo.email === userEmail); // Match the email

        if (filteredData.length > 0) {
          setFormData(filteredData[0]); // Set the NGO's data
          setNgoDocId(filteredData[0].id); // Store the document ID
        } else {
          console.log("No NGO data found for the current user.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getNgoProfile(); // Fetch NGO profile when logged in
      } else {
        console.log("User is not logged in.");
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const handleSave = async () => {
    if (!ngoDocId) {
      console.log("No document ID found for the NGO.");
      return;
    }

    try {
      const ngoDocRef = doc(db, "ngoinfo", ngoDocId); // Reference to the NGO's document
      await updateDoc(ngoDocRef, formData); // Update the document with the new data
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
              { label: "Name", name: "ngoname" },
              { label: "Address", name: "city" },
              { label: "Year of Establishment", name: "yearofestablishment" },
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
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default NgoProfile;
