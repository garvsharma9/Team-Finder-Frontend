// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'; // NEW: Imported Link
// import { AuthContext } from '../context/AuthContext';
// import { themePalette } from '../theme/palette';
// import ConnectionButton from '../components/ConnectionButton';

// export default function Network() {
//   const { token, user, updateUser } = useContext(AuthContext);
//   const colors = themePalette;

//   const [pending, setPending] = useState([]);
//   const [connections, setConnections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) return;

//     const fetchNetworkData = async () => {
//       try {
//         const [pendingRes, connRes] = await Promise.all([
//           fetch(`http://localhost:8080/user/connect/pending`, { headers: { Authorization: `Bearer ${token}` } }),
//           fetch(`http://localhost:8080/user/connect/accepted`, { headers: { Authorization: `Bearer ${token}` } })
//         ]);

//         const nextUserFields = {};

//         if (pendingRes.ok) {
//           const pendingData = await pendingRes.json();
//           setPending(pendingData);
//           const pendingUsernames = pendingData.map((pendingUser) => pendingUser.username);
//           if (JSON.stringify(pendingUsernames) !== JSON.stringify(user?.connectionRequestsReceived || [])) {
//             nextUserFields.connectionRequestsReceived = pendingUsernames;
//           }
//         }

//         if (connRes.ok) {
//           const connectionData = await connRes.json();
//           setConnections(connectionData);
//           const connectionUsernames = connectionData.map((connectionUser) => connectionUser.username);
//           if (JSON.stringify(connectionUsernames) !== JSON.stringify(user?.connections || [])) {
//             nextUserFields.connections = connectionUsernames;
//           }
//         }

//         if (Object.keys(nextUserFields).length > 0) {
//           updateUser(nextUserFields);
//         }
//       } catch (err) {
//         console.error("Failed to load network", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNetworkData();
//   }, [token, user?.connections, user?.connectionRequestsReceived]); 

//   const handlePendingActionComplete = ({ action, profileUser }) => {
//     setPending((prevPending) => prevPending.filter((pendingUser) => pendingUser.username !== profileUser.username));

//     if (action === 'accept') {
//       setConnections((prevConnections) => {
//         if (prevConnections.some((connectedUser) => connectedUser.username === profileUser.username)) {
//           return prevConnections;
//         }
//         return [profileUser, ...prevConnections];
//       });
//     }
//   };

//   const handleConnectionActionComplete = ({ action, profileUser }) => {
//     if (action !== 'remove') return;
//     setConnections((prevConnections) =>
//       prevConnections.filter((connectedUser) => connectedUser.username !== profileUser.username)
//     );
//   };

//   const styleSheet = `
//     .network-page { max-width: 920px; margin: 38px auto; padding: 0 20px; font-family: -apple-system, sans-serif; }
//     .network-card { background: ${colors.glass}; border: 1px solid ${colors.border}; border-radius: 24px; backdrop-filter: blur(24px); box-shadow: ${colors.shadow}; padding: 24px; margin-bottom: 24px; }
//     .network-header { font-size: 22px; font-weight: 800; color: ${colors.textMain}; margin: 0 0 20px 0; border-bottom: 1px solid ${colors.border}; padding-bottom: 12px; }
//     .user-row { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: ${colors.glassSoft}; border: 1px solid ${colors.border}; border-radius: 16px; margin-bottom: 12px; transition: transform 0.2s; }
//     .user-row:hover { transform: translateY(-2px); box-shadow: ${colors.shadow}; }
    
//     /* NEW: Link styling */
//     .user-link {
//       display: flex;
//       align-items: center;
//       gap: 16px;
//       text-decoration: none;
//       transition: opacity 0.2s ease;
//     }
//     .user-link:hover {
//       opacity: 0.8;
//     }

//     .user-avatar { 
//       width: 56px; 
//       height: 56px; 
//       border-radius: 50%; 
//       background-color: ${colors.blue}; 
//       color: white; 
//       display: flex; 
//       align-items: center; 
//       justify-content: center; 
//       font-size: 24px; 
//       font-weight: bold; 
//       overflow: hidden; 
//       flex-shrink: 0;
//       padding: 0;
//     }
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
//               {/* WRAPPED IN LINK */}
//               <Link to={`/profile/${pUser.username}`} className="user-link">
//                 <div className="user-avatar">
//                   {pUser.profilePictureUrl ? (
//                     <img 
//                       src={pUser.profilePictureUrl} 
//                       alt={pUser.username} 
//                       style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                     />
//                   ) : (
//                     (pUser.name || pUser.username).charAt(0).toUpperCase()
//                   )}
//                 </div>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colors.textMain }}>{pUser.name || pUser.username}</h3>
//                   <p style={{ margin: 0, color: colors.textSecondary, fontSize: '14px' }}>@{pUser.username} • {pUser.experienceTag || 'Beginner'}</p>
//                 </div>
//               </Link>
              
