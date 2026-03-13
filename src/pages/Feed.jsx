// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { themePalette } from '../theme/palette';

// export default function Feed() {
//   const { user, token } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     competitionName: '',
//     competitionDate: '',
//     position: '',
//     experienceTag: 'Beginner',
//     teamName: '',
//   });

//   const colors = themePalette;

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/post/all', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error('Failed to fetch posts');

//       const data = await response.json();
//       setPosts(data.reverse());
//     } catch (err) {
//       setError('Could not load feed. Is the server running?');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchPosts();
//     }
//   }, [token]);

//   const handleCreatePost = async (event) => {
//     event.preventDefault();
//     setIsSubmitting(true);

//     const postPayload = { ...formData, username: user.username };

//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/post/add-post', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(postPayload),
//       });

//       if (response.ok) {
//         setFormData({
//           competitionName: '',
//           competitionDate: '',
//           position: '',
//           experienceTag: 'Beginner',
//           teamName: '',
//         });
//         setIsExpanded(false);
//         fetchPosts();
//       } else {
//         alert('Failed to create post.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('An error occurred while posting.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRequestJoin = async (postId) => {
//     try {
//       const response = await fetch(
//         `https://garvsharma9-teamfinder-api.hf.space/post/${postId}/request?requesterUsername=${user.username}`,
//         {
//           method: 'POST',
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.ok) {
//         setPosts((previousPosts) =>
//           previousPosts.map((post) => {
//             if (post.id !== postId) return post;

//             const updatedRequests = post.requestedUsernames
//               ? [...post.requestedUsernames, user.username]
//               : [user.username];

//             return { ...post, requestedUsernames: updatedRequests };
//           })
//         );
//       } else {
//         alert('Could not send request.');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const styleSheet = `
//     .feed-page {
//       max-width: 660px;
//       margin: 32px auto;
//       padding: 0 20px;
//       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
//     }

//     .feed-card {
//       background: ${colors.glass};
//       border: 1px solid ${colors.border};
//       border-radius: 28px;
//       backdrop-filter: blur(24px);
//       -webkit-backdrop-filter: blur(24px);
//       box-shadow: ${colors.shadow};
//     }

//     .feed-create-box {
//       padding: 22px;
//       margin-bottom: 28px;
//     }

//     .feed-create-header {
//       display: flex;
//       align-items: center;
//       gap: 14px;
//     }

//     .feed-avatar {
//       width: 46px;
//       height: 46px;
//       border-radius: 16px;
//       flex-shrink: 0;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: #fff;
//       font-weight: 800;
//       background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc);
//       box-shadow: 0 14px 28px rgba(79, 140, 255, 0.22);
//     }

//     .feed-trigger {
//       width: 100%;
//       border: 1px solid ${colors.border};
//       border-radius: 18px;
//       background: ${colors.mutedSurface};
//       color: ${colors.textMain};
//       padding: 15px 18px;
//       font-weight: 700;
//       text-align: left;
//       cursor: pointer;
//       transition: transform 160ms ease, background 160ms ease;
//     }

//     .feed-trigger:hover {
//       transform: translateY(-1px);
//       background: ${colors.glassStrong};
//     }

//     .feed-form {
//       margin-top: 18px;
//       padding-top: 18px;
//       border-top: 1px solid ${colors.border};
//     }

//     .feed-input,
//     .feed-select {
//       width: 100%;
//       border-radius: 16px;
//       border: 1px solid ${colors.border};
//       background: ${colors.mutedSurface};
//       color: ${colors.textMain};
//       outline: none;
//       padding: 14px 16px;
//       font-size: 14px;
//       transition: border-color 160ms ease, background 160ms ease;
//     }

//     .feed-input:focus,
//     .feed-select:focus {
//       border-color: ${colors.blue};
//       background: ${colors.glassStrong};
//     }

//     .feed-row {
//       display: grid;
//       grid-template-columns: repeat(2, minmax(0, 1fr));
//       gap: 12px;
//       margin-top: 12px;
//     }

//     .feed-actions {
//       display: flex;
//       justify-content: flex-end;
//       gap: 10px;
//       margin-top: 14px;
//     }

//     .feed-button,
//     .feed-button-secondary {
//       border-radius: 16px;
//       padding: 11px 18px;
//       font-weight: 800;
//       cursor: pointer;
//       transition: transform 160ms ease, background 160ms ease;
//     }

//     .feed-button {
//       border: none;
//       color: #fff;
//       background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
//       box-shadow: 0 14px 28px rgba(79, 140, 255, 0.22);
//     }

//     .feed-button-secondary {
//       border: 1px solid ${colors.border};
//       color: ${colors.textSecondary};
//       background: ${colors.glassSoft};
//     }

//     .feed-post {
//       margin-bottom: 20px;
//       overflow: hidden;
//       transition: transform 180ms ease, box-shadow 180ms ease;
//     }

//     .feed-post:hover {
//       transform: translateY(-5px);
//       box-shadow: ${colors.shadowStrong};
//     }

//     .feed-post-header {
//       display: flex;
//       gap: 14px;
//       padding: 20px 20px 10px;
//       align-items: center;
//     }

//     .feed-post-body {
//       padding: 0 20px 20px;
//     }

//     .feed-pill {
//       display: inline-flex;
//       align-items: center;
//       padding: 7px 14px;
//       border-radius: 999px;
//       background: ${colors.accentGhost};
//       color: ${colors.accent};
//       font-size: 12px;
//       font-weight: 800;
//       margin-bottom: 14px;
//     }

//     .feed-post-footer {
//       padding: 18px 20px 20px;
//       background: ${colors.glassSoft};
//       border-top: 1px solid ${colors.border};
//     }

//     .feed-post-action {
//       width: 100%;
//       border: 1px solid ${colors.border};
//       border-radius: 16px;
//       padding: 13px 18px;
//       font-weight: 800;
//       cursor: pointer;
//       background: ${colors.primaryGhost};
//       color: ${colors.blue};
//       transition: transform 160ms ease, background 160ms ease, color 160ms ease;
//     }

//     .feed-post-action:hover:not(:disabled) {
//       transform: translateY(-1px);
//       background: ${colors.blue};
//       color: #fff;
//     }

//     .feed-post-action:disabled {
//       cursor: not-allowed;
//     }

//     @media (max-width: 640px) {
//       .feed-row {
//         grid-template-columns: 1fr;
//       }

//       .feed-actions {
//         flex-direction: column-reverse;
//       }
//     }
//   `;

//   if (!user) {
//     return <div style={{ textAlign: 'center', marginTop: '50px', color: colors.textSecondary }}>Please log in to see the feed.</div>;
//   }

//   return (
//     <div className="feed-page">
//       <style>{styleSheet}</style>

//       <div className="feed-card feed-create-box">
//         <div className="feed-create-header">
//           <div className="feed-avatar">{user.username.charAt(0).toUpperCase()}</div>
//           <button type="button" className="feed-trigger" onClick={() => setIsExpanded(true)}>
//             Looking for teammates? Start a post...
//           </button>
//         </div>

//         {isExpanded ? (
//           <form className="feed-form" onSubmit={handleCreatePost}>
//             <input
//               className="feed-input"
//               type="text"
//               placeholder="Competition / Hackathon Name"
//               required
//               value={formData.competitionName}
//               onChange={(event) => setFormData({ ...formData, competitionName: event.target.value })}
//             />

//             <div className="feed-row">
//               <input
//                 className="feed-input"
//                 type="date"
//                 required
//                 value={formData.competitionDate}
//                 onChange={(event) => setFormData({ ...formData, competitionDate: event.target.value })}
//               />
//               <input
//                 className="feed-input"
//                 type="text"
//                 placeholder="Team Name"
//                 required
//                 value={formData.teamName}
//                 onChange={(event) => setFormData({ ...formData, teamName: event.target.value })}
//               />
//             </div>

//             <div className="feed-row">
//               <input
//                 className="feed-input"
//                 type="text"
//                 placeholder="Position Needed (e.g., Designer)"
//                 required
//                 value={formData.position}
//                 onChange={(event) => setFormData({ ...formData, position: event.target.value })}
//               />
//               <select
//                 className="feed-select"
//                 value={formData.experienceTag}
//                 onChange={(event) => setFormData({ ...formData, experienceTag: event.target.value })}
//               >
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Pro">Pro</option>
//               </select>
//             </div>

//             <div className="feed-actions">
//               <button type="button" className="feed-button-secondary" onClick={() => setIsExpanded(false)}>
//                 Cancel
//               </button>
//               <button type="submit" className="feed-button" disabled={isSubmitting}>
//                 {isSubmitting ? 'Publishing...' : 'Post Requirement'}
//               </button>
//             </div>
//           </form>
//         ) : null}
//       </div>

//       <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', opacity: 0.78 }}>
//         <hr style={{ flex: 1, border: 'none', borderTop: `1px solid ${colors.border}` }} />
//         <span style={{ fontSize: '13px', fontWeight: '700', color: colors.textSecondary }}>
//           SORT BY: <strong style={{ color: colors.blue }}>LATEST</strong>
//         </span>
//       </div>

//       {loading ? <p style={{ textAlign: 'center', color: colors.textSecondary }}>Fetching requirements...</p> : null}
//       {error ? <p style={{ color: colors.red, textAlign: 'center' }}>{error}</p> : null}

//       {posts.length > 0 ? (
//         posts.map((post) => {
//           const isOwner = post.username === user.username;
//           const hasRequested = post.requestedUsernames && post.requestedUsernames.includes(user.username);
//           const isAccepted = post.acceptedUsernames && post.acceptedUsernames.includes(user.username);

//           let actionLabel = 'Request to Join Team';
//           let actionStyle = {};
//           let disabled = false;

//           if (isOwner) {
//             actionLabel = 'Manage via Dashboard';
//             actionStyle = { background: colors.glassSoft, color: colors.textSecondary, borderColor: 'transparent' };
//             disabled = true;
//           } else if (isAccepted) {
//             actionLabel = 'Member';
//             actionStyle = { background: colors.successGhost, color: colors.green, borderColor: 'transparent' };
//             disabled = true;
//           } else if (hasRequested) {
//             actionLabel = 'Pending Review';
//             actionStyle = { background: colors.accentGhost, color: colors.accent, borderColor: 'transparent' };
//             disabled = true;
//           }

//           return (
//             <div key={post.id} className="feed-card feed-post">
//               <div className="feed-post-header">
//                 <div
//                   className="feed-avatar"
//                   style={{
//                     width: '42px',
//                     height: '42px',
//                     borderRadius: '14px',
//                     background: colors.primaryGhost,
//                     color: colors.blue,
//                     boxShadow: 'none',
//                   }}
//                 >
//                   {post.username.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colors.textMain }}>{post.username}</h4>
//                   <p style={{ margin: '3px 0 0 0', fontSize: '13px', color: colors.textSecondary }}>
//                     📅 {post.competitionDate} • {post.competitionName}
//                   </p>
//                 </div>
//               </div>

//               <div className="feed-post-body">
//                 <h3 style={{ margin: '4px 0 12px', fontSize: '22px', fontWeight: '800', color: colors.textMain }}>
//                   Role: {post.position}
//                 </h3>
//                 <span className="feed-pill">{post.experienceTag} Experience</span>

//                 <p style={{ margin: '0 0 10px 0', color: colors.textMain }}>
//                   <strong style={{ color: colors.blue }}>Team:</strong> {post.teamName}
//                 </p>
//                 <p style={{ margin: 0, color: colors.textMain }}>
//                   <strong style={{ color: colors.blue }}>Current Size:</strong>{' '}
//                   <span style={{ fontWeight: '800' }}>{(post.acceptedUsernames?.length || 0) + 1}</span> members
//                 </p>
//               </div>

//               <div className="feed-post-footer">
//                 <button
//                   type="button"
//                   className="feed-post-action"
//                   style={actionStyle}
//                   disabled={disabled}
//                   onClick={() => handleRequestJoin(post.id)}
//                 >
//                   {actionLabel}
//                 </button>
//               </div>
//             </div>
//           );
//         })
//       ) : !loading ? (
//         <p style={{ textAlign: 'center', color: colors.textSecondary, marginTop: '40px' }}>
//           No active team requirements. Be the first!
//         </p>
//       ) : null}
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { themePalette } from '../theme/palette';

export default function Feed() {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    competitionName: '',
    competitionDate: '',
    position: '',
    experienceTag: 'Beginner',
    teamName: '',
  });

  const colors = themePalette;

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/post/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      setPosts(data.reverse());
    } catch (err) {
      setError('Could not load feed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const postPayload = { ...formData, username: user.username };

    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/post/add-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postPayload),
      });

      if (response.ok) {
        setFormData({
          competitionName: '',
          competitionDate: '',
          position: '',
          experienceTag: 'Beginner',
          teamName: '',
        });
        setIsExpanded(false);
        fetchPosts();
      } else {
        alert('Failed to create post.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while posting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestJoin = async (postId) => {
    try {
      const response = await fetch(
        `https://garvsharma9-teamfinder-api.hf.space/post/${postId}/request?requesterUsername=${user.username}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setPosts((previousPosts) =>
          previousPosts.map((post) => {
            if (post.id !== postId) return post;

            const updatedRequests = post.requestedUsernames
              ? [...post.requestedUsernames, user.username]
              : [user.username];

            return { ...post, requestedUsernames: updatedRequests };
          })
        );
      } else {
        alert('Could not send request.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- NEW: Handle Delete Post ---
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this requirement?")) return;

    try {
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/post/delete-post/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== postId)); 
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const styleSheet = `
    .feed-page {
      max-width: 660px;
      margin: 32px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .feed-card {
      background: ${colors.glass};
      border: 1px solid ${colors.border};
      border-radius: 28px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: ${colors.shadow};
    }

    .feed-create-box {
      padding: 22px;
      margin-bottom: 28px;
    }

    .feed-create-header {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .feed-avatar {
      width: 46px;
      height: 46px;
      border-radius: 16px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 800;
      background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc);
      box-shadow: 0 14px 28px rgba(79, 140, 255, 0.22);
      overflow: hidden; /* Important for clean image edges */
      padding: 0;
    }

    .feed-trigger {
      width: 100%;
      border: 1px solid ${colors.border};
      border-radius: 18px;
      background: ${colors.mutedSurface};
      color: ${colors.textMain};
      padding: 15px 18px;
      font-weight: 700;
      text-align: left;
      cursor: pointer;
      transition: transform 160ms ease, background 160ms ease;
    }

    .feed-trigger:hover {
      transform: translateY(-1px);
      background: ${colors.glassStrong};
    }

    .feed-form {
      margin-top: 18px;
      padding-top: 18px;
      border-top: 1px solid ${colors.border};
    }

    .feed-input,
    .feed-select {
      width: 100%;
      border-radius: 16px;
      border: 1px solid ${colors.border};
      background: ${colors.mutedSurface};
      color: ${colors.textMain};
      outline: none;
      padding: 14px 16px;
      font-size: 14px;
      transition: border-color 160ms ease, background 160ms ease;
    }

    .feed-input:focus,
    .feed-select:focus {
      border-color: ${colors.blue};
      background: ${colors.glassStrong};
    }

    .feed-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .feed-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 14px;
    }

    .feed-button,
    .feed-button-secondary {
      border-radius: 16px;
      padding: 11px 18px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 160ms ease, background 160ms ease;
    }

    .feed-button {
      border: none;
      color: #fff;
      background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
      box-shadow: 0 14px 28px rgba(79, 140, 255, 0.22);
    }

    .feed-button-secondary {
      border: 1px solid ${colors.border};
      color: ${colors.textSecondary};
      background: ${colors.glassSoft};
    }

    .feed-post {
      margin-bottom: 20px;
      overflow: hidden;
      transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .feed-post:hover {
      transform: translateY(-5px);
      box-shadow: ${colors.shadowStrong};
    }

    .feed-post-header {
      display: flex;
      justify-content: space-between; /* Pushes the delete button to the right */
      padding: 20px 20px 10px;
      align-items: flex-start;
    }

    .feed-user-link {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 14px;
      transition: opacity 0.2s;
    }

    .feed-user-link:hover {
      opacity: 0.85;
    }

    .feed-post-body {
      padding: 0 20px 20px;
    }

    .feed-pill {
      display: inline-flex;
      align-items: center;
      padding: 7px 14px;
      border-radius: 999px;
      background: ${colors.accentGhost};
      color: ${colors.accent};
      font-size: 12px;
      font-weight: 800;
      margin-bottom: 14px;
    }

    .feed-post-footer {
      padding: 18px 20px 20px;
      background: ${colors.glassSoft};
      border-top: 1px solid ${colors.border};
    }

    .feed-post-action {
      width: 100%;
      border: 1px solid ${colors.border};
      border-radius: 16px;
      padding: 13px 18px;
      font-weight: 800;
      cursor: pointer;
      background: ${colors.primaryGhost};
      color: ${colors.blue};
      transition: transform 160ms ease, background 160ms ease, color 160ms ease;
    }

    .feed-post-action:hover:not(:disabled) {
      transform: translateY(-1px);
      background: ${colors.blue};
      color: #fff;
    }

    .feed-post-action:disabled {
      cursor: not-allowed;
    }

    .delete-btn {
      background: transparent;
      border: none;
      color: ${colors.red};
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .delete-btn:hover {
      background: ${colors.dangerGhost};
    }

    @media (max-width: 640px) {
      .feed-row {
        grid-template-columns: 1fr;
      }

      .feed-actions {
        flex-direction: column-reverse;
      }
    }
  `;

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: colors.textSecondary }}>Please log in to see the feed.</div>;
  }

  return (
    <div className="feed-page">
      <style>{styleSheet}</style>

      {/* CREATE POST SECTION */}
      <div className="feed-card feed-create-box">
        <div className="feed-create-header">
          {/* USER'S AVATAR */}
          <div className="feed-avatar">
            {user.profilePictureUrl ? (
              <img 
                src={user.profilePictureUrl} 
                alt="Me" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              user.username.charAt(0).toUpperCase()
            )}
          </div>
          <button type="button" className="feed-trigger" onClick={() => setIsExpanded(true)}>
            Looking for teammates? Start a post...
          </button>
        </div>

        {isExpanded ? (
          <form className="feed-form" onSubmit={handleCreatePost}>
            <input
              className="feed-input"
              type="text"
              placeholder="Competition / Hackathon Name"
              required
              value={formData.competitionName}
              onChange={(event) => setFormData({ ...formData, competitionName: event.target.value })}
            />

            <div className="feed-row">
              <input
                className="feed-input"
                type="date"
                required
                value={formData.competitionDate}
                onChange={(event) => setFormData({ ...formData, competitionDate: event.target.value })}
              />
              <input
                className="feed-input"
                type="text"
                placeholder="Team Name"
                required
                value={formData.teamName}
                onChange={(event) => setFormData({ ...formData, teamName: event.target.value })}
              />
            </div>

            <div className="feed-row">
              <input
                className="feed-input"
                type="text"
                placeholder="Position Needed (e.g., Designer)"
                required
                value={formData.position}
                onChange={(event) => setFormData({ ...formData, position: event.target.value })}
              />
              <select
                className="feed-select"
                value={formData.experienceTag}
                onChange={(event) => setFormData({ ...formData, experienceTag: event.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Pro">Pro</option>
              </select>
            </div>

            <div className="feed-actions">
              <button type="button" className="feed-button-secondary" onClick={() => setIsExpanded(false)}>
                Cancel
              </button>
              <button type="submit" className="feed-button" disabled={isSubmitting}>
                {isSubmitting ? 'Publishing...' : 'Post Requirement'}
              </button>
            </div>
          </form>
        ) : null}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', opacity: 0.78 }}>
        <hr style={{ flex: 1, border: 'none', borderTop: `1px solid ${colors.border}` }} />
        <span style={{ fontSize: '13px', fontWeight: '700', color: colors.textSecondary }}>
          SORT BY: <strong style={{ color: colors.blue }}>LATEST</strong>
        </span>
      </div>

      {loading ? <p style={{ textAlign: 'center', color: colors.textSecondary }}>Fetching requirements...</p> : null}
      {error ? <p style={{ color: colors.red, textAlign: 'center' }}>{error}</p> : null}

      {/* FEED POSTS LIST */}
      {posts.length > 0 ? (
        posts.map((post) => {
          const isOwner = post.username === user.username;
          const hasRequested = post.requestedUsernames && post.requestedUsernames.includes(user.username);
          const isAccepted = post.acceptedUsernames && post.acceptedUsernames.includes(user.username);

          let actionLabel = 'Request to Join Team';
          let actionStyle = {};
          let disabled = false;

          if (isOwner) {
            actionLabel = 'Manage via Dashboard';
            actionStyle = { background: colors.glassSoft, color: colors.textSecondary, borderColor: 'transparent' };
            disabled = true;
          } else if (isAccepted) {
            actionLabel = 'Member';
            actionStyle = { background: colors.successGhost, color: colors.green, borderColor: 'transparent' };
            disabled = true;
          } else if (hasRequested) {
            actionLabel = 'Pending Review';
            actionStyle = { background: colors.accentGhost, color: colors.accent, borderColor: 'transparent' };
            disabled = true;
          }

          return (
            <div key={post.id} className="feed-card feed-post">
              <div className="feed-post-header">
                
                {/* POST AUTHOR AVATAR (Clickable Link) */}
                <Link to={`/profile/${post.username}`} className="feed-user-link">
                  <div
                    className="feed-avatar"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '14px',
                      background: colors.primaryGhost,
                      color: colors.blue,
                      boxShadow: 'none',
                    }}
                  >
                    {post.profilePictureUrl ? (
                      <img 
                        src={post.profilePictureUrl} 
                        alt="Avatar" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      post.username.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colors.textMain }}>{post.username}</h4>
                    <p style={{ margin: '3px 0 0 0', fontSize: '13px', color: colors.textSecondary }}>
                      📅 {post.competitionDate} • {post.competitionName}
                    </p>
                  </div>
                </Link>

                {/* DELETE BUTTON (Only renders if it is your post) */}
                {isOwner && (
                  <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>
                    🗑️ Delete
                  </button>
                )}
              </div>

              <div className="feed-post-body">
                <h3 style={{ margin: '4px 0 12px', fontSize: '22px', fontWeight: '800', color: colors.textMain }}>
                  Role: {post.position}
                </h3>
                <span className="feed-pill">{post.experienceTag} Experience</span>

                <p style={{ margin: '0 0 10px 0', color: colors.textMain }}>
                  <strong style={{ color: colors.blue }}>Team:</strong> {post.teamName}
                </p>
                <p style={{ margin: 0, color: colors.textMain }}>
                  <strong style={{ color: colors.blue }}>Current Size:</strong>{' '}
                  <span style={{ fontWeight: '800' }}>{(post.acceptedUsernames?.length || 0) + 1}</span> members
                </p>
              </div>

              <div className="feed-post-footer">
                <button
                  type="button"
                  className="feed-post-action"
                  style={actionStyle}
                  disabled={disabled}
                  onClick={() => handleRequestJoin(post.id)}
                >
                  {actionLabel}
                </button>
              </div>
            </div>
          );
        })
      ) : !loading ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', opacity: 0.7 }}>
          <span style={{ fontSize: '60px' }}>🚀</span>
          <h3 style={{ color: colors.textSecondary }}>No active team requirements. Be the first!</h3>
        </div>
      ) : null}
    </div>
  );
}