import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  GetApp as DownloadIcon,
  Share as ShareIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  StackedLineChart as StackedLineChartIcon
} from '@mui/icons-material';

export default function Reports() {
  // This is a placeholder for the reports page
  // In a real implementation, this would include actual reporting features
  
  const reportTypes = [
    {
      id: 1,
      title: "Trip Analytics",
      description: "Comprehensive analysis of trip efficiency, routes, and cargo delivery times",
      icon: <BarChartIcon fontSize="large" />,
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop",
      comingSoon: false
    },
    {
      id: 2,
      title: "Fuel Consumption",
      description: "Detailed reports on fuel usage, efficiency, and cost analysis by truck and route",
      icon: <PieChartIcon fontSize="large" />,
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1000&auto=format&fit=crop",
      comingSoon: false
    },
    {
      id: 3,
      title: "Driver Performance",
      description: "Driver behavior, safety metrics, and performance indicators",
      icon: <TimelineIcon fontSize="large" />,
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
      comingSoon: true
    },
    {
      id: 4,
      title: "Maintenance Records",
      description: "Complete maintenance history, upcoming service needs, and parts inventory",
      icon: <StackedLineChartIcon fontSize="large" />,
      image: "https://images.unsplash.com/photo-1562272558-0e4de89f54e7?q=80&w=1000&auto=format&fit=crop",
      comingSoon: true
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Reports & Analytics
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<PdfIcon />}
        >
          Generate PDF Report
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        Available Report Templates
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportTypes.map((report) => (
          <Grid item xs={12} md={6} key={report.id}>
            <Card sx={{ borderRadius: 3, position: 'relative', boxShadow: 3 }}>
              {report.comingSoon && (
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 20,
                    right: -35,
                    transform: 'rotate(45deg)',
                    bgcolor: 'secondary.main',
                    color: 'white',
                    px: 4,
                    py: 0.5,
                    fontWeight: 'bold',
                    zIndex: 1
                  }}
                >
                  COMING SOON
                </Box>
              )}
              <Box sx={{ display: 'flex', height: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={report.image}
                  alt={report.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ color: 'primary.main', mr: 1 }}>
                        {report.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {report.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {report.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                    <IconButton 
                      size="small" 
                      disabled={report.comingSoon}
                      sx={{ mr: 1 }}
                    >
                      <ShareIcon />
                    </IconButton>
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<DownloadIcon />}
                      disabled={report.comingSoon}
                    >
                      Download
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Recent Reports
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ bgcolor: 'background.paper' }}>
          <Typography variant="body1" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
            No recent reports generated. Create a new report using the templates above.
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Need a custom report? Contact support at support@aceimining.com
        </Typography>
      </Box>
    </Box>
  );
}
