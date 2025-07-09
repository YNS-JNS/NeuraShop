import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { analytics } from '@/data/analytics';
import CustomBarChart from '@/components/charts/BarChart';
import CustomLineChart from '@/components/charts/LineChart';
import CustomPieChart from '@/components/charts/PieChart';
import CustomAreaChart from '@/components/charts/AreaChart';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target
} from 'lucide-react';

const Analytics = () => {
  const { state } = useApp();

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${analytics.totalSales.toLocaleString()}`,
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true,
      description: 'vs last month',
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      trend: '+8.2%',
      trendUp: true,
      description: 'vs last month',
    },
    {
      title: 'Products Sold',
      value: '2,847',
      icon: Package,
      trend: '+15.3%',
      trendUp: true,
      description: 'vs last month',
    },
    {
      title: 'Active Users',
      value: analytics.totalUsers.toLocaleString(),
      icon: Users,
      trend: '-2.1%',
      trendUp: false,
      description: 'vs last month',
    },
  ];

  const conversionData = [
    { name: 'Visitors', value: 12450 },
    { name: 'Product Views', value: 8920 },
    { name: 'Add to Cart', value: 3240 },
    { name: 'Checkout', value: 1890 },
    { name: 'Purchase', value: 1456 },
  ];

  const categoryPerformance = [
    { category: 'Electronics', revenue: 45200, orders: 156 },
    { category: 'Clothing', revenue: 32100, orders: 234 },
    { category: 'Accessories', revenue: 18900, orders: 189 },
    { category: 'Home & Garden', revenue: 15600, orders: 98 },
    { category: 'Sports', revenue: 13630, orders: 87 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Analytics</h1>
        <Badge variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Last 30 days
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm lg:text-base font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trendUp ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={stat.trendUp ? 'text-green-500' : 'text-red-500'}>
                    {stat.trend}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue and Sales Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Monthly Revenue Trend</CardTitle>
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

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Revenue by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomAreaChart
              data={analytics.monthlyRevenue}
              dataKey="revenue"
              xAxisKey="month"
              color="#82ca9d"
            />
          </CardContent>
        </Card>
      </div>

      {/* Product and Order Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomBarChart
              data={analytics.topProducts}
              dataKey="sales"
              xAxisKey="name"
              color="#ffc658"
            />
          </CardContent>
        </Card>

        <Card>
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
      </div>

      {/* Conversion Funnel and Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomBarChart
              data={conversionData}
              dataKey="value"
              xAxisKey="name"
              color="#ff7300"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{category.category}</p>
                    <p className="text-sm text-muted-foreground">{category.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${category.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$127.45</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+5.2%</span>
              <span className="ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68.4%</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+2.1%</span>
              <span className="ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2%</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">-0.3%</span>
              <span className="ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;