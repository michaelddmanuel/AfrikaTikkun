// Mock location data for the camera feed system
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'kitchen' | 'warehouse' | 'distribution';
  active: boolean;
}

export const mockLocations: Location[] = [
  {
    id: 'LOC-001',
    name: 'Main Kitchen Facility',
    address: '123 Culinary Ave',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    type: 'kitchen',
    active: true
  },
  {
    id: 'LOC-002',
    name: 'East Bay Warehouse',
    address: '456 Storage Blvd',
    city: 'Oakland',
    state: 'CA',
    zipCode: '94612',
    type: 'warehouse',
    active: true
  },
  {
    id: 'LOC-003',
    name: 'South Distribution Center',
    address: '789 Logistics Way',
    city: 'San Jose',
    state: 'CA',
    zipCode: '95113',
    type: 'distribution',
    active: true
  }
];
