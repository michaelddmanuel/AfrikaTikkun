import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface RoleDemoProps {
  onDemoLogin: (role: 'admin' | 'manager' | 'staff') => void;
}

const roles = [
  {
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />,
    title: 'The Administrator',
    description: 'Full control over all locations, finances, user management, and high-level AI insights.',
    buttonText: 'Demo Admin Dashboard',
    role: 'admin' as const,
    color: '#6366f1',
  },
  {
    icon: <ManageAccountsIcon sx={{ fontSize: 32 }} />,
    title: 'The Location Manager',
    description: 'Manage inventory, track waste, and view reports for your specific location.',
    buttonText: 'Demo Manager Dashboard',
    role: 'manager' as const,
    color: '#8b5cf6',
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 32 }} />,
    title: 'The Kitchen Staff',
    description: 'A simple, focused interface for logging daily ingredient usage and spoilage.',
    buttonText: 'Demo Staff Dashboard',
    role: 'staff' as const,
    color: '#a78bfa',
  },
];

const RoleDemo: React.FC<RoleDemoProps> = ({ onDemoLogin }) => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 6, px: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 700,
            mb: 2,
            color: 'text.primary',
            lineHeight: 1.2,
          }}
        >
          Designed for Every Role in Your Kitchen
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: '1.125rem',
            mb: 4,
            maxWidth: 700,
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          Experience how KitchenIQ adapts to different user roles with our interactive demos.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ px: { xs: 2, sm: 3 } }}>
        {roles.map((role, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  borderColor: 'primary.light',
                },
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    borderRadius: '1rem',
                    mb: 3,
                    background: `linear-gradient(135deg, ${role.color}10 0%, ${role.color}20 100%)`,
                    border: '1px solid',
                    borderColor: 'divider',
                    '& svg': {
                      color: role.color,
                      fontSize: 32,
                    },
                  }}
                >
                  {React.cloneElement(role.icon, {
                    sx: {
                      fontSize: 32,
                      color: role.color,
                    },
                  })}
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  {role.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                  {role.description}
                </Typography>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                  onClick={() => onDemoLogin(role.role)}
                  sx={{
                    alignSelf: 'flex-start',
                    borderColor: 'divider',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(99, 102, 241, 0.04)',
                    },
                  }}
                >
                  {role.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoleDemo;
