import React, { useState } from 'react';
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
  Tooltip,
  Avatar
} from '@mui/material';
import { 
  Videocam as CameraIcon,
  Refresh as RefreshIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  LocalShipping as TruckIcon,
  YouTube as YouTubeIcon,
  Image as ImageIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import YouTubeEmbed from '../components/camera/YouTubeEmbed';
import { Trip, mockTrips } from '../mock-data/trips';

// Mock camera feed data
interface CameraFeed {
  id: string;
  name: string;
  tripId: string;
  type: 'cabin' | 'cargo' | 'exterior' | 'dock';
  lastUpdated: string;
  mediaUrl: string;
  isLive: boolean;
  mediaType: 'image' | 'youtube';
  description?: string;
}

const mockCameraFeeds: CameraFeed[] = [
  {
    id: 'CAM-001',
    name: 'Cabin View',
    tripId: 'EV-2017002346',
    type: 'cabin',
    lastUpdated: '2025-03-12T14:40:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=trH2lR_Zk38',
    isLive: true,
    mediaType: 'youtube',
    description: 'Front-facing cabin camera with driver monitoring'
  },
  {
    id: 'CAM-002',
    name: 'Cargo Hold',
    tripId: 'EV-2017002346',
    type: 'cargo',
    lastUpdated: '2025-03-12T14:39:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=vrP8lorTwZg',
    isLive: true,
    mediaType: 'youtube',
    description: 'Rear camera monitoring cargo security'
  },
  {
    id: 'CAM-003',
    name: 'Exterior Front',
    tripId: 'EV-2017002346',
    type: 'exterior',
    lastUpdated: '2025-03-12T14:41:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=u46w7h1nVGk',
    isLive: true,
    mediaType: 'youtube',
    description: 'Front camera showing road conditions'
  },
  {
    id: 'CAM-004',
    name: 'Dock Camera A',
    tripId: 'EV-2017002346',
    type: 'dock',
    lastUpdated: '2025-03-12T14:36:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=yuGVuWrBWjA',
    isLive: true,
    mediaType: 'youtube',
    description: 'Loading dock entrance camera monitoring arrivals'
  },
  {
    id: 'CAM-005',
    name: 'Dock Camera B',
    tripId: 'EV-2017002347',
    type: 'dock',
    lastUpdated: '2025-03-12T14:35:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=trH2lR_Zk38',
    isLive: true,
    mediaType: 'youtube',
    description: 'Loading dock exit surveillance'
  },
  {
    id: 'CAM-006',
    name: 'Cabin Camera',
    tripId: 'EV-2017002347',
    type: 'cabin',
    lastUpdated: '2025-03-12T14:38:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=trH2lR_Zk38',
    isLive: true,
    mediaType: 'youtube',
    description: 'Interior cabin view with driver monitoring'
  },
  {
    id: 'CAM-007',
    name: 'Cargo Hold',
    tripId: 'EV-2017002347',
    type: 'cargo',
    lastUpdated: '2025-03-12T14:36:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=vrP8lorTwZg',
    isLive: true,
    mediaType: 'youtube',
    description: 'Rear view of cargo compartment'
  },
  {
    id: 'CAM-008',
    name: 'Dock Camera C',
    tripId: 'EV-2017002348',
    type: 'dock',
    lastUpdated: '2025-03-12T14:32:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=vrP8lorTwZg',
    isLive: true,
    mediaType: 'youtube',
    description: 'Loading dock bay 3 with active loading operations'
  },
  {
    id: 'CAM-009',
    name: 'Cabin View',
    tripId: 'EV-2017002348',
    type: 'cabin',
    lastUpdated: '2025-03-12T14:40:00Z',
    mediaUrl: 'https://www.youtube.com/watch?v=trH2lR_Zk38',
    isLive: true,
    mediaType: 'youtube',
    description: 'Driver-facing cabin camera with alert monitoring'
  }
];

export default function CameraFeeds() {
  const [selectedTripId, setSelectedTripId] = useState<string>(mockTrips[0].id);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fullscreenFeed, setFullscreenFeed] = useState<CameraFeed | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<Record<string, boolean>>({});

  const handleTripChange = (event: SelectChangeEvent<string>) => {
    setSelectedTripId(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleToggleFullscreen = (feed: CameraFeed | null) => {
    setFullscreenFeed(feed);
  };

  const handleRefreshFeed = (feedId: string) => {
    setIsRefreshing({ ...isRefreshing, [feedId]: true });
    
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing({ ...isRefreshing, [feedId]: false });
    }, 2000);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const getFilteredCameraFeeds = () => {
    let feeds = mockCameraFeeds.filter(feed => feed.tripId === selectedTripId);
    
    switch (activeTab) {
      case 0: // All
        return feeds;
      case 1: // Cabin
        return feeds.filter(feed => feed.type === 'cabin');
      case 2: // Cargo
        return feeds.filter(feed => feed.type === 'cargo');
      case 3: // Exterior
        return feeds.filter(feed => feed.type === 'exterior');
      case 4: // Dock
        return feeds.filter(feed => feed.type === 'dock');
      default:
        return feeds;
    }
  };

  const getCameraTypeLabel = (type: string) => {
    switch (type) {
      case 'cabin':
        return 'Cabin';
      case 'cargo':
        return 'Cargo';
      case 'exterior':
        return 'Exterior';
      default:
        return type;
    }
  };

  const filteredFeeds = getFilteredCameraFeeds();
  const selectedTrip = mockTrips.find(trip => trip.id === selectedTripId);

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
            {filteredFeeds.length > 0 ? (
              filteredFeeds.map((feed) => (
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
