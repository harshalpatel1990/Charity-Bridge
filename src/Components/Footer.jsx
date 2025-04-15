import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a237e',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VolunteerActivismIcon sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif" }}>
                Charity Bridge
              </Typography>
            </Box>
            <Typography sx={{ mb: 2, fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}>
              Bridging hearts and building hope through charitable initiatives.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Playfair Display', serif" }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography sx={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}>
                123 Hope Street, Charity City
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography sx={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}>
                contact@charitybridge.org
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography sx={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}>
                +1 (555) 123-4567
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Playfair Display', serif" }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                color="inherit" 
                sx={{ 
                  '&:hover': { 
                    transform: 'translateY(-3px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{ 
                  '&:hover': { 
                    transform: 'translateY(-3px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{ 
                  '&:hover': { 
                    transform: 'translateY(-3px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{ 
                  '&:hover': { 
                    transform: 'translateY(-3px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography 
            align="center" 
            sx={{ 
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1rem'
            }}
          >
            © {new Date().getFullYear()} Charity Bridge. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;