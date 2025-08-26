import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  styled
} from '@mui/material';
import YouTubeEmbed from '../components/camera/YouTubeEmbed';
import {
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Security as SecurityIcon,
  PersonSearch as PersonSearchIcon,
  ErrorOutline as ErrorOutlineIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  Shield as ShieldIcon,
  Report as ReportIcon,
  Videocam as VideocamIcon
} from '@mui/icons-material';

// Mock data for outlier detection
const mockFraudDetection = [
  { id: 1, type: 'Unusual Purchase Pattern', user: 'John Smith', amount: '$2,450', risk: 'High', timestamp: '2024-01-15 14:30' },
  { id: 2, type: 'Multiple Failed Logins', user: 'Sarah Johnson', attempts: 8, risk: 'Medium', timestamp: '2024-01-15 13:45' },
  { id: 3, type: 'Off-hours Access', user: 'Mike Wilson', location: 'Kitchen Storage', risk: 'Low', timestamp: '2024-01-15 02:15' },
  { id: 4, type: 'Inventory Discrepancy', user: 'Lisa Brown', item: 'Premium Beef', variance: '-15%', risk: 'High', timestamp: '2024-01-15 11:20' },
];

const mockMismanagementDetection = [
  { id: 1, issue: 'Excessive Food Waste', department: 'Kitchen Prep', waste: '23%', impact: 'High', responsible: 'Team Lead A' },
  { id: 2, issue: 'Inefficient Scheduling', department: 'Service Staff', overtime: '45hrs', impact: 'Medium', responsible: 'Manager B' },
  { id: 3, issue: 'Equipment Misuse', department: 'Cleaning', maintenance: '$1,200', impact: 'Medium', responsible: 'Staff C' },
  { id: 4, issue: 'Poor Inventory Rotation', department: 'Storage', expired: '8 items', impact: 'Low', responsible: 'Supervisor D' },
];

const mockSuspiciousActivities = [
  { id: 1, activity: 'Bulk Item Removal', user: 'Alex Turner', quantity: '50 units', time: '23:45', status: 'Under Review' },
  { id: 2, activity: 'System Access Override', user: 'Emma Davis', system: 'POS Terminal', time: '01:30', status: 'Flagged' },
  { id: 3, activity: 'Unusual Cash Handling', user: 'Ryan Clark', amount: '$850', time: '22:15', status: 'Investigating' },
  { id: 4, activity: 'Inventory Count Mismatch', user: 'Sophie White', variance: '12 items', time: '06:00', status: 'Resolved' },
];

const mockReports = [
  { id: 1, title: 'Weekly Fraud Analysis', date: '2024-01-15', type: 'Fraud Detection', status: 'Completed', findings: 12 },
  { id: 2, title: 'Staff Performance Review', date: '2024-01-14', type: 'Mismanagement', status: 'In Progress', findings: 8 },
  { id: 3, title: 'Security Incident Report', date: '2024-01-13', type: 'Security Breach', status: 'Completed', findings: 3 },
  { id: 4, title: 'Inventory Audit Report', date: '2024-01-12', type: 'Inventory', status: 'Pending Review', findings: 15 },
];

// Mock camera monitoring data for outlier events
const mockOutlierVideoFeeds = [
  {
    id: 'OUTLIER-001',
    title: 'Unusual After-Hours Activity',
    location: 'Main Kitchen',
    timestamp: '2024-01-15 23:45',
    severity: 'High',
    videoUrl: 'https://www.youtube.com/watch?v=qLkACxD6wNY',
    description: 'Staff member accessing kitchen area outside normal hours without authorization',
    status: 'Under Investigation'
  },
  {
    id: 'OUTLIER-002', 
    title: 'Inventory Removal Pattern',
    location: 'Dry Storage',
    timestamp: '2024-01-15 18:30',
    severity: 'Medium',
    videoUrl: 'https://www.youtube.com/watch?v=dHcxTmU6atk',
    description: 'Large quantity of items removed in short timeframe without proper documentation',
    status: 'Flagged'
  },
  {
    id: 'OUTLIER-003',
    title: 'Suspicious Cash Handling',
    location: 'Receiving Bay',
    timestamp: '2024-01-15 16:20',
    severity: 'High',
    videoUrl: 'https://www.youtube.com/shorts/tJOHCAOSgSQ',
    description: 'Unusual cash transaction patterns detected during delivery processing',
    status: 'Investigating'
  },
  {
    id: 'OUTLIER-004',
    title: 'Equipment Misuse Alert',
    location: 'Walk-in Freezer',
    timestamp: '2024-01-15 14:15',
    severity: 'Low',
    videoUrl: 'https://www.youtube.com/watch?v=zolQCp3OTMI',
    description: 'Equipment used outside standard operating procedures',
    status: 'Resolved'
  }
];

