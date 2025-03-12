import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grid,
  Card,
  CardContent,
  Tab,
  Tabs,
  Avatar,
  IconButton,
  Badge,
  Button
} from '@mui/material';
import { 
  Error as ErrorIcon,
  Warning as WarningIcon,
  CheckCircle as ResolvedIcon,
  MoreVert as MoreIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { Trip, mockTrips } from '../mock-data/trips';

// Mock alerts data
interface Alert {
  id: string;
  tripId: string;
  type: 'critical' | 'warning' | 'resolved';
  message: string;
  timestamp: string;
  isRead: boolean;
  details?: string;
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    tripId: 'EV-2017002348',
    type: 'critical',
    message: 'GPS signal lost',
    timestamp: '2025-02-25T21:30:00Z',
    isRead: false,
    details: 'The vehicle GPS signal has been lost. Last known location was near Philadelphia, PA. This may indicate tampering or a technical failure.'
  },
  {
    id: 'ALT-002',
    tripId: 'EV-2017002347',
    type: 'warning',
    message: 'Route deviation detected',
    timestamp: '2025-02-25T21:15:00Z',
    isRead: false,
    details: 'Vehicle has deviated from planned route by 3.2 miles. Driver reports road construction as the reason.'
  },
  {
    id: 'ALT-003',
    tripId: 'EV-2017002348',
    type: 'warning',
    message: 'Network connectivity issues',
    timestamp: '2025-02-25T21:00:00Z',
    isRead: true,
    details: 'Intermittent network connectivity detected. Data updates may be delayed.'
  },
  {
    id: 'ALT-004',
    tripId: 'EV-2017002346',
    type: 'resolved',
    message: 'Unexpected stop',
    timestamp: '2025-02-25T19:45:00Z',
    isRead: true,
    details: 'Vehicle stopped for 15 minutes. Driver reported a brief rest break. Trip has resumed.'
  },
  {
    id: 'ALT-005',
    tripId: 'EV-2017002349',
    type: 'resolved',
    message: 'Speed limit exceeded',
    timestamp: '2025-02-25T18:30:00Z',
    isRead: true,
    details: 'Vehicle exceeded speed limit by 7 mph for approximately 3 minutes. Driver has been notified.'
  }
];

export default function Alerts() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      case 'warning':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'resolved':
        return <ResolvedIcon sx={{ color: 'success.main' }} />;
      default:
        return <WarningIcon sx={{ color: 'warning.main' }} />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      case 'resolved':
        return 'success';
      default:
        return 'warning';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getFilteredAlerts = () => {
    switch (tabValue) {
      case 0: // All
        return mockAlerts;
      case 1: // Critical
        return mockAlerts.filter(alert => alert.type === 'critical');
      case 2: // Warning
        return mockAlerts.filter(alert => alert.type === 'warning');
      case 3: // Resolved
        return mockAlerts.filter(alert => alert.type === 'resolved');
      default:
        return mockAlerts;
    }
  };

  const findTripById = (tripId: string): Trip | undefined => {
    return mockTrips.find(trip => trip.id === tripId);
  };

  const filteredAlerts = getFilteredAlerts();
  const unreadCount = mockAlerts.filter(alert => !alert.isRead).length;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Header with stats */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" fontWeight="600" color="text.primary">
              Alerts
            </Typography>
            <Box>
              <Button 
                startIcon={<RefreshIcon />}
                variant="outlined"
                color="primary"
                sx={{ 
                  mr: 2, 
                  borderColor: 'grey.300',
                  color: 'grey.700',
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.50'
                  }
                }}
              >
                Refresh
              </Button>
              <Button 
                startIcon={<FilterIcon />}
                variant="contained"
                color="error"
                sx={{
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  '&:hover': {
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.1)'
                  }
                }}
              >
                Filter
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
        </Grid>
        
        {/* Alert summary cards */}
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', mb: 2, border: '1px solid', borderColor: 'grey.200' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge badgeContent={unreadCount} color="error" sx={{ mr: 3 }}>
                  <Avatar sx={{ bgcolor: 'grey.50', color: 'grey.700', border: '1px solid', borderColor: 'grey.200', width: 48, height: 48 }}>
                    {mockAlerts.length}
                  </Avatar>
                </Badge>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    Total Alerts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', bgcolor: 'rgba(255, 59, 48, 0.04)', color: 'grey.800', mb: 2, border: '1px solid', borderColor: 'error.200' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'error.50', color: 'error.700', mr: 3, border: '1px solid', borderColor: 'error.200', width: 48, height: 48 }}>
                  {mockAlerts.filter(a => a.type === 'critical').length}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    Critical Alerts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Require immediate attention
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', bgcolor: 'rgba(255, 159, 10, 0.04)', color: 'grey.800', mb: 2, border: '1px solid', borderColor: 'warning.200' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.50', color: 'warning.700', mr: 3, border: '1px solid', borderColor: 'warning.200', width: 48, height: 48 }}>
                  {mockAlerts.filter(a => a.type === 'warning').length}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    Warning Alerts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Need investigation
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', bgcolor: 'rgba(48, 209, 88, 0.04)', color: 'grey.800', mb: 2, border: '1px solid', borderColor: 'success.200' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.50', color: 'success.700', mr: 3, border: '1px solid', borderColor: 'success.200', width: 48, height: 48 }}>
                  {mockAlerts.filter(a => a.type === 'resolved').length}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    Resolved Alerts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No action required
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Alerts list and details */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', height: '70vh', display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'grey.200', bgcolor: 'background.paper' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              sx={{ 
                mb: 2,
                '& .MuiTabs-indicator': {
                  backgroundColor: 'error.main', // Using the red accent color
                } 
              }}
            >
              <Tab label="All" />
              <Tab label="Critical" />
              <Tab label="Warning" />
              <Tab label="Resolved" />
            </Tabs>
            <Divider sx={{ mb: 2, borderColor: 'grey.200' }} />
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <ListItem
                    key={alert.id}
                    onClick={() => handleAlertClick(alert)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      p: 1.5,
                      bgcolor: !alert.isRead ? 'grey.50' : 'transparent',
                      '&:hover': {
                        bgcolor: 'grey.50',
                      },
                      borderLeft: selectedAlert?.id === alert.id ? '4px solid' : '1px solid',
                      borderLeftColor: selectedAlert?.id === alert.id ? 'error.main' : 'grey.200',
                      borderRight: '1px solid',
                      borderRightColor: 'grey.200',
                      borderTop: '1px solid',
                      borderTopColor: 'grey.200',
                      borderBottom: '1px solid',
                      borderBottomColor: 'grey.200',
                      boxShadow: selectedAlert?.id === alert.id ? '0px 1px 3px rgba(16, 24, 40, 0.1)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <ListItemIcon>
                      {getAlertIcon(alert.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={alert.message}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {alert.tripId} • {formatTimestamp(alert.timestamp)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Chip
                      label={alert.type}
                      size="small"
                      color={getAlertColor(alert.type) as any}
                      variant="outlined"
                    />
                  </ListItem>
                ))
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: 'grey.50', borderRadius: 2, p: 4, border: '1px solid', borderColor: 'grey.200' }}>
                  <Typography variant="body1" color="text.secondary">
                    No alerts found
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', height: '70vh', border: '1px solid', borderColor: 'grey.200', bgcolor: 'background.paper' }}>
            {selectedAlert ? (
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getAlertIcon(selectedAlert.type)}
                    <Typography variant="h6" fontWeight="600" color="text.primary" sx={{ ml: 1 }}>
                      Alert {selectedAlert.id}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip
                      label={selectedAlert.type}
                      color={getAlertColor(selectedAlert.type) as any}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, textTransform: 'capitalize', fontWeight: 500 }}
                    />
                    <IconButton size="small">
                      <MoreIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    MESSAGE
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAlert.message}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    DETAILS
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAlert.details}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    TRIP INFORMATION
                  </Typography>
                  {(() => {
                    const trip = findTripById(selectedAlert.tripId);
                    return trip ? (
                      <Card variant="outlined" sx={{ borderRadius: 2, border: '1px solid', borderColor: 'grey.200', boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)' }}>
                        <CardContent>
                                  <Typography variant="subtitle1" fontWeight="600" color="text.primary">
                            {trip.id} - {trip.cargoType}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Avatar src={trip.clientPhotoUrl} sx={{ width: 24, height: 24, mr: 1 }} />
                            <Typography variant="body2">
                              {trip.clientName}, {trip.clientCompany}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Driver:</strong> {trip.driverName}
                          </Typography>
                          <Typography variant="body2">
                            <strong>From:</strong> {trip.startAddress}
                          </Typography>
                          <Typography variant="body2">
                            <strong>To:</strong> {trip.destinationAddress}
                          </Typography>
                        </CardContent>
                      </Card>
                    ) : (
                      <Typography variant="body1">
                        Trip information not available
                      </Typography>
                    );
                  })()}
                </Box>
                
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ mr: 2 }}
                  >
                    Dismiss
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                  >
                    Take Action
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h6" color="text.secondary">
                  Select an alert to view details
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
