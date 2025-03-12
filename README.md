# ACEI Mining - Truck Tracking Dashboard

A modern web-based dashboard for monitoring high-value mining and explosives cargo shipments via trucks. This dashboard features real-time tracking, alerts, and camera feeds with a sleek and responsive UI inspired by ride-sharing apps.

## Features

- **Real-time Trip Monitoring**: Track active shipments with detailed information and map visualization
- **Interactive Map**: View truck locations and routes on a customized map interface
- **Alert Management**: Monitor and respond to critical, warning, and normal status alerts
- **Camera Feeds**: Access cabin, cargo, and exterior camera feeds for selected trucks
- **Trip History**: Review completed trips with detailed analytics
- **Responsive Design**: Access the dashboard from desktop, tablet, or mobile devices

## Technology Stack

- **Frontend**: React, TypeScript, Material-UI
- **Maps**: Google Maps API integration
- **State Management**: React Hooks
- **Routing**: React Router
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/truck-tracking-dashboard.git
   cd truck-tracking-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google Maps API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `src/components/`: Reusable UI components
- `src/pages/`: Page components for different routes
- `src/styles/`: Theme configuration and global styles
- `src/mock-data/`: Mock data for development
- `src/utils/`: Helper functions and utilities
- `src/services/`: API service functions

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Deployment

The application can be deployed to any static hosting service such as:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## License

[MIT](LICENSE)
