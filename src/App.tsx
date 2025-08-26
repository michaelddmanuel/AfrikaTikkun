import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import InventoryTracking from './pages/InventoryTracking';
import InventoryAnalytics from './pages/InventoryAnalytics';
import InventoryMonitoring from './pages/InventoryMonitoring';
import OutlierDetection from './pages/OutlierDetection';
import ErrorBoundary from './components/ErrorBoundary';
import TripsInProgress from './pages/TripsInProgress';
import CompletedTrips from './pages/CompletedTrips';
import Alerts from './pages/Alerts';
import CameraFeeds from './pages/CameraFeeds';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Help from './pages/Help';
import Recipes from './pages/Recipes';
import Suppliers from './pages/Suppliers';
import FoodItems from './pages/FoodItems';
import Locations from './pages/Locations';
import Purchases from './pages/Purchases';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/inventory-tracking" element={<Layout><InventoryTracking /></Layout>} />
            <Route path="/inventory-analytics" element={<Layout><InventoryAnalytics /></Layout>} />
            <Route path="/inventory-monitoring" element={<Layout><InventoryMonitoring /></Layout>} />
            <Route path="/outlier-detection" element={<Layout><OutlierDetection /></Layout>} />
            <Route path="/trips-in-progress" element={<Layout><TripsInProgress /></Layout>} />
            <Route path="/completed-trips" element={<Layout><CompletedTrips /></Layout>} />
            <Route path="/alerts" element={<Layout><Alerts /></Layout>} />
            <Route path="/camera-feeds" element={<Layout><CameraFeeds /></Layout>} />
            <Route path="/recipes" element={<Layout><Recipes /></Layout>} />
            <Route path="/suppliers" element={<Layout><Suppliers /></Layout>} />
            <Route path="/food-items" element={<Layout><FoodItems /></Layout>} />
            <Route path="/locations" element={<Layout><Locations /></Layout>} />
            <Route path="/purchases" element={<Layout><Purchases /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/reports" element={<Layout><Reports /></Layout>} />
            <Route path="/help" element={<Layout><Help /></Layout>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
