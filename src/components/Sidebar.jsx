// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function Sidebar() {
//   const { user, token, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [chatUnreadTotal, setChatUnreadTotal] = useState(0);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };


//    useEffect(() => {
//     if (!user?.username) {
//       setChatUnreadTotal(0);
//       return;
//     }

//     const unreadKey = `teamFinderUnread_${user.username}`;
//     const refreshUnread = () => {
//       try {
//         const raw = localStorage.getItem(unreadKey);
//         if (!raw) {
//           setChatUnreadTotal(0);
//           return;
//         }
//         const parsed = JSON.parse(raw);
//         const teamTotal = Object.values(parsed?.team || {}).reduce((sum, count) => sum + count, 0);
//         const dmTotal = Object.values(parsed?.dm || {}).reduce((sum, count) => sum + count, 0);
//         setChatUnreadTotal(teamTotal + dmTotal);
//       } catch (e) {
//         setChatUnreadTotal(0);
//       }
//     };

//     refreshUnread();
//     window.addEventListener('storage', refreshUnread);
//     window.addEventListener('teamfinder-unread-updated', refreshUnread);
//     return () => {
//       window.removeEventListener('storage', refreshUnread);
//       window.removeEventListener('teamfinder-unread-updated', refreshUnread);
//     };
//   }, [user?.username]);

//   useEffect(() => {
//     if (!user?.username || !token) return;
//     if (location.pathname === '/chat') return;

//     const unreadKey = `teamFinderUnread_${user.username}`;
//     let isActive = true;
//     let socket = null;
//     let teamIds = [];
//     let dmUsers = [];

//     const publishUnread = (nextPayload) => {
//       localStorage.setItem(unreadKey, JSON.stringify(nextPayload));
//       window.dispatchEvent(new Event('teamfinder-unread-updated'));
//     };

//     const incrementTeamUnread = (teamId) => {
//       if (!teamId) return;
//       try {
//         const raw = localStorage.getItem(unreadKey);
//         const parsed = raw ? JSON.parse(raw) : {};
//         const teamMap = parsed?.team || {};
//         const dmMap = parsed?.dm || {};
//         const next = {
//           team: { ...teamMap, [teamId]: (teamMap[teamId] || 0) + 1 },
//           dm: dmMap
//         };
//         publishUnread(next);
//       } catch (e) {
//         publishUnread({ team: { [teamId]: 1 }, dm: {} });
//       }
//     };

//     const incrementDmUnread = (otherUsername) => {
//       if (!otherUsername) return;
//       try {
//         const raw = localStorage.getItem(unreadKey);
//         const parsed = raw ? JSON.parse(raw) : {};
//         const teamMap = parsed?.team || {};
//         const dmMap = parsed?.dm || {};
//         const next = {
//           team: teamMap,
//           dm: { ...dmMap, [otherUsername]: (dmMap[otherUsername] || 0) + 1 }
//         };
//         publishUnread(next);
//       } catch (e) {
//         publishUnread({ team: {}, dm: { [otherUsername]: 1 } });
//       }
//     };

//     const subscribeAll = () => {
//       if (!socket || socket.readyState !== WebSocket.OPEN) return;
//       teamIds.forEach((teamId) => {
//         socket.send(JSON.stringify({ type: 'subscribe', teamId }));
//       });
//       dmUsers.forEach((otherUsername) => {
//         socket.send(JSON.stringify({ type: 'private_subscribe', otherUsername }));
//       });
//     };

//     const boot = async () => {
//       try {
//         const [teamsRes, dmRes] = await Promise.all([
//           fetch('https://garvsharma9-teamfinder-api.hf.space/chat/my-teams', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           fetch('https://garvsharma9-teamfinder-api.hf.space/chat/private/conversations', {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         ]);

//         if (!isActive) return;
//         if (teamsRes.ok) {
//           const teams = await teamsRes.json();
//           teamIds = teams.map(item => item.id).filter(Boolean);
//         }
//         if (dmRes.ok) {
//           const conversations = await dmRes.json();
//           dmUsers = conversations.map(item => item.otherUsername).filter(Boolean);
//         }

