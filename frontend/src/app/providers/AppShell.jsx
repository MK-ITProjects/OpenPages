import { useState } from 'react';
import { Navbar } from '../../widgets/navbar/Navbar.jsx';
import { Sidebar } from '../../widgets/sidebar/Sidebar.jsx';
import { RightRail } from '../../widgets/right-rail/RightRail.jsx';


export function AppShell({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
     
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-60 overflow-y-auto bg-white px-4 shadow-xl">
            <Sidebar variant="mobile" onNavigate={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-[1600px] items-start gap-0 px-0">
  <Sidebar />

  <div className="min-w-0 flex-1">
    {children}
  </div>

  <RightRail />
</div>
    </div>
  );
}