// Color constants
const colors = {
  oxfordBlue: '#002147',
  greyBlue: '#475569',
  lightGrey: '#f8fafc',
  paleGreyBlue: '#e2e8f0',
  mediumGrey: '#f1f5f9',
  white: '#ffffff',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444'
};

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  border: '1px solid #e4e7ec',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1), 0px 2px 4px rgba(16, 24, 40, 0.06)'
  }
}));

const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '14px',
  padding: '8px 16px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
  }
}));

const StatsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const StatsBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));

const StatsIconBox = styled(Box)(() => ({
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '16px',
  width: '48px',
  height: '48px'
}));

const StatsValue = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '32px',
  color: colors.oxfordBlue
}));

const StatsLabel = styled(Typography)(() => ({
  color: colors.greyBlue,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px'
}));

const OutlierDetection: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate analytics values
  const totalFraudAlerts = mockFraudDetection.length;
  const highRiskIncidents = mockFraudDetection.filter(item => item.risk === 'High').length;
  const activeSuspiciousActivities = mockSuspiciousActivities.filter(item => item.status !== 'Resolved').length;
  const completedReports = mockReports.filter(item => item.status === 'Completed').length;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '28px', 
              color: colors.oxfordBlue,
              mb: 1 
            }}
          >
            Outlier Detection Dashboard
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: colors.greyBlue,
              mb: 3 
            }}
          >
            Monitor and analyze suspicious activities, fraud detection, and operational anomalies
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ModernButton 
            variant="outlined" 
            startIcon={<TimelineIcon />}
            sx={{
              borderColor: '#d0d5dd',
              color: colors.greyBlue,
              '&:hover': {
                borderColor: '#98a2b3',
                backgroundColor: colors.lightGrey
              }
            }}
          >
            Export Report
          </ModernButton>
          <ModernButton 
            variant="contained" 
            startIcon={<BarChartIcon />}
            sx={{
              backgroundColor: colors.oxfordBlue,
              '&:hover': {
                backgroundColor: '#001a36'
              }
            }}
          >
            Generate Analysis
          </ModernButton>
        </Box>
      </Box>

      {/* Key Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{totalFraudAlerts}</StatsValue>
                  <StatsLabel>Fraud Risk Alerts</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#fee2e2' }}>
                <SecurityIcon sx={{ color: colors.error, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{highRiskIncidents}</StatsValue>
                  <StatsLabel>High Risk Incidents</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#fef3c7' }}>
                <WarningIcon sx={{ color: colors.warning, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{activeSuspiciousActivities}</StatsValue>
                  <StatsLabel>Active Investigations</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#dbeafe' }}>
                <PersonSearchIcon sx={{ color: '#2563eb', fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{completedReports}</StatsValue>
                  <StatsLabel>Completed Reports</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#dcfce7' }}>
                <ReportIcon sx={{ color: colors.success, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Tabs for different detection views */}
      <StyledCard sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="outlier detection tabs"
          sx={{
            '& .MuiTab-root': {
              color: colors.greyBlue,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '48px',
              '&.Mui-selected': {
                color: colors.oxfordBlue
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: colors.oxfordBlue,
              height: 3,
              borderRadius: '2px 2px 0 0'
            }
          }}
        >
          <Tab label="Fraud Detection" icon={<SecurityIcon />} iconPosition="start" />
          <Tab label="Mismanagement" icon={<ErrorOutlineIcon />} iconPosition="start" />
          <Tab label="Suspicious Activity" icon={<PersonSearchIcon />} iconPosition="start" />
          <Tab label="Investigation Reports" icon={<AssessmentIcon />} iconPosition="start" />
          <Tab label="Camera Monitoring" icon={<VideocamIcon />} iconPosition="start" />
        </Tabs>
      </StyledCard>

      {/* Fraud Detection Tab */}
      {tabValue === 0 && (
        <StyledCard sx={{ overflow: 'hidden' }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Fraud Detection Analysis</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  backgroundColor: '#f9fafb',
                  borderBottom: '1px solid #e4e7ec'
                }}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Detection Type</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>User/Entity</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Details</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Risk Level</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Timestamp</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockFraudDetection.map((detection, index) => (
                  <TableRow 
                    key={detection.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockFraudDetection.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{detection.type}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{detection.user}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      {detection.amount && `Amount: ${detection.amount}`}
                      {detection.attempts && `Attempts: ${detection.attempts}`}
                      {detection.location && `Location: ${detection.location}`}
                      {detection.item && `Item: ${detection.item}`}
                      {detection.variance && `Variance: ${detection.variance}`}
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={detection.risk} 
                        size="small"
                        sx={{
                          backgroundColor: detection.risk === 'High' ? '#fee2e2' : detection.risk === 'Medium' ? '#fef3c7' : '#dcfce7',
                          color: detection.risk === 'High' ? colors.error : detection.risk === 'Medium' ? colors.warning : colors.success,
                          fontWeight: 500,
                          fontSize: '12px',
                          height: '22px',
                          borderRadius: '6px'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{detection.timestamp}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <ModernButton size="small" variant="outlined" sx={{ mr: 1, borderColor: colors.greyBlue, color: colors.greyBlue }}>
                        Investigate
                      </ModernButton>
                      <ModernButton size="small" variant="text" sx={{ color: colors.error }}>
                        Flag
                      </ModernButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      )}

      {/* Mismanagement Detection Tab */}
      {tabValue === 1 && (
        <StyledCard sx={{ overflow: 'hidden' }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Mismanagement Detection</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  backgroundColor: '#f9fafb',
                  borderBottom: '1px solid #e4e7ec'
                }}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Issue Type</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Department</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Impact Metrics</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Impact Level</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Responsible</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockMismanagementDetection.map((issue, index) => (
                  <TableRow 
                    key={issue.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockMismanagementDetection.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{issue.issue}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{issue.department}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      {issue.waste && `Waste: ${issue.waste}`}
                      {issue.overtime && `Overtime: ${issue.overtime}`}
                      {issue.maintenance && `Cost: ${issue.maintenance}`}
                      {issue.expired && `Expired: ${issue.expired}`}
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={issue.impact} 
                        size="small"
                        sx={{
                          backgroundColor: issue.impact === 'High' ? '#fee2e2' : issue.impact === 'Medium' ? '#fef3c7' : '#dcfce7',
                          color: issue.impact === 'High' ? colors.error : issue.impact === 'Medium' ? colors.warning : colors.success,
                          fontWeight: 500,
                          fontSize: '12px',
                          height: '22px',
                          borderRadius: '6px'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{issue.responsible}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <ModernButton size="small" variant="outlined" sx={{ mr: 1, borderColor: colors.greyBlue, color: colors.greyBlue }}>
                        Review
                      </ModernButton>
                      <ModernButton size="small" variant="text" sx={{ color: colors.oxfordBlue }}>
                        Assign
                      </ModernButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      )}

      {/* Suspicious Activity Tab */}
      {tabValue === 2 && (
        <StyledCard sx={{ overflow: 'hidden' }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Suspicious Activity Monitoring</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  backgroundColor: '#f9fafb',
                  borderBottom: '1px solid #e4e7ec'
                }}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Activity Type</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>User</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Details</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Time</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Status</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockSuspiciousActivities.map((activity, index) => (
                  <TableRow 
                    key={activity.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockSuspiciousActivities.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{activity.activity}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{activity.user}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      {activity.quantity && `Quantity: ${activity.quantity}`}
                      {activity.system && `System: ${activity.system}`}
                      {activity.amount && `Amount: ${activity.amount}`}
                      {activity.variance && `Variance: ${activity.variance}`}
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{activity.time}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={activity.status} 
                        size="small"
                        sx={{
                          backgroundColor: 
                            activity.status === 'Flagged' ? '#fee2e2' : 
                            activity.status === 'Under Review' ? '#fef3c7' : 
                            activity.status === 'Investigating' ? '#dbeafe' : '#dcfce7',
                          color: 
                            activity.status === 'Flagged' ? colors.error : 
                            activity.status === 'Under Review' ? colors.warning : 
                            activity.status === 'Investigating' ? '#2563eb' : colors.success,
                          fontWeight: 500,
                          fontSize: '12px',
                          height: '22px',
                          borderRadius: '6px'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <ModernButton size="small" variant="outlined" sx={{ mr: 1, borderColor: colors.greyBlue, color: colors.greyBlue }}>
                        Details
                      </ModernButton>
                      <ModernButton size="small" variant="text" sx={{ color: colors.oxfordBlue }}>
                        Update
                      </ModernButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      )}

      {/* Investigation Reports Tab */}
      {tabValue === 3 && (
        <StyledCard sx={{ overflow: 'hidden' }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Investigation Reports</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  backgroundColor: '#f9fafb',
                  borderBottom: '1px solid #e4e7ec'
                }}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Report Title</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Date</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Type</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Status</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Findings</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockReports.map((report, index) => (
                  <TableRow 
                    key={report.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockReports.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{report.title}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{report.date}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{report.type}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={report.status} 
                        size="small"
                        sx={{
                          backgroundColor: 
                            report.status === 'Completed' ? '#dcfce7' : 
                            report.status === 'In Progress' ? '#dbeafe' : '#fef3c7',
                          color: 
                            report.status === 'Completed' ? colors.success : 
                            report.status === 'In Progress' ? '#2563eb' : colors.warning,
                          fontWeight: 500,
                          fontSize: '12px',
                          height: '22px',
                          borderRadius: '6px'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{report.findings}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <ModernButton size="small" variant="outlined" sx={{ mr: 1, borderColor: colors.greyBlue, color: colors.greyBlue }}>
                        View
                      </ModernButton>
                      <ModernButton size="small" variant="text" sx={{ color: colors.oxfordBlue }}>
                        Download
                      </ModernButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      )}

      {/* Camera Monitoring Tab */}
      {tabValue === 4 && (
        <StyledCard sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Camera Monitoring - Outlier Events</Typography>
          <Grid container spacing={3}>
            {mockOutlierVideoFeeds.map((feed) => (
              <Grid item xs={12} md={6} key={feed.id}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)', 
                  height: '100%',
                  border: '1px solid #e4e7ec',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 8px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)'
                  }
                }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box sx={{ height: 220 }}>
                      <YouTubeEmbed 
                        videoUrl={feed.videoUrl}
                        title={feed.title}
                        autoplay={false}
                        loop={true}
                        height="220px"
                      />
                    </Box>
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 10, 
                        left: 10,
                        display: 'flex',
                        gap: 1
                      }}
                    >
                      <Chip 
                        label={feed.severity} 
                        size="small"
                        color={
                          feed.severity === 'High' ? 'error' : 
                          feed.severity === 'Medium' ? 'warning' : 'success'
                        }
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: '16px'
                        }}
                      />
                      <Chip 
                        label={feed.status} 
                        size="small"
                        color={
                          feed.status === 'Under Investigation' ? 'info' : 
                          feed.status === 'Flagged' ? 'warning' : 
                          feed.status === 'Investigating' ? 'error' : 'success'
                        }
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: '16px'
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
                        {feed.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, color: '#667085' }}>
                      {feed.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#667085', fontSize: '12px' }}>
                      Last updated: {feed.timestamp}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </StyledCard>
      )}
      </Box>
    </Container>
  );
};

export default OutlierDetection;
