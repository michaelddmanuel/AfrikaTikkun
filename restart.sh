#!/bin/bash

# Restart protocol for Truck Tracking Dashboard
# This script handles the process of stopping, cleaning, and restarting the application on port 3000

echo "🔄 Truck Tracking Dashboard - Restart Protocol"
echo "==============================================="

# Check if the application is running on port 3000
if lsof -i :3000 > /dev/null; then
  echo "🛑 Stopping existing process on port 3000..."
  PID=$(lsof -ti :3000)
  kill -9 $PID
  echo "✅ Process stopped successfully"
else
  echo "✅ No application running on port 3000"
fi

# Clear any cached files
echo "🧹 Cleaning temporary files..."
rm -rf node_modules/.cache

# Install dependencies if node_modules doesn't exist or is requested
if [ ! -d "node_modules" ] || [ "$1" == "--reinstall" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Set environment variable to force port 3000
export PORT=3000

# Start the application
echo "🚀 Starting Truck Tracking Dashboard on port 3000..."
npm start

# Note: The script will end once you Ctrl+C the npm start process
