import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Package, ShoppingCart, Users, AlertTriangle, CheckCircle, Clock, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'product' | 'user' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'New Order Received',
    message: 'Order #ORD-005 has been placed by customer John Doe for $299.99',
    timestamp: '2024-01-25T10:30:00Z',
    read: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'product',
    title: 'Low Stock Alert',
    message: 'Eco-Friendly Water Bottle is running low on stock (2 items remaining)',
    timestamp: '2024-01-25T09:15:00Z',
    read: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'user',
    title: 'New User Registration',
    message: 'A new user has registered: sarah.wilson@email.com',
    timestamp: '2024-01-25T08:45:00Z',
    read: true,
    priority: 'low',
  },
  {
    id: '4',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM',
    timestamp: '2024-01-24T16:00:00Z',
    read: false,
    priority: 'medium',
  },
  {
    id: '5',
    type: 'order',
    title: 'Order Shipped',
    message: 'Order #ORD-003 has been shipped and tracking number TRK987654321 has been assigned',
    timestamp: '2024-01-24T14:20:00Z',
    read: true,
    priority: 'low',
  },
  {
    id: '6',
    type: 'product',
    title: 'Product Out of Stock',
    message: 'Gaming Mechanical Keyboard is now out of stock',
    timestamp: '2024-01-24T12:10:00Z',
    read: false,
    priority: 'high',
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4" />;
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'user':
        return <Users className="h-4 w-4" />;
      case 'system':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} unread</Badge>
          )}
        </div>
        <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter(n => 
                new Date(n.timestamp).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="order">Orders</TabsTrigger>
              <TabsTrigger value="product">Products</TabsTrigger>
              <TabsTrigger value="user">Users</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No notifications found
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div key={notification.id} className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                      !notification.read ? 'bg-muted/50' : ''
                    }`}>
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                {notification.title}
                              </h3>
                              <Badge variant={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-1 sm:gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  </div>
  );
};

export default Notifications;