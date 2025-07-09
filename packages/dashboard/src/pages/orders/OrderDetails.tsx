import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { Order } from '@/types';
import { ArrowLeft, Package, Truck, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      const foundOrder = state.orders.find(o => o.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast.error('Order not found');
        navigate('/orders');
      }
    }
  }, [id, state.orders, navigate]);

  const handleStatusUpdate = (newStatus: Order['status']) => {
    if (!order) return;

    const updatedOrder: Order = {
      ...order,
      status: newStatus,
    };

    dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
    setOrder(updatedOrder);
    toast.success(`Order status updated to ${newStatus}`);
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold">Order Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <CardTitle className="text-xl">Order {order.id}</CardTitle>
                <Badge variant={
                  order.status === 'delivered' ? 'default' : 
                  order.status === 'shipped' ? 'secondary' : 
                  order.status === 'processing' ? 'outline' : 'destructive'
                }>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Order Date:</span>
                  <p className="text-muted-foreground">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Payment Status:</span>
                  <p className="text-muted-foreground">
                    <Badge variant={
                      order.paymentStatus === 'paid' ? 'default' : 
                      order.paymentStatus === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {order.paymentStatus}
                    </Badge>
                  </p>
                </div>
                {order.deliveryDate && (
                  <div>
                    <span className="font-medium">Delivery Date:</span>
                    <p className="text-muted-foreground">
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {order.trackingNumber && (
                  <div>
                    <span className="font-medium">Tracking Number:</span>
                    <p className="text-muted-foreground">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Products */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="h-5 w-5" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-muted-foreground">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        Total: ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-muted-foreground">{order.customerEmail}</p>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{order.shippingAddress}</p>
            </CardContent>
          </Card>

          {/* Order Status Update */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Truck className="h-5 w-5" />
                Update Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={order.status} onValueChange={handleStatusUpdate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;