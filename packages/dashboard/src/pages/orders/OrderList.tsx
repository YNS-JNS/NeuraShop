import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Order } from '@/types';
import { Eye } from 'lucide-react';

const OrderList = () => {
  const { state } = useApp();

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
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={
            status === 'delivered' ? 'default' : 
            status === 'shipped' ? 'secondary' : 
            status === 'processing' ? 'outline' : 'destructive'
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment',
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        return (
          <Badge variant={
            status === 'paid' ? 'default' : 
            status === 'pending' ? 'secondary' : 'destructive'
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'orderDate',
      header: 'Order Date',
      cell: ({ row }) => new Date(row.original.orderDate).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/orders/${order.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Link>
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={state.orders}
            searchPlaceholder="Search orders..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderList;