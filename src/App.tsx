import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TripsInProgress from './pages/TripsInProgress';
import CompletedTrips from './pages/CompletedTrips';
import Alerts from './pages/Alerts';
import CameraFeeds from './pages/CameraFeeds';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Help from './pages/Help';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trips/in-progress" element={<TripsInProgress />} />
            <Route path="/trips/completed" element={<CompletedTrips />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/camera-feeds" element={<CameraFeeds />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
