import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Avatar,
  IconButton,
  Tooltip,
  Alert,
  Badge,
  InputAdornment
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assessment as AssessmentIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Restaurant as RestaurantIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  DateRange as DateRangeIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Add as AddIcon,
  PictureAsPdf as PdfIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ModernTable from '../components/ModernTable';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar } from 'recharts';

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
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  purple: '#7C3AED'
};

const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid #e4e7ec',
  borderRadius: '12px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)',
    transform: 'translateY(-2px)',
    transition: 'all 0.2s ease-in-out',
    borderColor: '#e4e7ec',
  },
  height: '100%',
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

const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '14px',
  padding: '10px 16px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  '&:hover': {
    boxShadow: '0px 2px 4px rgba(16, 24, 40, 0.1)',
  },
}));

// Styled components
const SectionPaper = ({ children, ...props }: any) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 3, 
      borderRadius: 3,
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: '1px solid rgba(0,0,0,0.05)',
      ...props.sx 
    }} 
    {...props}
  >
    {children}
  </Paper>
);

// Mock data
const mockFinancialData = [
  { month: 'Jan', revenue: 450000, costs: 320000, profit: 130000 },
  { month: 'Feb', revenue: 480000, costs: 340000, profit: 140000 },
  { month: 'Mar', revenue: 520000, costs: 365000, profit: 155000 },
  { month: 'Apr', revenue: 495000, costs: 350000, profit: 145000 },
  { month: 'May', revenue: 540000, costs: 380000, profit: 160000 },
  { month: 'Jun', revenue: 580000, costs: 400000, profit: 180000 }
];

const mockOperationalMetrics = [
  { metric: 'Food Waste', current: 8.5, target: 5.0, trend: 'improving' },
  { metric: 'Customer Satisfaction', current: 4.6, target: 4.8, trend: 'stable' },
  { metric: 'Order Accuracy', current: 96.2, target: 98.0, trend: 'improving' },
  { metric: 'Delivery Time', current: 18.5, target: 15.0, trend: 'declining' }
];

const mockComplianceReports = [
  {
    id: 'COMP001',
    type: 'Health Inspection',
    location: 'Main Kitchen - Johannesburg',
    date: '2024-08-15',
    score: 95,
    status: 'Passed',
    inspector: 'Dr. Sarah Wilson',
    nextDue: '2024-11-15'
  },
  {
    id: 'COMP002',
    type: 'Safety Audit',
    location: 'Storage Facility - Cape Town',
    date: '2024-08-10',
    score: 88,
    status: 'Passed',
    inspector: 'Mike Johnson',
    nextDue: '2024-11-10'
  }
];

const mockCustomReports = [
  {
    id: 'RPT001',
    name: 'Monthly Kitchen Performance',
    description: 'Comprehensive analysis of kitchen operations and efficiency',
    lastGenerated: '2024-08-20',
    frequency: 'Monthly',
    format: 'PDF',
    status: 'Active'
  },
  {
    id: 'RPT002',
    name: 'Supplier Cost Analysis',
    description: 'Detailed breakdown of supplier costs and savings opportunities',
    lastGenerated: '2024-08-18',
    frequency: 'Weekly',
    format: 'Excel',
    status: 'Active'
  }
];

export default function Reports() {
  const [tabValue, setTabValue] = useState(0);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed': return 'success';
      case 'Failed': return 'error';
      case 'Pending': return 'warning';
      case 'Active': return 'success';
      default: return 'default';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'success';
      case 'declining': return 'error';
      case 'stable': return 'info';
      default: return 'default';
    }
  };

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
            Reports
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
            Generate insights and analytics from your operational data.
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
              placeholder="Search reports..."
              size="small"
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
              Filters
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
              Export
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setReportDialogOpen(true)}
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
              Create Custom Report
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: '#dcfce7' }}>
                  <AttachMoneyIcon sx={{ color: colors.success, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <StatsValue>R580K</StatsValue>
                  <StatsLabel>Monthly Revenue</StatsLabel>
                </Box>
              </StatsBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: '#dbeafe' }}>
                  <TrendingUpIcon sx={{ color: colors.oxfordBlue, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <StatsValue>31%</StatsValue>
                  <StatsLabel>Profit Margin</StatsLabel>
                </Box>
              </StatsBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: '#fef3c7' }}>
                  <AssessmentIcon sx={{ color: colors.warning, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <StatsValue>45</StatsValue>
                  <StatsLabel>Active Reports</StatsLabel>
                </Box>
              </StatsBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: '#dcfce7' }}>
                  <CheckCircleIcon sx={{ color: colors.success, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <StatsValue>98%</StatsValue>
                  <StatsLabel>Compliance Rate</StatsLabel>
                </Box>
              </StatsBox>
            </StatsContainer>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Tabs */}
      <StyledCard sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: colors.oxfordBlue
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px',
              color: colors.greyBlue,
              '&.Mui-selected': {
                color: colors.oxfordBlue
              }
            }
          }}
        >
          <Tab label="Financial Reports" />
          <Tab label="Operational Reports" />
          <Tab label="Compliance Reports" />
          <Tab label="Custom Analytics" />
        </Tabs>
      </StyledCard>

      {/* Financial Reports Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Revenue & Profit Analysis</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e7ec" />
                    <XAxis dataKey="month" stroke={colors.greyBlue} />
                    <YAxis stroke={colors.greyBlue} />
                    <RechartsTooltip formatter={(value: any) => [`R${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Bar dataKey="revenue" fill={colors.success} name="Revenue" />
                    <Bar dataKey="costs" fill={colors.error} name="Costs" />
                    <Bar dataKey="profit" fill={colors.oxfordBlue} name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Financial Summary</Typography>
              <Box sx={{ mb: 3, p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e4e7ec' }}>
                <Typography variant="subtitle2" fontWeight="600" sx={{ color: colors.greyBlue, mb: 1 }}>Total Revenue (YTD)</Typography>
                <Typography variant="h4" sx={{ color: colors.success, fontWeight: 600, mb: 0.5 }}>R3.2M</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue }}>+12% vs last year</Typography>
              </Box>
              <Box sx={{ mb: 3, p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e4e7ec' }}>
                <Typography variant="subtitle2" fontWeight="600" sx={{ color: colors.greyBlue, mb: 1 }}>Total Costs (YTD)</Typography>
                <Typography variant="h4" sx={{ color: colors.error, fontWeight: 600, mb: 0.5 }}>R2.2M</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue }}>+8% vs last year</Typography>
              </Box>
              <Box sx={{ mb: 3, p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e4e7ec' }}>
                <Typography variant="subtitle2" fontWeight="600" sx={{ color: colors.greyBlue, mb: 1 }}>Net Profit (YTD)</Typography>
                <Typography variant="h4" sx={{ color: colors.oxfordBlue, fontWeight: 600, mb: 0.5 }}>R1.0M</Typography>
                <Typography variant="body2" sx={{ color: colors.greyBlue }}>+18% vs last year</Typography>
              </Box>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<PdfIcon />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '12px 16px',
                  borderColor: '#d0d5dd',
                  color: colors.greyBlue,
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                    borderColor: '#98a2b3'
                  }
                }}
              >
                Download Financial Report
              </Button>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Operational Reports Tab */}
      {tabValue === 1 && (
        <Box sx={{ p: 3 }}>
          <ModernTable
            title="Key Performance Indicators"
            subtitle="Monitor operational metrics and performance trends"
            searchPlaceholder="Search metrics..."
            data={mockOperationalMetrics}
            filterOptions={[
              { key: 'trend', label: 'Trend', values: ['all', 'improving', 'declining', 'stable'] }
            ]}
            columns={[
              { id: 'metric', label: 'METRIC', width: '25%' },
              { id: 'current', label: 'CURRENT', width: '15%', align: 'center' },
              { id: 'target', label: 'TARGET', width: '15%', align: 'center' },
              { id: 'performance', label: 'PERFORMANCE', width: '20%', align: 'center' },
              { id: 'trend', label: 'TREND', width: '15%', align: 'center' },
              { id: 'actions', label: '', width: '10%', align: 'center' }
            ]}
            renderRow={(metric, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': { backgroundColor: '#f9fafb' },
                  borderBottom: index === mockOperationalMetrics.length - 1 ? 'none' : '1px solid #e4e7ec'
                }}
              >
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                    {metric.metric}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                    {metric.current}{metric.metric === 'Customer Satisfaction' ? '/5.0' : metric.metric === 'Delivery Time' ? ' min' : '%'}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ color: colors.greyBlue }}>
                    {metric.target}{metric.metric === 'Customer Satisfaction' ? '/5.0' : metric.metric === 'Delivery Time' ? ' min' : '%'}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Box sx={{ width: 120, mx: 'auto' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={metric.metric === 'Customer Satisfaction' ? (metric.current / 5) * 100 : 
                             metric.metric === 'Delivery Time' ? 100 - ((metric.current / metric.target) * 100) :
                             (metric.current / metric.target) * 100}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#e4e7ec',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.trend === 'improving' ? colors.success : 
                                         metric.trend === 'declining' ? colors.error : colors.warning
                        }
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Chip
                    label={metric.trend}
                    size="small"
                    sx={{
                      backgroundColor: metric.trend === 'improving' ? '#dcfce7' : 
                                     metric.trend === 'declining' ? '#fef2f2' : '#fef3c7',
                      color: metric.trend === 'improving' ? colors.success : 
                             metric.trend === 'declining' ? colors.error : colors.warning,
                      fontWeight: 600,
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <IconButton size="small" sx={{ color: colors.greyBlue }}>
                    <MoreIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          />
        </Box>
      )}

      {/* Compliance Reports Tab */}
      {tabValue === 2 && (
        <Box sx={{ p: 3 }}>
          <ModernTable
            title="Compliance Reports"
            subtitle="Monitor health inspections, safety audits, and regulatory compliance"
            searchPlaceholder="Search compliance reports..."
            data={mockComplianceReports}
            filterOptions={[
              { key: 'status', label: 'Status', values: ['all', 'Passed', 'Failed', 'Pending'] }
            ]}
            columns={[
              { id: 'type', label: 'TYPE', width: '20%' },
              { id: 'location', label: 'LOCATION', width: '25%' },
              { id: 'date', label: 'DATE', width: '15%' },
              { id: 'score', label: 'SCORE', width: '10%', align: 'center' },
              { id: 'status', label: 'STATUS', width: '15%', align: 'center' },
              { id: 'inspector', label: 'INSPECTOR', width: '15%' },
              { id: 'actions', label: '', width: '10%', align: 'center' }
            ]}
            renderRow={(report, index) => (
              <TableRow
                key={report.id}
                sx={{
                  '&:hover': { backgroundColor: '#f9fafb' },
                  borderBottom: index === mockComplianceReports.length - 1 ? 'none' : '1px solid #e4e7ec'
                }}
              >
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                    {report.type}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ fontWeight: 500, color: colors.oxfordBlue }}>
                    {report.location}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ color: colors.greyBlue }}>
                    {report.date}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                    {report.score}%
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Chip
                    label={report.status}
                    size="small"
                    sx={{
                      backgroundColor: report.status === 'Passed' ? '#dcfce7' : 
                                     report.status === 'Failed' ? '#fef2f2' : '#fef3c7',
                      color: report.status === 'Passed' ? colors.success : 
                             report.status === 'Failed' ? colors.error : colors.warning,
                      fontWeight: 600,
                      fontSize: '12px'
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ color: colors.greyBlue }}>
                    {report.inspector}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <IconButton size="small" sx={{ color: colors.greyBlue }}>
                    <MoreIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          />
        </Box>
      )}

      {/* Custom Analytics Tab */}
      {tabValue === 3 && (
        <Box sx={{ p: 3 }}>
          <ModernTable
            title="Custom Report Templates"
            subtitle="Manage and generate custom analytical reports"
            searchPlaceholder="Search report templates..."
            data={mockCustomReports}
            filterOptions={[
              { key: 'status', label: 'Status', values: ['all', 'Active', 'Inactive'] }
            ]}
            columns={[
              { id: 'name', label: 'REPORT NAME', width: '25%' },
              { id: 'description', label: 'DESCRIPTION', width: '35%' },
              { id: 'frequency', label: 'FREQUENCY', width: '15%' },
              { id: 'lastGenerated', label: 'LAST GENERATED', width: '15%' },
              { id: 'status', label: 'STATUS', width: '10%', align: 'center' },
              { id: 'actions', label: '', width: '5%', align: 'center' }
            ]}
            renderRow={(report, index) => (
              <TableRow
                key={report.id}
                sx={{
                  '&:hover': { backgroundColor: '#f9fafb' },
                  borderBottom: index === mockCustomReports.length - 1 ? 'none' : '1px solid #e4e7ec'
                }}
              >
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                    {report.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ color: colors.greyBlue, fontSize: '14px' }}>
                    {report.description}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ color: colors.greyBlue }}>
                    {report.frequency}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Typography sx={{ color: colors.greyBlue }}>
                    {report.lastGenerated}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <Chip
                    label={report.status}
                    size="small"
                    sx={{
                      backgroundColor: report.status === 'Active' ? '#dcfce7' : '#fef2f2',
                      color: report.status === 'Active' ? colors.success : colors.error,
                      fontWeight: 600,
                      fontSize: '12px'
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                  <IconButton size="small" sx={{ color: colors.greyBlue }}>
                    <MoreIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          />
        </Box>
      )}

      {/* Create Report Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Custom Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Report Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select label="Report Type">
                  <MenuItem value="financial">Financial</MenuItem>
                  <MenuItem value="operational">Operational</MenuItem>
                  <MenuItem value="compliance">Compliance</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select label="Frequency">
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Format</InputLabel>
                <Select label="Format">
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                  <MenuItem value="csv">CSV</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setReportDialogOpen(false)}>
            Create Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
