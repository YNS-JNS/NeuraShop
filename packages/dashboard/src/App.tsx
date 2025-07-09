import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Toaster } from '@/components/ui/sonner';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/products/ProductList';
import ProductAdd from './pages/products/ProductAdd';
import ProductEdit from './pages/products/ProductEdit';
import ProductPreview from './pages/products/ProductPreview';
import CategoryList from './pages/categories/CategoryList';
import CategoryAdd from './pages/categories/CategoryAdd';
import CategoryEdit from './pages/categories/CategoryEdit';
import OrderList from './pages/orders/OrderList';
import OrderDetails from './pages/orders/OrderDetails';
import StockManagement from './pages/stock/StockManagement';
import DeliveryTracking from './pages/delivery/DeliveryTracking';
import UserList from './pages/users/UserList';
import UserAdd from './pages/users/UserAdd';
import UserEdit from './pages/users/UserEdit';
import UserProfile from './pages/users/UserProfile';
import Analytics from './pages/analytics/Analytics';
import Notifications from './pages/notifications/Notifications';
// import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/add" element={<ProductAdd />} />
                <Route path="/products/edit/:id" element={<ProductEdit />} />
                <Route path="/products/preview/:id" element={<ProductPreview />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/categories/add" element={<CategoryAdd />} />
                <Route path="/categories/edit/:id" element={<CategoryEdit />} />
                <Route path="/orders" element={<OrderList />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
                <Route path="/stock" element={<StockManagement />} />
                <Route path="/delivery" element={<DeliveryTracking />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/add" element={<UserAdd />} />
                <Route path="/users/edit/:id" element={<UserEdit />} />
                <Route path="/users/profile/:id" element={<UserProfile />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/notifications" element={<Notifications />} />
              </Routes>
            </DashboardLayout>
            <Toaster />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;