import { Order } from '../types';

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    products: [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        price: 299.99
      },
      {
        id: '2',
        name: 'Organic Cotton T-Shirt',
        quantity: 2,
        price: 29.99
      }
    ],
    total: 359.97,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: '123 Main St, New York, NY 10001',
    orderDate: '2024-01-20T10:30:00Z',
    deliveryDate: '2024-01-25T14:00:00Z',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    products: [
      {
        id: '3',
        name: 'Smart Watch Pro',
        quantity: 1,
        price: 449.99
      }
    ],
    total: 449.99,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
    orderDate: '2024-01-22T15:45:00Z',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    customerName: 'Michael Brown',
    customerEmail: 'michael.brown@email.com',
    products: [
      {
        id: '5',
        name: 'Gaming Mechanical Keyboard',
        quantity: 1,
        price: 129.99
      }
    ],
    total: 129.99,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: '789 Pine St, Chicago, IL 60601',
    orderDate: '2024-01-24T09:15:00Z'
  },
  {
    id: 'ORD-004',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    products: [
      {
        id: '2',
        name: 'Organic Cotton T-Shirt',
        quantity: 3,
        price: 29.99
      }
    ],
    total: 89.97,
    status: 'pending',
    paymentStatus: 'pending',
    shippingAddress: '321 Elm St, Miami, FL 33101',
    orderDate: '2024-01-25T11:20:00Z'
  }
];