import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Home,
  LogIn,
  LogOut,
  MessageCircle,
  Moon,
  Newspaper,
  Search as SearchIcon,
  Settings,
  SunMedium,
  User,
  UserPlus,
  Menu, // NEW
  X // NEW
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const primaryNavItems = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: Newspaper, label: 'Team Feed', to: '/feed' },
  { icon: SearchIcon, label: 'Find Members', to: '/search' },
  { icon: CalendarDays, label: 'Campus Events', to: '/events' },
  { icon: MessageCircle, label: 'Chat', to: '/chat', unreadKey: 'chat' },
  { icon: Bell, label: 'Network', to: '/network', unreadKey: 'network' }
];

const accountNavItems = [
  { icon: User, label: 'My Profile', to: '/dashboard' },
  { icon: Settings, label: 'Settings', to: '/manage-teams' },
];

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatUnreadTotal, setChatUnreadTotal] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // NEW

  const networkUnreadTotal = user?.connectionRequestsReceived?.length || 0;

  useEffect(() => {
    if (!user?.username) {
      setChatUnreadTotal(0);
      return;
    }

    const unreadKey = `teamFinderUnread_${user.username}`;
    const refreshUnread = () => {
      try {
        const raw = localStorage.getItem(unreadKey);
        if (!raw) {
          setChatUnreadTotal(0);
          return;
        }
        const parsed = JSON.parse(raw);
        const teamTotal = Object.values(parsed?.team || {}).reduce((sum, count) => sum + count, 0);
        const dmTotal = Object.values(parsed?.dm || {}).reduce((sum, count) => sum + count, 0);
        setChatUnreadTotal(teamTotal + dmTotal);
      } catch (error) {
        setChatUnreadTotal(0);
      }
    };

    refreshUnread();
    window.addEventListener('storage', refreshUnread);
    window.addEventListener('teamfinder-unread-updated', refreshUnread);

    return () => {
      window.removeEventListener('storage', refreshUnread);
      window.removeEventListener('teamfinder-unread-updated', refreshUnread);
    };
  }, [user?.username]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const handleSidebarToggle = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: nextState }));
  };

  // Modified to handle both desktop and mobile layouts
  const renderNavItem = ({ icon: Icon, label, to, unreadKey }, isMobileBottom = false) => {
    const isActive = location.pathname === to;
    let unreadCount = 0;
    if (unreadKey === 'chat') unreadCount = chatUnreadTotal;
    if (unreadKey === 'network') unreadCount = networkUnreadTotal;

    return (
      <Link
        key={to}
        to={to}
        className={isMobileBottom ? "mobile-nav-link" : "sidebar-nav-link"}
        data-active={isActive}
        title={isCollapsed ? label : undefined}
        onClick={() => setIsMobileMenuOpen(false)} // Close drawer if clicked
      >
        <span className="sidebar-icon" style={{ position: 'relative' }}>
          <Icon size={isMobileBottom ? 24 : 18} strokeWidth={isMobileBottom ? 2 : 2.1} />
          {/* Badge logic for mobile bottom icons */}
          {isMobileBottom && unreadCount > 0 && (
             <span className="mobile-badge"></span>
          )}
        </span>
        
        {!isMobileBottom && (
          <span className="sidebar-label-wrap">
            <span className="sidebar-label">{label}</span>
            {unreadCount > 0 && (
              <span className="sidebar-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
            )}
          </span>
        )}
      </Link>
    );
  };

  // Define which items go where on mobile
  const mobileBottomItems = primaryNavItems.filter(item => 
    ['Home', 'Find Members', 'Network', 'Chat'].includes(item.label)
  );
  const mobileDrawerItems = primaryNavItems.filter(item => 
    !['Home', 'Find Members', 'Network', 'Chat'].includes(item.label)
  );

  return (
    <>
      {/* --- DESKTOP SIDEBAR (Hidden on Mobile) --- */}
      <aside
        className="sidebar-shell desktop-only"
        data-collapsed={isCollapsed ? 'true' : 'false'}
        style={{ '--sidebar-width': isCollapsed ? '88px' : '272px' }}
      >
        {/* Your existing <style> tag */}
        <style>
          {`
            .sidebar-shell { overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; }
            .sidebar-shell::-webkit-scrollbar { display: none; }
          `}
        </style>

        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand" title={isCollapsed ? 'TeamFinder' : undefined}>
            <span className="sidebar-brand-mark">
              <img src="/favicon.svg" alt="TeamFinder logo" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
            </span>
            <span className="sidebar-brand-copy">
              <span className="sidebar-brand-title">TeamFinder</span>
              <span className="sidebar-brand-subtitle">Build with the right crew</span>
            </span>
          </Link>
          <button type="button" className="sidebar-collapse" onClick={handleSidebarToggle}>
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {primaryNavItems.map(item => renderNavItem(item, false))}
        </nav>

        <div className="sidebar-bottom">
          {user ? (
            <>
              {accountNavItems.map(item => renderNavItem(item, false))}
              {/* Desktop Theme Toggle */}
              <div className="sidebar-theme-row">
                <div className="sidebar-theme-copy">
                  <span className="sidebar-theme-title">Dark mode</span>
                </div>
                <button type="button" className="theme-switch" data-active={isDark ? 'true' : 'false'} onClick={toggleTheme}>
                  <span className="theme-switch-thumb">{isDark ? <Moon size={12} /> : <SunMedium size={12} />}</span>
                </button>
              </div>
              <button type="button" className="sidebar-logout" onClick={handleLogout}>
                <span className="sidebar-icon"><LogOut size={18} /></span>
                <span className="sidebar-label">Sign Out</span>
              </button>
            </>
          ) : (
            <>
               <div className="sidebar-theme-row">
                <div className="sidebar-theme-copy">
                  <span className="sidebar-theme-title">Dark mode</span>
                </div>
                <button type="button" className="theme-switch" data-active={isDark ? 'true' : 'false'} onClick={toggleTheme}>
                  <span className="theme-switch-thumb">{isDark ? <Moon size={12} /> : <SunMedium size={12} />}</span>
                </button>
              </div>
              <Link to="/login" className="sidebar-action-button"><LogIn size={18} /><span className="sidebar-label">Log In</span></Link>
              <Link to="/signup" className="sidebar-action-button"><UserPlus size={18} /><span className="sidebar-label">Sign Up</span></Link>
            </>
          )}
        </div>
      </aside>

      {/* --- MOBILE BOTTOM NAVIGATION (Hidden on Desktop) --- */}
      <nav className="mobile-bottom-bar mobile-only">
        {mobileBottomItems.map(item => renderNavItem(item, true))}
        
        <button 
          className="mobile-nav-link menu-trigger" 
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={2} />
        </button>
      </nav>

      {/* --- MOBILE "MORE" DRAWER --- */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay mobile-only">
          <div className="mobile-drawer-content">
            <div className="drawer-header">
              <h3>More Options</h3>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            
            <nav className="drawer-nav">
              {mobileDrawerItems.map(item => renderNavItem(item, false))}
              {user && accountNavItems.map(item => renderNavItem(item, false))}
              
              <div className="sidebar-theme-row drawer-theme">
                <span className="sidebar-theme-title">Dark Mode</span>
                <button type="button" className="theme-switch" data-active={isDark ? 'true' : 'false'} onClick={toggleTheme}>
                  <span className="theme-switch-thumb">{isDark ? <Moon size={12} /> : <SunMedium size={12} />}</span>
                </button>
              </div>

              {user ? (
                <button type="button" className="sidebar-logout" onClick={handleLogout}>
                  <span className="sidebar-icon"><LogOut size={18} /></span>
                  <span className="sidebar-label">Sign Out</span>
                </button>
              ) : (
                <div className="drawer-auth-buttons">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="sidebar-action-button">Log In</Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="sidebar-action-button">Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}