import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
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
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const primaryNavItems = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: Newspaper, label: 'Team Feed', to: '/feed' },
  { icon: SearchIcon, label: 'Find Members', to: '/search' },
  { icon: CalendarDays, label: 'Campus Events', to: '/events' },
  { icon: MessageCircle, label: 'Chat', to: '/chat', unreadKey: 'chat' },
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
  };

  const handleSidebarToggle = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: nextState }));
  };

  const renderNavItem = ({ icon: Icon, label, to, unreadKey }) => {
    const isActive = location.pathname === to;
    const unreadCount = unreadKey === 'chat' ? chatUnreadTotal : 0;

    return (
      <Link
        key={to}
        to={to}
        className="sidebar-nav-link"
        data-active={isActive}
        title={isCollapsed ? label : undefined}
      >
        <span className="sidebar-icon">
          <Icon size={18} strokeWidth={2.1} />
        </span>
        <span className="sidebar-label-wrap">
          <span className="sidebar-label">{label}</span>
          {unreadCount > 0 ? (
            <span className="sidebar-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
          ) : null}
        </span>
      </Link>
    );
  };

  return (
    <aside
      className="sidebar-shell"
      data-collapsed={isCollapsed ? 'true' : 'false'}
      style={{ '--sidebar-width': isCollapsed ? '88px' : '272px' }}
    >
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand" title={isCollapsed ? 'TeamFinder' : undefined}>
          <span className="sidebar-brand-mark">TF</span>
          <span className="sidebar-brand-copy">
            <span className="sidebar-brand-title">TeamFinder</span>
            <span className="sidebar-brand-subtitle">Build with the right crew</span>
          </span>
        </Link>

        <button
          type="button"
          className="sidebar-collapse"
          onClick={handleSidebarToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {primaryNavItems.map(renderNavItem)}
      </nav>

      <div className="sidebar-bottom">
        {user ? (
          <>
            {accountNavItems.map(renderNavItem)}
            <div className="sidebar-theme-row">
              <div className="sidebar-theme-copy">
                <span className="sidebar-theme-title">Dark mode</span>
                <span className="sidebar-theme-note">
                  {isDark ? 'Midnight glass enabled' : 'Switch to the darker canvas'}
                </span>
              </div>
              <button
                type="button"
                className="theme-switch"
                data-active={isDark ? 'true' : 'false'}
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isCollapsed ? 'Toggle dark mode' : undefined}
              >
                <span className="theme-switch-thumb">
                  {isDark ? <Moon size={12} /> : <SunMedium size={12} />}
                </span>
              </button>
            </div>
            <button type="button" className="sidebar-logout" onClick={handleLogout}>
              <span className="sidebar-icon">
                <LogOut size={18} strokeWidth={2.1} />
              </span>
              <span className="sidebar-label">Sign Out</span>
            </button>
          </>
        ) : (
          <>
            <div className="sidebar-theme-row">
              <div className="sidebar-theme-copy">
                <span className="sidebar-theme-title">Dark mode</span>
                <span className="sidebar-theme-note">
                  {isDark ? 'Midnight glass enabled' : 'Switch to the darker canvas'}
                </span>
              </div>
              <button
                type="button"
                className="theme-switch"
                data-active={isDark ? 'true' : 'false'}
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isCollapsed ? 'Toggle dark mode' : undefined}
              >
                <span className="theme-switch-thumb">
                  {isDark ? <Moon size={12} /> : <SunMedium size={12} />}
                </span>
              </button>
            </div>

            <Link
              to="/login"
              className="sidebar-action-button"
              data-active={location.pathname === '/login'}
              title={isCollapsed ? 'Log In' : undefined}
            >
              <span className="sidebar-icon">
                <LogIn size={18} strokeWidth={2.1} />
              </span>
              <span className="sidebar-label-wrap">
                <span className="sidebar-label">Log In</span>
              </span>
            </Link>

            <Link
              to="/signup"
              className="sidebar-action-button"
              data-active={location.pathname === '/signup'}
              title={isCollapsed ? 'Sign Up' : undefined}
            >
              <span className="sidebar-icon">
                <UserPlus size={18} strokeWidth={2.1} />
              </span>
              <span className="sidebar-label-wrap">
                <span className="sidebar-label">Sign Up</span>
              </span>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
