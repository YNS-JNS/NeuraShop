import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useApp } from '@/context/AppContext';
import { Category } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['active', 'inactive']),
});

const CategoryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [category, setCategory] = useState<Category | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (id) {
      const foundCategory = state.categories.find(c => c.id === id);
      if (foundCategory) {
        setCategory(foundCategory);
        form.reset({
          name: foundCategory.name,
          description: foundCategory.description,
          status: foundCategory.status,
        });
      } else {
        toast.error('Category not found');
        navigate('/categories');
      }
    }
  }, [id, state.categories, form, navigate]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!category) return;

    const updatedCategory: Category = {
      ...category,
      ...values,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
    toast.success('Category updated successfully');
    navigate('/categories');
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold">Edit Category</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter category description" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/categories')}>
                  Cancel
                </Button>
                <Button type="submit">Update Category</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryEdit;