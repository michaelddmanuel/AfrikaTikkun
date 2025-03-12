export interface Trip {
  id: string;
  cargoType: string;
  cargoCategory: 'explosives' | 'mining-materials' | 'equipment' | 'chemicals';
  startAddress: string;
  startCoordinates: { lat: number; lng: number };
  destinationAddress: string;
  destinationCoordinates: { lat: number; lng: number };
  clientName: string;
  clientCompany: string;
  clientPhotoUrl: string;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
  route: Array<{ lat: number; lng: number }>;
  currentLocation: { lat: number; lng: number };
  networkStatus: 'connected' | 'gps-only' | 'disconnected';
  startTime: string;
  estimatedArrival: string;
  completedTime?: string;
  truckId: string;
  driverId: string;
  driverName: string;
}

export const mockTrips: Trip[] = [
  {
    id: 'EV-2017002346',
    cargoType: 'Explosives - High Risk',
    cargoCategory: 'explosives',
    startAddress: 'Johannesburg CBD, Gauteng, South Africa',
    startCoordinates: { lat: -26.2041, lng: 28.0473 },
    destinationAddress: 'Kimberley Mine, Northern Cape, South Africa',
    destinationCoordinates: { lat: -28.7282, lng: 24.7499 },
    clientName: 'Darrell Steward',
    clientCompany: 'ACEI Mining Solutions',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'normal',
    lastUpdated: '2 mins ago',
    route: [
      { lat: -26.2041, lng: 28.0473 },
      { lat: -27.0568, lng: 26.8589 }, 
      { lat: -28.0568, lng: 25.6089 },
      { lat: -28.7282, lng: 24.7499 }
    ],
    currentLocation: { lat: -27.0568, lng: 26.8589 },
    networkStatus: 'connected',
    startTime: '2025-03-10T10:30:00Z',
    estimatedArrival: '2025-03-11T16:45:00Z',
    truckId: 'TRK-78945',
    driverId: 'DRV-1124',
    driverName: 'Michael Johnson'
  },
  {
    id: 'EV-2017002347',
    cargoType: 'Mining Materials',
    cargoCategory: 'mining-materials',
    startAddress: 'Pretoria CBD, Gauteng, South Africa',
    startCoordinates: { lat: -25.7479, lng: 28.2293 },
    destinationAddress: 'Witbank Mining District, Mpumalanga, South Africa',
    destinationCoordinates: { lat: -25.8715, lng: 29.2532 },
    clientName: 'Cameron Williamson',
    clientCompany: 'Richards Group',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    status: 'warning',
    lastUpdated: '5 mins ago',
    route: [
      { lat: -25.7479, lng: 28.2293 },
      { lat: -25.8174, lng: 28.5520 },
      { lat: -25.8505, lng: 28.9520 },
      { lat: -25.8715, lng: 29.2532 }
    ],
    currentLocation: { lat: -25.8505, lng: 28.9520 },
    networkStatus: 'gps-only',
    startTime: '2025-02-25T09:15:00Z',
    estimatedArrival: '2025-02-26T13:30:00Z',
    truckId: 'TRK-45698',
    driverId: 'DRV-8856',
    driverName: 'Sarah Garcia'
  },
  {
    id: 'EV-2017002348',
    cargoType: 'Explosives',
    cargoCategory: 'explosives',
    startAddress: 'Frankfurt Mining Hub, Frankfurt, Germany',
    startCoordinates: { lat: 50.1109, lng: 8.6821 },
    destinationAddress: 'Rotterdam Port, Netherlands',
    destinationCoordinates: { lat: 51.9244, lng: 4.4777 },
    clientName: 'Leslie Alexander',
    clientCompany: 'Quantum Mining Co.',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
    status: 'critical',
    lastUpdated: '1 min ago',
    route: [
      { lat: 50.1109, lng: 8.6821 },
      { lat: 50.9375, lng: 6.9603 },
      { lat: 51.4416, lng: 5.4697 },
      { lat: 51.9244, lng: 4.4777 }
    ],
    currentLocation: { lat: 51.4416, lng: 5.4697 },
    networkStatus: 'disconnected',
    startTime: '2025-02-25T11:45:00Z',
    estimatedArrival: '2025-02-25T19:20:00Z',
    truckId: 'TRK-14569',
    driverId: 'DRV-3344',
    driverName: 'James Wilson'
  },
  {
    id: 'EV-2017002349',
    cargoType: 'Mining Materials',
    cargoCategory: 'mining-materials',
    startAddress: 'Cape Town Harbour, Western Cape, South Africa',
    startCoordinates: { lat: -33.9249, lng: 18.4241 },
    destinationAddress: 'Durban Port, KwaZulu-Natal, South Africa',
    destinationCoordinates: { lat: -29.8587, lng: 31.0218 },
    clientName: 'Jenny Wilson',
    clientCompany: 'Alpine Resources',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/women/37.jpg',
    status: 'normal',
    lastUpdated: '7 mins ago',
    route: [
      { lat: -33.9249, lng: 18.4241 },
      { lat: -33.0145, lng: 21.8229 },
      { lat: -31.6341, lng: 25.3968 },
      { lat: -30.5595, lng: 27.3871 },
      { lat: -29.8587, lng: 31.0218 }
    ],
    currentLocation: { lat: -31.6341, lng: 25.3968 },
    networkStatus: 'connected',
    startTime: '2025-02-25T08:00:00Z',
    estimatedArrival: '2025-02-26T09:15:00Z',
    truckId: 'TRK-33695',
    driverId: 'DRV-6677',
    driverName: 'Robert Patel'
  },
  {
    id: 'EV-2017002350',
    cargoType: 'Food Materials',
    cargoCategory: 'equipment',
    startAddress: 'Berlin Industrial Area, Berlin, Germany',
    startCoordinates: { lat: 52.5200, lng: 13.4050 },
    destinationAddress: 'Warsaw Manufacturing Zone, Warsaw, Poland',
    destinationCoordinates: { lat: 52.2297, lng: 21.0122 },
    clientName: 'Jacob Jones',
    clientCompany: 'Desert Logistics',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/men/59.jpg',
    status: 'normal',
    lastUpdated: '3 mins ago',
    route: [
      { lat: 52.5200, lng: 13.4050 },
      { lat: 52.3661, lng: 14.5173 },
      { lat: 52.2297, lng: 21.0122 }
    ],
    currentLocation: { lat: 52.3661, lng: 14.5173 },
    networkStatus: 'connected',
    startTime: '2025-02-25T12:30:00Z',
    estimatedArrival: '2025-02-25T23:45:00Z',
    truckId: 'TRK-84712',
    driverId: 'DRV-9922',
    driverName: 'Emily Thompson'
  },
  // South Africa to Kenya
  {
    id: 'EV-2017002351',
    cargoType: 'Mining Equipment',
    cargoCategory: 'equipment',
    startAddress: 'Richards Bay Port, KwaZulu-Natal, South Africa',
    startCoordinates: { lat: -28.7807, lng: 32.0383 },
    destinationAddress: 'Mombasa Port, Mombasa, Kenya',
    destinationCoordinates: { lat: -4.0435, lng: 39.6682 },
    clientName: 'Nathan Omondi',
    clientCompany: 'East African Mining',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    status: 'normal',
    lastUpdated: '10 mins ago',
    route: [
      { lat: -28.7807, lng: 32.0383 },
      { lat: -23.3790, lng: 35.0131 }, // Mozambique
      { lat: -18.6657, lng: 35.5296 }, // Central Mozambique
      { lat: -11.6455, lng: 40.3311 }, // Northern Mozambique
      { lat: -6.7924, lng: 39.2083 }, // Tanzania Coast
      { lat: -4.0435, lng: 39.6682 }  // Mombasa, Kenya
    ],
    currentLocation: { lat: -18.6657, lng: 35.5296 },
    networkStatus: 'gps-only',
    startTime: '2025-03-08T07:15:00Z',
    estimatedArrival: '2025-03-15T18:30:00Z',
    truckId: 'TRK-92475',
    driverId: 'DRV-7788',
    driverName: 'Victor Ndlovu'
  },
  // South Africa to Egypt
  {
    id: 'EV-2017002352',
    cargoType: 'Mining Chemicals',
    cargoCategory: 'chemicals',
    startAddress: 'Port Elizabeth, Eastern Cape, South Africa',
    startCoordinates: { lat: -33.9608, lng: 25.6022 },
    destinationAddress: 'Alexandria Port, Alexandria, Egypt',
    destinationCoordinates: { lat: 31.2001, lng: 29.9187 },
    clientName: 'Ahmed El-Masri',
    clientCompany: 'North African Resources',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
    status: 'warning',
    lastUpdated: '15 mins ago',
    route: [
      { lat: -33.9608, lng: 25.6022 }, // Port Elizabeth
      { lat: -24.6282, lng: 25.9231 }, // Gaborone, Botswana
      { lat: -17.8252, lng: 31.0335 }, // Harare, Zimbabwe
      { lat: -2.5517, lng: 32.9024 }, // Tanzania 
      { lat: 9.1450, lng: 40.4897 },  // Ethiopia
      { lat: 15.3229, lng: 38.9251 }, // Eritrea
      { lat: 22.3964, lng: 31.3784 }, // Aswan, Egypt
      { lat: 31.2001, lng: 29.9187 }  // Alexandria, Egypt
    ],
    currentLocation: { lat: -2.5517, lng: 32.9024 },
    networkStatus: 'connected',
    startTime: '2025-03-05T06:30:00Z',
    estimatedArrival: '2025-03-22T14:15:00Z',
    truckId: 'TRK-38562',
    driverId: 'DRV-4129',
    driverName: 'Maria Van Wyk'
  },
  // Sudan to Turkey
  {
    id: 'EV-2017002353',
    cargoType: 'Gold Ore',
    cargoCategory: 'mining-materials',
    startAddress: 'Port Sudan, Red Sea State, Sudan',
    startCoordinates: { lat: 19.6158, lng: 37.2164 },
    destinationAddress: 'Mersin Port, Mersin, Turkey',
    destinationCoordinates: { lat: 36.8121, lng: 34.6339 },
    clientName: 'Mehmet Yilmaz',
    clientCompany: 'Anatolia Mining Corp',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/men/78.jpg',
    status: 'critical',
    lastUpdated: '8 mins ago',
    route: [
      { lat: 19.6158, lng: 37.2164 }, // Port Sudan
      { lat: 22.8392, lng: 35.5196 }, // Southern Egypt
      { lat: 26.5465, lng: 33.9289 }, // Eastern Egypt
      { lat: 30.0444, lng: 31.2357 }, // Cairo, Egypt
      { lat: 32.0947, lng: 34.7753 }, // Tel Aviv, Israel
      { lat: 35.1264, lng: 33.4299 }, // Nicosia, Cyprus
      { lat: 36.8121, lng: 34.6339 }  // Mersin, Turkey
    ],
    currentLocation: { lat: 30.0444, lng: 31.2357 },
    networkStatus: 'disconnected',
    startTime: '2025-03-07T09:45:00Z',
    estimatedArrival: '2025-03-16T17:30:00Z',
    truckId: 'TRK-67104',
    driverId: 'DRV-9035',
    driverName: 'Ibrahim Osman'
  }
];



