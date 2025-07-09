import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-25T09:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Jane Manager',
    email: 'jane.manager@company.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-24T16:45:00Z',
    createdAt: '2024-01-05T10:00:00Z',
    permissions: ['products', 'orders', 'users', 'analytics']
  },
  {
    id: '3',
    name: 'Bob Staff',
    email: 'bob.staff@company.com',
    role: 'staff',
    status: 'active',
    lastLogin: '2024-01-23T14:20:00Z',
    createdAt: '2024-01-10T08:30:00Z',
    permissions: ['products', 'orders']
  },
  {
    id: '4',
    name: 'Alice Support',
    email: 'alice.support@company.com',
    role: 'staff',
    status: 'inactive',
    lastLogin: '2024-01-15T12:00:00Z',
    createdAt: '2024-01-08T09:15:00Z',
    permissions: ['orders']
  }
];