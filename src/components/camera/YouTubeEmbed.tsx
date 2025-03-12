import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface YouTubeEmbedProps {
  videoUrl: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoUrl,
  title,
  width = '100%',
  height = '220px',
  autoplay = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Render fallback content if video ID couldn't be extracted
  if (!videoId || hasError) {
    return (
      <Paper
        sx={{
          width,
          height,
          bgcolor: 'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url('https://images.unsplash.com/photo-1592838064575-537f3f9d218d?w=600&auto=format')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'error.main',
            py: 0.5,
            px: 1,
            borderRadius: 1,
          }}
        >
          <FiberManualRecordIcon sx={{ fontSize: 12, mr: 0.5 }} />
          <Typography variant="caption" fontWeight="bold">
            LIVE FEED
          </Typography>
        </Box>

        {title && (
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              p: 1,
            }}
          >
            {title}
          </Typography>
        )}
      </Paper>
    );
  }

  return (
    <Box sx={{ width, height, position: 'relative' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'background.default',
            zIndex: 1,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=1`}
        title={title || 'YouTube video player'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{ border: 'none' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          color: 'error.main',
          py: 0.5,
          px: 1,
          borderRadius: 1,
          zIndex: 2,
        }}
      >
        <FiberManualRecordIcon sx={{ fontSize: 12, mr: 0.5 }} />
        <Typography variant="caption" fontWeight="bold">
          LIVE FEED
        </Typography>
      </Box>
    </Box>
  );
};

export default YouTubeEmbed;
