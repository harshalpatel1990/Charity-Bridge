import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Fade,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import PeopleIcon from "@mui/icons-material/People";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

function HomePage() {
  const [count, setCount] = useState({ donors: 0, projects: 0, volunteers: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => ({
        donors: prev.donors < 1000 ? prev.donors + 5 : 1000,
        projects: prev.projects < 500 ? prev.projects + 2 : 500,
        volunteers: prev.volunteers < 2000 ? prev.volunteers + 10 : 2000,
      }));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();
  const handleNavigation = (event) => {
    const selectedPath = event.target.value;
    if (selectedPath) {
      navigate(selectedPath); // Navigate to the selected login page
    }
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}

      <Box
        sx={{
          minHeight: "80vh",
          background: "rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Container
            maxWidth="lg"
            sx={{ pt: 20, position: "relative", zIndex: 2 }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#1a237e",
                      fontWeight: 800,
                      fontSize: { xs: "2.5rem", md: "4rem" }, // Reduced font size
                      mb: 2, // Reduced margin
                      fontFamily: "'Playfair Display', cursive",
                    }}
                  >
                    Bridging Hearts,
                    <br />
                    Building Hope
                  </Typography>
                  <Typography
                    variant="h5" // Changed from h5
                    sx={{
                      color: "#1a237e",
                      mb: 4, // Reduced margin
                      lineHeight: 1.8,
                      fontSize: { xs: "0.9rem", md: "1.1rem" }, // Smaller font
                      fontFamily: "'Dancing Script', cursive",
                    }}
                  >
                    Connecting NGOs, Contributors, and Donors to create lasting
                    positive impact in communities.
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    sx={{
                      mt: 4,
                      "& .MuiOutlinedInput-root": {
                        color: "#1a237e",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
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
                        fontFamily: "'Dancing Script', cursive",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#1a237e",
                      },
                      "& .MuiSelect-icon": {
                        color: "#1a237e",
                      },
                    }}
                  >
                    <InputLabel
                      id="login-select-label"
                      sx={{
                        fontFamily: "'Dancing Script', cursive",
                        color: "#1a237e",
                      }}
                    >
                      Get Started
                    </InputLabel>
                    <Select
                      labelId="login-select-label"
                      id="login-select"
                      onChange={handleNavigation}
                      defaultValue=""
                      label="Select Login"
                      sx={{
                        color: "#1a237e",
                        fontFamily: "'Dancing Script', cursive",
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "white",
                            "& .MuiMenuItem-root": {
                              color: "#1a237e",
                              fontFamily: "'Dancing Script', cursive",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: "rgba(26, 35, 126, 0.05)",
                              },
                              "&.Mui-selected": {
                                bgcolor: "rgba(26, 35, 126, 0.1)",
                                color: "#1a237e",
                                "&:hover": {
                                  bgcolor: "rgba(26, 35, 126, 0.15)",
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem 
                        value="/ngo/login" 
                        sx={{ 
                          color: "#1a237e",
                          fontFamily: "'Dancing Script', cursive" 
                        }}
                      >
                        NGO Login
                      </MenuItem>
                      <MenuItem 
                        value="/user/login"
                        sx={{ 
                          color: "#1a237e",
                          fontFamily: "'Dancing Script', cursive" 
                        }}
                      >
                        User Login
                      </MenuItem>
                      <MenuItem 
                        value="/admin/login"
                        sx={{ 
                          color: "#1a237e",
                          fontFamily: "'Dancing Script', cursive" 
                        }}
                      >
                        Admin Login
                      </MenuItem>
                    </Select>
                  </FormControl>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <DotLottieReact
                    src="https://lottie.host/7b57925a-8cca-4c20-83b4-5c03eb054e13/HH6YzHzpq7.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", maxWidth: "500px" }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </Container>

          {/* Animated Background Elements */}
          <Box
            component={motion.div}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
        </motion.div>
      </Box>

      {/* Impact Numbers Section */}
      <Box sx={{ py: 2 }}>
        {" "}
        {/* Reduced padding from 6 to 2 */}
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2} // Reduced spacing from 3 to 2
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 2, // Reduced gap from 3 to 2
              alignItems: "stretch",
              px: 1, // Reduced padding
            }}
          >
            {[
              {
                icon: <PeopleIcon />,
                count: count.donors,
                label: "Active Donors",
                color: "#ff6b6b",
              },
              {
                icon: <SchoolIcon />,
                count: count.projects,
                label: "Active Projects",
                color: "#4a90e2",
              },
              {
                icon: <VolunteerActivismIcon />,
                count: count.volunteers,
                label: "Active Volunteers",
                color: "#50c878",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 3, // Reduced padding
                    pl: 4, // Reduced left padding
                    borderRadius: 2,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)", // Lighter shadow
                    border: `1px solid ${item.color}`, // Thinner border
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fontSize: 40, color: item.color, mb: 1.5 }, // Smaller icon
                  })}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: item.color,
                      mb: 0.5,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      fontFamily: "'Playfair Display', cursive",
                    }}
                  >
                    {item.count.toLocaleString()}+
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "#1a237e",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontFamily: "'Dancing Script', cursive",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6 }}>
        {" "}
        {/* Reduced padding */}
        <Container maxWidth="lg">
          {" "}
          {/* Changed from xl to lg */}
          <Typography
            variant="h3" // Changed from h2
            align="center"
            sx={{
              mb: 5, // Reduced margin
              fontWeight: 700,
              color: "#1a237e",
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              position: "relative",
              fontFamily: "'Playfair Display', cursive",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 50, // Reduced width
                height: 3, // Reduced height
                backgroundColor: "#ff6b6b",
                borderRadius: 1,
              },
            }}
          >
            Our Impact Areas
          </Typography>
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3, // Reduced gap
            }}
          >
            {[
              {
                icon: <SchoolIcon sx={{ fontSize: 50 }} />,
                title: "Education",
                description:
                  "Empowering through quality education and skill development",
                color: "#4a90e2",
              },
              {
                icon: <LocalHospitalIcon sx={{ fontSize: 50 }} />,
                title: "Healthcare",
                description:
                  "Providing accessible healthcare services to communities",
                color: "#50c878",
              },
              {
                icon: <VolunteerActivismIcon sx={{ fontSize: 50 }} />,
                title: "Social Welfare",
                description: "Creating lasting positive change in communities",
                color: "#ff6b6b",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    p: 2.5, // Reduced padding
                    borderRadius: 2,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)", // Lighter shadow
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: 3, // Reduced height
                      backgroundColor: feature.color,
                    },
                  }}
                >
                  {React.cloneElement(feature.icon, {
                    sx: { fontSize: 40, color: feature.color, mb: 2 }, // Smaller icon
                  })}
                  <Typography
                    variant="h5" // Changed from h4
                    sx={{
                      mb: 1.5,
                      fontWeight: 700,
                      color: "#1a237e",
                      fontSize: { xs: "1.1rem", md: "1.3rem" },
                      fontFamily: "'Playfair Display', cursive",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2" // Changed from body1
                    sx={{
                      color: "#666",
                      fontSize: { xs: "0.875rem", md: "0.95rem" },
                      lineHeight: 1.5,
                      fontFamily: "'Dancing Script', cursive",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
