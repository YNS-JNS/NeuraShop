import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Home,
  Package,
  FolderOpen,
  ShoppingCart,
  Warehouse,
  Truck,
  Users,
  BarChart3,
  Bell,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Categories', href: '/categories', icon: FolderOpen },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Stock', href: '/stock', icon: Warehouse },
  { name: 'Delivery', href: '/delivery', icon: Truck },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Notifications', href: '/notifications', icon: Bell },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed = false }) => {
  const location = useLocation();

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className='flex flex-col h-full bg-card'>
      {/* Header */}
      <div
        className={cn(
          'flex items-center transition-all duration-300',
          collapsed ? 'justify-center p-4' : 'justify-between p-4 sm:p-6 lg:p-8',
        )}
      >
        {!collapsed && (
          <h1 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary tracking-tight'>
            NeuraShop
          </h1>
        )}
        {collapsed && (
          <div className='w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center'>
            <span className='text-primary-foreground font-bold text-sm lg:text-base'>SD</span>
          </div>
        )}
        <Button
          variant='ghost'
          size='icon'
          onClick={onClose}
          className='md:hidden hover:bg-accent transition-colors'
          aria-label='Close sidebar'
        >
          <X className='h-5 w-5' />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea
        className={cn(
          'flex-1 transition-all duration-300',
          collapsed ? 'px-2' : 'px-2 sm:px-3 lg:px-4',
        )}
      >
        <nav className='space-y-1 sm:space-y-2 lg:space-y-3 py-4 lg:py-6'>
          <TooltipProvider>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.href ||
                (item.href !== '/' && location.pathname.startsWith(item.href));

              const linkContent = (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] group',
                    collapsed
                      ? 'justify-center p-3 w-12 h-12 lg:w-14 lg:h-14'
                      : 'gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-3 lg:px-4 py-2 lg:py-3',
                    isActive
                      ? 'bg-accent text-accent-foreground shadow-sm border border-border/50'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon
                    className={cn(
                      'flex-shrink-0 transition-transform duration-200 group-hover:scale-110',
                      collapsed ? 'h-5 w-5 lg:h-6 lg:w-6' : 'h-4 w-4 lg:h-5 lg:w-5',
                    )}
                  />
                  {!collapsed && <span className='truncate'>{item.name}</span>}
                </Link>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side='right' className='font-medium'>
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </TooltipProvider>
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden md:flex md:flex-col md:fixed md:inset-y-0 z-40 transition-all duration-300 border-r bg-card',
          isCollapsed ? 'md:w-16 lg:w-18' : 'md:w-64 lg:w-72 xl:w-80 2xl:w-88',
        )}
      >
        <SidebarContent collapsed={isCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side='left' className='w-64 p-0 sm:w-72 lg:w-80 animate-slide-in-left'>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;