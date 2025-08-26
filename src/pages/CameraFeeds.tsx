import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Divider, 
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Chip,
  Paper,
  Tab,
  Tabs,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  CircularProgress,
  Avatar
} from '@mui/material';
import { 
  Videocam as CameraIcon,
  Refresh as RefreshIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Restaurant as KitchenIcon,
  YouTube as YouTubeIcon,
  Image as ImageIcon,
  History as HistoryIcon,
  Kitchen as KitchenAreaIcon,
  Inventory as InventoryIcon,
  Warehouse as WarehouseIcon,
  Cabin as FreezerIcon,
  LocalShipping as ReceivingIcon,
  DirectionsCar as TruckIcon
} from '@mui/icons-material';
import YouTubeEmbed from '../components/camera/YouTubeEmbed';
import { mockLocations } from '../mock-data/locations';

// Mock camera feed data
interface CameraFeed {
  id: string;
  name: string;
  locationId: string;
  type: 'kitchen' | 'storage' | 'freezer' | 'receiving' | 'dock' | 'cabin' | 'cargo' | 'exterior';
  lastUpdated: string;
  mediaUrl: string;
  isLive: boolean;
  mediaType: 'image' | 'youtube';
  description?: string;
}

const mockCameraFeeds: CameraFeed[] = [
  {
    id: 'CAM-001',
    name: 'Main Kitchen Area',
    locationId: 'LOC-001',
    type: 'kitchen',
    lastUpdated: '2025-08-25T13:40:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=qLkACxD6wNY',
    isLive: true,
    mediaType: 'youtube',
    description: 'Main preparation area with staff activity monitoring'
  },
  {
    id: 'CAM-002',
    name: 'Dry Storage',
    locationId: 'LOC-001',
    type: 'storage',
    lastUpdated: '2025-08-25T13:39:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=dHcxTmU6atk',
    isLive: true,
    mediaType: 'youtube',
    description: 'Main dry goods storage area with inventory racks'
  },
  {
    id: 'CAM-003',
    name: 'Walk-in Freezer',
    locationId: 'LOC-001',
    type: 'freezer',
    lastUpdated: '2025-08-25T13:41:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=zolQCp3OTMI',
    isLive: true,
    mediaType: 'youtube',
    description: 'Main freezer with temperature monitoring'
  },
  {
    id: 'CAM-004',
    name: 'Receiving Bay',
    locationId: 'LOC-001',
    type: 'receiving',
    lastUpdated: '2025-08-25T13:36:00Z',
    mediaUrl: 'https://www.youtube.com/shorts/tJOHCAOSgSQ',
    isLive: true,
    mediaType: 'youtube',
    description: 'Loading dock for incoming food deliveries'
  },
  {
    id: 'CAM-005',
    name: 'Secondary Storage',
    locationId: 'LOC-002',
    type: 'storage',
    lastUpdated: '2025-08-25T13:35:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=qLkACxD6wNY',
    isLive: true,
    mediaType: 'youtube',
    description: 'Overflow storage area for non-perishable goods'
  },
  {
    id: 'CAM-006',
    name: 'Prep Kitchen',
    locationId: 'LOC-002',
    type: 'kitchen',
    lastUpdated: '2025-08-25T13:38:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=dHcxTmU6atk',
    isLive: true,
    mediaType: 'youtube',
    description: 'Food preparation area with staff activity'
  },
  {
    id: 'CAM-007',
    name: 'Cold Storage',
    locationId: 'LOC-002',
    type: 'freezer',
    lastUpdated: '2025-08-25T13:36:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=zolQCp3OTMI',
    isLive: true,
    mediaType: 'youtube',
    description: 'Refrigerated storage for perishable inventory'
  },
  {
    id: 'CAM-008',
    name: 'Receiving Area',
    locationId: 'LOC-003',
    type: 'receiving',
    lastUpdated: '2025-08-25T13:32:00Z',
    mediaUrl: 'https://www.youtube.com/shorts/tJOHCAOSgSQ',
    isLive: true,
    mediaType: 'youtube',
    description: 'Supplier delivery entrance with check-in station'
  },
  {
    id: 'CAM-009',
    name: 'Main Kitchen',
    locationId: 'LOC-003',
    type: 'kitchen',
    lastUpdated: '2025-08-25T13:40:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=qLkACxD6wNY',
    isLive: true,
    mediaType: 'youtube',
    description: 'Primary cooking area with inventory usage monitoring'
  }
];

