import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className='flex min-h-screen bg-background'>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className='flex-1 flex flex-col overflow-hidden w-full min-w-0'>
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main
          className={`flex-1 overflow-y-auto responsive-padding scrollbar-hide transition-all duration-300 ${
            sidebarCollapsed ? 'md:ml-16' : 'md:ml-64 lg:ml-72 xl:ml-80 2xl:ml-88'
          }`}
        >
          <div className='full-width-container animate-fade-in'>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;