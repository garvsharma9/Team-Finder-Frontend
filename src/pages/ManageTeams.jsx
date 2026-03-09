// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export default function ManageTeams() {
//   const { user, token } = useContext(AuthContext);
//   const [myPosts, setMyPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchMyPosts = async () => {
//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/post/all', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (!response.ok) throw new Error('Failed to fetch posts');
//       const data = await response.json();
      
//       // FIX: Include posts where the user is the owner, an accepted member, OR a pending applicant!
//       const relevantPosts = data.filter(post => 
//         post.username === user.username || 
//         (post.acceptedUsernames && post.acceptedUsernames.includes(user.username)) ||
//         (post.requestedUsernames && post.requestedUsernames.includes(user.username))
//       );
      
//       setMyPosts(relevantPosts.reverse()); 
//     } catch (err) {
//       setError('Could not load your teams. Is the server running?');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchMyPosts();
//   }, [token]);

//   const handleAccept = async (postId, targetUsername) => {
//     try {
//       const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/post/${postId}/accept?ownerUsername=${user.username}&targetUsername=${targetUsername}`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         setMyPosts(prevPosts => prevPosts.map(post => {
//           if (post.id === postId) {
//             const updatedRequests = post.requestedUsernames.filter(name => name !== targetUsername);
//             const updatedAccepted = post.acceptedUsernames ? [...post.acceptedUsernames, targetUsername] : [targetUsername];
//             return { ...post, requestedUsernames: updatedRequests, acceptedUsernames: updatedAccepted };
//           }
//           return post;
//         }));
//       } else {
//         alert('Failed to accept user.');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleReject = async (postId, targetUsername) => {
//     if (!window.confirm(`Are you sure you want to reject ${targetUsername}?`)) return;
    
//     try {
//       const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/post/${postId}/reject?ownerUsername=${user.username}&targetUsername=${targetUsername}`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         setMyPosts(prevPosts => prevPosts.map(post => {
//           if (post.id === postId) {
//             const updatedRequests = post.requestedUsernames.filter(name => name !== targetUsername);
//             return { ...post, requestedUsernames: updatedRequests };
//           }
//           return post;
//         }));
//       } else {
//         alert('Failed to reject user.');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const styleSheet = `
//     .manage-wrapper { max-width: 900px; margin: 30px auto; padding: 0 20px; font-family: Arial, sans-serif; }
    
//     .team-card {
//       background-color: #fff; border-radius: 12px; border: 1px solid #e0e0e0;
//       box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 30px; overflow: hidden;
//     }

//     .team-header {
//       background: linear-gradient(to right, #f8fafd, #ffffff);
//       padding: 20px 24px; border-bottom: 1px solid #e0e0e0;
//       border-left: 6px solid #0a66c2; display: flex; justify-content: space-between; align-items: flex-start;
//     }

//     .team-title { margin: 0 0 5px 0; font-size: 24px; color: #111; }
//     .team-meta { margin: 0; color: #666; font-size: 14px; }

//     .role-badge {
//       padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;
//     }
//     .role-leader { background-color: #0a66c2; color: #fff; }
//     .role-member { background-color: #057642; color: #fff; }
//     .role-pending { background-color: #f5c518; color: #000; }

//     .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
//     @media (max-width: 768px) { .content-grid { grid-template-columns: 1fr; } }

//     .section-col { padding: 24px; }
//     .left-col { border-right: 1px solid #e0e0e0; background-color: #fff; }
//     .right-col { background-color: #fcfcfc; }

//     .section-title { font-size: 16px; font-weight: bold; color: #333; margin: 0 0 15px 0; display: flex; align-items: center; justify-content: space-between; }
//     .count-badge { background-color: #e8f3ff; color: #0a66c2; padding: 2px 8px; border-radius: 12px; font-size: 12px; }

//     .user-row {
//       display: flex; align-items: center; justify-content: space-between; padding: 12px; background-color: #fff;
//       border: 1px solid #ebebeb; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
//     }
//     .user-info { display: flex; align-items: center; gap: 10px; }
//     .mini-avatar { width: 36px; height: 36px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; }
//     .user-name { font-weight: bold; color: #111; font-size: 14px; }
//     .role-tag { font-size: 12px; color: #888; display: block; }

//     .btn-group { display: flex; gap: 8px; }
//     .btn-accept { background-color: #057642; color: #fff; border: none; padding: 6px 16px; border-radius: 16px; font-weight: bold; font-size: 13px; cursor: pointer; transition: 0.2s; }
//     .btn-accept:hover { background-color: #046036; }
//     .btn-reject { background-color: transparent; color: #d11124; border: 1px solid #d11124; padding: 6px 16px; border-radius: 16px; font-weight: bold; font-size: 13px; cursor: pointer; transition: 0.2s; }
//     .btn-reject:hover { background-color: #fef0f0; }

//     .empty-state { text-align: center; color: #888; font-size: 14px; padding: 20px 0; font-style: italic; }
//   `;

//   if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Please log in to manage your teams.</div>;

//   return (
//     <div className="manage-wrapper">
//       <style>{styleSheet}</style>

//       <h1 style={{ marginBottom: '30px', color: '#111' }}>My Teams & Applications</h1>
      
//       {loading && <p style={{ color: '#666' }}>Loading your dashboard...</p>}
//       {error && <p style={{ color: '#d11124' }}>{error}</p>}

//       {myPosts.length > 0 ? (
//         myPosts.map((post) => {
          
//           // Determine the current user's role in this specific team
//           const isOwner = post.username === user.username;
//           const isAccepted = post.acceptedUsernames && post.acceptedUsernames.includes(user.username);
//           const isPending = post.requestedUsernames && post.requestedUsernames.includes(user.username);

//           return (
//             <div key={post.id} className="team-card">
              
//               {/* --- TEAM HEADER --- */}
//               <div className="team-header">
//                 <div>
//                   <h2 className="team-title">{post.teamName}</h2>
//                   <p className="team-meta">
//                     <strong>Target:</strong> {post.competitionName} &nbsp;|&nbsp; 
//                     <strong> Recruiting:</strong> {post.position}
//                   </p>
//                 </div>
//                 {/* Dynamic Status Badge */}
//                 <div>
//                   {isOwner && <span className="role-badge role-leader">Team Lead</span>}
//                   {isAccepted && <span className="role-badge role-member">Member</span>}
//                   {isPending && <span className="role-badge role-pending">Application Pending</span>}
//                 </div>
//               </div>

//               <div className="content-grid">
                
//                 {/* --- LEFT COL: PENDING REQUESTS --- */}
//                 <div className="section-col left-col">
//                   <h3 className="section-title">
//                     Pending Applications
//                     <span className="count-badge">{post.requestedUsernames?.length || 0}</span>
//                   </h3>
                  
//                   {isOwner ? (
//                     // ONLY THE OWNER CAN SEE THE ACCEPT/REJECT BUTTONS
//                     post.requestedUsernames && post.requestedUsernames.length > 0 ? (
//                       post.requestedUsernames.map(requester => (
//                         <div key={requester} className="user-row">
//                           <div className="user-info">
//                             <div className="mini-avatar" style={{ backgroundColor: '#f5c518', color: '#000' }}>{requester.charAt(0).toUpperCase()}</div>
//                             <div>
//                               <span className="user-name">{requester}</span>
//                               <span className="role-tag">Wants to join</span>
//                             </div>
//                           </div>
//                           <div className="btn-group">
//                             <button className="btn-accept" onClick={() => handleAccept(post.id, requester)}>Accept</button>
//                             <button className="btn-reject" onClick={() => handleReject(post.id, requester)}>Decline</button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="empty-state">No pending requests at the moment.</div>
//                     )
//                   ) : (
//                     // IF THEY ARE JUST A MEMBER, HIDE THE CONTROLS
//                     <div className="empty-state" style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
//                       {isPending ? "You have requested to join this team. Waiting for the Team Lead to review." : "Only the Team Lead can manage new applications."}
//                     </div>
//                   )}
//                 </div>

//                 {/* --- RIGHT COL: CURRENT ROSTER --- */}
//                 <div className="section-col right-col">
//                   <h3 className="section-title">
//                     Active Roster
//                     <span className="count-badge">{(post.acceptedUsernames?.length || 0) + 1}</span>
//                   </h3>

//                   {/* The Team Lead */}
//                   <div className="user-row" style={{ borderLeft: '4px solid #0a66c2' }}>
//                     <div className="user-info">
//                       <div className="mini-avatar" style={{ backgroundColor: '#0a66c2' }}>{post.username.charAt(0).toUpperCase()}</div>
//                       <div>
//                         <span className="user-name">{post.username}</span>
//                         <span className="role-tag" style={{ color: '#0a66c2', fontWeight: 'bold' }}>Team Lead {isOwner && '(You)'}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Accepted Members */}
//                   {post.acceptedUsernames && post.acceptedUsernames.length > 0 && (
//                     post.acceptedUsernames.map(member => (
//                       <div key={member} className="user-row" style={member === user.username ? { borderLeft: '4px solid #057642' } : {}}>
//                         <div className="user-info">
//                           <div className="mini-avatar" style={{ backgroundColor: '#057642' }}>{member.charAt(0).toUpperCase()}</div>
//                           <div>
//                             <span className="user-name">{member}</span>
//                             <span className="role-tag" style={member === user.username ? { color: '#057642', fontWeight: 'bold' } : {}}>
//                               Member {member === user.username && '(You)'}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>

