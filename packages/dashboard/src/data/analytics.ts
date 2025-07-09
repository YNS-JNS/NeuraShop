import { Analytics } from '../types';

export const analytics: Analytics = {
  totalSales: 125430.50,
  totalOrders: 342,
  totalProducts: 156,
  totalUsers: 1247,
  monthlyRevenue: [
    { month: 'Jan', revenue: 15200 },
    { month: 'Feb', revenue: 18500 },
    { month: 'Mar', revenue: 22100 },
    { month: 'Apr', revenue: 19800 },
    { month: 'May', revenue: 24300 },
    { month: 'Jun', revenue: 26700 },
    { month: 'Jul', revenue: 29400 },
    { month: 'Aug', revenue: 31200 },
    { month: 'Sep', revenue: 28900 },
    { month: 'Oct', revenue: 33500 },
    { month: 'Nov', revenue: 36800 },
    { month: 'Dec', revenue: 39200 }
  ],
  topProducts: [
    { name: 'Wireless Bluetooth Headphones', sales: 45 },
    { name: 'Smart Watch Pro', sales: 38 },
    { name: 'Gaming Mechanical Keyboard', sales: 32 },
    { name: 'Organic Cotton T-Shirt', sales: 28 },
    { name: 'Eco-Friendly Water Bottle', sales: 24 }
  ],
  ordersByStatus: [
    { status: 'delivered', count: 180 },
    { status: 'shipped', count: 85 },
    { status: 'processing', count: 45 },
    { status: 'pending', count: 32 }
  ]
};