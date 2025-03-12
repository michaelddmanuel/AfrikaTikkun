import React from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Divider,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  FiberManualRecord as StatusDot,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  MoreVert as MoreIcon,
  CheckCircle as CompletedIcon
} from '@mui/icons-material';
import { mockCompletedTrips } from '../mock-data/trips';

export default function CompletedTrips() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMs = end - start;
    
    // Convert to hours and minutes
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom sx={{ letterSpacing: '-0.02em' }}>
        Completed Trips
      </Typography>
      <Divider sx={{ mb: 4, borderColor: 'grey.200' }} />
      
      <Grid container spacing={3}>
        {/* Summary cards */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              borderRadius: 2, 
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', 
              bgcolor: '#F6FEF9', 
              color: '#027A48',
              border: '1px solid',
              borderColor: '#ECFDF3' 
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: '#ECFDF3',
                    mr: 2,
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
                  }}
                >
                  <CompletedIcon sx={{ fontSize: 28, color: '#12B76A' }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ letterSpacing: '-0.02em' }}>
                    {mockCompletedTrips.length}
                  </Typography>
                  <Typography variant="body2" color="#344054">
                    Completed Trips
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              borderRadius: 2, 
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', 
              bgcolor: '#F0F9FF', 
              color: '#026AA2',
              border: '1px solid',
              borderColor: '#E0F2FE' 
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: '#E0F2FE',
                    mr: 2, 
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      color: '#0BA5EC',
                      lineHeight: 1 
                    }}
                  >
                    %
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ letterSpacing: '-0.02em' }}>
                    100%
                  </Typography>
                  <Typography variant="body2" color="#344054">
                    On-Time Delivery Rate
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              borderRadius: 2, 
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', 
              bgcolor: '#FDF4FF', 
              color: '#C11574',
              border: '1px solid',
              borderColor: '#FCDDEC' 
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: '#FCE7F6',
                    mr: 2, 
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      color: '#EE46BC',
                      lineHeight: 1 
                    }}
                  >
                    ⏱️
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ letterSpacing: '-0.02em' }}>
                    9h 15m
                  </Typography>
                  <Typography variant="body2" color="#344054">
                    Average Trip Duration
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Completed trips table */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Paper 
            sx={{ 
              p: 0, 
              borderRadius: 2, 
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
              border: '1px solid',
              borderColor: 'grey.200',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, pb: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ letterSpacing: '-0.01em' }}>
                Trip History
              </Typography>
              <Box>
                <Tooltip title="Download CSV">
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: 'grey.700', 
                      bgcolor: 'grey.50', 
                      border: '1px solid', 
                      borderColor: 'grey.200',
                      borderRadius: 1,
                      mr: 1,
                      '&:hover': { bgcolor: 'grey.100' } 
                    }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Print">
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: 'grey.700', 
                      bgcolor: 'grey.50', 
                      border: '1px solid', 
                      borderColor: 'grey.200',
                      borderRadius: 1,
                      mr: 1,
                      '&:hover': { bgcolor: 'grey.100' } 
                    }}
                  >
                    <PrintIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: 'grey.700', 
                      bgcolor: 'grey.50', 
                      border: '1px solid', 
                      borderColor: 'grey.200',
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'grey.100' } 
                    }}
                  >
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'grey.200' }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Trip ID</TableCell>
                    <TableCell>Cargo Type</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Completion Time</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockCompletedTrips.map((trip) => (
                    <TableRow key={trip.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(145, 158, 171, 0.08)' } }}>
                      <TableCell>{trip.id}</TableCell>
                      <TableCell>
                        <Chip 
                          label={trip.cargoType} 
                          size="small" 
                          sx={{ 
                            backgroundColor: 'primary.lighter',
                            color: 'primary.darker',
                            fontWeight: 500,
                            borderRadius: '8px',
                            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                            '&:hover': {
                              backgroundColor: 'primary.light',
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                          {trip.driverName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            src={trip.clientPhotoUrl} 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              mr: 1.5,
                              borderRadius: '8px',
                              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
                            }} 
                          />
                          <Typography variant="body2" fontWeight={500} sx={{ color: 'text.primary' }}>
                            {trip.clientName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {formatDate(trip.startTime)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {formatDate(trip.completedTime || '')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {trip.completedTime ? calculateDuration(trip.startTime, trip.completedTime) : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          icon={
                            <StatusDot 
                              sx={{ 
                                color: '#12B76A !important', 
                                width: 14, 
                                height: 14,
                                filter: 'drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.1))'
                              }} 
                            />
                          }
                          label="Completed" 
                          size="small" 
                          sx={{ 
                            backgroundColor: '#ECFDF3',
                            color: '#027A48',
                            fontWeight: 500,
                            borderRadius: '8px',
                            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: 'grey.600',
                            '&:hover': { 
                              backgroundColor: 'grey.100',
                              color: 'grey.800'
                            } 
                          }}
                        >
                          <MoreIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
