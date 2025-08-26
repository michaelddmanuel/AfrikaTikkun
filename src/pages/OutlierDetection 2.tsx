import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  styled
} from '@mui/material';
import {
  AssessmentOutlined as AssessmentIcon,
  TimelineOutlined as TimelineIcon,
  WarningAmberOutlined as WarningIcon,
  FileDownload as FileDownloadIcon,
  EventNote as EventNoteIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  Report as ReportIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

// Styled components
const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
}));

const MetricCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
  height: '100%',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StatsIconBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: '50%',
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
}));

const StatsValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
}));

const StatsLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

// Define alert priority color coding
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return {
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        color: 'rgb(255, 99, 132)'
      };
    case 'Medium':
      return {
        backgroundColor: 'rgba(255, 159, 64, 0.1)',
        color: 'rgb(255, 159, 64)'
      };
    case 'Low':
      return {
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        color: 'rgb(75, 192, 192)'
      };
    default:
      return {
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        color: 'rgb(75, 192, 192)'
      };
  }
};

// Mock data for outliers
const mockOutlierData = [
  {
    id: 1,
    date: '2025-08-20',
    category: 'Purchase Price',
    description: 'Sugar purchase price 215% above average',
    itemName: 'Sugar',
    expectedValue: '$2.50/kg',
    actualValue: '$7.87/kg',
    priority: 'High',
    status: 'Unresolved'
  },
  {
    id: 2,
    date: '2025-08-19',
    category: 'Inventory Usage',
    description: 'Flour usage 178% above normal daily rate',
    itemName: 'Flour',
    expectedValue: '5 kg/day',
    actualValue: '13.9 kg/day',
    priority: 'High',
    status: 'Investigating'
  },
  {
    id: 3,
    date: '2025-08-18',
    category: 'Inventory Loss',
    description: 'Excessive spoilage of dairy products',
    itemName: 'Milk',
    expectedValue: '2% spoilage',
    actualValue: '12% spoilage',
    priority: 'Medium',
    status: 'Resolved'
  },
  {
    id: 4,
    date: '2025-08-17',
    category: 'Purchase Quantity',
    description: 'Unusual large order of vanilla extract',
    itemName: 'Vanilla Extract',
    expectedValue: '2 bottles/month',
    actualValue: '12 bottles/order',
    priority: 'Medium',
    status: 'Unresolved'
  },
  {
    id: 5,
    date: '2025-08-15',
    category: 'Purchase Frequency',
    description: 'Multiple small purchases from same supplier',
    itemName: 'Various items',
    expectedValue: '1 order/week',
    actualValue: '9 orders/week',
    priority: 'High',
    status: 'Investigating'
  },
  {
    id: 6,
    date: '2025-08-13',
    category: 'Inventory Count',
    description: 'Missing inventory after weekend',
    itemName: 'Premium Coffee Beans',
    expectedValue: '15 kg',
    actualValue: '7 kg',
    priority: 'High',
    status: 'Resolved'
  }
];

// Mock data for time trends
const mockTrendData = [
  { month: 'Jan', outlierCount: 2, fraudRisk: 1.2 },
  { month: 'Feb', outlierCount: 3, fraudRisk: 1.5 },
  { month: 'Mar', outlierCount: 5, fraudRisk: 2.1 },
  { month: 'Apr', outlierCount: 2, fraudRisk: 1.0 },
  { month: 'May', outlierCount: 4, fraudRisk: 1.7 },
  { month: 'Jun', outlierCount: 7, fraudRisk: 3.2 },
  { month: 'Jul', outlierCount: 8, fraudRisk: 3.8 },
  { month: 'Aug', outlierCount: 6, fraudRisk: 2.9 }
];

// Mock risk scores
const riskScores = {
  fraudRiskScore: 72,
  mismanagementRiskScore: 53,
  highRiskCategories: ['Purchase Price', 'Inventory Usage'],
  highRiskVendors: ['Super Foods Inc.', 'Global Ingredients Ltd.'],
  suspiciousUsers: ['JDoe', 'ASmith']
};

// Mock user activity data
const mockUserActivity = [
  {
    id: 1,
    user: 'JDoe',
    action: 'Modified purchase price',
    item: 'Sugar',
    dateTime: '2025-08-20 14:32',
    severity: 'High'
  },
  {
    id: 2,
    user: 'ASmith',
    action: 'Deleted inventory record',
    item: 'Flour',
    dateTime: '2025-08-19 09:17',
    severity: 'High'
  },
  {
    id: 3,
    user: 'BWilliams',
    action: 'Adjusted inventory count',
    item: 'Milk',
    dateTime: '2025-08-18 11:43',
    severity: 'Medium'
  },
  {
    id: 4,
    user: 'JDoe',
    action: 'Created multiple small orders',
    item: 'Various items',
    dateTime: '2025-08-17 16:05',
    severity: 'High'
  }
];

