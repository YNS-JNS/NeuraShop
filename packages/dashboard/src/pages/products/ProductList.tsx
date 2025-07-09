import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useApp } from '@/context/AppContext';
import { Product } from '@/types';
import { Plus, MoreHorizontal, Edit, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const ProductList = () => {
  const { state, dispatch } = useApp();
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const handleDelete = (product: Product) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
    toast.success(`Product "${product.name}" deleted successfully`);
    setDeletingProduct(null);
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded object-cover"
            />
            <div>
              <p className="font-medium text-sm lg:text-base">{product.name}</p>
              <p className="text-xs lg:text-sm text-muted-foreground">{product.sku}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const category = state.categories.find(c => c.id === row.original.category);
        return <Badge variant="outline">{category?.name || 'Unknown'}</Badge>;
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => (
        <span className="font-medium">${row.original.price.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const stock = row.original.stock;
        return (
          <Badge variant={stock < 10 ? 'destructive' : stock < 50 ? 'secondary' : 'default'}>
            {stock}
          </Badge>
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
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-accent">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/products/preview/${product.id}`} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/products/edit/${product.id}`} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeletingProduct(product)}
                className="text-red-600 cursor-pointer focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Products</h1>
        <Button asChild>
          <Link to="/products/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={state.products}
            searchPlaceholder="Search products..."
          />
        </CardContent>
      </Card>

      <AlertDialog 
        open={!!deletingProduct} 
        onOpenChange={() => setDeletingProduct(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              "{deletingProduct?.name}" from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingProduct && handleDelete(deletingProduct)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductList;