import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Divider,
  Stack,
  Tooltip,
  styled
} from '@mui/material';
import {
  FiberManualRecord as StatusDot,
  LocalShipping as TruckIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  LocationOn as LocationIcon,
  SignalCellular4Bar as NetworkIcon,
  SignalCellularAlt as GpsIcon,
  SignalCellularConnectedNoInternet0Bar as DisconnectedIcon,
  Schedule as ScheduleIcon,
  Circle as CircleIcon
} from '@mui/icons-material';
import { Trip } from '../../mock-data/trips';

interface DeliveryCardProps {
  trip: Trip;
  selected: boolean;
  onClick: () => void;
}

const StatusIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  borderRadius: 8,
  padding: '2px 8px',
  fontSize: '0.75rem',
  fontWeight: 500,
  width: 'fit-content',
  transition: 'all 0.2s ease',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  '&:hover': {
    opacity: 0.9,
    transform: 'translateX(2px)'
  }
}));

const LocationBadge = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1.5),
  boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  transition: 'all 0.2s ease',
  '& .MuiSvgIcon-root': {
    fontSize: 18
  },
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[50],
  borderRadius: '10px',
  padding: theme.spacing(0.875),
  transition: 'all 0.2s ease',
  border: `1px solid ${theme.palette.grey[200]}`,
  '&:hover': {
    background: theme.palette.grey[100],
    transform: 'translateY(-2px)',
    boxShadow: '0px 2px 4px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    color: theme.palette.grey[700]
  }
}));

