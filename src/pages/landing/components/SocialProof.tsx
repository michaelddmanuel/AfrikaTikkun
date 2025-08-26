import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';

const logos = [
  'https://via.placeholder.com/120x40/000000/ffffff?text=Gourmet+Inc',
  'https://via.placeholder.com/120x40/000000/ffffff?text=Culinary+Delights',
  'https://via.placeholder.com/120x40/000000/ffffff?text=Chef+Express',
  'https://via.placeholder.com/120x40/000000/ffffff?text=Gastronomix',
  'https://via.placeholder.com/120x40/000000/ffffff?text=Foodie+Corp',
];

const SocialProof: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.5rem', sm: '1.875rem' },
          fontWeight: 600,
          textAlign: 'center',
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          mb: 4,
        }}
      >
        Trusted by the Best in the Business
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 4, md: 8 },
          mt: 4,
          '& img': {
            height: 32,
            width: 'auto',
            opacity: 0.6,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
            [theme.breakpoints.down('sm')]: {
              height: 24,
            },
          },
        }}
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Partner logo ${index + 1}`}
            loading="lazy"
          />
        ))}
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.875rem' },
            fontWeight: 700,
            mb: 2,
            color: 'text.primary',
          }}
        >
          Join 1,000+ restaurants and food service providers
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          See why leading restaurants and food service providers trust KitchenIQ to streamline their operations and boost profitability.
        </Typography>
      </Box>
    </Box>
  );
};

export default SocialProof;