//               </div>
//             </div>
//           );
//         })
//       ) : (
//         !loading && (
//           <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
//             <span style={{ fontSize: '48px', display: 'block', marginBottom: '15px' }}>🚀</span>
//             <h3 style={{ margin: '0 0 10px 0', color: '#111' }}>You aren't in any teams yet.</h3>
//             <p style={{ color: '#666' }}>Go to the Feed to post your first project requirement or join an existing team!</p>
//           </div>
//         )
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ManageTeams() {
  const { user, token } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- LOGIC PRESERVED EXACTLY ---
  const fetchMyPosts = async () => {
    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/post/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      
      const relevantPosts = data.filter(post => 
        post.username === user.username || 
        (post.acceptedUsernames && post.acceptedUsernames.includes(user.username)) ||
        (post.requestedUsernames && post.requestedUsernames.includes(user.username))
      );
      
      setMyPosts(relevantPosts.reverse()); 
    } catch (err) {
      setError('Could not load your teams. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyPosts();
  }, [token]);

  const handleAccept = async (postId, targetUsername) => {
    try {
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/post/${postId}/accept?ownerUsername=${user.username}&targetUsername=${targetUsername}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMyPosts(prevPosts => prevPosts.map(post => {
          if (post.id === postId) {
            const updatedRequests = post.requestedUsernames.filter(name => name !== targetUsername);
            const updatedAccepted = post.acceptedUsernames ? [...post.acceptedUsernames, targetUsername] : [targetUsername];
            return { ...post, requestedUsernames: updatedRequests, acceptedUsernames: updatedAccepted };
          }
          return post;
        }));
      }
    } catch (err) { console.error(err); }
  };

  const handleReject = async (postId, targetUsername) => {
    if (!window.confirm(`Are you sure you want to reject ${targetUsername}?`)) return;
    try {
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/post/${postId}/reject?ownerUsername=${user.username}&targetUsername=${targetUsername}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMyPosts(prevPosts => prevPosts.map(post => {
          if (post.id === postId) {
            const updatedRequests = post.requestedUsernames.filter(name => name !== targetUsername);
            return { ...post, requestedUsernames: updatedRequests };
          }
          return post;
        }));
      }
    } catch (err) { console.error(err); }
  };

  const colors = {
    blue: '#007AFF',
    green: '#34C759',
    orange: '#FF9500',
    red: '#FF3B30',
    glass: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255, 255, 0.3)'
  };

  const styleSheet = `
    .manage-wrapper { max-width: 1000px; margin: 40px auto; padding: 0 20px; font-family: -apple-system, sans-serif; }
    
    .team-card {
      background: ${colors.glass};
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      border: 1px solid ${colors.border};
      box-shadow: 0 8px 32px rgba(0,0,0,0.05);
      margin-bottom: 35px;
      overflow: hidden;
    }

    .team-header {
      padding: 25px 30px;
      border-bottom: 1px solid ${colors.border};
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.2);
    }

    .team-title { margin: 0; font-size: 26px; font-weight: 800; color: #1D1D1F; letter-spacing: -0.5px; }
    .team-meta { margin: 5px 0 0 0; color: #86868B; font-size: 14px; font-weight: 500; }

    .role-badge {
      padding: 6px 14px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      backdrop-filter: blur(10px);
    }
    .role-leader { background: rgba(0, 122, 255, 0.1); color: ${colors.blue}; border: 1px solid rgba(0,122,255,0.2); }
    .role-member { background: rgba(52, 199, 89, 0.1); color: ${colors.green}; border: 1px solid rgba(52,199,89,0.2); }
    .role-pending { background: rgba(255, 149, 0, 0.1); color: ${colors.orange}; border: 1px solid rgba(255,149,0,0.2); }

    .content-grid { display: grid; grid-template-columns: 1fr 1.2fr; }
    @media (max-width: 800px) { .content-grid { grid-template-columns: 1fr; } }

    .section-col { padding: 30px; }
    .left-col { border-right: 1px solid ${colors.border}; }
    .right-col { background: rgba(255, 255, 255, 0.15); }

    .section-title { font-size: 17px; font-weight: 700; color: #1D1D1F; margin: 0 0 20px 0; display: flex; align-items: center; justify-content: space-between; }
    .count-badge { background: rgba(0,0,0,0.05); color: #86868B; padding: 2px 10px; border-radius: 10px; font-size: 12px; }

    .user-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 16px;
      border: 1px solid ${colors.border};
      margin-bottom: 12px;
      transition: all 0.2s ease;
    }
    .user-row:hover { background: rgba(255, 255, 255, 0.8); transform: scale(1.02); }

    .mini-avatar { 
      width: 40px; height: 40px; border-radius: 12px; color: #fff; 
      display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .btn-accept { background: ${colors.blue}; color: #fff; border: none; padding: 8px 16px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; transition: 0.2s; }
    .btn-reject { background: transparent; color: ${colors.red}; border: 1px solid rgba(255,59,48,0.2); padding: 8px 16px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; transition: 0.2s; }
    .btn-reject:hover { background: rgba(255, 59, 48, 0.1); }
  `;

  if (!user) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#86868B' }}>Please log in to manage your teams.</div>;

  return (
    <div className="manage-wrapper">
      <style>{styleSheet}</style>

      <h1 style={{ marginBottom: '35px', color: '#1D1D1F', fontSize: '32px', fontWeight: '800' }}>Workspace Manager</h1>
      
      {loading && <p style={{ color: '#86868B' }}>Syncing your teams...</p>}
      {error && <p style={{ color: colors.red }}>{error}</p>}

      {myPosts.length > 0 ? (
        myPosts.map((post) => {
          const isOwner = post.username === user.username;
          const isAccepted = post.acceptedUsernames && post.acceptedUsernames.includes(user.username);
          const isPending = post.requestedUsernames && post.requestedUsernames.includes(user.username);

          return (
            <div key={post.id} className="team-card">
              <div className="team-header">
                <div>
                  <h2 className="team-title">{post.teamName || 'Untitled Team'}</h2>
                  <p className="team-meta">
                    Targeting <strong>{post.competitionName}</strong>
                  </p>
                </div>
                <div>
                  {isOwner && <span className="role-badge role-leader">Team Lead</span>}
                  {isAccepted && <span className="role-badge role-member">Member</span>}
                  {isPending && <span className="role-badge role-pending">Pending</span>}
                </div>
              </div>

              <div className="content-grid">
                {/* --- APPLICATIONS --- */}
                <div className="section-col left-col">
                  <h3 className="section-title">
                    Applications
                    <span className="count-badge">{post.requestedUsernames?.length || 0}</span>
                  </h3>
                  
                  {isOwner ? (
                    post.requestedUsernames?.length > 0 ? (
                      post.requestedUsernames.map(requester => (
                        <div key={requester} className="user-row">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="mini-avatar" style={{ background: colors.orange }}>{requester.charAt(0).toUpperCase()}</div>
                            <span style={{ fontWeight: '700', fontSize: '15px' }}>{requester}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn-accept" onClick={() => handleAccept(post.id, requester)}>Accept</button>
                            <button className="btn-reject" onClick={() => handleReject(post.id, requester)}>✕</button>
                          </div>
                        </div>
                      ))
                    ) : ( <div style={{ color: '#86868B', fontSize: '14px' }}>No new requests</div> )
                  ) : (
                    <div style={{ color: '#86868B', fontSize: '13px', background: 'rgba(0,0,0,0.03)', padding: '15px', borderRadius: '12px' }}>
                      {isPending ? "Your application is under review by the lead." : "Only leads can manage applicants."}
                    </div>
                  )}
                </div>

                {/* --- ACTIVE ROSTER --- */}
                <div className="section-col right-col">
                  <h3 className="section-title">
                    Team Roster
                    <span className="count-badge">{(post.acceptedUsernames?.length || 0) + 1}</span>
                  </h3>

                  <div className="user-row" style={{ borderLeft: `4px solid ${colors.blue}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="mini-avatar" style={{ background: colors.blue }}>{post.username.charAt(0).toUpperCase()}</div>
                      <div>
                        <div style={{ fontWeight: '700' }}>{post.username}</div>
                        <div style={{ fontSize: '11px', color: colors.blue, fontWeight: '700' }}>LEAD</div>
                      </div>
                    </div>
                  </div>

                  {post.acceptedUsernames?.map(member => (
                    <div key={member} className="user-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="mini-avatar" style={{ background: colors.green }}>{member.charAt(0).toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: '700' }}>{member}</div>
                          <div style={{ fontSize: '11px', color: colors.green, fontWeight: '700' }}>MEMBER</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        !loading && (
          <div style={{ textAlign: 'center', padding: '60px', background: colors.glass, borderRadius: '32px', border: `1px solid ${colors.border}`, backdropFilter: 'blur(20px)' }}>
            <span style={{ fontSize: '50px', display: 'block', marginBottom: '20px' }}>⛵</span>
            <h3 style={{ margin: 0, color: '#1D1D1F' }}>You aren't in any teams yet</h3>
            <p style={{ color: '#86868B' }}>Explore the feed to find your next project.</p>
          </div>
        )
      )}
    </div>
  );
}