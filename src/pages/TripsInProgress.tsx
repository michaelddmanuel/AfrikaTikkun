import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Divider,
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Avatar
} from '@mui/material';
import { FiberManualRecord as StatusDot } from '@mui/icons-material';
import MapComponent from '../components/map/MapComponent';
import { mockTrips, Trip } from '../mock-data/trips';

export default function TripsInProgress() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'success';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'error';
      default:
        return 'success';
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', p: 2 }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Top - Table of trips */}
        <Grid item xs={12} sx={{ height: '40%' }}>
          <Paper 
            sx={{ 
              p: 0, 
              height: '100%', 
              borderRadius: 2,
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
              border: '1px solid',
              borderColor: 'grey.200',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 3, pb: 2 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ letterSpacing: '-0.01em' }}>
                Trips In Progress
              </Typography>
            </Box>
            <Divider />
            <TableContainer sx={{ height: 'calc(100% - 70px)' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell width="60px">Status</TableCell>
                    <TableCell>Trip ID</TableCell>
                    <TableCell>Cargo Type</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>ETA</TableCell>
                    <TableCell align="right">Last Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTrips.map((trip) => (
                    <TableRow
                      key={trip.id}
                      hover
                      selected={selectedTrip?.id === trip.id}
                      onClick={() => handleTripClick(trip)}
                      sx={{ 
                        cursor: 'pointer',
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(145, 158, 171, 0.08)',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(145, 158, 171, 0.08)',
                        }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <StatusDot 
                            sx={{ 
                              color: getStatusColor(trip.status),
                              filter: 'drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.1))'
                            }} 
                          />
                        </Box>
                      </TableCell>
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
                      <TableCell>{trip.driverName}</TableCell>
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
                          {formatDate(trip.estimatedArrival)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {trip.lastUpdated}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        {/* Bottom - Map */}
        <Grid item xs={12} sx={{ height: '60%' }}>
          <Paper 
            sx={{ 
              height: '100%', 
              borderRadius: 2, 
              overflow: 'hidden', 
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
              border: '1px solid',
              borderColor: 'grey.200' 
            }}
          >
            <MapComponent selectedTrip={selectedTrip} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
