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
  Container,
  styled
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Inventory as InventoryIcon,
  LocalDining as LocalDiningIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar } from 'recharts';

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
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 8,
  padding: '10px 16px',
  fontSize: '14px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
  }
}));

// Mock data
const mockFoodItems = [
  {
    id: 'FI001',
    name: 'Grilled Chicken Breast',
    category: 'Protein',
    price: 85.50,
    costPerServing: 32.75,
    margin: 61.7,
    stock: 45,
    reorderPoint: 20,
    expiryDate: '2024-09-15',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    allergens: ['None'],
    dietary: ['Gluten-Free', 'Keto-Friendly'],
    supplier: 'Premium Meats Ltd.',
    turnoverRate: 85,
    status: 'In Stock'
  },
  {
    id: 'FI002',
    name: 'Caesar Salad Mix',
    category: 'Vegetables',
    price: 45.00,
    costPerServing: 18.25,
    margin: 59.4,
    stock: 12,
    reorderPoint: 15,
    expiryDate: '2024-08-28',
    calories: 87,
    protein: 2.3,
    carbs: 8.1,
    fat: 7.2,
    allergens: ['Dairy', 'Gluten'],
    dietary: ['Vegetarian'],
    supplier: 'Fresh Produce Co.',
    turnoverRate: 92,
    status: 'Low Stock'
  },
  {
    id: 'FI003',
    name: 'Quinoa Bowl Base',
    category: 'Grains',
    price: 65.00,
    costPerServing: 22.50,
    margin: 65.4,
    stock: 78,
    reorderPoint: 25,
    expiryDate: '2024-12-01',
    calories: 222,
    protein: 8,
    carbs: 39,
    fat: 3.6,
    allergens: ['None'],
    dietary: ['Vegan', 'Gluten-Free', 'High-Protein'],
    supplier: 'Grain Specialists',
    turnoverRate: 76,
    status: 'In Stock'
  }
];

const mockNutritionData = [
  { name: 'Protein', value: 35, color: '#ff6b6b' },
  { name: 'Carbohydrates', value: 40, color: '#4ecdc4' },
  { name: 'Fats', value: 20, color: '#45b7d1' },
  { name: 'Fiber', value: 5, color: '#96ceb4' }
];

const mockCostTrends = [
  { month: 'Jan', avgCost: 28.50, margin: 62.1 },
  { month: 'Feb', avgCost: 29.75, margin: 60.8 },
  { month: 'Mar', avgCost: 27.25, margin: 64.2 },
  { month: 'Apr', avgCost: 31.20, margin: 58.9 },
  { month: 'May', avgCost: 26.80, margin: 65.7 },
  { month: 'Jun', avgCost: 28.90, margin: 61.5 }
];

const mockInventoryStatus = [
  { category: 'Protein', inStock: 156, lowStock: 8, outOfStock: 2 },
  { category: 'Vegetables', inStock: 89, lowStock: 15, outOfStock: 5 },
  { category: 'Grains', inStock: 67, lowStock: 3, outOfStock: 1 },
  { category: 'Dairy', inStock: 45, lowStock: 7, outOfStock: 3 }
];

