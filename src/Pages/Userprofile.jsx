import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Stack,
  Grid,
} from "@mui/material";

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
  useEffect(() => {
    let x = localStorage.getItem("user");
    setFormData(JSON.parse(x));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              {label:"Gender", name:"gender"}
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
            style={{ backgroundColor: "#1976D2" }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Userprofile;