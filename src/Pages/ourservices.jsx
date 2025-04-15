import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CampaignIcon from '@mui/icons-material/Campaign';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

function OurServices() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const services = [
    {
      icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Donation Management',
      description: 'Secure and transparent platform for processing donations with real-time tracking and automated receipts.',
      color: '#4CAF50'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Volunteer Coordination',
      description: 'Connect NGOs with passionate volunteers, manage schedules, and track volunteer activities efficiently.',
      color: '#2196F3'
    },
    {
      icon: <CampaignIcon sx={{ fontSize: 40 }} />,
      title: 'Campaign Management',
      description: 'Create and manage fundraising campaigns with customizable goals, updates, and progress tracking.',
      color: '#FF9800'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: 'Impact Analytics',
      description: 'Comprehensive reporting and analytics to measure and showcase the impact of charitable activities.',
      color: '#9C27B0'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Platform',
      description: 'Enhanced security measures to protect donor information and ensure safe transactions.',
      color: '#F44336'
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
      title: 'Community Building',
      description: 'Foster connections between donors, volunteers, and NGOs to build lasting relationships.',
      color: '#00BCD4'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5', minHeight: '100vh', marginTop: '3%' }}>
      <Container>
        <IconButton
          onClick={handleBackToHome}
          sx={{
            position: 'absolute',
            top: '100px',
            left: '20px',
            color: '#1a237e',
            '&:hover': {
              backgroundColor: 'rgba(93, 173, 226, 0.1)',
            },
          }}
        >
          <KeyboardBackspaceOutlinedIcon />
        </IconButton>

        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#1a237e',
            mb: 6,
            fontFamily: "'Playfair Display', cursive",
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 4,
              backgroundColor: '#1a237e',
              borderRadius: 2
            }
          }}
        >
          Our Services
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 8,
            color: '#666',
            maxWidth: '800px',
            mx: 'auto',
            fontFamily: "'Dancing Script', cursive",
          }}
        >
          Empowering NGOs and donors with comprehensive tools and services to maximize charitable impact
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'white',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: service.color,
                  }
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    color: service.color,
                    transform: 'scale(1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  {service.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    mb: 2,
                    color: '#1a237e',
                    fontWeight: 'bold',
                    fontFamily: "'Playfair Display', cursive",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    lineHeight: 1.7,
                    fontFamily: "'Dancing Script', cursive",
                  }}
                >
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default OurServices;