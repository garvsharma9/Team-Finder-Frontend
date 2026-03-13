// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { themePalette } from '../theme/palette';
// // import { API_BASE_URL } from '../config';
// import ConnectionButton from '../components/ConnectionButton';

// export default function Network() {
//   const { token, user } = useContext(AuthContext);
//   const colors = themePalette;

//   const [pending, setPending] = useState([]);
//   const [connections, setConnections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // We refetch data whenever the user context updates (like when they click Accept)
//   useEffect(() => {
//     if (!token) return;

//     const fetchNetworkData = async () => {
//       try {
//         const [pendingRes, connRes] = await Promise.all([
//           fetch(`https://garvsharma9-teamfinder-api.hf.space/user/connect/pending`, { headers: { Authorization: `Bearer ${token}` } }),
//           fetch(`https://garvsharma9-teamfinder-api.hf.space/user/connect/accepted`, { headers: { Authorization: `Bearer ${token}` } })
//         ]);

//         if (pendingRes.ok) setPending(await pendingRes.json());
//         if (connRes.ok) setConnections(await connRes.json());
//       } catch (err) {
//         console.error("Failed to load network", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNetworkData();
//   }, [token, user.connections, user.connectionRequestsReceived]); // Re-run when global state changes

//   const styleSheet = `
//     .network-page { max-width: 920px; margin: 38px auto; padding: 0 20px; font-family: -apple-system, sans-serif; }
//     .network-card { background: ${colors.glass}; border: 1px solid ${colors.border}; border-radius: 24px; backdrop-filter: blur(24px); box-shadow: ${colors.shadow}; padding: 24px; margin-bottom: 24px; }
//     .network-header { font-size: 22px; font-weight: 800; color: ${colors.textMain}; margin: 0 0 20px 0; border-bottom: 1px solid ${colors.border}; padding-bottom: 12px; }
//     .user-row { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: ${colors.glassSoft}; border: 1px solid ${colors.border}; border-radius: 16px; margin-bottom: 12px; transition: transform 0.2s; }
//     .user-row:hover { transform: translateY(-2px); box-shadow: ${colors.shadow}; }
//     .user-info { display: flex; align-items: center; gap: 16px; }
//     .user-avatar { width: 56px; height: 56px; border-radius: 50%; background-size: cover; background-position: center; background-color: ${colors.blue}; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; }
//   `;

//   if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading network...</div>;

//   return (
//     <div className="network-page">
//       <style>{styleSheet}</style>

//       {/* PENDING REQUESTS SECTION */}
//       {pending.length > 0 && (
//         <div className="network-card">
//           <h2 className="network-header">Invitations ({pending.length})</h2>
//           {pending.map(pUser => (
//             <div key={pUser.username} className="user-row">
//               <div className="user-info">
//                 <div 
//                   className="user-avatar" 
//                   style={pUser.profilePictureUrl ? { backgroundImage: `url(${pUser.profilePictureUrl})` } : {}}
//                 >
//                   {!pUser.profilePictureUrl && (pUser.name || pUser.username).charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colors.textMain }}>{pUser.name || pUser.username}</h3>
//                   <p style={{ margin: 0, color: colors.textSecondary, fontSize: '14px' }}>@{pUser.username} • {pUser.experienceTag || 'Beginner'}</p>
//                 </div>
//               </div>
//               {/* Simply drop the ConnectionButton component in! */}
//               <ConnectionButton profileUser={pUser} />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* MY CONNECTIONS SECTION */}
//       <div className="network-card">
//         <h2 className="network-header">My Connections ({connections.length})</h2>
//         {connections.length === 0 ? (
//           <p style={{ color: colors.textSecondary, textAlign: 'center', padding: '20px 0' }}>You don't have any connections yet. Start networking!</p>
//         ) : (
//           connections.map(cUser => (
//             <div key={cUser.username} className="user-row">
//               <div className="user-info">
//                 <div 
//                   className="user-avatar" 
//                   style={cUser.profilePictureUrl ? { backgroundImage: `url(${cUser.profilePictureUrl})` } : {}}
//                 >
//                   {!cUser.profilePictureUrl && (cUser.name || cUser.username).charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colors.textMain }}>{cUser.name || cUser.username}</h3>
//                   <p style={{ margin: 0, color: colors.textSecondary, fontSize: '14px' }}>{cUser.branch || 'No branch specified'}</p>
//                 </div>
//               </div>
//               <ConnectionButton profileUser={cUser} />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // NEW: Imported Link
import { AuthContext } from '../context/AuthContext';
import { themePalette } from '../theme/palette';
import ConnectionButton from '../components/ConnectionButton';

