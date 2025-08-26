import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Collapse
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
  Lightbulb as TipIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Oxford Blue, Grey Blue, White Color Palette
const colors = {
  oxfordBlue: '#002147',
  greyBlue: '#475569',
  lightGreyBlue: '#64748B',
  veryLightGreyBlue: '#94A3B8',
  paleGreyBlue: '#CBD5E1',
  white: '#FFFFFF',
  lightGrey: '#F8FAFC',
  mediumGrey: '#F1F5F9',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',
  purple: '#7C3AED'
};

const StyledCard = styled(Box)(({ theme }) => ({
  border: '1px solid #e4e7ec',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)',
    transform: 'translateY(-2px)',
    transition: 'all 0.2s ease-in-out',
    borderColor: '#e4e7ec',
  },
  height: '100%',
  padding: theme.spacing(3)
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px'
}));

const StatsIconBox = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
}));

const StatsValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '30px',
  lineHeight: '38px',
  color: colors.oxfordBlue,
  marginBottom: '4px'
}));

const StatsLabel = styled(Typography)(({ theme }) => ({
  color: colors.greyBlue,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px'
}));

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
      {/* Untitled UI Style Header */}
      <Box sx={{ mb: 4 }}>
        {/* Page Title Section */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 600,
              fontSize: '30px',
              lineHeight: '38px',
              color: colors.oxfordBlue,
              mb: 1
            }}
          >
            Help & Support
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              color: colors.greyBlue,
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400
            }}
          >
            Get help with your Kitchen 4 dashboard and find answers to common questions.
          </Typography>
        </Box>

        {/* Action Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 0
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              placeholder="Search help articles..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.greyBlue, fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: 320,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d0d5dd'
                  },
                  '&:hover fieldset': {
                    borderColor: '#98a2b3'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.oxfordBlue,
                    borderWidth: '2px'
                  }
                }
              }}
            />
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                borderColor: '#d0d5dd',
                color: colors.greyBlue,
                '&:hover': {
                  backgroundColor: '#f9fafb',
                  borderColor: '#98a2b3'
                }
              }}
            >
              Categories
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                borderColor: '#d0d5dd',
                color: colors.greyBlue,
                '&:hover': {
                  backgroundColor: '#f9fafb',
                  borderColor: '#98a2b3'
                }
              }}
            >
              Download Guide
            </Button>
            <Button 
              variant="contained" 
              startIcon={<LiveHelpIcon />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                backgroundColor: colors.oxfordBlue,
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#001a38'
                }
              }}
            >
              Contact Support
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Help Categories Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: '#dbeafe' }}>
                  <BookIcon sx={{ color: colors.oxfordBlue, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '18px', color: colors.oxfordBlue, mb: 0.5 }}>
                    User Guide
                  </Typography>
                  <Typography sx={{ color: colors.greyBlue, fontSize: '14px', lineHeight: '20px' }}>
                    Comprehensive documentation and tutorials
                  </Typography>
                </Box>
              </StatsBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: '#fef3c7' }}>
                  <VideoIcon sx={{ color: colors.warning, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '18px', color: colors.oxfordBlue, mb: 0.5 }}>
                    Video Tutorials
                  </Typography>
                  <Typography sx={{ color: colors.greyBlue, fontSize: '14px', lineHeight: '20px' }}>
                    Step-by-step visual guides
                  </Typography>
                </Box>
              </StatsBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: '#f3e8ff' }}>
                  <ForumIcon sx={{ color: colors.purple, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '18px', color: colors.oxfordBlue, mb: 0.5 }}>
                    Community
                  </Typography>
                  <Typography sx={{ color: colors.greyBlue, fontSize: '14px', lineHeight: '20px' }}>
                    Connect with other users
                  </Typography>
                </Box>
              </StatsBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: '#dcfce7' }}>
                  <LiveHelpIcon sx={{ color: colors.success, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '18px', color: colors.oxfordBlue, mb: 0.5 }}>
                    Live Chat
                  </Typography>
                  <Typography sx={{ color: colors.greyBlue, fontSize: '14px', lineHeight: '20px' }}>
                    Talk to support now
                  </Typography>
                  <Chip 
                    label="Online" 
                    size="small" 
                    sx={{
                      backgroundColor: '#dcfce7',
                      color: colors.success,
                      fontWeight: 600,
                      fontSize: '12px',
                      mt: 1
                    }}
                  />
                </Box>
              </StatsBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
      </Grid>
      
      {/* FAQ Section */}
      <StyledCard sx={{ mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
              color: colors.oxfordBlue,
              mb: 1
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              color: colors.greyBlue,
              fontSize: '14px',
              lineHeight: '20px'
            }}
          >
            Find answers to the most common questions about Kitchen 4 dashboard.
          </Typography>
        </Box>
        
        <Box>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <Accordion 
                key={index}
                expanded={expanded === `panel${index}`} 
                onChange={handleAccordionChange(`panel${index}`)}
                sx={{ 
                  mb: 2,
                  border: '1px solid #e4e7ec',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  '&:before': {
                    display: 'none',
                  },
                  '&:last-child': {
                    mb: 0
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: colors.greyBlue }} />}
                  sx={{ 
                    backgroundColor: expanded === `panel${index}` ? '#f8fafc' : '#ffffff',
                    borderRadius: expanded === `panel${index}` ? '8px 8px 0 0' : '8px',
                    minHeight: '56px',
                    '&.Mui-expanded': {
                      minHeight: '56px'
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HelpIcon sx={{ color: colors.oxfordBlue, mr: 2, fontSize: 20 }} />
                    <Typography 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: colors.oxfordBlue
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                  <Typography 
                    sx={{
                      color: colors.greyBlue,
                      fontSize: '14px',
                      lineHeight: '20px',
                      ml: 4
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <Typography 
                sx={{
                  color: colors.greyBlue,
                  fontSize: '14px',
                  lineHeight: '20px'
                }}
              >
                No results found for "{searchQuery}". Try a different search term or browse all FAQs.
              </Typography>
            </Box>
          )}
        </Box>
      </StyledCard>
      
      {/* Quick Tips Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
              color: colors.oxfordBlue,
              mb: 1
            }}
          >
            Quick Tips
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              color: colors.greyBlue,
              fontSize: '14px',
              lineHeight: '20px'
            }}
          >
            Pro tips to help you get the most out of your Kitchen 4 dashboard.
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <StatsIconBox sx={{ backgroundColor: '#fef3c7' }}>
                  <TipIcon sx={{ color: colors.warning, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '16px', color: colors.oxfordBlue, mb: 1 }}>
                    Keyboard Shortcuts
                  </Typography>
                  <Typography sx={{ color: colors.greyBlue, fontSize: '14px', lineHeight: '20px' }}>
                    Press 'F' to toggle fullscreen map view. Use arrow keys to navigate between trips.
                  </Typography>
                </Box>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <StatsIconBox sx={{ backgroundColor: '#dbeafe' }}>
                  <VideoIcon sx={{ color: colors.oxfordBlue, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '16px', color: colors.oxfordBlue, mb: 1 }}>
                    Camera Feeds
                  </Typography>
                  <Typography sx={{ color: colors.greyBlue, fontSize: '14px', lineHeight: '20px' }}>
                    Double-click on any camera feed to enter fullscreen mode for better viewing.
                  </Typography>
                </Box>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <StatsIconBox sx={{ backgroundColor: '#dcfce7' }}>
                  <TipIcon sx={{ color: colors.success, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '16px', color: colors.oxfordBlue, mb: 1 }}>
                    Data Usage
                  </Typography>
                  <Typography sx={{ color: colors.greyBlue, fontSize: '14px', lineHeight: '20px' }}>
                    Enable 'Data Saver' mode in Settings when using the dashboard on mobile connections.
                  </Typography>
                </Box>
              </Box>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
      
      {/* Contact Support Section */}
      <StyledCard>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
              color: colors.oxfordBlue,
              mb: 1
            }}
          >
            Contact Support
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              color: colors.greyBlue,
              fontSize: '14px',
              lineHeight: '20px'
            }}
          >
            Need more help? Get in touch with our support team.
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              p: 3,
              border: '1px solid #e4e7ec',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              height: '100%'
            }}>
              <StatsIconBox sx={{ backgroundColor: '#dbeafe', mb: 2 }}>
                <EmailIcon sx={{ color: colors.oxfordBlue, fontSize: 24 }} />
              </StatsIconBox>
              <Typography sx={{ fontWeight: 600, fontSize: '18px', color: colors.oxfordBlue, mb: 1 }}>
                Email Support
              </Typography>
              <Typography sx={{ color: colors.greyBlue, fontSize: '14px', mb: 2 }}>
                24/7 response within 4 hours
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<EmailIcon />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  borderColor: '#d0d5dd',
                  color: colors.greyBlue,
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                    borderColor: '#98a2b3'
                  }
                }}
              >
                support@aceimining.com
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              p: 3,
              border: '1px solid #e4e7ec',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              height: '100%'
            }}>
              <StatsIconBox sx={{ backgroundColor: '#fef3c7', mb: 2 }}>
                <PhoneIcon sx={{ color: colors.warning, fontSize: 24 }} />
              </StatsIconBox>
              <Typography sx={{ fontWeight: 600, fontSize: '18px', color: colors.oxfordBlue, mb: 1 }}>
                Phone Support
              </Typography>
              <Typography sx={{ color: colors.greyBlue, fontSize: '14px', mb: 2 }}>
                Available 8am-8pm Mon-Fri
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<PhoneIcon />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  borderColor: '#d0d5dd',
                  color: colors.greyBlue,
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                    borderColor: '#98a2b3'
                  }
                }}
              >
                +1 (800) 555-0123
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              p: 3,
              border: '1px solid #e4e7ec',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              height: '100%'
            }}>
              <StatsIconBox sx={{ backgroundColor: '#dcfce7', mb: 2 }}>
                <LiveHelpIcon sx={{ color: colors.success, fontSize: 24 }} />
              </StatsIconBox>
              <Typography sx={{ fontWeight: 600, fontSize: '18px', color: colors.oxfordBlue, mb: 1 }}>
                Live Chat
              </Typography>
              <Typography sx={{ color: colors.greyBlue, fontSize: '14px', mb: 2 }}>
                Instant assistance from our team
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<LiveHelpIcon />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  backgroundColor: colors.oxfordBlue,
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#001a38'
                  }
                }}
              >
                Start Chat
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledCard>
    </Box>
  );
}