//               <ConnectionButton
//                 profileUser={pUser}
//                 relationshipHint="received"
//                 onActionComplete={handlePendingActionComplete}
//               />
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
//               {/* WRAPPED IN LINK */}
//               <Link to={`/profile/${cUser.username}`} className="user-link">
//                 <div className="user-avatar">
//                   {cUser.profilePictureUrl ? (
//                     <img 
//                       src={cUser.profilePictureUrl} 
//                       alt={cUser.username} 
//                       style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                     />
//                   ) : (
//                     (cUser.name || cUser.username).charAt(0).toUpperCase()
//                   )}
//                 </div>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colors.textMain }}>{cUser.name || cUser.username}</h3>
//                   <p style={{ margin: 0, color: colors.textSecondary, fontSize: '14px' }}>{cUser.branch || 'No branch specified'}</p>
//                 </div>
//               </Link>
              
//               <ConnectionButton
//                 profileUser={cUser}
//                 showRemove
//                 onActionComplete={handleConnectionActionComplete}
//               />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import { themePalette } from '../theme/palette';
import ConnectionButton from '../components/ConnectionButton';

export default function Network() {
  const { token, user, updateUser } = useContext(AuthContext);
  const colors = themePalette;

  const [pending, setPending] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchNetworkData = async () => {
      try {
        const [pendingRes, connRes] = await Promise.all([
          fetch(`http://localhost:8080/user/connect/pending`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`http://localhost:8080/user/connect/accepted`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const nextUserFields = {};

        if (pendingRes.ok) {
          const pendingData = await pendingRes.json();
          setPending(pendingData);
          const pendingUsernames = pendingData.map((pendingUser) => pendingUser.username);
          if (JSON.stringify(pendingUsernames) !== JSON.stringify(user?.connectionRequestsReceived || [])) {
            nextUserFields.connectionRequestsReceived = pendingUsernames;
          }
        }

        if (connRes.ok) {
          const connectionData = await connRes.json();
          setConnections(connectionData);
          const connectionUsernames = connectionData.map((connectionUser) => connectionUser.username);
          if (JSON.stringify(connectionUsernames) !== JSON.stringify(user?.connections || [])) {
            nextUserFields.connections = connectionUsernames;
          }
        }

        if (Object.keys(nextUserFields).length > 0) {
          updateUser(nextUserFields);
        }
      } catch (err) {
        console.error("Failed to load network", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, [token, user?.connections, user?.connectionRequestsReceived]); 

  const handlePendingActionComplete = ({ action, profileUser }) => {
    setPending((prevPending) => prevPending.filter((pendingUser) => pendingUser.username !== profileUser.username));

    if (action === 'accept') {
      setConnections((prevConnections) => {
        if (prevConnections.some((connectedUser) => connectedUser.username === profileUser.username)) {
          return prevConnections;
        }
        return [profileUser, ...prevConnections];
      });
    }
  };

  const handleConnectionActionComplete = ({ action, profileUser }) => {
    if (action !== 'remove') return;
    setConnections((prevConnections) =>
      prevConnections.filter((connectedUser) => connectedUser.username !== profileUser.username)
    );
  };

  const styleSheet = `
    .network-page { max-width: 920px; margin: 38px auto; padding: 0 20px; font-family: -apple-system, sans-serif; }
    .network-card { background: ${colors.glass}; border: 1px solid ${colors.border}; border-radius: 24px; backdrop-filter: blur(24px); box-shadow: ${colors.shadow}; padding: 24px; margin-bottom: 24px; }
    .network-header { font-size: 22px; font-weight: 800; color: ${colors.textMain}; margin: 0 0 20px 0; border-bottom: 1px solid ${colors.border}; padding-bottom: 12px; }
    .user-row { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: ${colors.glassSoft}; border: 1px solid ${colors.border}; border-radius: 16px; margin-bottom: 12px; transition: transform 0.2s; }
    .user-row:hover { transform: translateY(-2px); box-shadow: ${colors.shadow}; }
    
    .user-link {
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      transition: opacity 0.2s ease;
      min-width: 0; /* Prevents flexbox blowout */
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

    .network-action-wrap {
      flex-shrink: 0;
    }

    /* --- MOBILE RESPONSIVE TWEAKS --- */
    @media (max-width: 640px) {
      .network-page {
        margin: 20px auto;
        padding: 0 12px;
      }
      .network-card {
        padding: 20px 16px;
        border-radius: 20px;
      }
      .user-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      .network-action-wrap {
        width: 100%;
        display: flex;
      }
      /* If the ConnectionButton exports internal buttons, this helps them stretch */
      .network-action-wrap > * {
        width: 100%;
      }
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
              
              <div className="network-action-wrap">
                <ConnectionButton
                  profileUser={pUser}
                  relationshipHint="received"
                  onActionComplete={handlePendingActionComplete}
                />
              </div>
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
              
              <div className="network-action-wrap">
                <ConnectionButton
                  profileUser={cUser}
                  showRemove
                  onActionComplete={handleConnectionActionComplete}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}