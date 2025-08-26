import React from 'react';
import { AppBar, Toolbar, Button, Box, Container, useScrollTrigger, Slide } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface HeaderProps {
  onLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
          py: 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                <RestaurantIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box
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
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                component={RouterLink}
                to="#features"
                sx={{ color: 'text.primary', fontWeight: 500 }}
              >
                Features
              </Button>
              <Button
                variant="outlined"
                onClick={onLogin}
                sx={{
                  mr: 2,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                onClick={onLogin}
                sx={{
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default Header;