export default function FoodItems() {
  const [tabValue, setTabValue] = useState(0);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'error';
      default: return 'default';
    }
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiry <= 3) return { status: 'Critical', color: 'error' };
    if (daysUntilExpiry <= 7) return { status: 'Warning', color: 'warning' };
    return { status: 'Good', color: 'success' };
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box>
      {/* Header */}
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
            Food Items Management
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: colors.greyBlue,
              mb: 0 
            }}
          >
            Manage your food inventory, nutrition data, and cost analysis
          </Typography>
        </Box>
        <ModernButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setItemDialogOpen(true)}
          sx={{
            backgroundColor: colors.oxfordBlue,
            '&:hover': {
              backgroundColor: '#001a36'
            }
          }}
        >
          Add Food Item
        </ModernButton>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ 
                    borderRadius: '12px', 
                    padding: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '16px',
                    width: '48px', 
                    height: '48px',
                    backgroundColor: '#f0f9ff'
                  }}>
                    <RestaurantIcon sx={{ fontSize: 24, color: '#0369a1' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: colors.oxfordBlue, mb: 0.5 }}>342</Typography>
                  <Typography variant="body2" sx={{ color: colors.greyBlue, fontSize: '14px', fontWeight: 500 }}>Total Items</Typography>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ 
                    borderRadius: '12px', 
                    padding: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '16px',
                    width: '48px', 
                    height: '48px',
                    backgroundColor: '#dcfce7'
                  }}>
                    <TrendingUpIcon sx={{ fontSize: 24, color: colors.success }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: colors.oxfordBlue, mb: 0.5 }}>62.4%</Typography>
                  <Typography variant="body2" sx={{ color: colors.greyBlue, fontSize: '14px', fontWeight: 500 }}>Avg Profit Margin</Typography>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ 
                    borderRadius: '12px', 
                    padding: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '16px',
                    width: '48px', 
                    height: '48px',
                    backgroundColor: '#fef3c7'
                  }}>
                    <WarningIcon sx={{ fontSize: 24, color: colors.warning }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: colors.oxfordBlue, mb: 0.5 }}>23</Typography>
                  <Typography variant="body2" sx={{ color: colors.greyBlue, fontSize: '14px', fontWeight: 500 }}>Low Stock Items</Typography>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ 
                    borderRadius: '12px', 
                    padding: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '16px',
                    width: '48px', 
                    height: '48px',
                    backgroundColor: '#f0f9ff'
                  }}>
                    <AttachMoneyIcon sx={{ fontSize: 24, color: '#0369a1' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: colors.oxfordBlue, mb: 0.5 }}>R28.90</Typography>
                  <Typography variant="body2" sx={{ color: colors.greyBlue, fontSize: '14px', fontWeight: 500 }}>Avg Cost/Serving</Typography>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px',
              color: colors.greyBlue,
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
          <Tab label="Item Catalog" />
          <Tab label="Nutritional Analytics" />
          <Tab label="Cost Analysis" />
          <Tab label="Inventory Tracking" />
        </Tabs>
      </Box>

      {/* Item Catalog Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledCard sx={{ overflow: 'hidden' }}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: colors.oxfordBlue, fontWeight: 600 }}>Food Item Catalog</Typography>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={filterCategory}
                      label="Category"
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <MenuItem value="All">All Categories</MenuItem>
                      <MenuItem value="Protein">Protein</MenuItem>
                      <MenuItem value="Vegetables">Vegetables</MenuItem>
                      <MenuItem value="Grains">Grains</MenuItem>
                      <MenuItem value="Dairy">Dairy</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
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
                      }}>Item</TableCell>
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
                      }}>Price</TableCell>
                      <TableCell align="right" sx={{ 
                        fontWeight: 600, 
                        color: '#667085',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        py: 3,
                        px: 3,
                        borderBottom: 'none'
                      }}>Cost/Serving</TableCell>
                      <TableCell align="right" sx={{ 
                        fontWeight: 600, 
                        color: '#667085',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        py: 3,
                        px: 3,
                        borderBottom: 'none'
                      }}>Margin</TableCell>
                      <TableCell sx={{ 
                        fontWeight: 600, 
                        color: '#667085',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        py: 3,
                        px: 3,
                        borderBottom: 'none'
                      }}>Dietary Info</TableCell>
                      <TableCell sx={{ 
                        fontWeight: 600, 
                        color: '#667085',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        py: 3,
                        px: 3,
                        borderBottom: 'none'
                      }}>Stock Status</TableCell>
                      <TableCell align="center" sx={{ 
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
                    {mockFoodItems.map((item, index) => (
                      <TableRow 
                        key={item.id}
                        sx={{ 
                          '&:hover': { backgroundColor: '#f9fafb' },
                          borderBottom: index === mockFoodItems.length - 1 ? 'none' : '1px solid #e4e7ec'
                        }}
                      >
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, bgcolor: colors.oxfordBlue, width: 40, height: 40 }}>
                              <LocalDiningIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                                {item.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#667085' }}>
                                {item.id} • {item.calories} cal
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Chip 
                            label={item.category} 
                            size="small" 
                            sx={{
                              backgroundColor: '#f0f9ff',
                              color: '#0369a1',
                              fontWeight: 500,
                              borderRadius: '6px'
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: colors.oxfordBlue }}>
                            R{item.price.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Typography variant="body2" sx={{ color: '#667085' }}>
                            R{item.costPerServing.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Typography 
                            variant="body2" 
                            sx={{
                              color: item.margin > 60 ? colors.success : item.margin > 40 ? colors.warning : colors.error,
                              fontWeight: 600
                            }}
                          >
                            {item.margin.toFixed(1)}%
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {item.dietary.slice(0, 2).map((diet, dietIndex) => (
                              <Chip 
                                key={dietIndex} 
                                label={diet} 
                                size="small" 
                                sx={{
                                  backgroundColor: '#dcfce7',
                                  color: colors.success,
                                  fontWeight: 500,
                                  fontSize: '11px',
                                  height: '20px',
                                  borderRadius: '4px'
                                }}
                              />
                            ))}
                            {item.dietary.length > 2 && (
                              <Chip 
                                label={`+${item.dietary.length - 2}`} 
                                size="small" 
                                sx={{
                                  backgroundColor: '#f3f4f6',
                                  color: '#6b7280',
                                  fontWeight: 500,
                                  fontSize: '11px',
                                  height: '20px',
                                  borderRadius: '4px'
                                }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chip 
                              label={item.status} 
                              size="small"
                              sx={{
                                backgroundColor: 
                                  item.status === 'In Stock' ? '#dcfce7' : 
                                  item.status === 'Low Stock' ? '#fef3c7' : '#fee2e2',
                                color: 
                                  item.status === 'In Stock' ? colors.success : 
                                  item.status === 'Low Stock' ? colors.warning : colors.error,
                                fontWeight: 500,
                                fontSize: '12px',
                                height: '22px',
                                borderRadius: '6px'
                              }}
                            />
                            {item.stock <= item.reorderPoint && (
                              <Badge color="error" variant="dot" sx={{ ml: 1 }}>
                                <WarningIcon fontSize="small" sx={{ color: colors.error }} />
                              </Badge>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                          <Tooltip title="View Details">
                            <IconButton size="small" onClick={() => setSelectedItem(item)} sx={{ color: colors.greyBlue }}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Item">
                            <IconButton size="small" sx={{ color: colors.greyBlue }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Item">
                            <IconButton size="small" sx={{ color: colors.error }}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Nutritional Analytics Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Nutritional Breakdown</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockNutritionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }: any) => `${name}: ${value}%`}
                    >
                      {mockNutritionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Dietary Compliance</Typography>
              {mockFoodItems.map((item, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="primary.main">{item.calories} cal</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Protein: {item.protein}g</Typography>
                    <Typography variant="body2">Carbs: {item.carbs}g</Typography>
                    <Typography variant="body2">Fat: {item.fat}g</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {item.dietary.map((diet, dietIndex) => (
                      <Chip key={dietIndex} label={diet} size="small" color="success" />
                    ))}
                  </Box>
                  {item.allergens.length > 0 && item.allergens[0] !== 'None' && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="error.main">
                        Allergens: {item.allergens.join(', ')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Cost Analysis Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Cost Trends & Margins</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockCostTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="avgCost" fill="#8884d8" name="Avg Cost (R)" />
                    <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#82ca9d" name="Margin %" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Profit Analysis</Typography>
              {mockFoodItems.map((item, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">{item.name}</Typography>
                    <Typography variant="h6" color="primary.main">R{item.price}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Cost: R{item.costPerServing}</Typography>
                    <Typography variant="body2" color="success.main">
                      Profit: R{(item.price - item.costPerServing).toFixed(2)}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.margin} 
                    sx={{ height: 6, borderRadius: 3 }}
                    color={item.margin > 60 ? 'success' : item.margin > 40 ? 'warning' : 'error'}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {item.margin.toFixed(1)}% margin
                  </Typography>
                </Box>
              ))}
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Inventory Tracking Tab */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                23 items are below reorder point. 5 items expire within 7 days.
              </Typography>
            </Alert>
          </Grid>
          <Grid item xs={12} md={8}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Inventory Status by Category</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockInventoryStatus}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="inStock" stackId="a" fill="#4caf50" name="In Stock" />
                    <Bar dataKey="lowStock" stackId="a" fill="#ff9800" name="Low Stock" />
                    <Bar dataKey="outOfStock" stackId="a" fill="#f44336" name="Out of Stock" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, color: colors.oxfordBlue, fontWeight: 600 }}>Expiry Alerts</Typography>
              {mockFoodItems.map((item, index) => {
                const expiryStatus = getExpiryStatus(item.expiryDate);
                return (
                  <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">{item.name}</Typography>
                      <Chip 
                        label={expiryStatus.status} 
                        color={expiryStatus.color as any}
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Stock: {item.stock} units
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Expires: {item.expiryDate}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(item.stock / (item.reorderPoint * 2)) * 100} 
                      sx={{ height: 4, borderRadius: 2 }}
                      color={item.stock > item.reorderPoint ? 'success' : 'warning'}
                    />
                  </Box>
                );
              })}
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Add/Edit Food Item Dialog */}
      <Dialog open={itemDialogOpen} onClose={() => setItemDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Food Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Item Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="protein">Protein</MenuItem>
                  <MenuItem value="vegetables">Vegetables</MenuItem>
                  <MenuItem value="grains">Grains</MenuItem>
                  <MenuItem value="dairy">Dairy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Price (R)" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Cost per Serving (R)" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Stock Quantity" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Calories" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Protein (g)" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Carbs (g)" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Fat (g)" type="number" variant="outlined" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setItemDialogOpen(false)}>
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Container>
  );
}
