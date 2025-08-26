import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 3, md: 0 } }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <RestaurantIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography
              component="span"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #111827 0%, #4b5563 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              KitchenIQ
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 2, md: 4 }, mb: { xs: 3, md: 0 } }}>
            <Link href="#" color="text.secondary" underline="hover" sx={{ '&:hover': { color: 'primary.main' } }}>
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ '&:hover': { color: 'primary.main' } }}>
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ '&:hover': { color: 'primary.main' } }}>
              Cookie Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ '&:hover': { color: 'primary.main' } }}>
              Contact Us
            </Link>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            © {currentYear} KitchenIQ. All rights reserved.
          </Typography>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          Made with ❤️ for food service professionals
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