// Mock trip data
interface Trip {
  id: string;
  driverName: string;
  cargoType: string;
  clientName: string;
  origin: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'scheduled';
}

const mockTrips: Trip[] = [
  {
    id: 'TRIP-001',
    driverName: 'John Smith',
    cargoType: 'Refrigerated Foods',
    clientName: 'Metro Foods Inc.',
    origin: 'San Francisco',
    destination: 'Oakland',
    status: 'in-transit'
  },
  {
    id: 'TRIP-002',
    driverName: 'Maria Garcia',
    cargoType: 'Frozen Goods',
    clientName: 'Fresh Direct',
    origin: 'San Jose',
    destination: 'San Francisco',
    status: 'scheduled'
  },
  {
    id: 'TRIP-003',
    driverName: 'David Chen',
    cargoType: 'Dry Goods',
    clientName: 'Bay Area Distribution',
    origin: 'Oakland',
    destination: 'San Jose',
    status: 'delivered'
  }
];

export default function CameraFeeds() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(mockLocations[0].id);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fullscreenFeed, setFullscreenFeed] = useState<CameraFeed | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<Record<string, boolean>>({});
  const [selectedTripId, setSelectedTripId] = useState<string>(mockTrips[0].id);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(mockTrips[0]);

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    setSelectedLocationId(event.target.value);
  };

  const handleTripChange = (event: SelectChangeEvent<string>) => {
    setSelectedTripId(event.target.value);
    setSelectedTrip(mockTrips.find(trip => trip.id === event.target.value) || null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const toggleFullscreen = (feed: CameraFeed | null) => {
    setFullscreenFeed(feed);
  };

  const handleToggleFullscreen = (feed: CameraFeed | null) => {
    toggleFullscreen(feed);
  };

  const handleRefresh = (feedId: string) => {
    setIsRefreshing((prev) => ({ ...prev, [feedId]: true }));
    
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing((prev) => ({ ...prev, [feedId]: false }));
    }, 1500);
  };
  
  const handleRefreshFeed = (feedId: string) => {
    handleRefresh(feedId);
  };
  
  // Function to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Function to get camera type label
  const getCameraTypeLabel = (type: string) => {
    switch(type) {
      case 'kitchen': return 'Kitchen';
      case 'storage': return 'Storage';
      case 'freezer': return 'Freezer';
      case 'receiving': return 'Receiving';
      default: return 'Camera';
    }
  };

  // Filter camera feeds by selected location
  const filteredCameraFeeds = mockCameraFeeds.filter(
    (feed) => feed.locationId === selectedLocationId
  );

  // Filter feeds by type based on active tab
  const tabFilteredFeeds = activeTab === 0 
    ? filteredCameraFeeds 
    : filteredCameraFeeds.filter(feed => {
        switch(activeTab) {
          case 1: return feed.type === 'kitchen';
          case 2: return feed.type === 'storage';
          case 3: return feed.type === 'freezer';
          case 4: return feed.type === 'receiving';
          default: return true;
        }
      });

  // Function to get camera type icon
  const getCameraTypeIcon = (type: string) => {
    switch(type) {
      case 'kitchen': return <KitchenIcon />;
      case 'storage': return <InventoryIcon />;
      case 'freezer': return <FreezerIcon />;
      case 'receiving': return <ReceivingIcon />;
      default: return <CameraIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {!fullscreenFeed ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" fontWeight="700" sx={{ color: 'text.primary', letterSpacing: '-0.02em' }}>
              Camera Feeds
            </Typography>
            <FormControl sx={{ minWidth: 280 }}>
              <InputLabel id="trip-select-label">Select Trip</InputLabel>
              <Select
                labelId="trip-select-label"
                id="trip-select"
                value={selectedTripId}
                label="Select Trip"
                onChange={handleTripChange}
                sx={{ 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.300'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.400'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main'
                  },
                  '& .MuiSelect-select': {
                    py: 1.5
                  }
                }}
              >
                {mockTrips.map((trip) => (
                  <MenuItem key={trip.id} value={trip.id}>
                    {trip.id} - {trip.cargoType} ({trip.driverName})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
          
          {selectedTrip && (
            <Paper sx={{ 
              p: 2.5, 
              mb: 3, 
              borderRadius: 3, 
              boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
              border: '1px solid',
              borderColor: 'grey.200',
              bgcolor: 'background.paper' 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'primary.50',
                  color: 'primary.700',
                  mr: 2,
                  border: '2px solid',
                  borderColor: 'primary.100'
                }}
              >
                <TruckIcon sx={{ fontSize: 24 }} />
              </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedTrip.id} - {selectedTrip.cargoType}
                  </Typography>
                  <Typography variant="body2">
                    Driver: {selectedTrip.driverName} | Client: {selectedTrip.clientName}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
          
          <Box sx={{ mb: 3 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  minWidth: 'auto',
                  mx: 0.5,
                  px: 2,
                },
                '& .Mui-selected': {
                  fontWeight: 600,
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  borderRadius: '8px',
                }
              }}
            >
              <Tab label="All Cameras" />
              <Tab label="Cabin" />
              <Tab label="Cargo" />
              <Tab label="Exterior" />
              <Tab label="Dock" />
            </Tabs>
          </Box>
          
          <Grid container spacing={3}>
            {tabFilteredFeeds.length > 0 ? (
              tabFilteredFeeds.map((feed) => (
                <Grid item xs={12} md={6} lg={4} key={feed.id}>
                  <Card sx={{ 
                    borderRadius: 3, 
                    boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)', 
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 8px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)'
                    }
                  }}>
                    <Box sx={{ position: 'relative' }}>
                      {feed.mediaType === 'image' ? (
                        <CardMedia
                          component="img"
                          height="220"
                          image={feed.mediaUrl}
                          alt={feed.name}
                          sx={{ 
                            filter: isRefreshing[feed.id] ? 'blur(5px)' : 'none',
                            transition: 'filter 0.3s ease',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <Box sx={{ height: 220 }}>
                          <YouTubeEmbed 
                            videoUrl={feed.mediaUrl}
                            title={feed.name}
                            autoplay={feed.isLive}
                            loop={true}
                            height="220px"
                          />
                        </Box>
                      )}
                      {isRefreshing[feed.id] && (
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0, 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      )}
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          top: 10, 
                          right: 10, 
                          display: 'flex', 
                          gap: 1 
                        }}
                      >
                        <IconButton 
                          size="small" 
                          onClick={() => handleToggleFullscreen(feed)}
                          sx={{ 
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.95)'
                            }
                          }}
                        >
                          <FullscreenIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleRefreshFeed(feed.id)}
                          sx={{ 
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.95)'
                            }
                          }}
                          disabled={isRefreshing[feed.id]}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Box>
                      {feed.isLive && (
                        <Chip 
                          label="LIVE" 
                          size="small"
                          icon={<Box component="span" sx={{ width: 8, height: 8, bgcolor: '#EF4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />}
                          sx={{ 
                            position: 'absolute', 
                            top: 10, 
                            left: 10,
                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            borderRadius: '16px',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            '& .MuiChip-label': {
                              fontWeight: 600,
                              px: 1
                            },
                            '@keyframes pulse': {
                              '0%': {
                                opacity: 1,
                                transform: 'scale(1)'
                              },
                              '50%': {
                                opacity: 0.5,
                                transform: 'scale(1.2)'
                              },
                              '100%': {
                                opacity: 1,
                                transform: 'scale(1)'
                              }
                            }
                          }}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {feed.name}
                        </Typography>
                        <Chip 
                          label={getCameraTypeLabel(feed.type)} 
                          size="small" 
                          icon={feed.mediaType === 'youtube' ? <YouTubeIcon fontSize="small" /> : <ImageIcon fontSize="small" />}
                          sx={{ 
                            bgcolor: feed.type === 'dock' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                            color: feed.type === 'dock' ? '#EC4899' : 'primary.main',
                            fontWeight: 500,
                            borderRadius: '16px',
                            border: '1px solid',
                            borderColor: feed.type === 'dock' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            '.MuiChip-label': { px: 1 },
                            '.MuiChip-icon': { color: 'inherit' }
                          }}
                        />
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        py: 1, 
                        px: 1.5, 
                        my: 1.5, 
                        bgcolor: 'grey.50', 
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'grey.200'
                      }}>
                        <HistoryIcon sx={{ fontSize: 16, color: 'grey.500', mr: 1 }} />
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          Last Updated: {formatTime(feed.lastUpdated)}
                        </Typography>
                      </Box>
                      {feed.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.4 }}>
                          {feed.description}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          startIcon={feed.isLive ? <PauseIcon /> : <PlayIcon />}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 2,
                            borderColor: feed.isLive ? 'grey.300' : 'primary.300',
                            color: feed.isLive ? 'grey.700' : 'primary.700',
                            '&:hover': {
                              borderColor: feed.isLive ? 'grey.400' : 'primary.400',
                              bgcolor: feed.isLive ? 'grey.50' : 'primary.50'
                            }
                          }}
                        >
                          {feed.isLive ? 'Pause' : 'Live View'}
                        </Button>
                        <Button 
                          variant="contained" 
                          size="small" 
                          color="primary"
                          startIcon={<CameraIcon />}
                          onClick={() => handleRefreshFeed(feed.id)}
                          disabled={isRefreshing[feed.id]}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 2,
                            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                            '&:hover': {
                              boxShadow: '0px 2px 4px rgba(16, 24, 40, 0.05)'
                            }
                          }}
                        >
                          Refresh Feed
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                  <Typography variant="h6" color="text.secondary">
                    No camera feeds available for the selected filters
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </>
      ) : (
        // Fullscreen view
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'black', zIndex: 1300, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" color="white" fontWeight="bold">
              {fullscreenFeed.name} - {selectedTrip?.id}
            </Typography>
            <Box>
              {fullscreenFeed.isLive && (
                <Chip 
                  label="LIVE" 
                  size="small"
                  icon={<Box component="span" sx={{ width: 8, height: 8, bgcolor: '#EF4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />}
                  sx={{ 
                    mr: 2,
                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                    color: '#EF4444',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    borderRadius: '16px',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    '& .MuiChip-label': {
                      fontWeight: 600,
                      px: 1
                    }
                  }}
                />
              )}
              <IconButton 
                color="primary" 
                onClick={() => handleToggleFullscreen(null)}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)', 
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.3)' 
                  } 
                }}
              >
                <FullscreenExitIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ height: 'calc(100% - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {fullscreenFeed.mediaType === 'image' ? (
              <img 
                src={fullscreenFeed.mediaUrl} 
                alt={fullscreenFeed.name} 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain' 
                }} 
              />
            ) : (
              <Box sx={{ width: '90%', height: '90%', margin: '0 auto' }}>
                <YouTubeEmbed 
                  videoUrl={fullscreenFeed.mediaUrl}
                  title={fullscreenFeed.name}
                  autoplay={fullscreenFeed.isLive}
                  loop={true}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<RefreshIcon />}
              onClick={() => handleRefreshFeed(fullscreenFeed.id)}
              disabled={isRefreshing[fullscreenFeed.id]}
              sx={{ mr: 2 }}
            >
              Refresh Feed
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={fullscreenFeed.isLive ? <PauseIcon /> : <PlayIcon />}
            >
              {fullscreenFeed.isLive ? 'Pause Live Feed' : 'Start Live Feed'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
