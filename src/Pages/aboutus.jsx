import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Icon,
  Button,
  IconButton,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

function AboutUs() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const ngoHelp = [
    {
      icon: <PeopleIcon fontSize='large' />,
      title: "Volunteer Connection",
      description:
        "Connect with passionate volunteers ready to support your cause and make a difference.",
    },
    {
      icon: <MonetizationOnIcon fontSize='large' />,
      title: "Fundraising Platform",
      description:
        "Receive donations transparently and efficiently through our secure platform.",
    },
    {
      icon: <HandshakeIcon fontSize='large' />,
      title: "Community Building",
      description:
        "Build a strong community of supporters and create lasting relationships.",
    },
  ];

  const userHelp = [
    {
      icon: <VolunteerActivismIcon fontSize='large' />,
      title: "Make an Impact",
      description:
        "Find meaningful volunteer opportunities that match your interests and schedule.",
    },
    {
      icon: <AccountBalanceIcon fontSize='large' />,
      title: "Trusted Donations",
      description:
        "Donate with confidence knowing your contributions reach verified NGOs.",
    },
    {
      icon: <AccessTimeFilledIcon fontSize='large' />,
      title: "Flexible Engagement",
      description:
        "Participate in activities that fit your schedule and availability.",
    },
  ];

  const societyImpact = [
    {
      icon: <PublicIcon fontSize='large' />,
      title: "Sustainable Development",
      description:
        "Contributing to community growth through organized charitable activities and sustainable development initiatives.",
    },
    {
      icon: <EmojiPeopleIcon fontSize='large' />,
      title: "Social Integration",
      description:
        "Bridging gaps between those who want to help and those in need, creating a more connected society.",
    },
    {
      icon: <FavoriteIcon fontSize='large' />,
      title: "Positive Change",
      description:
        "Fostering a culture of giving and volunteering, making social impact accessible to everyone.",
    },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: "#f5f5f5", marginTop: "4%" }}>
      <Container>
        <IconButton
          onClick={handleBackToHome}
          sx={{
            position: "absolute",
            top: "100px",
            left: "20px",
            color: "#1a237e",
            "&:hover": {
              backgroundColor: "rgba(93, 173, 226, 0.1)",
            },
          }}
        >
          <KeyboardBackspaceOutlinedIcon />
        </IconButton>

        <Typography
          variant='h3'
          component='h1'
          align='center'
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#2c3e50",
            mb: 6,
          }}
        >
          About Charity Bridge
        </Typography>

        <Typography
          variant='h5'
          align='center'
          sx={{ mb: 8, color: "#34495e" }}
        >
          Connecting NGOs with compassionate individuals to create positive
          change in our communities.
        </Typography>

        {/* How We Help NGOs Section */}
        <Typography
          variant='h4'
          sx={{
            mb: 4,
            color: "#2c3e50",
            textAlign: "center",
            fontWeight: "medium",
          }}
        >
          How We Help NGOs
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {ngoHelp.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box sx={{ color: "#1a237e", mb: 2 }}>{item.icon}</Box>
                <Typography variant='h6' sx={{ mb: 2, color: "#2c3e50" }}>
                  {item.title}
                </Typography>
                <Typography color='text.secondary'>
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* How We Help Users Section */}
        <Typography
          variant='h4'
          sx={{
            mb: 4,
            color: "#2c3e50",
            textAlign: "center",
            fontWeight: "medium",
          }}
        >
          How We Help Users
        </Typography>
        <Grid container spacing={4}>
          {userHelp.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box sx={{ color: "#1a237e", mb: 2 }}>{item.icon}</Box>
                <Typography variant='h6' sx={{ mb: 2, color: "#2c3e50" }}>
                  {item.title}
                </Typography>
                <Typography color='text.secondary'>
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Our Impact on Society Section */}
        <Typography
          variant='h4'
          sx={{
            mt: 8,
            mb: 4,
            color: "#2c3e50",
            textAlign: "center",
            fontWeight: "medium",
          }}
        >
          Our Impact on Society
        </Typography>
        <Grid container spacing={4}>
          {societyImpact.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.3s",
                  backgroundColor: "#ffffff",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    backgroundColor: "#f8f9fa",
                  },
                }}
              >
                <Box sx={{ color: "#1a237e", mb: 2 }}>{item.icon}</Box>
                <Typography variant='h6' sx={{ mb: 2, color: "#2c3e50" }}>
                  {item.title}
                </Typography>
                <Typography color='text.secondary'>
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutUs;
