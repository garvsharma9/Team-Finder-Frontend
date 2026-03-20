// import React, { useContext, useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom'; // ADDED: useLocation & useNavigate
// import { AuthContext } from '../context/AuthContext';
// import { themePalette } from '../theme/palette';
// import ConnectionButton from '../components/ConnectionButton';

// export default function Search() {
//   const { user, token } = useContext(AuthContext);
//   const location = useLocation(); // ADDED
//   const navigate = useNavigate(); // ADDED
//   const [query, setQuery] = useState('');
//   const [searchType, setSearchType] = useState('name');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isEventFilter, setIsEventFilter] = useState(false); // ADDED: To track if we are viewing event attendees

//   const colors = themePalette;

//   // ADDED: The interception logic for the Competition Filter
// // --- INITIAL DATA LOAD (Event Attendees OR Default Random Users) ---
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       if (!token) return;
      
//       const queryParams = new URLSearchParams(location.search);
//       const interestedUsernamesStr = queryParams.get('interested');

//       setLoading(true);
//       setError('');

//       if (interestedUsernamesStr) {
//         // SCENARIO 1: User came from an Event page
//         setIsEventFilter(true);
//         const usernameArray = interestedUsernamesStr.split(',');

//         try {
//           const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/users/batch', {
//             method: 'POST',
//             headers: { 
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ usernames: usernameArray })
//           });
          
//           if (response.ok) {
//             const data = await response.json();
//             setResults(Array.isArray(data) ? data : []);
//           } else {
//             throw new Error('Failed to fetch event teammates.');
//           }
//         } catch (err) {
//           setError("Could not load teammates for this event.");
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         // SCENARIO 2: Normal Search page load (Fetch 10 default users)
//         setIsEventFilter(false);
//         try {
//           // Reusing your algorithm endpoint to get 10 high-quality random profiles
//           const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/suggested-teammates', {
//             headers: { 'Authorization': `Bearer ${token}` }
//           });
          
//           if (response.ok) {
//             const data = await response.json();
//             setResults(Array.isArray(data) ? data : []);
//           }
//         } catch (err) {
//           console.error("Failed to load default users", err);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchInitialData();
//   }, [location.search, token]);


//   const handleSearch = async (event) => {
//     event.preventDefault();
//     if (!query.trim()) return;

//     setLoading(true);
//     setError('');
//     setResults([]);
    
//     // Clear any event filters if the user does a manual search
//     if (isEventFilter) {
//       navigate('/search', { replace: true });
//       setIsEventFilter(false);
//     }

//     try {
//       let endpoint = '';
//       if (searchType === 'name') endpoint = `/home/search-by-name/${query}`;
//       if (searchType === 'skill') endpoint = `/home/search-by-skill/${query}`;
//       if (searchType === 'username') endpoint = `/home/search-by-username/${query}`;

//       const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space${endpoint}`, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error('No users found matching that criteria.');
//       }

