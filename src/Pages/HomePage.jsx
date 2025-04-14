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
  let navigate = useNavigate();
  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
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
                      color: "white",
                      fontWeight: 800,
                      fontSize: { xs: "2.5rem", md: "4rem" },
                      mb: 3,
                    }}
                  >
                    Bridging Hearts,
                    <br />
                    Building Hope
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      mb: 4,
                      lineHeight: 1.8,
                    }}
                  >
                    Connecting NGOs, Contributors, and Donors to create lasting
                    positive impact in communities.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#ff6b6b",
                      "&:hover": { backgroundColor: "#ff5252" },
                      borderRadius: "30px",
                      px: 4,
                      py: 2,
                    }}
                    onClick={() => {
                      navigate("/mainlogin");
                    }}
                  >
                    Get Started
                  </Button>
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
                    src="https://lottie.host/ff98a1bd-8141-4a9e-995c-19849464fcca/duUg8losH6.lottie"
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
      <Box sx={{ py: 10, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 4, md: 8 } }}>
          {" "}
          {/* Added horizontal padding */}
          <Grid
            container
            spacing={4}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
              alignItems: "stretch",
              px: 2, // Added padding to grid
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
                    p: 6, // Increased padding
                    pl: 8, // Added extra left padding
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    border: `2px solid ${item.color}`,
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fontSize: 80, color: item.color, mb: 3 },
                  })}
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: item.color,
                      mb: 2,
                    }}
                  >
                    {item.count.toLocaleString()}+
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "#1a237e",
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
      <Box sx={{ py: 10, backgroundColor: "#ffffff" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 8,
              fontWeight: 800,
              color: "#1a237e",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -16,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 4,
                backgroundColor: "#ff6b6b",
                borderRadius: 2,
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
              gap: 4,
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
                    p: 4,
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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
                      height: 4,
                      backgroundColor: feature.color,
                    },
                  }}
                >
                  {React.cloneElement(feature.icon, {
                    sx: { fontSize: 60, color: feature.color, mb: 3 },
                  })}
                  <Typography
                    variant="h4"
                    sx={{ mb: 2, fontWeight: 700, color: "#1a237e" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", fontSize: "1.1rem" }}
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
