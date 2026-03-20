import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('teamFinderUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Initialize token from localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem('teamFinderToken') || null;
  });

  // --- HELPER: JWT EXPIRY CHECK ---
  const isTokenExpired = (jwtToken) => {
    if (!jwtToken) return true;
    try {
      const payloadBase64 = jwtToken.split('.')[1];
      const decodedJson = JSON.parse(atob(payloadBase64));
      const exp = decodedJson.exp * 1000; // Convert to milliseconds
      return Date.now() > exp;
    } catch (e) {
      return true; // If decoding fails, assume expired
    }
  };

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('teamFinderUser', JSON.stringify(userData));
    localStorage.setItem('teamFinderToken', jwtToken); 
  };

  const logout = () => {
    if (token) {
      fetch('https://garvsharma9-teamfinder-api.hf.space/user/status?online=false', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('teamFinderUser');
    localStorage.removeItem('teamFinderToken');
    // Force redirect to login page
    window.location.href = '/login?expired=true';
  };

  const updateUser = (updatedFields) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedFields };
      localStorage.setItem('teamFinderUser', JSON.stringify(newUser));
      return newUser;
    });
  };

  // --- EFFECT: TOKEN EXPIRY MONITOR ---
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.warn("Session expired. Logging out...");
      logout();
    }
  }, [token]);

  // --- EFFECT 1: PRESENCE TRACKER (Online/Offline) ---
  useEffect(() => {
    if (!token) return;

    // Set Online
    fetch('https://garvsharma9-teamfinder-api.hf.space/user/status?online=true', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const handleUnload = () => {
      fetch('https://garvsharma9-teamfinder-api.hf.space/user/status?online=false', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        keepalive: true 
      });
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload(); 
    };
  }, [token]);

  // --- EFFECT 2: SILENT PROFILE SYNC (Sync with DB) ---
  useEffect(() => {
    const syncProfile = async () => {
      if (!token || !user?.username) return;

      try {
        const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/home/search-by-username/${user.username}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const freshData = await response.json();
          
          if (JSON.stringify(freshData) !== JSON.stringify(user)) {
            updateUser(freshData);
            console.log("Profile synced with database.");
          }
        } else if (response.status === 401) {
          // Explicitly catch 401 during sync to log out
          logout();
        }
      } catch (err) {
        console.error("Auto-sync failed:", err);
      }
    };

    syncProfile();
  }, [token, user?.username]); 

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};