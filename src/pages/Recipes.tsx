import React, { useState } from 'react';
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
  Tooltip
} from '@mui/material';
import ModernTable from '../components/ModernTable';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import {
  Restaurant as RestaurantIcon,
  MenuBook as MenuBookIcon,
  Analytics as AnalyticsIcon,
  AutoAwesome as AIIcon,
  ShoppingCart as OrderIcon,
  TrendingUp as TrendingUpIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  LocalDining as DiningIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Send as SendIcon
} from '@mui/icons-material';

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

// Mock data for recipes and menus
const mockRecipes = [
  { id: 'RCP-001', name: 'Grilled Chicken Caesar Salad', category: 'Salads', price: 129.90, popularity: 92, ingredients: ['Chicken Breast', 'Romaine Lettuce', 'Caesar Dressing', 'Parmesan'], prepTime: 15, difficulty: 'Easy' },
  { id: 'RCP-002', name: 'Beef Burger Deluxe', category: 'Burgers', price: 154.90, popularity: 88, ingredients: ['Ground Beef', 'Brioche Bun', 'Cheddar Cheese', 'Lettuce', 'Tomato'], prepTime: 20, difficulty: 'Medium' },
  { id: 'RCP-003', name: 'Margherita Pizza', category: 'Pizza', price: 149.90, popularity: 85, ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Fresh Basil'], prepTime: 25, difficulty: 'Medium' },
  { id: 'RCP-004', name: 'Salmon Teriyaki Bowl', category: 'Bowls', price: 189.90, popularity: 79, ingredients: ['Salmon Fillet', 'Jasmine Rice', 'Teriyaki Sauce', 'Broccoli'], prepTime: 30, difficulty: 'Hard' },
  { id: 'RCP-005', name: 'Vegetarian Pasta Primavera', category: 'Pasta', price: 139.90, popularity: 76, ingredients: ['Penne Pasta', 'Mixed Vegetables', 'Olive Oil', 'Parmesan'], prepTime: 18, difficulty: 'Easy' },
  { id: 'RCP-006', name: 'BBQ Pulled Pork Sandwich', category: 'Sandwiches', price: 169.90, popularity: 82, ingredients: ['Pork Shoulder', 'BBQ Sauce', 'Coleslaw', 'Brioche Bun'], prepTime: 35, difficulty: 'Hard' }
];

const mockMenus = [
  { id: 'MENU-001', name: 'Spring Fresh Menu', type: 'Seasonal', items: 8, avgPrice: 152.50, status: 'Active', season: 'Spring', popularity: 87 },
  { id: 'MENU-002', name: 'Comfort Classics', type: 'Regular', items: 12, avgPrice: 145.00, status: 'Active', season: 'All Year', popularity: 91 },
  { id: 'MENU-003', name: 'Healthy Options', type: 'Special', items: 6, avgPrice: 167.50, status: 'Draft', season: 'All Year', popularity: 73 },
  { id: 'MENU-004', name: 'Summer BBQ Special', type: 'Seasonal', items: 10, avgPrice: 179.90, status: 'Scheduled', season: 'Summer', popularity: 89 }
];

const mockCategories = [
  { name: 'Salads', count: 8, avgPrice: 132.50, popularity: 78, color: '#FF6B6B' },
  { name: 'Burgers', count: 12, avgPrice: 159.90, popularity: 85, color: '#4ECDC4' },
  { name: 'Pizza', count: 6, avgPrice: 165.00, popularity: 82, color: '#45B7D1' },
  { name: 'Bowls', count: 9, avgPrice: 172.50, popularity: 79, color: '#96CEB4' },
  { name: 'Pasta', count: 11, avgPrice: 147.50, popularity: 76, color: '#FFEAA7' },
  { name: 'Sandwiches', count: 7, avgPrice: 152.50, popularity: 81, color: '#DDA0DD' }
];

const mockOrders = [
  { id: 'ORD-001', menu: 'Spring Fresh Menu', items: 3, totalPrice: 457.50, studentDiscount: 15, finalPrice: 388.88, timestamp: '2024-01-15 12:30' },
  { id: 'ORD-002', menu: 'Comfort Classics', items: 2, totalPrice: 290.00, studentDiscount: 15, finalPrice: 246.50, timestamp: '2024-01-15 12:25' },
  { id: 'ORD-003', menu: 'Healthy Options', items: 4, totalPrice: 670.00, studentDiscount: 15, finalPrice: 569.50, timestamp: '2024-01-15 12:20' }
];

// Additional analytics data
const mockTrendingItems = [
  { name: 'Beef Burger Deluxe', trend: '+15%', orders: 234 },
  { name: 'Margherita Pizza', trend: '+12%', orders: 189 },
  { name: 'Salmon Teriyaki Bowl', trend: '+8%', orders: 156 },
  { name: 'BBQ Pulled Pork Sandwich', trend: '+5%', orders: 143 }
];

const mockSeasonalInsights = [
  { season: 'Spring', performance: 87, revenue: 'R45,230', topCategory: 'Salads' },
  { season: 'Summer', performance: 92, revenue: 'R52,180', topCategory: 'Burgers' },
  { season: 'Autumn', performance: 79, revenue: 'R38,940', topCategory: 'Pasta' },
  { season: 'Winter', performance: 84, revenue: 'R41,560', topCategory: 'Sandwiches' }
];

const mockProfitMargins = [
  { category: 'Burgers', margin: 68, cost: 'R47.50', selling: 'R159.90' },
  { category: 'Pizza', margin: 72, cost: 'R46.20', selling: 'R165.00' },
  { category: 'Bowls', margin: 65, cost: 'R60.38', selling: 'R172.50' },
  { category: 'Salads', margin: 75, cost: 'R33.13', selling: 'R132.50' }
];


const Recipes: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [aiIngredients, setAiIngredients] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [orderItems, setOrderItems] = useState(3);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAiSuggestion = () => {
    // Mock AI suggestions based on ingredients
    const suggestions = [
      'Mediterranean Quinoa Bowl with ' + aiIngredients,
      'Asian Fusion Stir-fry featuring ' + aiIngredients,
      'Gourmet Flatbread topped with ' + aiIngredients,
      'Seasonal Soup incorporating ' + aiIngredients
    ];
    setAiSuggestions(suggestions);
  };

  const calculateOrderTotal = () => {
    const basePrice = orderItems * 15.99;
    const studentDiscount = 15; // 15% student discount
    const discountAmount = basePrice * (studentDiscount / 100);
    const finalPrice = basePrice - discountAmount;
    return { basePrice, discountAmount, finalPrice };
  };

  // Calculate analytics values
  const totalRecipes = mockRecipes.length;
  const activeMenus = mockMenus.filter(menu => menu.status === 'Active').length;
  const avgMenuPrice = mockMenus.reduce((sum, menu) => sum + menu.avgPrice, 0) / mockMenus.length;
  const totalCategories = mockCategories.length;

  return (
    <Box sx={{ p: 3, backgroundColor: colors.lightGrey, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            color: colors.oxfordBlue,
            mb: 1 
          }}
        >
          Recipe & Menu Management
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: colors.greyBlue,
            mb: 3 
          }}
        >
          Create, manage, and optimize your restaurant's recipes and menus
        </Typography>
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
            Export Menus
          </ModernButton>
          <ModernButton 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: colors.oxfordBlue,
              '&:hover': {
                backgroundColor: '#001a36'
              }
            }}
          >
            Create Menu
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
                  <StatsValue>{totalRecipes}</StatsValue>
                  <StatsLabel>Total Recipes</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#fee2e2' }}>
                <RestaurantIcon sx={{ color: colors.error, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label="+8%" 
                size="small" 
                sx={{ 
                  backgroundColor: '#dcfce7', 
                  color: '#16a34a',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }} 
              />
              <Typography variant="caption" sx={{ color: '#667085' }}>
                vs last month
              </Typography>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{activeMenus}</StatsValue>
                  <StatsLabel>Active Menus</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#f0f9ff' }}>
                <MenuBookIcon sx={{ color: '#0369a1', fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label="+3%" 
                size="small" 
                sx={{ 
                  backgroundColor: '#dcfce7', 
                  color: '#16a34a',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }} 
              />
              <Typography variant="caption" sx={{ color: '#667085' }}>
                vs last month
              </Typography>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>R{avgMenuPrice.toFixed(2)}</StatsValue>
                  <StatsLabel>Avg Menu Price</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#fef3c7' }}>
                <MoneyIcon sx={{ color: colors.warning, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label="+5%" 
                size="small" 
                sx={{ 
                  backgroundColor: '#dcfce7', 
                  color: '#16a34a',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }} 
              />
              <Typography variant="caption" sx={{ color: '#667085' }}>
                vs last month
              </Typography>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard sx={{ p: 3 }}>
            <StatsContainer>
              <StatsBox>
                <Box>
                  <StatsValue>{totalCategories}</StatsValue>
                  <StatsLabel>Food Categories</StatsLabel>
                </Box>
              </StatsBox>
              <StatsIconBox sx={{ backgroundColor: '#ecfdf5' }}>
                <CategoryIcon sx={{ color: colors.success, fontSize: 24 }} />
              </StatsIconBox>
            </StatsContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label="+2%" 
                size="small" 
                sx={{ 
                  backgroundColor: '#dcfce7', 
                  color: '#16a34a',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }} 
              />
              <Typography variant="caption" sx={{ color: '#667085' }}>
                vs last month
              </Typography>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <StyledCard sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="recipe management tabs"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                color: colors.greyBlue,
                minHeight: '48px',
                padding: '12px 16px',
                '&.Mui-selected': {
                  color: colors.oxfordBlue,
                  fontWeight: 600
                },
                '&:hover': {
                  color: colors.oxfordBlue,
                  backgroundColor: 'rgba(0, 33, 71, 0.04)'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: colors.oxfordBlue,
                height: '3px',
                borderRadius: '2px'
              },
            }}
          >
            <Tab label="Menu Management" icon={<MenuBookIcon />} iconPosition="start" />
            <Tab label="Recipe Analytics" icon={<AnalyticsIcon />} iconPosition="start" />
            <Tab label="AI Menu Assistant" icon={<AIIcon />} iconPosition="start" />
            <Tab label="Order Management" icon={<OrderIcon />} iconPosition="start" />
          </Tabs>
        </Box>
      </StyledCard>

      {/* Menu Management Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3 }}>
              <ModernTable
                title="Active Menus"
                subtitle="Manage your restaurant's menu offerings and performance"
                searchPlaceholder="Search menus..."
                data={mockMenus}
                columns={[
                  { id: 'name', label: 'MENU NAME', sortable: true },
                  { id: 'type', label: 'TYPE', sortable: true },
                  { id: 'items', label: 'ITEMS', sortable: true, align: 'right' },
                  { id: 'avgPrice', label: 'AVG PRICE', sortable: true },
                  { id: 'status', label: 'STATUS', sortable: true },
                  { id: 'popularity', label: 'POPULARITY', sortable: true },
                  { id: 'actions', label: 'ACTIONS', align: 'right' }
                ]}
                renderRow={(menu, index) => (
                  <TableRow
                    key={menu.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockMenus.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>{menu.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={menu.type} 
                        size="small"
                        sx={{
                          backgroundColor: menu.type === 'Seasonal' ? '#fef3c7' : menu.type === 'Special' ? '#dbeafe' : '#f3f4f6',
                          color: menu.type === 'Seasonal' ? colors.warning : menu.type === 'Special' ? '#1d4ed8' : colors.greyBlue,
                          fontWeight: 500,
                          fontSize: '12px'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{menu.items}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>R{menu.avgPrice}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={menu.status} 
                        size="small"
                        sx={{
                          backgroundColor: menu.status === 'Active' ? '#dcfce7' : menu.status === 'Scheduled' ? '#dbeafe' : '#f3f4f6',
                          color: menu.status === 'Active' ? colors.success : menu.status === 'Scheduled' ? '#1d4ed8' : colors.greyBlue,
                          fontWeight: 500,
                          fontSize: '12px'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ color: '#fbbf24', fontSize: 16, mr: 0.5 }} />
                        <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{menu.popularity}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          mr: 1, 
                          color: colors.greyBlue,
                          '&:hover': { backgroundColor: '#f3f4f6' }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <ModernButton 
                        size="small" 
                        variant="outlined" 
                        sx={{ 
                          borderColor: '#d0d5dd',
                          color: colors.greyBlue,
                          fontSize: '12px',
                          padding: '4px 8px',
                          '&:hover': {
                            borderColor: '#98a2b3',
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        Rotate
                      </ModernButton>
                    </TableCell>
                  </TableRow>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Food Categories Distribution</Typography>
              <Box sx={{ height: 300, mb: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="popularity"
                      label={({ name, popularity }: any) => `${name}: ${popularity}%`}
                    >
                      {mockCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: any) => [`${value}%`, 'Popularity']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box>
                {mockCategories.map((category) => (
                  <Box key={category.name} sx={{ mb: 1.5, p: 1.5, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Box 
                        sx={{ 
                          width: 12, 
                          height: 12, 
                          bgcolor: category.color, 
                          borderRadius: '50%', 
                          mr: 1 
                        }} 
                      />
                      <Typography variant="subtitle2" fontWeight="bold">{category.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {category.count} items • R{category.avgPrice} avg • {category.popularity}% popularity
                    </Typography>
                  </Box>
                ))}
              </Box>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Recipe Analytics Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3 }}>
              <ModernTable
                title="Recipe Performance Analytics"
                subtitle="Track recipe popularity, pricing, and performance metrics"
                searchPlaceholder="Search recipes..."
                data={mockRecipes}
                columns={[
                  { id: 'name', label: 'RECIPE NAME', sortable: true },
                  { id: 'category', label: 'CATEGORY', sortable: true },
                  { id: 'price', label: 'PRICE', sortable: true, align: 'right' },
                  { id: 'popularity', label: 'POPULARITY', sortable: true },
                  { id: 'prepTime', label: 'PREP TIME', sortable: true },
                  { id: 'difficulty', label: 'DIFFICULTY', sortable: true },
                  { id: 'actions', label: 'ACTIONS', align: 'right' }
                ]}
                renderRow={(recipe, index) => (
                  <TableRow
                    key={recipe.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockRecipes.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>{recipe.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{recipe.category}</Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>R{recipe.price}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FavoriteIcon sx={{ color: colors.error, fontSize: 16, mr: 0.5 }} />
                        <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{recipe.popularity}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{recipe.prepTime} min</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Chip 
                        label={recipe.difficulty} 
                        size="small"
                        sx={{
                          backgroundColor: recipe.difficulty === 'Easy' ? '#dcfce7' : recipe.difficulty === 'Medium' ? '#fef3c7' : '#fecaca',
                          color: recipe.difficulty === 'Easy' ? colors.success : recipe.difficulty === 'Medium' ? colors.warning : colors.error,
                          fontWeight: 500,
                          fontSize: '12px'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <ModernButton 
                        size="small" 
                        variant="outlined" 
                        sx={{ 
                          mr: 1,
                          borderColor: '#d0d5dd',
                          color: colors.greyBlue,
                          fontSize: '12px',
                          padding: '4px 8px',
                          '&:hover': {
                            borderColor: '#98a2b3',
                            backgroundColor: '#f9fafb'
                          }
                        }}
                      >
                        Edit
                      </ModernButton>
                      <ModernButton 
                        size="small" 
                        variant="text" 
                        sx={{ 
                          color: colors.error,
                          fontSize: '12px',
                          padding: '4px 8px',
                          '&:hover': {
                            backgroundColor: '#fef2f2'
                          }
                        }}
                      >
                        Delete
                      </ModernButton>
                    </TableCell>
                  </TableRow>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledCard sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Trending Items</Typography>
                  {mockTrendingItems.map((item, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.orders} orders</Typography>
                        </Box>
                        <Chip label={item.trend} color="success" size="small" />
                      </Box>
                    </Box>
                  ))}
                </StyledCard>
              </Grid>
              <Grid item xs={12}>
                <StyledCard sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Profit Margins</Typography>
                  {mockProfitMargins.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">{item.category}</Typography>
                        <Typography variant="h6" color="success.main">{item.margin}%</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">Cost: {item.cost}</Typography>
                        <Typography variant="caption" color="text.secondary">Selling: {item.selling}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.margin} 
                        sx={{ height: 6, borderRadius: 3 }}
                        color="success"
                      />
                    </Box>
                  ))}
                </StyledCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* AI Menu Assistant Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>AI Menu Assistant</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Enter Available Ingredients"
                placeholder="e.g., chicken, tomatoes, basil, mozzarella, pasta..."
                value={aiIngredients}
                onChange={(e) => setAiIngredients(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                variant="contained"
                startIcon={<AIIcon />}
                onClick={handleAiSuggestion}
                disabled={!aiIngredients}
                fullWidth
                sx={{ mb: 3 }}
              >
                Generate Menu Ideas
              </Button>
              {aiSuggestions.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>AI Suggestions:</Typography>
                  <List>
                    {aiSuggestions.map((suggestion, index) => (
                      <ListItem key={index} sx={{ bgcolor: 'grey.50', mb: 1, borderRadius: 2 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <RestaurantIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={suggestion} />
                        <Button size="small" variant="outlined">
                          Add to Menu
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledCard sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Seasonal Performance</Typography>
                  {mockSeasonalInsights.map((season, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">{season.season}</Typography>
                        <Typography variant="h6" color="primary.main">{season.performance}%</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Revenue: {season.revenue}</Typography>
                        <Typography variant="body2" color="text.secondary">Top: {season.topCategory}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={season.performance} 
                        sx={{ height: 6, borderRadius: 3 }}
                        color="primary"
                      />
                    </Box>
                  ))}
                </StyledCard>
              </Grid>
              <Grid item xs={12}>
                <StyledCard sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Menu Optimization Tips</Typography>
                  <StyledCard sx={{ mb: 2, p: 2, bgcolor: 'success.50' }}>
                    <Typography variant="subtitle2" color="success.main">High Performing Categories</Typography>
                    <Typography variant="body2">Burgers and Pizza show highest popularity (85%+)</Typography>
                  </StyledCard>
                  <StyledCard sx={{ mb: 2, p: 2, bgcolor: 'warning.50' }}>
                    <Typography variant="subtitle2" color="warning.main">Seasonal Opportunity</Typography>
                    <Typography variant="body2">Consider adding summer-themed items for upcoming season</Typography>
                  </StyledCard>
                  <StyledCard sx={{ mb: 2, p: 2, bgcolor: 'info.50' }}>
                    <Typography variant="subtitle2" color="info.main">Price Optimization</Typography>
                    <Typography variant="body2">Bowls category has highest margin potential at R172.50 avg</Typography>
                  </StyledCard>
                  <StyledCard sx={{ p: 2, bgcolor: 'error.50' }}>
                    <Typography variant="subtitle2" color="error.main">Attention Needed</Typography>
                    <Typography variant="body2">Pasta category showing declining popularity trend</Typography>
                  </StyledCard>
                </StyledCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Order Management Tab */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3 }}>
              <ModernTable
                title="Recent Orders"
                subtitle="Track and manage recent menu orders and pricing"
                searchPlaceholder="Search orders..."
                data={mockOrders}
                columns={[
                  { id: 'id', label: 'ORDER ID', sortable: true },
                  { id: 'menu', label: 'MENU', sortable: true },
                  { id: 'items', label: 'ITEMS', sortable: true },
                  { id: 'totalPrice', label: 'BASE PRICE', sortable: true },
                  { id: 'studentDiscount', label: 'STUDENT DISCOUNT', sortable: true },
                  { id: 'finalPrice', label: 'FINAL PRICE', sortable: true },
                  { id: 'timestamp', label: 'TIME', sortable: true }
                ]}
                renderRow={(order, index) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: index === mockOrders.length - 1 ? 'none' : '1px solid #e4e7ec'
                    }}
                  >
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ fontWeight: 600, color: colors.oxfordBlue }}>{order.id}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{order.menu}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{order.items}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>R{order.totalPrice.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>-{order.studentDiscount}%</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ fontWeight: 600, color: colors.success }}>R{order.finalPrice}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 4, px: 3, borderBottom: 'none' }}>
                      <Typography sx={{ color: colors.greyBlue, fontWeight: 500 }}>{order.timestamp}</Typography>
                    </TableCell>
                  </TableRow>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: colors.oxfordBlue, fontWeight: 600 }}>Place New Order</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Menu</InputLabel>
                <Select
                  value={selectedMenu}
                  onChange={(e) => setSelectedMenu(e.target.value)}
                >
                  {mockMenus.filter(menu => menu.status === 'Active').map((menu) => (
                    <MenuItem key={menu.id} value={menu.name}>
                      {menu.name} (R{menu.avgPrice})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="number"
                label="Number of Items"
                value={orderItems}
                onChange={(e) => setOrderItems(parseInt(e.target.value) || 1)}
                sx={{ mb: 3 }}
              />
              {selectedMenu && (
                <Card sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Order Calculation:</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Base Price:</Typography>
                    <Typography variant="body2">R{calculateOrderTotal().basePrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Student Discount (15%):</Typography>
                    <Typography variant="body2" color="success.main">-R{calculateOrderTotal().discountAmount.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" fontWeight="bold">Final Price:</Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                      R{calculateOrderTotal().finalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Card>
              )}
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                fullWidth
                disabled={!selectedMenu}
                onClick={() => setOrderDialogOpen(true)}
              >
                Submit Order
              </Button>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {/* Order Confirmation Dialog */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)}>
        <DialogTitle>Order Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Order submitted successfully! Final price: R{calculateOrderTotal().finalPrice.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Recipes;
