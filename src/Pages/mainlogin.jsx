import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MainLogin() {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleNavigation = (event) => {
    const selectedPath = event.target.value;
    if (selectedPath) {
      navigate(selectedPath); // Navigate to the selected login page
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "78vh",
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        backgroundColor: "#ffffff", // White background
        overflow: "hidden", // Prevent scrolling
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#5dade2" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Charity Bridge
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          marginTop: "64px", // Adjust for AppBar height
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#5dade2", fontFamily: "cursive", mb: 3 }}
        >
          Welcome to Charity Bridge
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
          <InputLabel id="login-select-label">Select Login</InputLabel>
          <Select
            labelId="login-select-label"
            id="login-select"
            onChange={handleNavigation}
            defaultValue=""
            label="Select Login"
            sx={{
              width: "100%",
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            <MenuItem value="/ngo/login">NGO Login</MenuItem>
            <MenuItem value="/user/login">User Login</MenuItem>
            <MenuItem value="/admin/login">Admin Login</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
}

export default MainLogin;
