import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  {
    icon: <InventoryIcon sx={{ fontSize: 24 }} />,
    title: 'Inventory Management',
    description: 'Track ingredients in real-time with automated inventory updates and low-stock alerts.',
  },
  {
    icon: <LightbulbIcon sx={{ fontSize: 24 }} />,
    title: 'AI-Powered Insights',
    description: 'Get smart recommendations to reduce waste and optimize your menu based on data.',
  },
  {
    icon: <QrCodeScannerIcon sx={{ fontSize: 24 }} />,
    title: 'Waste Tracking',
    description: 'Monitor and analyze food waste to identify cost-saving opportunities.',
  },
  {
    icon: <ShowChartIcon sx={{ fontSize: 24 }} />,
    title: 'Performance Analytics',
    description: 'Access detailed reports on food costs, waste, and kitchen efficiency.',
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 24 }} />,
    title: 'Team Management',
    description: 'Manage staff roles, permissions, and schedules in one place.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 24 }} />,
    title: 'Compliance Ready',
    description: 'Stay compliant with food safety regulations and maintain audit trails.',
  },
];

const Features: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
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
          Everything you need to run your kitchen efficiently
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            maxWidth: 700,
            mx: 'auto',
            mb: 2,
          }}
        >
          KitchenIQ combines powerful features with an intuitive interface to help you manage your
          kitchen operations with ease.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ px: { xs: 2, sm: 3 }, mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                p: 4,
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
              <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '0.75rem',
                    mb: 3,
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: 'divider',
                    '& svg': {
                      fontSize: 24,
                      color: 'primary.main',
                    },
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ 
                    color: 'text.secondary', 
                    flexGrow: 1,
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