// Available report types
const reportTypes = [
  { id: 'fraud-summary', name: 'Fraud Risk Summary Report', format: 'PDF', icon: <ReportIcon /> },
  { id: 'outlier-detail', name: 'Detailed Outlier Analysis', format: 'Excel', icon: <AssessmentIcon /> },
  { id: 'user-activity', name: 'Suspicious User Activity Log', format: 'CSV', icon: <EventNoteIcon /> },
  { id: 'vendor-analysis', name: 'Vendor Risk Analysis', format: 'Excel', icon: <ShoppingCartIcon /> },
];

const OutlierDetection: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState('last30');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenReportDialog = () => {
    setReportDialogOpen(true);
  };

  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate and download the report
    console.log(`Generating ${selectedReport} report for ${dateRange}`);
    handleCloseReportDialog();
    
    // Mock download - in a real app this would trigger actual file download
    alert(`Report ${selectedReport} would be downloaded now.`);
  };

  const handleReportChange = (event: SelectChangeEvent) => {
    setSelectedReport(event.target.value as string);
  };

  const handleDateRangeChange = (event: SelectChangeEvent) => {
    setDateRange(event.target.value as string);
  };

  // Calculate some analytics for display
  const totalOutliers = mockOutlierData.length;
  const highPriorityOutliers = mockOutlierData.filter(item => item.priority === 'High').length;
  const unresolvedCount = mockOutlierData.filter(item => item.status === 'Unresolved').length;
  const investigatingCount = mockOutlierData.filter(item => item.status === 'Investigating').length;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          Outlier Detection Dashboard
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<AssessmentIcon />} 
            onClick={handleOpenReportDialog}
            sx={{ mr: 2 }}
          >
            Generate Report
          </Button>
          <Button 
            variant="contained" 
            startIcon={<TimelineIcon />}
          >
            Trend Analysis
          </Button>
        </Box>
      </Box>

      {/* Risk Scores Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard sx={{ borderLeft: '4px solid', borderColor: 'error.main' }}>
            <CardContent>
              <StatsContainer>
                <StatsBox>
                  <StatsIconBox sx={{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }}>
                    <WarningIcon sx={{ color: 'rgb(255, 99, 132)' }} />
                  </StatsIconBox>
                  <Box>
                    <StatsValue>{riskScores.fraudRiskScore}</StatsValue>
                    <StatsLabel>Fraud Risk Score</StatsLabel>
                  </Box>
                </StatsBox>
                <Chip 
                  label="High Risk" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 99, 132, 0.1)', 
                    color: 'rgb(255, 99, 132)',
                    fontWeight: 'bold'
                  }} 
                />
              </StatsContainer>
              <Typography variant="body2" color="text.secondary">
                {unresolvedCount} unresolved issues detected
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard sx={{ borderLeft: '4px solid', borderColor: 'warning.main' }}>
            <CardContent>
              <StatsContainer>
                <StatsBox>
                  <StatsIconBox sx={{ backgroundColor: 'rgba(255, 159, 64, 0.2)' }}>
                    <WarningIcon sx={{ color: 'rgb(255, 159, 64)' }} />
                  </StatsIconBox>
                  <Box>
                    <StatsValue>{riskScores.mismanagementRiskScore}</StatsValue>
                    <StatsLabel>Mismanagement Risk Score</StatsLabel>
                  </Box>
                </StatsBox>
                <Chip 
                  label="Medium Risk" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 159, 64, 0.1)', 
                    color: 'rgb(255, 159, 64)',
                    fontWeight: 'bold'
                  }} 
                />
              </StatsContainer>
              <Typography variant="body2" color="text.secondary">
                {investigatingCount} issues under investigation
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent>
              <StatsContainer>
                <StatsBox>
                  <StatsIconBox sx={{ backgroundColor: 'rgba(54, 162, 235, 0.2)' }}>
                    <AssessmentIcon color="primary" />
                  </StatsIconBox>
                  <Box>
                    <StatsValue>{totalOutliers}</StatsValue>
                    <StatsLabel>Detected Outliers</StatsLabel>
                  </Box>
                </StatsBox>
                <Chip 
                  label={`${highPriorityOutliers} High Priority`} 
                  size="small" 
                  color="error"
                  sx={{ fontWeight: 'bold' }} 
                />
              </StatsContainer>
              <Typography variant="body2" color="text.secondary">
                Last 30 days
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <CardContent>
              <StatsContainer>
                <StatsBox>
                  <StatsIconBox sx={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}>
                    <AccountCircleIcon color="primary" />
                  </StatsIconBox>
                  <Box>
                    <StatsValue>{mockUserActivity.length}</StatsValue>
                    <StatsLabel>Suspicious User Activity</StatsLabel>
                  </Box>
                </StatsBox>
                <Chip 
                  label="Last 7 days" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 159, 64, 0.1)', 
                    color: 'rgb(255, 159, 64)',
                    fontWeight: 'bold'
                  }} 
                />
              </StatsContainer>
            </CardContent>
          </MetricCard>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            icon={<WarningIcon fontSize="small" />} 
            label="Detected Outliers" 
            iconPosition="start"
          />
          <Tab 
            icon={<TrendingUpIcon fontSize="small" />} 
            label="Trend Analysis" 
            iconPosition="start"
          />
          <Tab 
            icon={<EventNoteIcon fontSize="small" />} 
            label="Suspicious Activities" 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Tab Panel Contents */}
      <Box>
        {/* Detected Outliers Tab */}
        {tabValue === 0 && (
          <SectionPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Detected Outliers
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search outliers..."
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ width: 250 }}
              />
            </Box>
            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Expected</TableCell>
                    <TableCell>Actual</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockOutlierData.map((outlier) => (
                    <TableRow key={outlier.id} hover>
                      <TableCell>{outlier.date}</TableCell>
                      <TableCell>{outlier.category}</TableCell>
                      <TableCell>{outlier.itemName}</TableCell>
                      <TableCell>{outlier.description}</TableCell>
                      <TableCell>{outlier.expectedValue}</TableCell>
                      <TableCell>{outlier.actualValue}</TableCell>
                      <TableCell>
                        <Chip 
                          label={outlier.priority} 
                          size="small"
                          sx={{
                            ...getPriorityColor(outlier.priority),
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={outlier.status} 
                          size="small"
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            backgroundColor: outlier.status === 'Resolved' ? 'rgba(75, 192, 192, 0.1)' : 'rgba(255, 159, 64, 0.1)',
                            color: outlier.status === 'Resolved' ? 'rgb(75, 192, 192)' : 'rgb(255, 159, 64)',
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mark Resolved">
                          <IconButton size="small">
                            <AssessmentIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionPaper>
        )}

        {/* Trend Analysis Tab */}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <SectionPaper>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Outlier Trends Over Time
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  The chart below shows the trend of detected outliers and fraud risk score over time.
                </Typography>
                <Box sx={{ height: 400, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Trend chart visualization would be displayed here
                  </Typography>
                </Box>
              </SectionPaper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <SectionPaper>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Risk Categories
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>High Risk Categories</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {riskScores.highRiskCategories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        color="error"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    ))}
                  </Box>

                  <Typography variant="subtitle2" gutterBottom>High Risk Vendors</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {riskScores.highRiskVendors.map((vendor) => (
                      <Chip
                        key={vendor}
                        label={vendor}
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    ))}
                  </Box>

                  <Typography variant="subtitle2" gutterBottom>Flagged Users</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {riskScores.suspiciousUsers.map((user) => (
                      <Chip
                        key={user}
                        label={user}
                        color="error"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    ))}
                  </Box>
                </Box>
              </SectionPaper>
            </Grid>
          </Grid>
        )}

        {/* Suspicious Activities Tab */}
        {tabValue === 2 && (
          <SectionPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Suspicious User Activities
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search activities..."
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ width: 250 }}
              />
            </Box>
            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockUserActivity.map((activity) => (
                    <TableRow key={activity.id} hover>
                      <TableCell>{activity.dateTime}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.item}</TableCell>
                      <TableCell>
                        <Chip 
                          label={activity.severity} 
                          size="small"
                          sx={{
                            ...getPriorityColor(activity.severity),
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Flag for Review">
                          <IconButton size="small">
                            <ReportIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionPaper>
        )}
      </Box>

      {/* Report Generation Dialog */}
      <Dialog open={reportDialogOpen} onClose={handleCloseReportDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Report</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="report-type-label">Report Type</InputLabel>
              <Select
                labelId="report-type-label"
                id="report-type"
                value={selectedReport}
                label="Report Type"
                onChange={handleReportChange}
              >
                {reportTypes.map((report) => (
                  <MenuItem key={report.id} value={report.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2, color: 'primary.main' }}>{report.icon}</Box>
                      <Box>
                        <Typography variant="body2">{report.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{report.format} Format</Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="date-range-label">Date Range</InputLabel>
              <Select
                labelId="date-range-label"
                id="date-range"
                value={dateRange}
                label="Date Range"
                onChange={handleDateRangeChange}
              >
                <MenuItem value="last7">Last 7 Days</MenuItem>
                <MenuItem value="last30">Last 30 Days</MenuItem>
                <MenuItem value="last90">Last 90 Days</MenuItem>
                <MenuItem value="ytd">Year to Date</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReportDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleGenerateReport}
            disabled={!selectedReport}
            startIcon={<FileDownloadIcon />}
          >
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OutlierDetection;