export default function DeliveryCard({ trip, selected, onClick }: DeliveryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'success.main';
      case 'warning':
        return 'warning.main';
      case 'critical':
        return 'error.main';
      default:
        return 'success.main';
    }
  };

  const getNetworkStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return { icon: <NetworkIcon color="success" />, label: 'Network & GPS Active' };
      case 'gps-only':
        return { icon: <GpsIcon color="warning" />, label: 'GPS Active, Network Lost' };
      case 'disconnected':
        return { icon: <DisconnectedIcon color="error" />, label: 'Network & GPS Lost' };
      default:
        return { icon: <NetworkIcon color="success" />, label: 'Network & GPS Active' };
    }
  };

  const networkStatus = getNetworkStatusIcon(trip.networkStatus);

  return (
    <Card 
      sx={{ 
        mb: 2.5, 
        borderRadius: 3, 
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'grey.200',
        boxShadow: selected 
          ? '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)' 
          : '0px 1px 2px rgba(16, 24, 40, 0.05)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        overflow: 'visible',
        transform: selected ? 'translateY(-3px)' : 'none',
        backgroundColor: selected ? 'background.paper' : 'background.default',
        position: 'relative',
        '&:after': selected ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '4px',
          backgroundColor: 'primary.main',
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
        } : {},
        '&:hover': {
          boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
          borderColor: 'grey.300',
          transform: 'translateY(-3px)'
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        {/* Top section with shipment number and status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 500, textTransform: 'uppercase', fontSize: '0.6875rem', letterSpacing: '0.5px' }}>
              Shipment number
            </Typography>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5, letterSpacing: '-0.02em', fontSize: '1.125rem' }}>
              {trip.id}
            </Typography>
            <StatusIndicator 
              sx={{ 
                bgcolor: `${getStatusColor(trip.status)}15`,
                color: getStatusColor(trip.status)
              }}
            >
              <CircleIcon sx={{ fontSize: '8px', opacity: 0.9 }} />
              <Typography variant="caption" fontWeight={500}>
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </Typography>
            </StatusIndicator>
          </Box>
          <Chip
            label={trip.cargoType}
            size="small"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              borderRadius: 1.5,
              height: 28,
              boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              '& .MuiChip-label': {
                px: 1.5,
                fontSize: '0.75rem',
                letterSpacing: '0.02em'
              }
            }}
          />
        </Box>

        {/* Truck image */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mb: 3, 
          position: 'relative',
          height: '70px',
          mt: 1
        }}>
          <Box 
            component="img"
            src="/Truck image2.svg"
            alt="Delivery Truck" 
            sx={{ 
              height: '70px',
              width: 'auto',
              maxWidth: '270px',
              objectFit: 'contain',
              position: 'absolute',
              right: 0,
              top: -8,
              zIndex: 1,
              display: 'block',
              filter: 'drop-shadow(0px 4px 8px rgba(16, 24, 40, 0.15))',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-3px) rotate(1deg)',
                filter: 'drop-shadow(0px 6px 10px rgba(16, 24, 40, 0.2))'
              }
            }} 
          />
        </Box>

        {/* Location section with circles and text */}
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, position: 'relative' }}>
          {/* Connecting line between origin and destination */}
          <Box sx={{ 
            position: 'absolute', 
            left: '18px', 
            top: '32px', 
            bottom: '32px', 
            width: 0, 
            zIndex: 0,
            borderRight: '2px dashed',
            borderColor: 'grey.200',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'grey.300',
              transform: 'translate(-3px, -4px)'
            }
          }}/>
          
          {/* Origin */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3.5, position: 'relative', zIndex: 1 }}>
            <LocationBadge sx={{ bgcolor: 'rgba(34, 197, 94, 0.1)' }}>
              <LocationIcon sx={{ color: 'success.main', fontSize: 20 }} />
            </LocationBadge>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25, fontSize: '0.6875rem', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 500 }}>
                Origin
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2, letterSpacing: '-0.01em', color: 'text.primary' }}>
                {trip.startAddress.split(',')[0]}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: '220px', display: 'block', mt: 0.25 }}>
                {trip.startAddress.split(',').slice(1).join(',').trim()}
              </Typography>
            </Box>
          </Box>
          
          {/* Destination */}
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <LocationBadge sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)' }}>
              <LocationIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            </LocationBadge>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25, fontSize: '0.6875rem', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 500 }}>
                Destination
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2, letterSpacing: '-0.01em', color: 'text.primary' }}>
                {trip.destinationAddress.split(',')[0]}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: '220px', display: 'block', mt: 0.25 }}>
                {trip.destinationAddress.split(',').slice(1).join(',').trim()}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2.5, borderColor: 'grey.200' }} />

        {/* Client section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={trip.clientPhotoUrl} 
              alt={trip.clientName}
              sx={{ 
                width: 42, 
                height: 42, 
                mr: 1.5, 
                boxShadow: '0px 2px 4px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
                border: '2px solid white',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 6px rgba(16, 24, 40, 0.1), 0px 2px 4px rgba(16, 24, 40, 0.06)'
                }
              }}
            />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25, fontSize: '0.6875rem', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 500 }}>
                Client
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2, color: 'text.primary' }}>
                {trip.clientName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                {trip.clientCompany}
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <Tooltip title="Call client" arrow placement="top" sx={{ 
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'grey.800',
                fontSize: '0.75rem',
                padding: '6px 10px',
                borderRadius: 1
              }
            }}>
              <ActionButton size="small">
                <PhoneIcon />
              </ActionButton>
            </Tooltip>
            <Tooltip title="Message client" arrow placement="top" sx={{ 
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'grey.800',
                fontSize: '0.75rem',
                padding: '6px 10px',
                borderRadius: 1
              }
            }}>
              <ActionButton size="small">
                <ChatIcon />
              </ActionButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Status section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={networkStatus.label} arrow placement="top" sx={{ 
              '& .MuiTooltip-tooltip': {
                backgroundColor: 'grey.800',
                fontSize: '0.75rem',
                padding: '6px 10px',
                borderRadius: 1
              }
            }}>
              <Box sx={{ mr: 1.5 }}>{networkStatus.icon}</Box>
            </Tooltip>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                bgcolor: 'grey.50',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <ScheduleIcon sx={{ color: 'grey.600', fontSize: 14, mr: 0.75 }} />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Updated {trip.lastUpdated}
              </Typography>
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              bgcolor: 'primary.50',
              color: 'primary.700',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'primary.200',
              fontWeight: 500,
              fontSize: '0.75rem',
              boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
            }}
          >
            ETA: {trip.estimatedArrival ? new Date(trip.estimatedArrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'TBD'}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
