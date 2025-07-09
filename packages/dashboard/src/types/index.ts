export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  status: 'active' | 'inactive' | 'out-of-stock';
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: string;
  orderDate: string;
  deliveryDate?: string;
  trackingNumber?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  permissions: string[];
}

export interface Analytics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  monthlyRevenue: { month: string; revenue: number }[];
  topProducts: { name: string; sales: number }[];
  ordersByStatus: { status: string; count: number }[];
}