//         socket = new WebSocket(`ws://localhost:8080/ws-chat?token=${encodeURIComponent(token)}`);
//         socket.onopen = () => {
//           if (!isActive) return;
//           subscribeAll();
//         };
//         socket.onmessage = (event) => {
//           if (!isActive) return;
//           try {
//             const payload = JSON.parse(event.data);
//             if (payload.type === 'message' && payload.message) {
//               incrementTeamUnread(payload.teamId);
//               return;
//             }
//             if (payload.type === 'private_message' && payload.message) {
//               const incoming = payload.message;
//               const otherUsername =
//                 incoming.senderUsername === user.username ? incoming.receiverUsername : incoming.senderUsername;
//               incrementDmUnread(otherUsername);
//             }
//           } catch (e) {
//             // Ignore malformed payloads
//           }
//         };
//       } catch (e) {
//         // Silent fallback: no live sidebar updates if boot fails
//       }
//     };

//     boot();

//     return () => {
//       isActive = false;
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.close();
//       }
//     };
//   }, [location.pathname, token, user?.username]);
//   const styles = {
//     sidebar: {
//       width: '250px',
//       minWidth: '250px', // Prevents it from shrinking
//       height: '100vh',
//       backgroundColor: '#fff',
//       borderRight: '1px solid #e0e0e0',
//       position: 'sticky', // This is the magic word!
//       top: 0,
//       display: 'flex',
//       flexDirection: 'column',
//       padding: '20px 0',
//       boxShadow: '2px 0 5px rgba(121, 74, 74, 0.05)',
//       fontFamily: 'Arial, sans-serif',
//       boxSizing: 'border-box'
//     },
//     logoContainer: {
//       padding: '0 20px 20px 20px',
//       borderBottom: '1px solid #e0e0e0',
//       marginBottom: '20px'
//     },
//     logoText: {
//       color: '#0a66c2',
//       fontSize: '24px',
//       fontWeight: 'bold',
//       margin: 0,
//       textDecoration: 'none'
//     },
//     navMenu: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '5px',
//       padding: '0 10px'
//     },
//     link: (isActive) => ({
//       textDecoration: 'none',
//       color: isActive ? '#0a66c2' : '#666',
//       padding: '12px 20px',
//       borderRadius: '8px',
//       fontWeight: isActive ? 'bold' : 'normal',
//       backgroundColor: isActive ? '#e8f3ff' : 'transparent',
//       transition: 'all 0.2s ease',
//       display: 'block'
//     }),

//     linkContent: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between'
//     },
//     unreadDot: {
//       minWidth: '18px',
//       height: '18px',
//       borderRadius: '999px',
//       backgroundColor: '#ef4444',
//       color: '#fff',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '11px',
//       fontWeight: 700,
//       padding: '0 5px',
//       marginLeft: '8px'
//     },
//     bottomSection: {
//       marginTop: 'auto',
//       padding: '20px',
//       borderTop: '1px solid #e0e0e0'
//     },
//     logoutBtn: {
//       width: '100%',
//       padding: '10px',
//       backgroundColor: 'transparent',
//       color: '#666',
//       border: '1px solid #ccc',
//       borderRadius: '24px',
//       cursor: 'pointer',
//       fontWeight: 'bold',
//       transition: 'all 0.2s ease'
//     }
//   };

//   return (
//     <div style={styles.sidebar}>
//       <div style={styles.logoContainer}>
//         <Link to="/" style={styles.logoText}>TeamFinder</Link>
//       </div>

//       <nav style={styles.navMenu}>
//         <Link to="/" style={styles.link(location.pathname === '/')}>Home</Link>
//         <Link to="/feed" style={styles.link(location.pathname === '/feed')}>Team Feed</Link>
//         <Link to="/search" style={styles.link(location.pathname === '/search')}>Find Members</Link>
//         <Link to="/events" style={styles.link(location.pathname === '/events')}>Campus Events</Link>
//            <Link to="/chat" style={styles.link(location.pathname === '/chat')}>
//           <span style={styles.linkContent}>
//             Chat
//             {chatUnreadTotal > 0 ? <span style={styles.unreadDot}>{chatUnreadTotal > 9 ? '9+' : chatUnreadTotal}</span> : null}
//           </span>
//         </Link>
//       </nav>

