import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, OverlayView } from '@react-google-maps/api';
import { Box, Typography, Paper, CircularProgress, IconButton, Collapse, Avatar, Tooltip, Stack, Chip, Zoom } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DirectionsIcon from '@mui/icons-material/Directions';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Trip, mockTrips } from '../../mock-data/trips';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '12px',
};

// Custom map style to achieve grayscale/pastel background
const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#616161"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#f5f5f5"}]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#bdbdbd"}]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#eeeeee"}]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#757575"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#e5e5e5"}]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#9e9e9e"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#757575"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{"color": "#dadada"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#616161"}]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#9e9e9e"}]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{"color": "#e5e5e5"}]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{"color": "#eeeeee"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#e9e9e9"}]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#9e9e9e"}]
  }
];

interface MapComponentProps {
  selectedTrip: Trip | null;
  onTripSelect?: (trip: Trip) => void;
}

function MapComponent({ selectedTrip, onTripSelect }: MapComponentProps) {
  // All state hooks at the top level
  const [isInfoCardExpanded, setIsInfoCardExpanded] = useState(true);
  const [showTripThumbnails, setShowTripThumbnails] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // All ref hooks
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  
  // API key should be stored in environment variables
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
    libraries: ['geometry']
  });
  
  // All callback hooks
  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);
  
  // Mouse drag event handlers for carousel
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    
    isDraggingRef.current = true;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
    
    // Change cursor style
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
      carouselRef.current.style.userSelect = 'none';
    }
  }, []);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Multiply by 1.5 for faster dragging
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
    e.preventDefault();
  }, []);
  
  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
      carouselRef.current.style.removeProperty('user-select');
    }
  }, []);
  
  // Function to handle fullscreen changes
  const handleFullscreenChange = useCallback(() => {
    const isInFullScreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );
    setIsFullscreen(isInFullScreen);
  }, []);
  
  // Log any load errors
  React.useEffect(() => {
    if (loadError) {
      console.error('Google Maps loading error:', loadError);
    }
  }, [loadError]);
  
  // Add fullscreen event listeners
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);
  
  // Calculate the truck front and back positions and heading on the route
  const calculateTruckPositionAndHeading = useCallback((trip: Trip) => {
    if (!trip || !trip.route || trip.route.length < 2) {
      return { 
        frontPosition: trip.currentLocation, 
        backPosition: trip.currentLocation, 
        heading: 0,
        centerPosition: trip.currentLocation
      };
    }
    
    // For demo purposes, we can pick a point that's 40% along the route
    // This would normally be calculated based on real-time trip data
    const demoProgress = 0.4; // 40% through the route
    
    // Calculate which point on the route to use
    const routeLength = trip.route.length;
    const pointIndex = Math.floor(demoProgress * (routeLength - 1));
    
    // Make sure we have valid indices for calculating the heading
    if (pointIndex >= routeLength - 1) {
      // We're at the last point, so use the direction from previous point
      const prevPoint = trip.route[routeLength - 2];
      const currentPoint = trip.route[routeLength - 1];
      
      // Use Google Maps geometry library to calculate heading
      const prevLatLng = new google.maps.LatLng(prevPoint.lat, prevPoint.lng);
      const currLatLng = new google.maps.LatLng(currentPoint.lat, currentPoint.lng);
      const heading = google.maps.geometry.spherical.computeHeading(prevLatLng, currLatLng);
      
      // Calculate truck length in meters (approximately)
      const truckLengthMeters = 30; // Adjust based on your truck size
      
      // Calculate back position by moving opposite to the heading direction
      const backPosition = google.maps.geometry.spherical.computeOffset(
        currLatLng,
        truckLengthMeters / 2, // Half truck length backward
        (heading + 180) % 360 // Opposite direction
      );
      
      // Calculate front position by moving in the heading direction
      const frontPosition = google.maps.geometry.spherical.computeOffset(
        currLatLng,
        truckLengthMeters / 2, // Half truck length forward
        heading
      );
      
      return { 
        frontPosition: { lat: frontPosition.lat(), lng: frontPosition.lng() },
        backPosition: { lat: backPosition.lat(), lng: backPosition.lng() },
        heading: heading,
        centerPosition: currentPoint
      };
    } else {
      // Normal case - use current point and next point to determine heading
      const currentPoint = trip.route[pointIndex];
      const nextPoint = trip.route[pointIndex + 1];
      
      // Use Google Maps geometry library to calculate heading
      const currLatLng = new google.maps.LatLng(currentPoint.lat, currentPoint.lng);
      const nextLatLng = new google.maps.LatLng(nextPoint.lat, nextPoint.lng);
      const heading = google.maps.geometry.spherical.computeHeading(currLatLng, nextLatLng);
      
      // Calculate truck length in meters (approximately)
      const truckLengthMeters = 30; // Adjust based on your truck size
      
      // Calculate back position by moving opposite to the heading direction
      const backPosition = google.maps.geometry.spherical.computeOffset(
        currLatLng,
        truckLengthMeters / 2, // Half truck length backward
        (heading + 180) % 360 // Opposite direction
      );
      
      // Calculate front position by moving in the heading direction
      const frontPosition = google.maps.geometry.spherical.computeOffset(
        currLatLng,
        truckLengthMeters / 2, // Half truck length forward
        heading
      );
      
      return { 
        frontPosition: { lat: frontPosition.lat(), lng: frontPosition.lng() },
        backPosition: { lat: backPosition.lat(), lng: backPosition.lng() },
        heading: heading,
        centerPosition: currentPoint
      };
    }
  }, []);
  
  // Calculate just the truck heading based on the route, applying SVG-specific correction
  const calculateTruckHeading = useCallback((trip: Trip) => {
    // Uber/Waze approach: Calculate base heading using Google's computeHeading, then adjust based on SVG orientation
    // Our truck SVG is naturally pointing up (0 degrees), but Google Maps' 0 is East, so we need to adjust
    const heading = calculateTruckPositionAndHeading(trip).heading;
    
    // Maps 0° (East) -> needs to be 90° for our SVG
    // Maps 90° (North) -> needs to be 0° for our SVG
    // Maps 180° (West) -> needs to be 270° for our SVG
    // Maps 270° (South) -> needs to be 180° for our SVG
    return (heading - 90 + 360) % 360;
  }, [calculateTruckPositionAndHeading]);
  
  // We don't need the getRotatedTruckIcon function anymore since we're using the OverlayView
  
  const center = useMemo(() => {
    if (selectedTrip) {
      return selectedTrip.currentLocation;
    }
    // Default center if no trip is selected
    return { lat: -28.4792, lng: 24.6727 }; // Center of South Africa
  }, [selectedTrip]);

  const bounds = useMemo(() => {
    if (selectedTrip && isLoaded) {
      try {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(selectedTrip.startCoordinates);
        bounds.extend(selectedTrip.destinationCoordinates);
        selectedTrip.route.forEach((point) => {
          bounds.extend(point);
        });
        return bounds;
      } catch (error) {
        console.error('Error creating bounds:', error);
        return null;
      }
    }
    return null;
  }, [selectedTrip, isLoaded]);

  // Fit bounds when map and bounds are available
  React.useEffect(() => {
    if (map && bounds) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  if (!isLoaded) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        bgcolor: 'grey.100',
        borderRadius: 3
      }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // Display error message if maps failed to load
  if (loadError) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        bgcolor: 'grey.100',
        borderRadius: 3,
        p: 3,
        textAlign: 'center'
      }}>
        <Typography variant="h6" color="error" gutterBottom>
          Google Maps Error
        </Typography>
        <Typography variant="body2">
          This page can't load Google Maps correctly. Please check your API key configuration.
        </Typography>
      </Box>
    );
  }


  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    const mapElement = mapContainerRef.current;
    if (!mapElement) return;
    
    if (!document.fullscreenElement) {
      if (mapElement.requestFullscreen) {
        mapElement.requestFullscreen();
      } else if ((mapElement as any).webkitRequestFullscreen) {
        (mapElement as any).webkitRequestFullscreen();
      } else if ((mapElement as any).msRequestFullscreen) {
        (mapElement as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  return (
    <Box 
      ref={mapContainerRef}
      sx={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
      }}
    >
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6} // Using lower zoom to better view South Africa region
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: false, // Using our custom fullscreen control
          }}
        >
        {selectedTrip && isLoaded && (
          <>
            {/* Start marker */}
            <Marker
              position={selectedTrip.startCoordinates}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#12B76A', // Green
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#FFFFFF',
              }}
            />

            {/* Destination marker */}
            <Marker
              position={selectedTrip.destinationCoordinates}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#2970FF', // Blue
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#FFFFFF',
              }}
            />

            {/* Route line - drawn FIRST to ensure truck appears on top */}
            <Polyline
              path={selectedTrip.route}
              options={{
                strokeColor: '#6941C6', // Purple
                strokeOpacity: 1.0, // Fully opaque to ensure visibility
                strokeWeight: 6, // Slightly thicker
                zIndex: 1 // Lower than the truck marker
              }}
            />
            

            

            {/* Professional implementation like Uber/Waze - single SVG with correct rotation */}
            {/* Truck front and back points for debugging (can be hidden in production) */}
            <Marker
              position={calculateTruckPositionAndHeading(selectedTrip).frontPosition}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                fillColor: '#FF5733', // Orange-ish
                fillOpacity: 0.8,
                strokeWeight: 1,
                strokeColor: '#FFFFFF',
              }}
              title="Truck Front"
            />
            
            <Marker
              position={calculateTruckPositionAndHeading(selectedTrip).backPosition}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                fillColor: '#33A1FF', // Light blue
                fillOpacity: 0.8,
                strokeWeight: 1,
                strokeColor: '#FFFFFF',
              }}
              title="Truck Back"
            />

            <OverlayView
              position={calculateTruckPositionAndHeading(selectedTrip).centerPosition}
              mapPaneName={OverlayView.OVERLAY_LAYER}
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2)
              })}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '150px',
                  height: '80px',
                  transform: `rotate(${calculateTruckHeading(selectedTrip)}deg)`, // Heading is pre-adjusted in the calculation
                  transformOrigin: 'center center',
                  pointerEvents: 'none', // Ensures clicks pass through to the map
                }}
              >
                <img
                  src="/Truck top down.svg"
                  alt="Truck"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </OverlayView>
          </>
        )}
      </GoogleMap>
      )}

      {/* Map control buttons - always visible, even in fullscreen */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px', // 24px padding between buttons
      }}>
        {/* Trip Data Button */}
        <IconButton 
          onClick={() => setIsInfoCardExpanded(!isInfoCardExpanded)}
          size="small"
          sx={{ 
            width: 40,
            height: 40,
            bgcolor: isInfoCardExpanded ? 'white' : '#6941C6',
            color: isInfoCardExpanded ? '#6941C6' : 'white',
            border: '2px solid white',
            borderRadius: '4px',
            '&:hover': { 
              bgcolor: isInfoCardExpanded ? '#f5f5f5' : '#5632a8' 
            },
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          title="Trip Data"
        >
          {isInfoCardExpanded ? <ExpandLessIcon /> : <LocalShippingIcon />}
        </IconButton>
        
        {/* Fullscreen Button */}
        <IconButton 
          onClick={toggleFullscreen}
          size="small"
          sx={{ 
            width: 40,
            height: 40,
            bgcolor: 'white',
            color: '#6941C6',
            border: '2px solid white',
            borderRadius: '4px',
            '&:hover': { 
              bgcolor: '#f5f5f5'
            },
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        
        {/* Show/Hide UI Button */}
        <IconButton 
          onClick={() => setShowTripThumbnails(!showTripThumbnails)}
          size="small"
          sx={{ 
            width: 40,
            height: 40,
            bgcolor: showTripThumbnails ? 'white' : '#6941C6',
            color: showTripThumbnails ? '#6941C6' : 'white',
            border: '2px solid white',
            borderRadius: '4px',
            '&:hover': { 
              bgcolor: showTripThumbnails ? '#f5f5f5' : '#5632a8'
            },
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          title="Show/Hide Other Trips"
        >
          {showTripThumbnails ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </div>
      
      {/* Map overlay with trip info */}
      {isInfoCardExpanded && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 300,
            height: 'auto',
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10,
            overflow: 'hidden'
          }}
        >
          {/* Expanded State - Shows all trip info */}
          <Box sx={{ width: '100%' }}>
            {selectedTrip ? (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {selectedTrip.id}
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  <strong>Driver:</strong> {selectedTrip.driverName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Cargo:</strong> {selectedTrip.cargoType}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Client:</strong> {selectedTrip.clientName}, {selectedTrip.clientCompany}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Start:</strong> {new Date(selectedTrip.startTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>ETA:</strong> {new Date(selectedTrip.estimatedArrival).toLocaleString()}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No Trip Selected
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  Please select a trip from the list to view details.
                </Typography>
                
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  Use the thumbnails below to select a trip for tracking.
                </Typography>
              </>
            )}
          </Box>
        </Paper>
      )}

      {!selectedTrip && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            p: 2,
            borderRadius: 2,
            maxWidth: '80%',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 10
          }}
        >
          <Typography variant="subtitle1">
            Select a trip to view on the map
          </Typography>
        </Box>
      )}

      {/* Trip Thumbnails Navigation */}
      <Collapse 
        in={showTripThumbnails} 
        timeout={300}
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '95%',
          width: 'auto',
          zIndex: 100, // High z-index to ensure visibility
          pointerEvents: 'auto',
          '&.MuiCollapse-root': {  
            visibility: 'visible !important', // Force visibility in fullscreen
          },
          // Support for fullscreen mode
          '.fullscreen-enabled &, :fullscreen &': {
            position: 'fixed',
            bottom: 16,
            zIndex: 9999,
          }
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Stack 
            direction="row" 
            spacing={1.5} 
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            sx={{ 
              overflowX: 'auto',
              pb: 1,
              cursor: 'grab',
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '10px',
              }
            }}
          >
            {mockTrips.map((trip) => (
              <Zoom key={trip.id} in={true} style={{ transitionDelay: '100ms' }}>
                <Paper 
                  elevation={trip.id === selectedTrip?.id ? 8 : 1}
                  sx={{
                    p: 1.5,
                    minWidth: 150,
                    maxWidth: 180,
                    cursor: 'pointer',
                    border: trip.id === selectedTrip?.id ? '2px solid #6941C6' : '1px solid #E0E0E0',
                    backgroundColor: trip.id === selectedTrip?.id ? 'rgba(105, 65, 198, 0.1)' : 'white',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                  onClick={(e) => {
                    // Only trigger trip selection if we're not dragging
                    if (!isDraggingRef.current && onTripSelect) {
                      onTripSelect(trip);
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box 
                      sx={{
                        width: 10, 
                        height: 10, 
                        borderRadius: '50%', 
                        bgcolor: trip.status === 'normal' ? '#12B76A' : 
                                trip.status === 'warning' ? '#F79009' : '#F04438',
                        mr: 1
                      }}
                    />
                    <Typography variant="caption" noWrap>
                      {trip.id}
                    </Typography>
                  </Box>
                  <Tooltip title={trip.startAddress} arrow placement="top">
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.77rem' }} noWrap>
                      From: {trip.startAddress.split(',')[0]}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={trip.destinationAddress} arrow placement="bottom">
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.77rem' }} noWrap>
                      To: {trip.destinationAddress.split(',')[0]}
                    </Typography>
                  </Tooltip>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, justifyContent: 'space-between' }}>
                    <Avatar
                      src={trip.clientPhotoUrl}
                      alt={trip.driverName}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Chip 
                      label={trip.cargoCategory.split('-').join(' ')} 
                      size="small" 
                      color={trip.cargoCategory === 'explosives' ? 'error' : 
                            trip.cargoCategory === 'chemicals' ? 'warning' : 'default'}
                      variant="outlined"
                      sx={{ height: 20, '& .MuiChip-label': { fontSize: '0.625rem', px: 0.5 } }}
                    />
                  </Box>
                </Paper>
              </Zoom>
            ))}
          </Stack>
        </Paper>
      </Collapse>
    </Box>
  );
}

export default React.memo(MapComponent);