export const mockCompletedTrips: Trip[] = [
  {
    id: 'EV-2017002340',
    cargoType: 'Mining Materials',
    cargoCategory: 'mining-materials',
    startAddress: 'Kimberley Diamond Mines, Northern Cape, South Africa',
    startCoordinates: { lat: -28.7282, lng: 24.7499 },
    destinationAddress: 'Rustenburg Platinum Mines, North West, South Africa',
    destinationCoordinates: { lat: -25.6544, lng: 27.2402 },
    clientName: 'Jerome Bell',
    clientCompany: 'Great Lakes Mining',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
    status: 'normal',
    lastUpdated: '2 days ago',
    route: [
      { lat: -28.7282, lng: 24.7499 },
      { lat: -27.1983, lng: 25.8607 },
      { lat: -25.6544, lng: 27.2402 }
    ],
    currentLocation: { lat: -25.6544, lng: 27.2402 },
    networkStatus: 'connected',
    startTime: '2025-02-22T08:30:00Z',
    estimatedArrival: '2025-02-22T14:30:00Z',
    completedTime: '2025-02-22T14:15:00Z',
    truckId: 'TRK-12345',
    driverId: 'DRV-2233',
    driverName: 'Thomas Lee'
  },
  {
    id: 'EV-2017002341',
    cargoType: 'Explosives',
    cargoCategory: 'explosives',
    startAddress: 'Paris Industrial District, Paris, France',
    startCoordinates: { lat: 48.8566, lng: 2.3522 },
    destinationAddress: 'Lyon Manufacturing Center, Lyon, France',
    destinationCoordinates: { lat: 45.7640, lng: 4.8357 },
    clientName: 'Cody Fisher',
    clientCompany: 'Eastern Dynamics',
    clientPhotoUrl: 'https://randomuser.me/api/portraits/men/69.jpg',
    status: 'normal',
    lastUpdated: '3 days ago',
    route: [
      { lat: 48.8566, lng: 2.3522 },
      { lat: 47.5579, lng: 3.6115 },
      { lat: 45.7640, lng: 4.8357 }
    ],
    currentLocation: { lat: 45.7640, lng: 4.8357 },
    networkStatus: 'connected',
    startTime: '2025-02-21T09:00:00Z',
    estimatedArrival: '2025-02-21T16:00:00Z',
    completedTime: '2025-02-21T16:25:00Z',
    truckId: 'TRK-67890',
    driverId: 'DRV-5544',
    driverName: 'Amanda Rodriguez'
  }
];
