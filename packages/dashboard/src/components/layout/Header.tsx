import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  LogOut,
} from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSidebarToggle, sidebarCollapsed }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64 lg:ml-72 xl:ml-80 2xl:ml-88'
      }`}
    >
      <div className='flex justify-between h-14 lg:h-16 xl:h-18 items-center gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10'>
        {/* Mobile Menu Button */}
        <Button
          variant='ghost'
          size='icon'
          onClick={onMenuClick}
          className='md:hidden h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent transition-colors'
          aria-label='Open mobile menu'
        >
          <Menu className='h-5 w-5' />
        </Button>

        {/* Desktop Sidebar Toggle */}
        <Button
          variant='ghost'
          size='icon'
          onClick={onSidebarToggle}
          className='hidden md:flex h-8 w-8 lg:h-9 lg:w-9 xl:h-10 xl:w-10 hover:bg-accent transition-colors'
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className='button-icon' />
          ) : (
            <PanelLeftClose className='button-icon' />
          )}
        </Button>

        {/* Search Bar */}
        <div className='flex-1 max-w-2xl'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Search products, orders, customers...'
              className='pl-10 h-8 sm:h-9 lg:h-10 xl:h-11 text-sm lg:text-base w-full bg-muted/50 border-0 focus:bg-background transition-colors'
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-1 sm:gap-2'>
          {/* Theme Toggle */}
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            // ANCIEN:
            className='h-8 w-8 sm:h-9 sm:w-9 xl:h-10 xl:w-10 transition-all duration-200 hover:scale-105 hover:bg-accent'
            // NOUVEAU : Effet de soulèvement + scaling
            // className='h-8 w-8 sm:h-9 sm:w-9 xl:h-10 xl:w-10 rounded-full hover:bg-accent transform hover:-translate-y-1 hover:scale-110'
            // aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className='button-icon transition-transform duration-200' />
            ) : (
              <Moon className='button-icon transition-transform duration-200' />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 sm:h-9 sm:w-9 xl:h-10 xl:w-10 relative hover:bg-accent transition-colors'
            aria-label='View notifications'
          >
            <Bell className='button-icon' />
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs p-0 animate-pulse'
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='h-8 w-8 sm:h-9 sm:w-9 xl:h-10 xl:w-10 rounded-full hover:bg-accent transition-colors'
                aria-label='User menu'
              >
                <Avatar className='h-6 w-6 sm:h-8 sm:w-8 xl:h-9 xl:w-9'>
                  <AvatarFallback className='text-xs sm:text-sm font-medium'>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>Admin User</p>
                  <p className='text-xs leading-none text-muted-foreground'>admin@company.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>
                <User className='mr-2 h-4 w-4' />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer text-red-600 focus:text-red-600'>
                <LogOut className='mr-2 h-4 w-4' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
