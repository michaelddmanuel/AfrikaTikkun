import { v4 as uuidv4 } from 'uuid';

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  unitType: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'University' | 'Residence' | 'Cafeteria';
}

export interface InventoryItem {
  id: string;
  itemId: string;
  locationId: string;
  supplierId: string;
  currentStock: number;
  unitType: string;
  unitCost: number;
  purchaseDate: string;
  expiryDate: string | null;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export const mockCategories = [
  'Grains & Cereals',
  'Dairy & Eggs',
  'Meat & Poultry',
  'Seafood',
  'Fresh Produce',
  'Canned Goods',
  'Baking Supplies',
  'Spices & Seasonings',
  'Oils & Condiments',
  'Beverages',
  'Frozen Foods',
  'Snacks',
  'Legumes & Beans'
];

export const mockFoodItems: FoodItem[] = [
  { id: uuidv4(), name: 'Basmati Rice', category: 'Grains & Cereals', unitType: 'kg' },
  { id: uuidv4(), name: 'Brown Rice', category: 'Grains & Cereals', unitType: 'kg' },
  { id: uuidv4(), name: 'Quinoa', category: 'Grains & Cereals', unitType: 'kg' },
  { id: uuidv4(), name: 'Whole Wheat Flour', category: 'Grains & Cereals', unitType: 'kg' },
  { id: uuidv4(), name: 'All-Purpose Flour', category: 'Baking Supplies', unitType: 'kg' },
  { id: uuidv4(), name: 'Pasta - Penne', category: 'Grains & Cereals', unitType: 'kg' },
  { id: uuidv4(), name: 'Pasta - Spaghetti', category: 'Grains & Cereals', unitType: 'kg' },
  { id: uuidv4(), name: 'Oats', category: 'Grains & Cereals', unitType: 'kg' },
  { id: uuidv4(), name: 'Full Cream Milk', category: 'Dairy & Eggs', unitType: 'L' },
  { id: uuidv4(), name: 'Low Fat Milk', category: 'Dairy & Eggs', unitType: 'L' },
  { id: uuidv4(), name: 'Butter', category: 'Dairy & Eggs', unitType: 'kg' },
  { id: uuidv4(), name: 'Cheddar Cheese', category: 'Dairy & Eggs', unitType: 'kg' },
  { id: uuidv4(), name: 'Mozzarella Cheese', category: 'Dairy & Eggs', unitType: 'kg' },
  { id: uuidv4(), name: 'Eggs', category: 'Dairy & Eggs', unitType: 'dozen' },
  { id: uuidv4(), name: 'Yogurt', category: 'Dairy & Eggs', unitType: 'L' },
  { id: uuidv4(), name: 'Chicken Breast', category: 'Meat & Poultry', unitType: 'kg' },
  { id: uuidv4(), name: 'Chicken Thigh', category: 'Meat & Poultry', unitType: 'kg' },
  { id: uuidv4(), name: 'Whole Chicken', category: 'Meat & Poultry', unitType: 'kg' },
  { id: uuidv4(), name: 'Ground Beef', category: 'Meat & Poultry', unitType: 'kg' },
  { id: uuidv4(), name: 'Beef Steak', category: 'Meat & Poultry', unitType: 'kg' },
  { id: uuidv4(), name: 'Pork Chops', category: 'Meat & Poultry', unitType: 'kg' },
  { id: uuidv4(), name: 'Bacon', category: 'Meat & Poultry', unitType: 'kg' },
  { id: uuidv4(), name: 'Salmon Fillets', category: 'Seafood', unitType: 'kg' },
  { id: uuidv4(), name: 'Tilapia', category: 'Seafood', unitType: 'kg' },
  { id: uuidv4(), name: 'Shrimp', category: 'Seafood', unitType: 'kg' },
  { id: uuidv4(), name: 'Potatoes', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Onions', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Tomatoes', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Bell Peppers', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Carrots', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Lettuce', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Spinach', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Apples', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Oranges', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Bananas', category: 'Fresh Produce', unitType: 'kg' },
  { id: uuidv4(), name: 'Canned Tomatoes', category: 'Canned Goods', unitType: 'can' },
  { id: uuidv4(), name: 'Canned Beans', category: 'Canned Goods', unitType: 'can' },
  { id: uuidv4(), name: 'Canned Tuna', category: 'Canned Goods', unitType: 'can' },
  { id: uuidv4(), name: 'Canned Corn', category: 'Canned Goods', unitType: 'can' },
  { id: uuidv4(), name: 'Sugar', category: 'Baking Supplies', unitType: 'kg' },
  { id: uuidv4(), name: 'Salt', category: 'Spices & Seasonings', unitType: 'kg' },
  { id: uuidv4(), name: 'Black Pepper', category: 'Spices & Seasonings', unitType: 'kg' },
  { id: uuidv4(), name: 'Paprika', category: 'Spices & Seasonings', unitType: 'kg' },
  { id: uuidv4(), name: 'Cumin', category: 'Spices & Seasonings', unitType: 'kg' },
  { id: uuidv4(), name: 'Olive Oil', category: 'Oils & Condiments', unitType: 'L' },
  { id: uuidv4(), name: 'Vegetable Oil', category: 'Oils & Condiments', unitType: 'L' },
  { id: uuidv4(), name: 'Soy Sauce', category: 'Oils & Condiments', unitType: 'L' },
  { id: uuidv4(), name: 'Ketchup', category: 'Oils & Condiments', unitType: 'L' },
  { id: uuidv4(), name: 'Mayonnaise', category: 'Oils & Condiments', unitType: 'L' },
  { id: uuidv4(), name: 'Coffee', category: 'Beverages', unitType: 'kg' },
  { id: uuidv4(), name: 'Tea Bags', category: 'Beverages', unitType: 'box' },
  { id: uuidv4(), name: 'Juice - Orange', category: 'Beverages', unitType: 'L' },
  { id: uuidv4(), name: 'Juice - Apple', category: 'Beverages', unitType: 'L' },
  { id: uuidv4(), name: 'Soda', category: 'Beverages', unitType: 'L' },
  { id: uuidv4(), name: 'Frozen Vegetables', category: 'Frozen Foods', unitType: 'kg' },
  { id: uuidv4(), name: 'Ice Cream', category: 'Frozen Foods', unitType: 'L' },
  { id: uuidv4(), name: 'Frozen Pizza', category: 'Frozen Foods', unitType: 'unit' },
  { id: uuidv4(), name: 'Potato Chips', category: 'Snacks', unitType: 'kg' },
  { id: uuidv4(), name: 'Cookies', category: 'Snacks', unitType: 'kg' },
  { id: uuidv4(), name: 'Chocolate Bars', category: 'Snacks', unitType: 'box' },
  { id: uuidv4(), name: 'Lentils', category: 'Legumes & Beans', unitType: 'kg' },
  { id: uuidv4(), name: 'Chickpeas', category: 'Legumes & Beans', unitType: 'kg' },
  { id: uuidv4(), name: 'Black Beans', category: 'Legumes & Beans', unitType: 'kg' },
];

export const mockSuppliers: Supplier[] = [
  { id: uuidv4(), name: 'Food World Distributors', contact: '+27 11 234 5678', email: 'orders@foodworld.co.za' },
  { id: uuidv4(), name: 'Fresh Harvest Ltd', contact: '+27 21 876 5432', email: 'sales@freshharvest.co.za' },
  { id: uuidv4(), name: 'Prime Meats', contact: '+27 31 765 4321', email: 'info@primemeats.co.za' },
  { id: uuidv4(), name: 'Sea Bounty Seafood', contact: '+27 41 222 3333', email: 'orders@seabounty.co.za' },
  { id: uuidv4(), name: 'Green Fields Produce', contact: '+27 12 987 6543', email: 'sales@greenfields.co.za' },
  { id: uuidv4(), name: 'Bakers Delight', contact: '+27 11 555 4444', email: 'wholesale@bakersdelight.co.za' },
  { id: uuidv4(), name: 'Global Spice Traders', contact: '+27 21 444 3333', email: 'orders@globalspice.co.za' },
  { id: uuidv4(), name: 'Sunrise Dairy', contact: '+27 31 333 2222', email: 'supply@sunrisedairy.co.za' },
  { id: uuidv4(), name: 'Premium Beverages', contact: '+27 11 777 8888', email: 'sales@premiumbev.co.za' },
  { id: uuidv4(), name: 'Frozen Foods Express', contact: '+27 12 222 1111', email: 'orders@frozenexpress.co.za' },
];

export const mockLocations: Location[] = [
  { id: uuidv4(), name: 'UCT Main Canteen', address: 'Upper Campus, University of Cape Town', type: 'University' },
  { id: uuidv4(), name: 'UCT Medical School Cafe', address: 'Health Sciences Campus, Observatory', type: 'University' },
  { id: uuidv4(), name: 'UCT Residence Kitchen 1', address: 'Fuller Hall, Rosebank', type: 'Residence' },
  { id: uuidv4(), name: 'UCT Residence Kitchen 2', address: 'Smuts Hall, Rondebosch', type: 'Residence' },
  { id: uuidv4(), name: 'UCT Residence Kitchen 3', address: 'Kopano Residence, Rondebosch', type: 'Residence' },
  { id: uuidv4(), name: 'Wits Main Dining Hall', address: 'West Campus, University of Witwatersrand', type: 'University' },
  { id: uuidv4(), name: 'Wits Medical Campus Cafe', address: 'Parktown, Johannesburg', type: 'Cafeteria' },
  { id: uuidv4(), name: 'Wits Residence Kitchen', address: 'Junction Residence, Braamfontein', type: 'Residence' },
  { id: uuidv4(), name: 'Stellenbosch Main Canteen', address: 'Victoria Street, Stellenbosch', type: 'University' },
  { id: uuidv4(), name: 'Stellenbosch Residence Dining', address: 'Helshoogte Residence, Stellenbosch', type: 'Residence' },
  { id: uuidv4(), name: 'UJ Main Cafeteria', address: 'Auckland Park Campus, Johannesburg', type: 'University' },
  { id: uuidv4(), name: 'UJ Residence Kitchen', address: 'Student Town Residence, Auckland Park', type: 'Residence' },
  { id: uuidv4(), name: 'UKZN Howard Campus Dining', address: 'Howard College Campus, Durban', type: 'University' },
  { id: uuidv4(), name: 'UKZN Westville Canteen', address: 'Westville Campus, Durban', type: 'University' },
  { id: uuidv4(), name: 'UKZN Residence Kitchen', address: 'Pius Langa Residence, Durban', type: 'Residence' },
  { id: uuidv4(), name: 'UWC Main Cafeteria', address: 'Robert Sobukwe Road, Bellville', type: 'University' },
  { id: uuidv4(), name: 'UWC Residence Kitchen', address: 'Hector Peterson Residence, Bellville', type: 'Residence' },
  { id: uuidv4(), name: 'Rhodes Dining Hall', address: 'Drostdy Lawns, Grahamstown', type: 'University' },
  { id: uuidv4(), name: 'Rhodes Residence Kitchen', address: 'Jan Smuts Residence, Grahamstown', type: 'Residence' },
  { id: uuidv4(), name: 'UP Hatfield Cafeteria', address: 'Hatfield Campus, Pretoria', type: 'University' },
];

// Function to generate random date within a range
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

// Function to generate random number within a range
const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate mock inventory data
export const generateMockInventory = (count: number = 500): InventoryItem[] => {
  const inventory: InventoryItem[] = [];
  
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1); // One year ago
  const endDate = new Date();
  
  for (let i = 0; i < count; i++) {
    const foodItem = mockFoodItems[Math.floor(Math.random() * mockFoodItems.length)];
    const location = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    const supplier = mockSuppliers[Math.floor(Math.random() * mockSuppliers.length)];
    
    const currentStock = randomNumber(0, 2000);
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    
    if (currentStock === 0) {
      status = 'Out of Stock';
    } else if (currentStock < 50) {
      status = 'Low Stock';
    } else {
      status = 'In Stock';
    }
    
    const purchaseDate = randomDate(startDate, endDate);
    
    // Some items have expiry dates, some don't
    let expiryDate: string | null = null;
    if (['Dairy & Eggs', 'Meat & Poultry', 'Seafood', 'Fresh Produce'].includes(foodItem.category)) {
      const expDate = new Date(purchaseDate);
      expDate.setMonth(expDate.getMonth() + randomNumber(1, 12)); // Expiry between 1-12 months after purchase
      expiryDate = expDate.toISOString().split('T')[0];
    }
    
    const unitCost = parseFloat((Math.random() * (250 - 10) + 10).toFixed(2)); // Random cost between R10 and R250
    
    inventory.push({
      id: uuidv4(),
      itemId: foodItem.id,
      locationId: location.id,
      supplierId: supplier.id,
      currentStock,
      unitType: foodItem.unitType,
      unitCost,
      purchaseDate,
      expiryDate,
      status
    });
  }
  
  return inventory;
};

// Generate 500 inventory items
export const mockInventory: InventoryItem[] = generateMockInventory(500);

// Calculate inventory statistics
export const getInventoryStats = () => {
  const totalItems = mockInventory.length;
  const lowStockItems = mockInventory.filter(item => item.status === 'Low Stock').length;
  const outOfStockItems = mockInventory.filter(item => item.status === 'Out of Stock').length;
  
  const totalStockValue = mockInventory.reduce((sum, item) => {
    return sum + (item.currentStock * item.unitCost);
  }, 0);
  
  const uniqueCategories = Array.from(new Set(mockFoodItems.map(item => item.category))).length;
  
  return {
    totalItems,
    lowStockItems,
    outOfStockItems,
    totalStockValue: totalStockValue.toFixed(2),
    uniqueCategories
  };
};

export const inventoryStats = getInventoryStats();
