import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';

const icons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
    </svg>
  ),

  library: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z" />
    </svg>
  ),

  profile: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  ),

  stories: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M8.5 10h7M8.5 14h7M8.5 18h4" />
    </svg>
  ),

  stats: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  ),

  following: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5c1.4.4 2.5 1.7 2.5 3.2S17.4 10.5 16 11" />
      <path d="M18 14.5c2 .6 3.5 2.3 3.5 5.5" />
    </svg>
  ),

  plus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
};

function SidebarLink({ to, icon, children, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-300 ${
          isActive
            ? 'bg-emerald-50 text-emerald-700 shadow-sm'
            : 'text-gray-600 hover:bg-white hover:text-emerald-700 hover:shadow-sm'
        }`
      }
    >
      <span className="transition group-hover:scale-110">
        {icon}
      </span>

      {children}
    </NavLink>
  );
}

export function Sidebar({ variant = 'desktop', onNavigate }) {
  const { user } = useAuth();

  const isMobile = variant === 'mobile';

  return (
    <aside
      className={
        isMobile
          ? 'flex w-full flex-col gap-2 py-6'
          : 'sticky top-20 hidden h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto py-6 lg:flex'
      }
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

        <SidebarLink
          to="/read"
          icon={icons.home}
          onNavigate={onNavigate}
        >
          Home
        </SidebarLink>

        <SidebarLink
          to={user ? '/bookmarks' : '/login'}
          icon={icons.library}
          onNavigate={onNavigate}
        >
          Library
        </SidebarLink>

        <SidebarLink
          to={user ? `/profile/${user.id}` : '/login'}
          icon={icons.profile}
          onNavigate={onNavigate}
        >
          Profile
        </SidebarLink>

        <SidebarLink
          to={user ? '/stories' : '/login'}
          icon={icons.stories}
          onNavigate={onNavigate}
        >
          Stories
        </SidebarLink>

        <SidebarLink
          to={user ? '/stats' : '/login'}
          icon={icons.stats}
          onNavigate={onNavigate}
        >
          Stats
        </SidebarLink>

        <div className="my-5 border-t border-gray-200"></div>

        <SidebarLink
          to={user ? '/feed' : '/login'}
          icon={icons.following}
          onNavigate={onNavigate}
        >
          Following
        </SidebarLink>

      </div>

      

        

      
    </aside>
  );
}