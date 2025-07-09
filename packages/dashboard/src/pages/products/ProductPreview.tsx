import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/context/AppContext';
import { Product } from '@/types';
import { ArrowLeft, Edit, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

const ProductPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = state.products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        toast.error('Product not found');
        navigate('/products');
      }
    }
  }, [id, state.products, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const category = state.categories.find(c => c.id === product.category);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">Product Preview</h1>
        </div>
        <Button asChild>
          <Link to={`/products/edit/${product.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Product
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl sm:text-3xl">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">SKU: {product.sku}</p>
                </div>
                <Badge variant={
                  product.status === 'active' ? 'default' : 
                  product.status === 'inactive' ? 'secondary' : 'destructive'
                } className="text-sm">
                  {product.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.5 (24 reviews)</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Description</h3>
                <p className="text-muted-foreground text-sm">{product.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium">Category</h4>
                  <p className="text-muted-foreground">{category?.name || 'Unknown'}</p>
                </div>
                <div>
                  <h4 className="font-medium">Stock</h4>
                  <p className="text-muted-foreground">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-4 pt-4">
                <Button className="flex-1" disabled={product.stock === 0}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1">
                  Add to Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Created:</span>
                  <p className="text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>
                  <p className="text-muted-foreground">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;