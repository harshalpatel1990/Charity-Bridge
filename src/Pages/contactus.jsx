import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    description: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let tempError = {};
    let isValid = true;

    if (!formData.name) {
      tempError.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      tempError.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempError.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.contact) {
      tempError.contact = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      tempError.contact = "Contact number should be 10 digits";
      isValid = false;
    }

    if (!formData.description) {
      tempError.description = "Description is required";
      isValid = false;
    }

    setError(tempError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Create timestamp
        const timestamp = new Date();

        // Add document to 'contacts' collection
        await addDoc(collection(db, "contacts"), {
          ...formData,
          timestamp: timestamp,
          status: "pending", // You can use this to track if the inquiry has been addressed
        });

        console.log("Form submitted:", formData);
        setOpenSnackbar(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          contact: "",
          description: "",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        // Show error snackbar
        setError({ submit: "Failed to submit form. Please try again." });
      }
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: "#5DADE2" }} />,
      title: "Email",
      detail: "support@charitybridge.com",
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: "#5DADE2" }} />,
      title: "Phone",
      detail: "+1 234 567 890",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: "#5DADE2" }} />,
      title: "Address",
      detail: "Charity Bridge, Mumbai, India",
    },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: "#f5f5f5", minHeight: "100%", marginTop: "3%" }}>
      <Container>
        <Typography
          variant='h3'
          component='h1'
          align='center'
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#2c3e50",
            mb: 6,
            fontFamily: "cursive",
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography variant='h5' sx={{ mb: 3, color: "#2c3e50", fontFamily: "cursive" }}>
                Get in Touch
              </Typography>
              {contactInfo.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    bgcolor: "white",
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  {info.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant='subtitle1' sx={{ fontWeight: "bold", fontFamily: "cursive" }}>
                      {info.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {info.detail}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper
              component='form'
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                boxShadow: 3,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    error={Boolean(error.name)}
                    helperText={error.name}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(error.email)}
                    helperText={error.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Contact Number'
                    name='contact'
                    value={formData.contact}
                    onChange={handleChange}
                    error={Boolean(error.contact)}
                    helperText={error.contact}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Description'
                    name='description'
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    error={Boolean(error.description)}
                    helperText={error.description}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    disabled={isSubmitting}
                    sx={{
                      bgcolor: "#5DADE2",
                      "&:hover": {
                        bgcolor: "#2E86C1",
                      },
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage || "Message sent successfully!"}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default ContactUs;
