import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation',
    price: 299.99,
    category: 'electronics',
    stock: 45,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'active',
    sku: 'WBH-001',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z'
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable organic cotton t-shirt available in multiple colors',
    price: 29.99,
    category: 'clothing',
    stock: 120,
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'active',
    sku: 'OCT-001',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T11:20:00Z'
  },
  {
    id: '3',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring and GPS',
    price: 449.99,
    category: 'electronics',
    stock: 25,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'active',
    sku: 'SWP-001',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-22T16:30:00Z'
  },
  {
    id: '4',
    name: 'Eco-Friendly Water Bottle',
    description: 'Sustainable stainless steel water bottle with temperature control',
    price: 24.99,
    category: 'accessories',
    stock: 0,
    images: [
      'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'out-of-stock',
    sku: 'EWB-001',
    createdAt: '2024-01-12T13:45:00Z',
    updatedAt: '2024-01-25T10:15:00Z'
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard for gaming enthusiasts',
    price: 129.99,
    category: 'electronics',
    stock: 35,
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    status: 'active',
    sku: 'GMK-001',
    createdAt: '2024-01-08T11:00:00Z',
    updatedAt: '2024-01-19T09:30:00Z'
  }
];