import React from 'react';
import { Box, Container, ThemeProvider, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import landingTheme from './landingTheme';
import {
  Header,
  Hero,
  Features,
  RoleDemo,
  SocialProof,
  FinalCTA,
  Footer
} from './components';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDemoLogin = (role: 'admin' | 'manager' | 'staff') => {
    // Handle authentication and navigate to the dashboard
    login(role);
    navigate('/dashboard');
  };
  
  const handleLogin = () => {
    // Default to staff role when clicking login
    login('staff');
    navigate('/dashboard');
  };
  
  const handleGetStarted = () => {
    // Default to admin role when clicking get started
    login('admin');
    navigate('/dashboard');
  };

  return (
    <ThemeProvider theme={landingTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onLogin={handleLogin} />
        <Box component="main" sx={{ flex: 1 }}>
          <Hero onGetStarted={handleGetStarted} />
          <Box id="features" sx={{ py: 12, bgcolor: 'background.paper' }}>
            <Features />
          </Box>
          <Box sx={{ py: 12, bgcolor: 'background.default' }}>
            <Container>
              <RoleDemo onDemoLogin={handleDemoLogin} />
            </Container>
          </Box>
          <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
            <Container>
              <SocialProof />
            </Container>
          </Box>
          <Box sx={{ py: 16, background: 'linear-gradient(to bottom right, #4f46e5, #7c3aed)' }}>
            <Container>
              <FinalCTA onGetStarted={handleGetStarted} />
            </Container>
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
