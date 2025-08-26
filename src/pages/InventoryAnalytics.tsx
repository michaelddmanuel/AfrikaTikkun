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
  TableRow
} from '@mui/material';
import {
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Restaurant as RestaurantIcon,
  Assignment as AssignmentIcon,
  MoneyOff as MoneyOffIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { inventoryStats } from '../mock-data/inventory';

// Mock data for analytics
const mockCategoryUsage = [
  { category: 'Produce', used: 450, total: 500, damaged: 15 },
  { category: 'Meat', used: 320, total: 400, damaged: 10 },
  { category: 'Dairy', used: 280, total: 350, damaged: 5 },
  { category: 'Dry Goods', used: 220, total: 300, damaged: 8 },
  { category: 'Beverages', used: 180, total: 250, damaged: 3 },
];

const mockRecentTrends = [
  { month: 'Jan', usage: 1200, waste: 120 },
  { month: 'Feb', usage: 1300, waste: 110 },
  { month: 'Mar', usage: 1400, waste: 130 },
  { month: 'Apr', usage: 1350, waste: 100 },
  { month: 'May', usage: 1500, waste: 90 },
  { month: 'Jun', usage: 1600, waste: 85 },
];

const mockLowStockItems = [
  { id: 1, name: 'Tomatoes', category: 'Produce', currentStock: 10, minStock: 15 },
  { id: 2, name: 'Chicken Breast', category: 'Meat', currentStock: 8, minStock: 12 },
  { id: 3, name: 'Heavy Cream', category: 'Dairy', currentStock: 5, minStock: 10 },
  { id: 4, name: 'Rice', category: 'Dry Goods', currentStock: 12, minStock: 15 },
];

const mockTopUsedItems = [
  { id: 1, name: 'Potatoes', category: 'Produce', used: 120, totalCost: 240 },
  { id: 2, name: 'Ground Beef', category: 'Meat', used: 85, totalCost: 425 },
  { id: 3, name: 'Cheese', category: 'Dairy', used: 75, totalCost: 300 },
  { id: 4, name: 'Flour', category: 'Dry Goods', used: 65, totalCost: 130 },
];

// Oxford Blue, Grey Blue, White Color Palette
const colors = {
  oxfordBlue: '#002147',
  greyBlue: '#475569',
  lightGreyBlue: '#64748B',
  veryLightGreyBlue: '#94A3B8',
  paleGreyBlue: '#CBD5E1',
  white: '#FFFFFF',
  lightGrey: '#F8FAFC',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  purple: '#7C3AED'
};

const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid #e4e7ec',
  borderRadius: '12px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.1)',
    transform: 'translateY(-1px)',
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StatsIconBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
}));

const StatsValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.75rem',
  color: colors.oxfordBlue,
  lineHeight: 1.2,
}));