//       <div style={styles.bottomSection}>
//         {user ? (
//           <>
//             <Link to="/dashboard" style={{...styles.link(location.pathname === '/dashboard'), marginBottom: '10px'}}>👤 My Profile</Link>
//             <Link to="/manage-teams" style={{...styles.link(location.pathname === '/manage-teams'), marginBottom: '20px'}}>⚙️ Manage Teams</Link>
//             <button style={styles.logoutBtn} onClick={handleLogout} onMouseOver={(e) => e.target.style.backgroundColor = '#f3f2ef'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
//               Sign Out
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" style={{...styles.link(location.pathname === '/login'), marginBottom: '10px'}}>Log In</Link>
//             <Link to="/signup" style={{...styles.link(location.pathname === '/signup'), backgroundColor: '#0a66c2', color: '#fff', textAlign: 'center', borderRadius: '24px'}}>Sign Up</Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function Sidebar() {
//   const { user, token, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [chatUnreadTotal, setChatUnreadTotal] = useState(0);
//   const [isCollapsed, setIsCollapsed] = useState(false); // Retractable state

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     if (!user?.username) {
//       setChatUnreadTotal(0);
//       return;
//     }
//     const unreadKey = `teamFinderUnread_${user.username}`;
//     const refreshUnread = () => {
//       try {
//         const raw = localStorage.getItem(unreadKey);
//         if (!raw) {
//           setChatUnreadTotal(0);
//           return;
//         }
//         const parsed = JSON.parse(raw);
//         const teamTotal = Object.values(parsed?.team || {}).reduce((sum, count) => sum + count, 0);
//         const dmTotal = Object.values(parsed?.dm || {}).reduce((sum, count) => sum + count, 0);
//         setChatUnreadTotal(teamTotal + dmTotal);
//       } catch (e) {
//         setChatUnreadTotal(0);
//       }
//     };

//     refreshUnread();
//     window.addEventListener('storage', refreshUnread);
//     window.addEventListener('teamfinder-unread-updated', refreshUnread);
//     return () => {
//       window.removeEventListener('storage', refreshUnread);
//       window.removeEventListener('teamfinder-unread-updated', refreshUnread);
//     };
//   }, [user?.username]);

//   // Logic for WebSocket stays identical (hidden for brevity, keep your original useEffect here)
//   /* ... INSERT YOUR ORIGINAL WEBSOCKET USEEFFECT HERE ... */

//   const colors = {
//     blue: '#007AFF',
//     orange: '#FF9500',
//     glass: 'rgba(255, 255, 255, 0.7)',
//     border: 'rgba(255, 255, 255, 0.3)',
//   };

//   const styles = {
//     sidebar: {
//       width: isCollapsed ? '80px' : '260px',
//       minWidth: isCollapsed ? '80px' : '260px',
//       height: '95vh',
//       margin: '10px',
//       borderRadius: '24px',
//       backgroundColor: colors.glass,
//       backdropFilter: 'blur(15px)',
//       WebkitBackdropFilter: 'blur(15px)',
//       border: `1px solid ${colors.border}`,
//       position: 'sticky',
//       top: '10px',
//       display: 'flex',
//       flexDirection: 'column',
//       padding: '20px 0',
//       boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//       boxSizing: 'border-box',
//       transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//       overflow: 'hidden',
//       zIndex: 1000
//     },
//     toggleBtn: {
//       position: 'absolute',
//       right: '-1px',
//       top: '40px',
//       width: '24px',
//       height: '24px',
//       borderRadius: '50%',
//       backgroundColor: colors.blue,
//       color: 'white',
//       border: 'none',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '12px',
//       boxShadow: '0 2px 10px rgba(0,122,255,0.3)',
//       zIndex: 1001
//     },
//     logoContainer: {
//       padding: '0 20px 30px 20px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: isCollapsed ? 'center' : 'flex-start'
//     },
//     logoText: {
//       background: `linear-gradient(135deg, ${colors.blue}, ${colors.orange})`,
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       fontSize: '22px',
//       fontWeight: '800',
//       textDecoration: 'none',
//       whiteSpace: 'nowrap',
//       opacity: isCollapsed ? 0 : 1,
//       transition: 'opacity 0.3s'
//     },
//     navMenu: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px',
//       padding: '0 15px'
//     },
//     link: (isActive) => ({
//       textDecoration: 'none',
//       color: isActive ? '#000' : '#555',
//       padding: '12px',
//       borderRadius: '12px',
//       fontWeight: isActive ? '600' : '400',
//       backgroundColor: isActive ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
//       border: isActive ? `1px solid ${colors.border}` : '1px solid transparent',
//       transition: 'all 0.2s ease',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '15px',
//       boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
//     }),
//     iconBox: (isActive) => ({
//       minWidth: '35px',
//       height: '35px',
//       borderRadius: '10px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: isActive ? colors.blue : 'rgba(0,0,0,0.05)',
//       color: isActive ? 'white' : '#555',
//       transition: 'all 0.3s ease'
//     }),
//     unreadDot: {
//       position: 'absolute',
//       right: '10px',
//       minWidth: '18px',
//       height: '18px',
//       borderRadius: '999px',
//       backgroundColor: colors.orange,
//       color: '#fff',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '10px',
//       fontWeight: 700,
//     },
//     bottomSection: {
//       marginTop: 'auto',
//       padding: '20px 15px',
//       borderTop: `1px solid ${colors.border}`
//     },
//     logoutBtn: {
//       width: '100%',
//       padding: '12px',
//       backgroundColor: 'rgba(255, 59, 48, 0.1)',
//       color: '#FF3B30',
//       border: 'none',
//       borderRadius: '12px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: isCollapsed ? 'center' : 'flex-start',
//       gap: '12px',
//       transition: 'all 0.2s'
//     }
//   };

//   const NavItem = ({ to, icon, label, unread }) => {
//     const isActive = location.pathname === to;
//     return (
//       <Link to={to} style={styles.link(isActive)}>
//         <div style={styles.iconBox(isActive)}>{icon}</div>
//         {!isCollapsed && <span style={{ flex: 1 }}>{label}</span>}
//         {!isCollapsed && unread > 0 && <span style={styles.unreadDot}>{unread > 9 ? '9+' : unread}</span>}
//       </Link>
//     );
//   };

//   return (
//     <div style={styles.sidebar}>
//       <button style={styles.toggleBtn} onClick={() => setIsCollapsed(!isCollapsed)}>
//         {isCollapsed ? '→' : '←'}
//       </button>

//       <div style={styles.logoContainer}>
//         <Link to="/" style={styles.logoText}>{isCollapsed ? 'TF' : 'TeamFinder'}</Link>
//       </div>

//       <nav style={styles.navMenu}>
//         <NavItem to="/" icon="🏠" label="Home" />
//         <NavItem to="/feed" icon="📰" label="Team Feed" />
//         <NavItem to="/search" icon="🔍" label="Find Members" />
//         <NavItem to="/events" icon="📅" label="Campus Events" />
//         <NavItem to="/chat" icon="💬" label="Chat" unread={chatUnreadTotal} />
//       </nav>

//       <div style={styles.bottomSection}>
//         {user ? (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <NavItem to="/dashboard" icon="👤" label="My Profile" />
//             <NavItem to="/manage-teams" icon="⚙️" label="Settings" />
//             <button 
//               style={styles.logoutBtn} 
//               onClick={handleLogout}
//               onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 59, 48, 0.2)'}
//               onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 59, 48, 0.1)'}
//             >
//               <span>🚪</span> {!isCollapsed && "Sign Out"}
//             </button>
//           </div>
//         ) : (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <NavItem to="/login" icon="🔑" label="Log In" />
//             <Link to="/signup" style={{ 
//               ...styles.link(false), 
//               backgroundColor: colors.blue, 
//               color: 'white', 
//               justifyContent: 'center' 
//             }}>
//               {!isCollapsed && "Sign Up"}
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   Home,
//   LogIn,
//   LogOut,
//   MessageCircle,
//   Moon,
//   Newspaper,
//   PersonStandingIcon,
//   Search as SearchIcon,
//   Settings,
//   SunMedium,
//   User,
//   UserPlus,
// } from 'lucide-react';
// import { AuthContext } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
// import Network from '../pages/Network';

// const primaryNavItems = [
//   { icon: Home, label: 'Home', to: '/' },
//   { icon: Newspaper, label: 'Team Feed', to: '/feed' },
//   { icon: SearchIcon, label: 'Find Members', to: '/search' },
//   { icon: CalendarDays, label: 'Campus Events', to: '/events' },
//   { icon: MessageCircle, label: 'Chat', to: '/chat', unreadKey: 'chat' },
//   { icon: PersonStandingIcon, label: 'Connections', to: '/network'}
// ];

// const accountNavItems = [
//   { icon: User, label: 'My Profile', to: '/dashboard' },
//   { icon: Settings, label: 'Settings', to: '/manage-teams' },
// ];

// export default function Sidebar() {
//   const { user, logout } = useContext(AuthContext);
//   const { isDark, toggleTheme } = useTheme();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [chatUnreadTotal, setChatUnreadTotal] = useState(0);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     if (!user?.username) {
//       setChatUnreadTotal(0);
//       return;
//     }

//     const unreadKey = `teamFinderUnread_${user.username}`;
//     const refreshUnread = () => {
//       try {
//         const raw = localStorage.getItem(unreadKey);
//         if (!raw) {
//           setChatUnreadTotal(0);
//           return;
//         }

//         const parsed = JSON.parse(raw);
//         const teamTotal = Object.values(parsed?.team || {}).reduce((sum, count) => sum + count, 0);
//         const dmTotal = Object.values(parsed?.dm || {}).reduce((sum, count) => sum + count, 0);
//         setChatUnreadTotal(teamTotal + dmTotal);
//       } catch (error) {
//         setChatUnreadTotal(0);
//       }
//     };

//     refreshUnread();
//     window.addEventListener('storage', refreshUnread);
//     window.addEventListener('teamfinder-unread-updated', refreshUnread);

//     return () => {
//       window.removeEventListener('storage', refreshUnread);
//       window.removeEventListener('teamfinder-unread-updated', refreshUnread);
//     };
//   }, [user?.username]);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const handleSidebarToggle = () => {
//     const nextState = !isCollapsed;
//     setIsCollapsed(nextState);
//     window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: nextState }));
//   };

//   const renderNavItem = ({ icon: Icon, label, to, unreadKey }) => {
//     const isActive = location.pathname === to;
//     const unreadCount = unreadKey === 'chat' ? chatUnreadTotal : 0;

//     return (
//       <Link
//         key={to}
//         to={to}
//         className="sidebar-nav-link"
//         data-active={isActive}
//         title={isCollapsed ? label : undefined}
//       >
//         <span className="sidebar-icon">
//           <Icon size={18} strokeWidth={2.1} />
//         </span>
//         <span className="sidebar-label-wrap">
//           <span className="sidebar-label">{label}</span>
//           {unreadCount > 0 ? (
//             <span className="sidebar-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
//           ) : null}
//         </span>
//       </Link>
//     );
//   };

//   return (
//     <aside
//       className="sidebar-shell"
//       data-collapsed={isCollapsed ? 'true' : 'false'}
//       style={{ '--sidebar-width': isCollapsed ? '88px' : '272px' }}
//     >
//       <div className="sidebar-header">
//         <Link to="/" className="sidebar-brand" title={isCollapsed ? 'TeamFinder' : undefined}>
//           <span className="sidebar-brand-mark">
//             <img
//               src="/favicon.svg"
//               alt="TeamFinder logo"
//               style={{ width: '26px', height: '26px', objectFit: 'contain' }}
//             />
//           </span>
//           <span className="sidebar-brand-copy">
//             <span className="sidebar-brand-title">TeamFinder</span>
//             <span className="sidebar-brand-subtitle">Build with the right crew</span>
//           </span>
//         </Link>

//         <button
//           type="button"
//           className="sidebar-collapse"
//           onClick={handleSidebarToggle}
//           aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//         >
//           {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//         </button>
//       </div>

//       <nav className="sidebar-nav">
//         {primaryNavItems.map(renderNavItem)}
//       </nav>

//       <div className="sidebar-bottom">
//         {user ? (
//           <>
//             {accountNavItems.map(renderNavItem)}
//             <div className="sidebar-theme-row">
//               <div className="sidebar-theme-copy">
//                 <span className="sidebar-theme-title">Dark mode</span>
//                 <span className="sidebar-theme-note">
//                   {isDark ? 'Midnight glass enabled' : 'Switch to the darker canvas'}
//                 </span>
//               </div>
//               <button
//                 type="button"
//                 className="theme-switch"
//                 data-active={isDark ? 'true' : 'false'}
//                 onClick={toggleTheme}
//                 aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
//                 title={isCollapsed ? 'Toggle dark mode' : undefined}
//               >
//                 <span className="theme-switch-thumb">
//                   {isDark ? <Moon size={12} /> : <SunMedium size={12} />}
//                 </span>
//               </button>
//             </div>
//             <button type="button" className="sidebar-logout" onClick={handleLogout}>
//               <span className="sidebar-icon">
//                 <LogOut size={18} strokeWidth={2.1} />
//               </span>
//               <span className="sidebar-label">Sign Out</span>
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="sidebar-theme-row">
//               <div className="sidebar-theme-copy">
//                 <span className="sidebar-theme-title">Dark mode</span>
//                 <span className="sidebar-theme-note">
//                   {isDark ? 'Midnight glass enabled' : 'Switch to the darker canvas'}
//                 </span>
//               </div>
//               <button
//                 type="button"
//                 className="theme-switch"
//                 data-active={isDark ? 'true' : 'false'}
//                 onClick={toggleTheme}
//                 aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
//                 title={isCollapsed ? 'Toggle dark mode' : undefined}
//               >
//                 <span className="theme-switch-thumb">
//                   {isDark ? <Moon size={12} /> : <SunMedium size={12} />}
//                 </span>
//               </button>
//             </div>

//             <Link
//               to="/login"
//               className="sidebar-action-button"
//               data-active={location.pathname === '/login'}
//               title={isCollapsed ? 'Log In' : undefined}
//             >
//               <span className="sidebar-icon">
//                 <LogIn size={18} strokeWidth={2.1} />
//               </span>
//               <span className="sidebar-label-wrap">
//                 <span className="sidebar-label">Log In</span>
//               </span>
//             </Link>

//             <Link
//               to="/signup"
//               className="sidebar-action-button"
//               data-active={location.pathname === '/signup'}
//               title={isCollapsed ? 'Sign Up' : undefined}
//             >
//               <span className="sidebar-icon">
//                 <UserPlus size={18} strokeWidth={2.1} />
//               </span>
//               <span className="sidebar-label-wrap">
//                 <span className="sidebar-label">Sign Up</span>
//               </span>
//             </Link>
//           </>
//         )}
//       </div>
//     </aside>
//   );
// }













import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell, // NEW: Added the Bell icon
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

// Updated the Connections item to use the Bell and an unreadKey
const primaryNavItems = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: Newspaper, label: 'Team Feed', to: '/feed' },
  { icon: SearchIcon, label: 'Find Members', to: '/search' },
  { icon: CalendarDays, label: 'Campus Events', to: '/events' },
  { icon: MessageCircle, label: 'Chat', to: '/chat', unreadKey: 'chat' },
  { icon: Bell, label: 'Network Alerts', to: '/network', unreadKey: 'network' } 
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

  // NEW: Calculate pending connection requests instantly from the AuthContext
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
  };

  const handleSidebarToggle = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: nextState }));
  };

  const renderNavItem = ({ icon: Icon, label, to, unreadKey }) => {
    const isActive = location.pathname === to;
    
    // NEW: Determine which unread count to show based on the key
    let unreadCount = 0;
    if (unreadKey === 'chat') unreadCount = chatUnreadTotal;
    if (unreadKey === 'network') unreadCount = networkUnreadTotal;

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
          <span className="sidebar-brand-mark">
            <img
              src="/favicon.svg"
              alt="TeamFinder logo"
              style={{ width: '26px', height: '26px', objectFit: 'contain' }}
            />
          </span>
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