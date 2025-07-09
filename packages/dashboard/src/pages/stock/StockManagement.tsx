import { ColumnDef } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { Product } from '@/types';
import { AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const StockManagement = () => {
  const { state, dispatch } = useApp();

  const handleStockUpdate = (productId: string, newStock: number) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const updatedProduct: Product = {
      ...product,
      stock: newStock,
      status: newStock === 0 ? 'out-of-stock' : 'active',
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
    toast.success(`Stock updated for ${product.name}`);
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.sku}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'stock',
      header: 'Current Stock',
      cell: ({ row }) => {
        const stock = row.original.stock;
        return (
          <div className="flex items-center gap-2">
            <Badge variant={stock < 10 ? 'destructive' : stock < 50 ? 'secondary' : 'default'}>
              {stock}
            </Badge>
            {stock < 10 && <AlertTriangle className="h-4 w-4 text-red-500" />}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={
            status === 'active' ? 'default' : 
            status === 'inactive' ? 'secondary' : 'destructive'
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Update Stock',
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0"
              defaultValue={product.stock}
              className="w-20"
              onBlur={(e) => {
                const newStock = parseInt(e.target.value);
                if (!isNaN(newStock) && newStock !== product.stock) {
                  handleStockUpdate(product.id, newStock);
                }
              }}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStockUpdate(product.id, product.stock + 10)}
            >
              +10
            </Button>
          </div>
        );
      },
    },
  ];

  const lowStockProducts = state.products.filter(p => p.stock < 10);
  const outOfStockProducts = state.products.filter(p => p.stock === 0);
  const totalProducts = state.products.length;
  const totalStock = state.products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Stock Management</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Table */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={state.products}
            searchPlaceholder="Search products..."
          />
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between text-sm">
                  <span>{product.name}</span>
                  <Badge variant="destructive">{product.stock} left</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StockManagement;