const StatsLabel = styled(Typography)(({ theme }) => ({
  color: colors.greyBlue,
  fontSize: '0.875rem',
  fontWeight: 500,
  marginTop: '4px',
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

const InventoryAnalytics: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate analytics values
  const totalInventoryValue = inventoryStats.totalStockValue;
  const totalItems = inventoryStats.totalItems;
  const lowStockCount = mockLowStockItems.length;
  const wastePercentage = 7.2; // Mock value

  return (
    <Box sx={{ p: 3, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        pb: 2,
        borderBottom: `2px solid ${colors.paleGreyBlue}`
      }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: colors.oxfordBlue,
              fontSize: '2rem',
              mb: 1
            }}
          >
            Inventory Analytics
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: colors.greyBlue,
              fontSize: '1rem'
            }}
          >
            Comprehensive inventory usage and performance insights
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ModernButton 
            variant="outlined" 
            startIcon={<TimelineIcon />}
            sx={{ 
              borderColor: colors.greyBlue,
              color: colors.greyBlue,
              '&:hover': {
                borderColor: colors.oxfordBlue,
                color: colors.oxfordBlue,
                backgroundColor: 'rgba(0, 33, 71, 0.04)'
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
                backgroundColor: colors.greyBlue
              }
            }}
          >
            Generate Insights
          </ModernButton>
        </Box>
      </Box>

      {/* Key Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                  <InventoryIcon sx={{ color: colors.success, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <StatsValue>${totalInventoryValue.toLocaleString()}</StatsValue>
                  <StatsLabel>Total Inventory Value</StatsLabel>
                </Box>
              </StatsBox>
              <Chip 
                label="+5.2%" 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  color: colors.success,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }} 
              />
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: 'rgba(0, 33, 71, 0.1)' }}>
                  <RestaurantMenuIcon sx={{ color: colors.oxfordBlue, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <StatsValue>{totalItems}</StatsValue>
                  <StatsLabel>Total Inventory Items</StatsLabel>
                </Box>
              </StatsBox>
              <Chip 
                label="+2.8%" 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(0, 33, 71, 0.1)', 
                  color: colors.oxfordBlue,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }} 
              />
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                  <WarningIcon sx={{ color: colors.warning, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <StatsValue>{lowStockCount}</StatsValue>
                  <StatsLabel>Low Stock Items</StatsLabel>
                </Box>
              </StatsBox>
              <Chip 
                label="-3.1%" 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  color: colors.success,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }} 
              />
            </StatsContainer>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <StatsIconBox sx={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                  <MoneyOffIcon sx={{ color: colors.error, fontSize: 24 }} />
                </StatsIconBox>
                <Box>
                  <StatsValue>{wastePercentage}%</StatsValue>
                  <StatsLabel>Waste Percentage</StatsLabel>
                </Box>
              </StatsBox>
              <Chip 
                label="-1.2%" 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  color: colors.success,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }} 
              />
            </StatsContainer>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Tabs for different analytics views */}
      <StyledCard sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="inventory analytics tabs"
            sx={{
              '& .MuiTab-root': {
                color: colors.greyBlue,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.875rem',
                minHeight: 48,
                '&.Mui-selected': {
                  color: colors.oxfordBlue,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: colors.oxfordBlue,
                height: 3,
                borderRadius: '2px 2px 0 0',
              },
            }}
          >
            <Tab label="Category Usage" icon={<RestaurantIcon />} iconPosition="start" />
            <Tab label="Recent Trends" icon={<TrendingUpIcon />} iconPosition="start" />
            <Tab label="Low Stock Items" icon={<WarningIcon />} iconPosition="start" />
            <Tab label="Top Used Items" icon={<AssignmentIcon />} iconPosition="start" />
          </Tabs>
        </Box>
      </StyledCard>

      {/* Category Usage Tab */}
      {tabValue === 0 && (
        <StyledCard sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Category Usage Analysis</Typography>
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
                  }}>Category</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Total Stock</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Used This Month</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Avg. Cost</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Waste %</TableCell>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {mockCategoryUsage.map((category, index) => (
                  <TableRow 
                    key={category.category}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockCategoryUsage.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{category.category}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{category.total}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{category.used}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>${(category.used * 2.5).toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{((category.damaged / category.total) * 100).toFixed(1)}%</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={((category.damaged / category.total) * 100) < 5 ? "Good" : "Needs Attention"} 
                        size="small"
                        sx={{
                          backgroundColor: ((category.damaged / category.total) * 100) < 5 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: ((category.damaged / category.total) * 100) < 5 ? colors.success : colors.warning,
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      )}

      {/* Recent Trends Tab */}
      {tabValue === 1 && (
        <StyledCard sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Recent Usage Trends (6 Months)</Typography>
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
                  }}>Month</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Total Usage</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Cost</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Waste %</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRecentTrends.map((trend, index) => (
                  <TableRow 
                    key={trend.month}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockRecentTrends.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{trend.month}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{trend.usage}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>${(trend.usage * 2.1).toFixed(0)}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{((trend.waste / trend.usage) * 100).toFixed(1)}%</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      {trend.month === 'Jun' ? (
                        <TrendingUpIcon sx={{ color: colors.success }} />
                      ) : trend.month === 'May' ? (
                        <TrendingUpIcon sx={{ color: colors.success }} />
                      ) : (
                        <IconButton size="small" disabled>-</IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      )}

      {/* Low Stock Items Tab */}
      {tabValue === 2 && (
        <StyledCard sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Low Stock Alert</Typography>
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
                  }}>Item Name</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Category</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Current Stock</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Min. Required</TableCell>
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
                {mockLowStockItems.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockLowStockItems.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{item.name}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{item.category}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{item.currentStock}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{item.minStock}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={item.currentStock < item.minStock * 0.7 ? "Critical" : "Low"} 
                        size="small"
                        sx={{
                          backgroundColor: item.currentStock < item.minStock * 0.7 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: item.currentStock < item.minStock * 0.7 ? colors.error : colors.warning,
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <ModernButton size="small" variant="outlined" sx={{ borderColor: colors.greyBlue, color: colors.greyBlue }}>Order</ModernButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      )}

      {/* Top Used Items Tab */}
      {tabValue === 3 && (
        <StyledCard sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Most Used Items (Monthly)</Typography>
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
                  }}>Item Name</TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Category</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Used Quantity</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Total Cost</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 600, 
                    color: '#667085',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 3,
                    px: 3,
                    borderBottom: 'none'
                  }}>Avg. Cost Per Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockTopUsedItems.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockTopUsedItems.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{item.name}</TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>{item.category}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>{item.used}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>${item.totalCost}</TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>${(item.totalCost / item.used).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      )}
    </Box>
  );
};

export default InventoryAnalytics;