//       const data = await response.json();
//       setResults(Array.isArray(data) ? data : data ? [data] : []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async (targetUsername) => {
//     try {
//       const response = await fetch(
//         `https://garvsharma9-teamfinder-api.hf.space/home/like/${targetUsername}?likerUsername=${user.username}`,
//         {
//           method: 'POST',
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.ok) {
//         setResults((previousResults) =>
//           previousResults.map((result) => {
//             if (result.username !== targetUsername) return result;

//             const updatedLikedBy = result.likedBy ? [...result.likedBy, user.username] : [user.username];
//             return {
//               ...result,
//               likesReceived: (result.likesReceived || 0) + 1,
//               likedBy: updatedLikedBy,
//             };
//           })
//         );
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const clearEventFilter = () => {
//     navigate('/search', { replace: true });
//     setResults([]);
//     setIsEventFilter(false);
//   };

//   const styleSheet = `
//     .search-page {
//       max-width: 1100px;
//       margin: 40px auto;
//       padding: 0 20px;
//       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
//     }

//     .search-panel {
//       background: ${colors.glass};
//       border: 1px solid ${colors.border};
//       border-radius: 28px;
//       backdrop-filter: blur(24px);
//       -webkit-backdrop-filter: blur(24px);
//       box-shadow: ${colors.shadow};
//       padding: 30px;
//       margin-bottom: 34px;
//     }

//     .search-form {
//       display: flex;
//       gap: 14px;
//       flex-wrap: wrap;
//     }

//     .search-select,
//     .search-input {
//       border-radius: 16px;
//       border: 1px solid ${colors.border};
//       background: ${colors.mutedSurface};
//       color: ${colors.textMain};
//       outline: none;
//       transition: border-color 160ms ease, background 160ms ease;
//     }

//     .search-select {
//       min-width: 150px;
//       padding: 13px 16px;
//       font-weight: 700;
//     }

//     .search-input {
//       flex: 1;
//       min-width: 240px;
//       padding: 13px 18px;
//       font-size: 16px;
//     }

//     .search-select:focus,
//     .search-input:focus {
//       border-color: ${colors.blue};
//       background: ${colors.glassStrong};
//     }

//     .search-button {
//       border: none;
//       border-radius: 16px;
//       padding: 0 24px;
//       background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
//       color: #fff;
//       font-weight: 800;
//       cursor: pointer;
//       box-shadow: 0 16px 30px rgba(79, 140, 255, 0.22);
//       transition: transform 160ms ease, box-shadow 160ms ease;
//     }

//     .search-button:hover:not(:disabled) {
//       transform: translateY(-2px);
//       box-shadow: 0 20px 36px rgba(79, 140, 255, 0.28);
//     }

//     .search-button:disabled {
//       cursor: wait;
//       opacity: 0.7;
//     }

//     .search-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//       gap: 24px;
//     }

//     .search-card {
//       background: ${colors.glass};
//       border: 1px solid ${colors.border};
//       border-radius: 26px;
//       backdrop-filter: blur(20px);
//       -webkit-backdrop-filter: blur(20px);
//       box-shadow: ${colors.shadow};
//       overflow: hidden;
//       transition: transform 180ms ease, box-shadow 180ms ease;
//       display: flex;
//       flex-direction: column;
//     }

//     .search-card:hover {
//       transform: translateY(-6px);
//       box-shadow: ${colors.shadowStrong};
//     }

//     .search-card-cover {
//       height: 96px;
//     }

//     .search-card-avatar-wrap {
//       margin-top: -46px;
//       display: flex;
//       justify-content: center;
//       position: relative;
//       z-index: 1;
//     }

//     .search-card-avatar {
//       width: 92px;
//       height: 92px;
//       border-radius: 999px;
//       border: 6px solid ${colors.glassStrong};
//       background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc);
//       color: #fff;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 36px;
//       font-weight: 800;
//       box-shadow: ${colors.shadow};
//     }

//     .search-card-content {
//       padding: 20px 22px;
//       text-align: center;
//       flex: 1;
//     }

//     .search-card-link {
//       color: ${colors.textMain};
//       font-size: 20px;
//       font-weight: 800;
//       text-decoration: none;
//     }

//     .search-card-link:hover {
//       color: ${colors.blue};
//     }

//     .search-chip {
//       display: inline-flex;
//       align-items: center;
//       margin: 4px;
//       padding: 7px 12px;
//       border-radius: 999px;
//       background: ${colors.accentGhost};
//       border: 1px solid ${colors.border};
//       color: ${colors.accent};
//       font-size: 12px;
//       font-weight: 700;
//     }

//     .search-actions-row {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       gap: 12px;
//       padding: 0 22px 22px;
//     }

//     .search-like-btn {
//       border-radius: 999px;
//       border: 1px solid ${colors.blue};
//       background: ${colors.primaryGhost};
//       color: ${colors.blue};
//       padding: 10px 18px;
//       font-weight: 800;
//       cursor: pointer;
//       transition: transform 160ms ease, background 160ms ease, color 160ms ease;
//     }

//     .search-like-btn:hover:not(:disabled) {
//       transform: translateY(-1px);
//       background: ${colors.blue};
//       color: #fff;
//     }

//     .search-like-btn:disabled {
//       border-color: transparent;
//       background: ${colors.glassSoft};
//       color: ${colors.textSecondary};
//       cursor: not-allowed;
//     }

//     @media (max-width: 720px) {
//       .search-page {
//         margin-top: 24px;
//       }

//       .search-panel {
//         padding: 22px;
//       }

//       .search-button {
//         min-height: 50px;
//         width: 100%;
//       }
//     }
//   `;

//   return (
//     <div className="search-page">
//       <style>{styleSheet}</style>

//       <div className="search-panel">
//         <h1 style={{ margin: '0 0 10px 0', fontSize: '30px', fontWeight: '800', color: colors.textMain }}>
//           Find Teammates
//         </h1>
//         <p style={{ margin: '0 0 24px 0', color: colors.textSecondary }}>
//           Search the network by skill, name, or username and discover the right people to build with.
//         </p>

//         <form className="search-form" onSubmit={handleSearch}>
//           <select className="search-select" value={searchType} onChange={(event) => setSearchType(event.target.value)}>
//             <option value="skill">By Skill</option>
//             <option value="name">By Name</option>
//             <option value="username">By Username</option>
//           </select>

//           <input
//             className="search-input"
//             type="text"
//             placeholder={searchType === 'skill' ? 'E.g., React, Node, UI Design...' : `Search by ${searchType}...`}
//             value={query}
//             onChange={(event) => setQuery(event.target.value)}
//           />

//           <button className="search-button" type="submit" disabled={loading}>
//             {loading ? 'Searching...' : 'Search'}
//           </button>
//         </form>
//       </div>

//       {error ? (
//         <p
//           style={{
//             color: colors.red,
//             textAlign: 'center',
//             fontWeight: '700',
//             padding: '18px 20px',
//             background: colors.dangerGhost,
//             borderRadius: '18px',
//             marginBottom: '22px',
//           }}
//         >
//           {error}
//         </p>
//       ) : null}

//       {/* ADDED: Event Attendee Alert Banner */}
//       {isEventFilter && !loading && !error && (
//         <div style={{
//           marginBottom: '24px', padding: '16px 20px', background: colors.primaryGhost,
//           border: `1px solid ${colors.blue}`, borderRadius: '16px', color: colors.blueStrong,
//           fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'
//         }}>
//           <span>👋 Showing {results.length} people interested in your selected event.</span>
//           <button 
//             onClick={clearEventFilter}
//             style={{
//               background: 'transparent', border: 'none', color: colors.blue, cursor: 'pointer',
//               textDecoration: 'underline', fontWeight: '700', fontSize: '14px'
//             }}
//           >
//             Clear Filter
//           </button>
//         </div>
//       )}

//       <div className="search-grid">
//         {results.map((result) => {
//           const hasLiked = result.likedBy && result.likedBy.includes(user?.username);
//           const isSelf = user && result.username === user.username;

//           return (
//             <div key={result.id || result.username} className="search-card">
              
//               <div className="search-card-cover" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
//                 {result.bannerPictureUrl ? (
//                   <img 
//                     src={result.bannerPictureUrl} 
//                     alt="Banner" 
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                   />
//                 ) : (
//                   <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${colors.blue}, #00c7fc 55%, ${colors.accent})` }} />
//                 )}
//               </div>
              
//               <div className="search-card-avatar-wrap">
//                 {result.profilePictureUrl ? (
//                   <img 
//                     src={result.profilePictureUrl} 
//                     alt="Avatar" 
//                     className="search-card-avatar" 
//                     style={{ objectFit: 'cover', background: '#fff', padding: 0 }} 
//                   />
//                 ) : (
//                   <div className="search-card-avatar">
//                     {(result.name || result.username).charAt(0).toUpperCase()}
//                   </div>
//                 )}
//               </div>

//               <div className="search-card-content">
//                 <Link to={`/profile/${result.username}`} className="search-card-link">
//                   {result.name || result.username}
//                 </Link>

//                 <p style={{ margin: '8px 0 16px 0', fontSize: '14px', color: colors.textSecondary, fontWeight: '600' }}>
//                   {result.branch || 'Independent'} • {result.college || 'Verified institution'}
//                 </p>

//                 <div style={{ marginBottom: '16px' }}>
//                   {result.skill && result.skill.length > 0 ? (
//                     result.skill.slice(0, 3).map((skill) => (
//                       <span key={`${result.username}-${skill}`} className="search-chip">
//                         {skill}
//                       </span>
//                     ))
//                   ) : (
//                     <span style={{ color: colors.textSecondary, fontSize: '12px' }}>Skillset hidden</span>
//                   )}
//                 </div>

//                 <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, fontWeight: '800' }}>
//                   👍 {result.likesReceived || 0} Endorsements
//                 </p>
//               </div>

//               <div className="search-actions-row">
//                 {!isSelf ? (
//                   <button
//                     className="search-like-btn"
//                     onClick={() => handleLike(result.username)}
//                     disabled={hasLiked}
//                   >
//                     {hasLiked ? 'Endorsed' : 'Endorse'}
//                   </button>
//                 ) : null}
//                 <ConnectionButton profileUser={result} />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {!loading && results.length === 0 && !error && !isEventFilter ? (
//         <div style={{ textAlign: 'center', padding: '100px 20px', opacity: 0.7 }}>
//           <span style={{ fontSize: '60px' }}>🔍</span>
//           <h3 style={{ color: colors.textSecondary }}>Search the network to find talent.</h3>
//         </div>
//       ) : null}
//     </div>
//   );
// }

import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // ADDED: useLocation & useNavigate
import { AuthContext } from '../context/AuthContext';
import { themePalette } from '../theme/palette';
import ConnectionButton from '../components/ConnectionButton';

export default function Search() {
  const { user, token } = useContext(AuthContext);
  const location = useLocation(); // ADDED
  const navigate = useNavigate(); // ADDED
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEventFilter, setIsEventFilter] = useState(false); // ADDED: To track if we are viewing event attendees

  const colors = themePalette;

  // --- INITIAL DATA LOAD (Event Attendees OR Default Random Users) ---
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!token) return;
      
      const queryParams = new URLSearchParams(location.search);
      const interestedUsernamesStr = queryParams.get('interested');

      setLoading(true);
      setError('');

      if (interestedUsernamesStr) {
        // SCENARIO 1: User came from an Event page
        setIsEventFilter(true);
        const usernameArray = interestedUsernamesStr.split(',');

        try {
          const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/users/batch', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ usernames: usernameArray })
          });
          
          if (response.ok) {
            const data = await response.json();
            setResults(Array.isArray(data) ? data : []);
          } else {
            throw new Error('Failed to fetch event teammates.');
          }
        } catch (err) {
          setError("Could not load teammates for this event.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        // SCENARIO 2: Normal Search page load (Fetch 10 default users)
        setIsEventFilter(false);
        try {
          // Reusing your algorithm endpoint to get 10 high-quality random profiles
          const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/suggested-teammates', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            const data = await response.json();
            setResults(Array.isArray(data) ? data : []);
          }
        } catch (err) {
          console.error("Failed to load default users", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInitialData();
  }, [location.search, token]);


  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);
    
    // Clear any event filters if the user does a manual search
    if (isEventFilter) {
      navigate('/search', { replace: true });
      setIsEventFilter(false);
    }

    try {
      let endpoint = '';
      if (searchType === 'name') endpoint = `/home/search-by-name/${query}`;
      if (searchType === 'skill') endpoint = `/home/search-by-skill/${query}`;
      if (searchType === 'username') endpoint = `/home/search-by-username/${query}`;

      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space${endpoint}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('No users found matching that criteria.');
      }

      const data = await response.json();
      setResults(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (targetUsername) => {
    try {
      const response = await fetch(
        `https://garvsharma9-teamfinder-api.hf.space/home/like/${targetUsername}?likerUsername=${user.username}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setResults((previousResults) =>
          previousResults.map((result) => {
            if (result.username !== targetUsername) return result;

            const updatedLikedBy = result.likedBy ? [...result.likedBy, user.username] : [user.username];
            return {
              ...result,
              likesReceived: (result.likesReceived || 0) + 1,
              likedBy: updatedLikedBy,
            };
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clearEventFilter = () => {
    navigate('/search', { replace: true });
    setResults([]);
    setIsEventFilter(false);
  };

  const styleSheet = `
    .search-page {
      max-width: 1100px;
      margin: 40px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      box-sizing: border-box;
    }

    .search-panel {
      background: ${colors.glass};
      border: 1px solid ${colors.border};
      border-radius: 28px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: ${colors.shadow};
      padding: 30px;
      margin-bottom: 34px;
      box-sizing: border-box;
    }

    .search-form {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    .search-select,
    .search-input {
      border-radius: 16px;
      border: 1px solid ${colors.border};
      background: ${colors.mutedSurface};
      color: ${colors.textMain};
      outline: none;
      transition: border-color 160ms ease, background 160ms ease;
      box-sizing: border-box; /* IMPORTANT: Keeps padding from breaking width */
    }

    .search-select {
      min-width: 150px;
      padding: 13px 16px;
      font-weight: 700;
    }

    .search-input {
      flex: 1;
      min-width: 240px;
      padding: 13px 18px;
      font-size: 16px;
    }

    .search-select:focus,
    .search-input:focus {
      border-color: ${colors.blue};
      background: ${colors.glassStrong};
    }

    .search-button {
      border: none;
      border-radius: 16px;
      padding: 0 24px;
      background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
      color: #fff;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 16px 30px rgba(79, 140, 255, 0.22);
      transition: transform 160ms ease, box-shadow 160ms ease;
      box-sizing: border-box;
    }

    .search-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 20px 36px rgba(79, 140, 255, 0.28);
    }

    .search-button:disabled {
      cursor: wait;
      opacity: 0.7;
    }

    .search-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .search-card {
      background: ${colors.glass};
      border: 1px solid ${colors.border};
      border-radius: 26px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: ${colors.shadow};
      overflow: hidden;
      transition: transform 180ms ease, box-shadow 180ms ease;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .search-card:hover {
      transform: translateY(-6px);
      box-shadow: ${colors.shadowStrong};
    }

    .search-card-cover {
      height: 96px;
    }

    .search-card-avatar-wrap {
      margin-top: -46px;
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .search-card-avatar {
      width: 92px;
      height: 92px;
      border-radius: 999px;
      border: 6px solid ${colors.glassStrong};
      background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: 800;
      box-shadow: ${colors.shadow};
    }

    .search-card-content {
      padding: 20px 22px;
      text-align: center;
      flex: 1;
    }

    .search-card-link {
      color: ${colors.textMain};
      font-size: 20px;
      font-weight: 800;
      text-decoration: none;
    }

    .search-card-link:hover {
      color: ${colors.blue};
    }

    .search-chip {
      display: inline-flex;
      align-items: center;
      margin: 4px;
      padding: 7px 12px;
      border-radius: 999px;
      background: ${colors.accentGhost};
      border: 1px solid ${colors.border};
      color: ${colors.accent};
      font-size: 12px;
      font-weight: 700;
    }

    .search-actions-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 0 22px 22px;
    }

    .search-like-btn {
      border-radius: 999px;
      border: 1px solid ${colors.blue};
      background: ${colors.primaryGhost};
      color: ${colors.blue};
      padding: 10px 18px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 160ms ease, background 160ms ease, color 160ms ease;
    }

    .search-like-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      background: ${colors.blue};
      color: #fff;
    }

    .search-like-btn:disabled {
      border-color: transparent;
      background: ${colors.glassSoft};
      color: ${colors.textSecondary};
      cursor: not-allowed;
    }

    /* --- MOBILE RESPONSIVE TWEAKS --- */
    @media (max-width: 720px) {
      .search-page {
        margin-top: 20px;
        padding: 0 12px;
      }

      .search-panel {
        padding: 20px 16px;
        border-radius: 24px;
      }

      /* Stack the form inputs on mobile */
      .search-form {
        flex-direction: column;
        gap: 10px;
      }

      .search-select, 
      .search-input, 
      .search-button {
        width: 100%;
        min-width: 0;
        min-height: 48px; /* Easier tapping */
      }

      .search-grid {
        grid-template-columns: 1fr;
      }

      /* Stack action buttons cleanly inside the cards */
      .search-actions-row {
        flex-direction: column;
        padding: 0 16px 20px;
        gap: 10px;
      }

      .search-like-btn {
        width: 100%;
        text-align: center;
      }

      /* Ensure the Connection Button component stretches if it can */
      .search-actions-row > * {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  `;

  return (
    <div className="search-page">
      <style>{styleSheet}</style>

      <div className="search-panel">
        <h1 style={{ margin: '0 0 10px 0', fontSize: '30px', fontWeight: '800', color: colors.textMain }}>
          Find Teammates
        </h1>
        <p style={{ margin: '0 0 24px 0', color: colors.textSecondary }}>
          Search the network by skill, name, or username and discover the right people to build with.
        </p>

        <form className="search-form" onSubmit={handleSearch}>
          <select className="search-select" value={searchType} onChange={(event) => setSearchType(event.target.value)}>
            <option value="skill">By Skill</option>
            <option value="name">By Name</option>
            <option value="username">By Username</option>
          </select>

          <input
            className="search-input"
            type="text"
            placeholder={searchType === 'skill' ? 'E.g., React, Node, UI Design...' : `Search by ${searchType}...`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <button className="search-button" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error ? (
        <p
          style={{
            color: colors.red,
            textAlign: 'center',
            fontWeight: '700',
            padding: '18px 20px',
            background: colors.dangerGhost,
            borderRadius: '18px',
            marginBottom: '22px',
          }}
        >
          {error}
        </p>
      ) : null}

      {/* Event Attendee Alert Banner */}
      {isEventFilter && !loading && !error && (
        <div style={{
          marginBottom: '24px', padding: '16px 20px', background: colors.primaryGhost,
          border: `1px solid ${colors.blue}`, borderRadius: '16px', color: colors.blueStrong,
          fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'
        }}>
          <span>👋 Showing {results.length} people interested in your selected event.</span>
          <button 
            onClick={clearEventFilter}
            style={{
              background: 'transparent', border: 'none', color: colors.blue, cursor: 'pointer',
              textDecoration: 'underline', fontWeight: '700', fontSize: '14px', padding: 0
            }}
          >
            Clear Filter
          </button>
        </div>
      )}

      <div className="search-grid">
        {results.map((result) => {
          const hasLiked = result.likedBy && result.likedBy.includes(user?.username);
          const isSelf = user && result.username === user.username;

          return (
            <div key={result.id || result.username} className="search-card">
              
              <div className="search-card-cover" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                {result.bannerPictureUrl ? (
                  <img 
                    src={result.bannerPictureUrl} 
                    alt="Banner" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${colors.blue}, #00c7fc 55%, ${colors.accent})` }} />
                )}
              </div>
              
              <div className="search-card-avatar-wrap">
                {result.profilePictureUrl ? (
                  <img 
                    src={result.profilePictureUrl} 
                    alt="Avatar" 
                    className="search-card-avatar" 
                    style={{ objectFit: 'cover', background: '#fff', padding: 0 }} 
                  />
                ) : (
                  <div className="search-card-avatar">
                    {(result.name || result.username).charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="search-card-content">
                <Link to={`/profile/${result.username}`} className="search-card-link">
                  {result.name || result.username}
                </Link>

                <p style={{ margin: '8px 0 16px 0', fontSize: '14px', color: colors.textSecondary, fontWeight: '600' }}>
                  {result.branch || 'Independent'} • {result.college || 'Verified institution'}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  {result.skill && result.skill.length > 0 ? (
                    result.skill.slice(0, 3).map((skill) => (
                      <span key={`${result.username}-${skill}`} className="search-chip">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: colors.textSecondary, fontSize: '12px' }}>Skillset hidden</span>
                  )}
                </div>

                <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, fontWeight: '800' }}>
                  👍 {result.likesReceived || 0} Endorsements
                </p>
              </div>

              <div className="search-actions-row">
                {!isSelf ? (
                  <button
                    className="search-like-btn"
                    onClick={() => handleLike(result.username)}
                    disabled={hasLiked}
                  >
                    {hasLiked ? 'Endorsed' : 'Endorse'}
                  </button>
                ) : null}
                <ConnectionButton profileUser={result} />
              </div>
            </div>
          );
        })}
      </div>

      {!loading && results.length === 0 && !error && !isEventFilter ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', opacity: 0.7 }}>
          <span style={{ fontSize: '60px' }}>🔍</span>
          <h3 style={{ color: colors.textSecondary }}>Search the network to find talent.</h3>
        </div>
      ) : null}
    </div>
  );
}