import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Divider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  SelectChangeEvent,
  Badge,
  Paper,
  styled,
  Chip
} from '@mui/material';
import { 
  FilterAlt as FilterIcon,
  CheckCircle as NormalIcon,
  Warning as WarningIcon,
  Error as CriticalIcon
} from '@mui/icons-material';
import DeliveryCard from '../components/dashboard/DeliveryCard';
import MapComponent from '../components/map/MapComponent';
import { mockTrips, Trip } from '../mock-data/trips';

const StatusChip = styled(Chip)(({ theme }) => ({
  height: 32,
  fontWeight: 500,
  borderRadius: 8,
  fontSize: '0.8125rem',
  padding: '0 8px',
  '& .MuiChip-icon': {
    fontSize: 16,
    marginLeft: theme.spacing(0.5),
  },
  '&.all': {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    '&.MuiChip-outlined': {
      backgroundColor: 'transparent',
      color: theme.palette.grey[600],
      borderColor: theme.palette.grey[300],
      '&:hover': {
        backgroundColor: theme.palette.grey[50],
      },
    },
  },
  '&.normal': {
    backgroundColor: 'rgba(48, 209, 88, 0.08)',
    color: theme.palette.success.dark,
    '&.MuiChip-outlined': {
      backgroundColor: 'transparent',
      color: theme.palette.success.main,
      borderColor: theme.palette.success.light,
      '&:hover': {
        backgroundColor: 'rgba(48, 209, 88, 0.04)',
      },
    },
  },
  '&.warning': {
    backgroundColor: 'rgba(255, 159, 10, 0.08)',
    color: theme.palette.warning.dark,
    '&.MuiChip-outlined': {
      backgroundColor: 'transparent',
      color: theme.palette.warning.main,
      borderColor: theme.palette.warning.light,
      '&:hover': {
        backgroundColor: 'rgba(255, 159, 10, 0.04)',
      },
    },
  },
  '&.critical': {
    backgroundColor: 'rgba(255, 59, 48, 0.08)',
    color: theme.palette.error.dark,
    '&.MuiChip-outlined': {
      backgroundColor: 'transparent',
      color: theme.palette.error.main,
      borderColor: theme.palette.error.light,
      '&:hover': {
        backgroundColor: 'rgba(255, 59, 48, 0.04)',
      },
    },
  },
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  borderRadius: 12,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

export default function Dashboard() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterStatus(event.target.value);
  };

  const filteredTrips = mockTrips.filter((trip) => {
    if (filterStatus === 'all') return true;
    return trip.status === filterStatus;
  });

  // Count trips by status
  const counts = {
    all: mockTrips.length,
    normal: mockTrips.filter(trip => trip.status === 'normal').length,
    warning: mockTrips.filter(trip => trip.status === 'warning').length,
    critical: mockTrips.filter(trip => trip.status === 'critical').length,
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <NormalIcon fontSize="small" />;
      case 'warning':
        return <WarningIcon fontSize="small" />;
      case 'critical':
        return <CriticalIcon fontSize="small" />;
      default:
        return <FilterIcon fontSize="small" />;
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', p: 2, backgroundColor: 'background.default' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Left column - Trips list */}
        <Grid item xs={12} md={4} sx={{ height: '100%', overflow: 'hidden' }}>
          <SectionPaper elevation={0}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" fontWeight={600} color="text.primary" sx={{ letterSpacing: '-0.02em' }}>
                  Live Trips
                </Typography>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <Select
                    id="status-filter"
                    value={filterStatus}
                    onChange={handleFilterChange}
                    displayEmpty
                    variant="outlined"
                    sx={{
                      '.MuiSelect-select': {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 0.5,
                        fontSize: '0.875rem',
                      },
                      height: 40,
                      backgroundColor: 'background.paper',
                      borderRadius: 1.5,
                      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                      '&:hover': {
                        borderColor: 'grey.400'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'grey.300'
                      },
                    }}
                  >
                    <MenuItem value="all" sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1.5, px: 2 }}>
                      <FilterIcon fontSize="small" sx={{ color: 'grey.500' }} />
                      <Typography variant="body2" fontWeight={500}>All Trips</Typography>
                      <StatusChip 
                        label={counts.all} 
                        size="small" 
                        className="all"
                      />
                    </MenuItem>
                    <MenuItem value="normal" sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1.5, px: 2 }}>
                      <NormalIcon fontSize="small" sx={{ color: 'success.main' }} />
                      <Typography variant="body2" fontWeight={500}>Normal</Typography>
                      <StatusChip 
                        label={counts.normal} 
                        size="small" 
                        className="normal"
                      />
                    </MenuItem>
                    <MenuItem value="warning" sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1.5, px: 2 }}>
                      <WarningIcon fontSize="small" sx={{ color: 'warning.main' }} />
                      <Typography variant="body2" fontWeight={500}>Warning</Typography>
                      <StatusChip 
                        label={counts.warning} 
                        size="small" 
                        className="warning"
                      />
                    </MenuItem>
                    <MenuItem value="critical" sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1.5, px: 2 }}>
                      <CriticalIcon fontSize="small" sx={{ color: 'error.main' }} />
                      <Typography variant="body2" fontWeight={500}>Critical</Typography>
                      <StatusChip 
                        label={counts.critical} 
                        size="small" 
                        className="critical"
                      />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 1.5, 
                  mb: 2,
                  overflowX: 'auto',
                  pb: 1.5,
                  pt: 0.5,
                  px: 0.5,
                  '::-webkit-scrollbar': {
                    height: 6,
                  },
                  '::-webkit-scrollbar-thumb': {
                    backgroundColor: 'grey.300',
                    borderRadius: 8,
                  },
                  '::-webkit-scrollbar-track': {
                    backgroundColor: 'grey.100',
                    borderRadius: 8,
                  }
                }}
              >
                <StatusChip 
                  label={`All (${counts.all})`} 
                  className={`all ${filterStatus === 'all' ? '' : ''}`}
                  onClick={() => setFilterStatus('all')}
                  icon={<FilterIcon fontSize="small" />}
                  variant={filterStatus === 'all' ? 'filled' : 'outlined'}
                  sx={{ 
                    boxShadow: filterStatus === 'all' ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none',
                    cursor: 'pointer'
                  }}
                />
                <StatusChip 
                  label={`Normal (${counts.normal})`} 
                  className={`normal ${filterStatus === 'normal' ? '' : ''}`}
                  onClick={() => setFilterStatus('normal')}
                  icon={<NormalIcon fontSize="small" />}
                  variant={filterStatus === 'normal' ? 'filled' : 'outlined'}
                  sx={{ 
                    boxShadow: filterStatus === 'normal' ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none',
                    cursor: 'pointer'
                  }}
                />
                <StatusChip 
                  label={`Warning (${counts.warning})`} 
                  className={`warning ${filterStatus === 'warning' ? '' : ''}`}
                  onClick={() => setFilterStatus('warning')}
                  icon={<WarningIcon fontSize="small" />}
                  variant={filterStatus === 'warning' ? 'filled' : 'outlined'}
                  sx={{ 
                    boxShadow: filterStatus === 'warning' ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none',
                    cursor: 'pointer'
                  }}
                />
                <StatusChip 
                  label={`Critical (${counts.critical})`} 
                  className={`critical ${filterStatus === 'critical' ? '' : ''}`}
                  onClick={() => setFilterStatus('critical')}
                  icon={<CriticalIcon fontSize="small" />}
                  variant={filterStatus === 'critical' ? 'filled' : 'outlined'}
                  sx={{ 
                    boxShadow: filterStatus === 'critical' ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none',
                    cursor: 'pointer'
                  }}
                />
              </Box>
              
              <Divider sx={{ mb: 2, borderColor: 'grey.200' }} />
            </Box>
            
            <Box sx={{ height: 'calc(100% - 114px)', overflow: 'auto', px: 2, pb: 2 }}>
              {filteredTrips.map((trip) => (
                <DeliveryCard
                  key={trip.id}
                  trip={trip}
                  selected={selectedTrip?.id === trip.id}
                  onClick={() => handleTripClick(trip)}
                />
              ))}
              {filteredTrips.length === 0 && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%',
                    flexDirection: 'column',
                    textAlign: 'center',
                    color: 'text.secondary',
                    p: 4,
                    backgroundColor: 'grey.50',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'grey.200',
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={500} mb={1}>No trips found</Typography>
                  <Typography variant="body2">Try changing your filter selection</Typography>
                </Box>
              )}
            </Box>
          </SectionPaper>
        </Grid>
        
        {/* Right column - Map */}
        <Grid item xs={12} md={8} sx={{ height: '100%' }}>
          <SectionPaper elevation={0}>
            <MapComponent 
              selectedTrip={selectedTrip} 
              onTripSelect={handleTripClick} 
            />
          </SectionPaper>
        </Grid>
      </Grid>
    </Box>
  );
}