export default function Network() {
  const { token, user } = useContext(AuthContext);
  const colors = themePalette;

  const [pending, setPending] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchNetworkData = async () => {
      try {
        const [pendingRes, connRes] = await Promise.all([
          fetch(`https://garvsharma9-teamfinder-api.hf.space/user/connect/pending`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`https://garvsharma9-teamfinder-api.hf.space/user/connect/accepted`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (pendingRes.ok) setPending(await pendingRes.json());
        if (connRes.ok) setConnections(await connRes.json());
      } catch (err) {
        console.error("Failed to load network", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, [token, user?.connections, user?.connectionRequestsReceived]); 

  const styleSheet = `
    .network-page { max-width: 920px; margin: 38px auto; padding: 0 20px; font-family: -apple-system, sans-serif; }
    .network-card { background: ${colors.glass}; border: 1px solid ${colors.border}; border-radius: 24px; backdrop-filter: blur(24px); box-shadow: ${colors.shadow}; padding: 24px; margin-bottom: 24px; }
    .network-header { font-size: 22px; font-weight: 800; color: ${colors.textMain}; margin: 0 0 20px 0; border-bottom: 1px solid ${colors.border}; padding-bottom: 12px; }
    .user-row { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: ${colors.glassSoft}; border: 1px solid ${colors.border}; border-radius: 16px; margin-bottom: 12px; transition: transform 0.2s; }
    .user-row:hover { transform: translateY(-2px); box-shadow: ${colors.shadow}; }
    
    /* NEW: Link styling */
    .user-link {
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      transition: opacity 0.2s ease;
    }
    .user-link:hover {
      opacity: 0.8;
    }

    .user-avatar { 
      width: 56px; 
      height: 56px; 
      border-radius: 50%; 
      background-color: ${colors.blue}; 
      color: white; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      font-size: 24px; 
      font-weight: bold; 
      overflow: hidden; 
      flex-shrink: 0;
      padding: 0;
    }
  `;

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading network...</div>;

  return (
    <div className="network-page">
      <style>{styleSheet}</style>

      {/* PENDING REQUESTS SECTION */}
      {pending.length > 0 && (
        <div className="network-card">
          <h2 className="network-header">Invitations ({pending.length})</h2>
          {pending.map(pUser => (
            <div key={pUser.username} className="user-row">
              {/* WRAPPED IN LINK */}
              <Link to={`/profile/${pUser.username}`} className="user-link">
                <div className="user-avatar">
                  {pUser.profilePictureUrl ? (
                    <img 
                      src={pUser.profilePictureUrl} 
                      alt={pUser.username} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    (pUser.name || pUser.username).charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colors.textMain }}>{pUser.name || pUser.username}</h3>
                  <p style={{ margin: 0, color: colors.textSecondary, fontSize: '14px' }}>@{pUser.username} • {pUser.experienceTag || 'Beginner'}</p>
                </div>
              </Link>
              
              <ConnectionButton profileUser={pUser} />
            </div>
          ))}
        </div>
      )}

      {/* MY CONNECTIONS SECTION */}
      <div className="network-card">
        <h2 className="network-header">My Connections ({connections.length})</h2>
        {connections.length === 0 ? (
          <p style={{ color: colors.textSecondary, textAlign: 'center', padding: '20px 0' }}>You don't have any connections yet. Start networking!</p>
        ) : (
          connections.map(cUser => (
            <div key={cUser.username} className="user-row">
              {/* WRAPPED IN LINK */}
              <Link to={`/profile/${cUser.username}`} className="user-link">
                <div className="user-avatar">
                  {cUser.profilePictureUrl ? (
                    <img 
                      src={cUser.profilePictureUrl} 
                      alt={cUser.username} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    (cUser.name || cUser.username).charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colors.textMain }}>{cUser.name || cUser.username}</h3>
                  <p style={{ margin: 0, color: colors.textSecondary, fontSize: '14px' }}>{cUser.branch || 'No branch specified'}</p>
                </div>
              </Link>
              
              <ConnectionButton profileUser={cUser} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}