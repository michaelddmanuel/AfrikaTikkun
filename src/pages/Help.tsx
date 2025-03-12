import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  LiveHelp as LiveHelpIcon,
  Book as BookIcon,
  OndemandVideo as VideoIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Forum as ForumIcon,
  Lightbulb as TipIcon
} from '@mui/icons-material';

// Mock FAQ data
const faqData = [
  {
    question: "How do I track a specific truck?",
    answer: "You can track a specific truck by selecting it from the 'Trips in Progress' page. Click on any trip card to see detailed information and real-time location on the map."
  },
  {
    question: "What do the different alert colors mean?",
    answer: "Red alerts indicate critical issues that require immediate attention. Yellow alerts are warnings that should be addressed soon. Green indicates normal operation with no issues."
  },
  {
    question: "How often is the truck location updated?",
    answer: "Truck locations are updated every 30 seconds by default. You can change this setting in the Settings page under Performance > Map Refresh Rate."
  },
  {
    question: "Can I download trip reports?",
    answer: "Yes, you can generate and download reports from the Reports page. Select the report type you need and click the 'Download' button."
  },
  {
    question: "How do I view camera feeds?",
    answer: "Navigate to the Camera Feeds page from the sidebar menu. Select the trip you want to monitor and you'll see all available camera feeds for that truck."
  },
  {
    question: "What should I do if I notice a critical alert?",
    answer: "Critical alerts require immediate attention. Click on the alert to see details, then contact the driver and/or dispatch team using the contact information provided."
  },
  {
    question: "Can I customize the dashboard layout?",
    answer: "Currently, the dashboard layout is fixed, but you can customize colors and appearance in the Settings page under the Appearance tab."
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Help & Support
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          How can we help you today?
        </Typography>
        <TextField
          fullWidth
          placeholder="Search for help topics..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', height: '100%', borderRadius: 2 }}>
              <CardContent>
                <BookIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  User Guide
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comprehensive documentation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', height: '100%', borderRadius: 2 }}>
              <CardContent>
                <VideoIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Video Tutorials
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Step-by-step visual guides
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', height: '100%', borderRadius: 2 }}>
              <CardContent>
                <ForumIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Community Forum
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Connect with other users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', height: '100%', borderRadius: 2 }}>
              <CardContent>
                <LiveHelpIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Live Chat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Talk to support now
                </Typography>
                <Chip 
                  label="Online" 
                  size="small" 
                  color="success" 
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Frequently Asked Questions
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <Accordion 
              key={index}
              expanded={expanded === `panel${index}`} 
              onChange={handleAccordionChange(`panel${index}`)}
              sx={{ 
                mb: 1,
                boxShadow: 1,
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  borderRadius: expanded === `panel${index}` ? '4px 4px 0 0' : 4,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <HelpIcon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="body1" color="text.secondary">
              No results found for "{searchQuery}". Try a different search term or browse all FAQs.
            </Typography>
          </Paper>
        )}
      </Box>
      
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Quick Tips
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2, height: '100%', display: 'flex' }}>
            <TipIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Keyboard Shortcuts
              </Typography>
              <Typography variant="body2">
                Press 'F' to toggle fullscreen map view. Use arrow keys to navigate between trips.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2, height: '100%', display: 'flex' }}>
            <TipIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Camera Feeds
              </Typography>
              <Typography variant="body2">
                Double-click on any camera feed to enter fullscreen mode for better viewing.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2, height: '100%', display: 'flex' }}>
            <TipIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Data Usage
              </Typography>
              <Typography variant="body2">
                Enable 'Data Saver' mode in Settings when using the dashboard on mobile connections.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Contact Support
      </Typography>
      
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <EmailIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Email Support
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                24/7 response within 4 hours
              </Typography>
              <Button variant="outlined" startIcon={<EmailIcon />}>
                support@aceimining.com
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <PhoneIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Phone Support
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Available 8am-8pm Mon-Fri
              </Typography>
              <Button variant="outlined" startIcon={<PhoneIcon />}>
                +1 (800) 555-0123
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <LiveHelpIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Live Chat
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Instant assistance from our team
              </Typography>
              <Button variant="contained" color="primary" startIcon={<LiveHelpIcon />}>
                Start Chat
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
