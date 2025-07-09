import { ColumnDef } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Order } from '@/types';
import { Truck, Package, MapPin, Clock } from 'lucide-react';

const DeliveryTracking = () => {
  const { state } = useApp();

  // Filter orders that have been shipped or delivered
  const deliveryOrders = state.orders.filter(order => 
    order.status === 'shipped' || order.status === 'delivered'
  );

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => (
        <div className="font-medium">{row.original.id}</div>
      ),
    },
    {
      accessorKey: 'customerName',
      header: 'Customer',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'shippingAddress',
      header: 'Destination',
      cell: ({ row }) => (
        <div className="max-w-xs truncate" title={row.original.shippingAddress}>
          {row.original.shippingAddress}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status === 'delivered' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'trackingNumber',
      header: 'Tracking Number',
      cell: ({ row }) => (
        <div className="font-mono text-sm">
          {row.original.trackingNumber || 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'orderDate',
      header: 'Ship Date',
      cell: ({ row }) => new Date(row.original.orderDate).toLocaleDateString(),
    },
    {
      accessorKey: 'deliveryDate',
      header: 'Delivery Date',
      cell: ({ row }) => {
        const deliveryDate = row.original.deliveryDate;
        return deliveryDate ? new Date(deliveryDate).toLocaleDateString() : 'Pending';
      },
    },
    {
      id: 'actions',
      cell: () => {
        return (
          <Button variant="outline" size="sm">
            Track Package
          </Button>
        );
      },
    },
  ];

  const shippedOrders = deliveryOrders.filter(order => order.status === 'shipped');
  const deliveredOrders = deliveryOrders.filter(order => order.status === 'delivered');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Delivery Tracking</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryOrders.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{shippedOrders.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <MapPin className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deliveredOrders.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Table */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Shipment Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={deliveryOrders}
            searchPlaceholder="Search shipments..."
          />
        </CardContent>
      </Card>

      {/* Recent Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveredOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Delivered</p>
                  <p className="text-xs text-muted-foreground">
                    {order.deliveryDate && new Date(order.deliveryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryTracking;