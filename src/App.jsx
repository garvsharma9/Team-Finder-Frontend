import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './pages/Search';
import Feed from './pages/Feed';
import ManageTeams from './pages/ManageTeams';
import PublicProfile from './pages/PublicProfile';
import Sidebar from './components/Sidebar';
import Chat from './pages/Chat';
import Network from './pages/Network';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app-shell">
            <Sidebar />

            <div className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
                <Route path="/manage-teams" element={<ProtectedRoute><ManageTeams /></ProtectedRoute>} />
                <Route path="/profile/:username" element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />
                <Route path="/network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { ThemeProvider } from './context/ThemeContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Sidebar from './components/Sidebar';

// // Lazy loaded page components
// const Home = lazy(() => import('./pages/Home'));
// const Login = lazy(() => import('./pages/Login'));
// const Signup = lazy(() => import('./pages/Signup'));
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const Events = lazy(() => import('./pages/Events'));
// const Search = lazy(() => import('./pages/Search'));
// const Feed = lazy(() => import('./pages/Feed'));
// const ManageTeams = lazy(() => import('./pages/ManageTeams'));
// const PublicProfile = lazy(() => import('./pages/PublicProfile'));
// const Chat = lazy(() => import('./pages/Chat'));
// const Network = lazy(() => import('./pages/Network'));

// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <Router>
//           <div className="app-shell">
//             <Sidebar />

//             <div className="app-main">
//               {/* Suspense wrapper catches the loading state for lazy components */}
//               <Suspense fallback={
//                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--tf-text-secondary)' }}>
//                   Loading...
//                 </div>
//               }>
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/signup" element={<Signup />} />
//                   <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
//                   <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
//                   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//                   <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
//                   <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
//                   <Route path="/manage-teams" element={<ProtectedRoute><ManageTeams /></ProtectedRoute>} />
//                   <Route path="/profile/:username" element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />
//                   <Route path="/network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
//                 </Routes>
//               </Suspense>
//             </div>
//           </div>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;