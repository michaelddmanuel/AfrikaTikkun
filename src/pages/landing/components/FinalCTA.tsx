import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface FinalCTAProps {
  onGetStarted: () => void;
}

const benefits = [
  '14-day free trial',
  'No credit card required',
  'Cancel anytime',
  '24/7 customer support',
];

const FinalCTA: React.FC<FinalCTAProps> = ({ onGetStarted }) => {
  return (
    <Box sx={{ color: 'white', textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 800,
          lineHeight: 1.2,
          mb: 3,
        }}
      >
        Ready to transform your kitchen management?
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.25rem',
          opacity: 0.9,
          maxWidth: 700,
          mx: 'auto',
          mb: 4,
        }}
      >
        Join thousands of restaurants and food service providers who trust KitchenIQ to streamline their operations and boost profitability.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
        <Button
          variant="contained"
          size="large"
          onClick={onGetStarted}
          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            px: 4,
            py: 1.5,
            fontSize: '1.125rem',
            borderRadius: '0.75rem',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          Get Started Now
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, mt: 4 }}>
        {benefits.map((benefit, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              px: 2,
              py: 1,
              borderRadius: '9999px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {benefit}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FinalCTA;
