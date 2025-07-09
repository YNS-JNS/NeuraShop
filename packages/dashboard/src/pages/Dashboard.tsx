import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { analytics } from '@/data/analytics';
import CustomBarChart from '@/components/charts/BarChart';
import CustomLineChart from '@/components/charts/LineChart';
import CustomPieChart from '@/components/charts/PieChart';
import CustomAreaChart from '@/components/charts/AreaChart';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const { state } = useApp();

  const recentOrders = state.orders.slice(-5).reverse();
  const lowStockProducts = state.products.filter(p => p.stock < 10);

  const stats = [
    {
      title: 'Total Sales',
      value: `$${analytics.totalSales.toLocaleString()}`,
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      trend: '+8.2%',
      trendUp: true,
    },
    {
      title: 'Total Products',
      value: state.products.length.toString(),
      icon: Package,
      trend: '+3.1%',
      trendUp: true,
    },
    {
      title: 'Total Users',
      value: analytics.totalUsers.toLocaleString(),
      icon: Users,
      trend: '-2.1%',
      trendUp: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <Badge variant="outline" className="w-fit">Live Data</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {stat.trendUp ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={stat.trendUp ? 'text-green-500' : 'text-red-500'}>
                    {stat.trend}
                  </span>
                  <span className="ml-1 hidden sm:inline">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart
              data={analytics.monthlyRevenue}
              dataKey="revenue"
              xAxisKey="month"
              color="#8884d8"
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomBarChart
              data={analytics.topProducts}
              dataKey="sales"
              xAxisKey="name"
              color="#82ca9d"
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomPieChart
              data={analytics.ordersByStatus}
              dataKey="count"
              nameKey="status"
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomAreaChart
              data={analytics.monthlyRevenue}
              dataKey="revenue"
              xAxisKey="month"
              color="#ffc658"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground truncate">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <Badge variant={
                      order.status === 'delivered' ? 'default' : 
                      order.status === 'shipped' ? 'secondary' : 
                      order.status === 'processing' ? 'outline' : 'destructive'
                    } className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-xs">
                      {product.stock} left
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;