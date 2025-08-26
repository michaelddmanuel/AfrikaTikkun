import React from 'react';
import { Box, Typography, Button, Container, Grid, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 },
      position: 'relative', 
      overflow: 'hidden',
      backgroundColor: 'background.default'
    }}>
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}20 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}>
            {/* Pill badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 2,
                py: 0.5,
                borderRadius: '9999px',
                backgroundColor: 'primary.50',
                color: 'primary.700',
                fontSize: '0.875rem',
                fontWeight: 500,
                mb: 3,
              }}
            >
              <Box component="span" sx={{ mr: 1 }}>✨</Box>
              AI-Powered Kitchen Management
            </Box>

            {/* Main headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 4,
                background: 'linear-gradient(90deg, #0f172a 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&::selection': {
                  WebkitTextFillColor: '#ffffff',
                  background: '#4f46e5',
                },
              }}
            >
              Intelligent Kitchen Management,
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #4f46e5 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                }}
              >
                Simplified
              </Box>
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.25rem',
                color: 'text.secondary',
                maxWidth: 700,
                mx: 'auto',
                mb: 5,
                lineHeight: 1.7,
              }}
            >
              Streamline your kitchen operations, reduce waste, and boost efficiency with our AI-powered management platform.
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={onGetStarted}
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.125rem',
                  borderRadius: '0.75rem',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Get Started for Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayCircleOutlineIcon sx={{ fontSize: 16 }} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.125rem',
                  borderRadius: '0.75rem',
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              >
                Watch Demo
              </Button>
            </Box>

            {/* Trust badges */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'success.main' }}>✓</Box>
                <Typography variant="body2" color="text.secondary">
                  No credit card required
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'success.main' }}>✓</Box>
                <Typography variant="body2" color="text.secondary">
                  14-day free trial
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: 3,
                position: 'relative',
                '&:before': {
                  content: '""',
                  display: 'block',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                },
                '& img': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                },
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="KitchenIQ Dashboard Preview"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
