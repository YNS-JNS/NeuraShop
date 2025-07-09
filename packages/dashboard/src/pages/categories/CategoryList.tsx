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
import { Category } from '@/types';
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const CategoryList = () => {
  const { state, dispatch } = useApp();
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const handleDelete = (category: Category) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: category.id });
    toast.success(`Category "${category.name}" deleted successfully`);
    setDeletingCategory(null);
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: 'Category Name',
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div>
            <p className="font-medium">{category.name}</p>
            <p className="text-sm text-muted-foreground">{category.description}</p>
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
          <Badge variant={status === 'active' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const category = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/categories/edit/${category.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeletingCategory(category)}
                className="text-red-600"
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
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Categories</h1>
        <Button asChild>
          <Link to="/categories/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={state.categories}
            searchPlaceholder="Search categories..."
          />
        </CardContent>
      </Card>

      <AlertDialog 
        open={!!deletingCategory} 
        onOpenChange={() => setDeletingCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category
              "{deletingCategory?.name}" from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingCategory && handleDelete(deletingCategory)}
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

export default CategoryList;