// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function Search() {
//   const { user, token } = useContext(AuthContext); 

//   const [query, setQuery] = useState('');
//   const [searchType, setSearchType] = useState('skill'); // Defaulting to skill as it's the most common search
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     setLoading(true);
//     setError('');
//     setResults([]);

//     try {
//       let endpoint = '';
//       if (searchType === 'name') endpoint = `/home/search-by-name/${query}`;
//       if (searchType === 'skill') endpoint = `/home/search-by-skill/${query}`;
//       if (searchType === 'username') endpoint = `/home/search-by-username/${query}`;

//       const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space${endpoint}`, {
//         method: 'GET',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (!response.ok) {
//         if (response.status === 404 || response.status === 500) {
//           throw new Error('No users found matching that criteria.');
//         }
//         throw new Error('Something went wrong with the search.');
//       }

//       const data = await response.json();

//       if (Array.isArray(data)) {
//         setResults(data);
//       } else if (data && typeof data === 'object') {
//         setResults([data]);
//       } else {
//         setResults([]);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async (targetUsername) => {
//     try {
//       const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/home/like/${targetUsername}?likerUsername=${user.username}`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         setResults((prevResults) =>
//           prevResults.map((r) => {
//             if (r.username === targetUsername) {
//               const updatedLikedBy = r.likedBy ? [...r.likedBy, user.username] : [user.username];
//               return {
//                 ...r,
//                 likesReceived: (r.likesReceived || 0) + 1,
//                 likedBy: updatedLikedBy,
//               };
//             }
//             return r;
//           })
//         );
//       } else {
//         alert('You have already liked this profile or an error occurred!');
//       }
//     } catch (error) {
//       console.error('Error liking profile:', error);
//     }
//   };

//   // --- INJECTED CSS FOR CARDS & HOVER EFFECTS ---
//   const styleSheet = `
//     .search-container { max-width: 1000px; margin: 30px auto; padding: 0 20px; font-family: Arial, sans-serif; }
    
//     .search-bar-card {
//       background-color: #fff;
//       padding: 20px;
//       border-radius: 10px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.08);
//       margin-bottom: 30px;
//       border: 1px solid #e0e0e0;
//     }

//     .grid-container {
//       display: grid;
//       grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//       gap: 20px;
//     }

//     .user-card {
//       background-color: #fff;
//       border-radius: 10px;
//       overflow: hidden;
//       border: 1px solid #e0e0e0;
//       box-shadow: 0 1px 3px rgba(0,0,0,0.05);
//       transition: transform 0.2s, box-shadow 0.2s;
//       display: flex;
//       flex-direction: column;
//     }
//     .user-card:hover {
//       transform: translateY(-4px);
//       box-shadow: 0 6px 12px rgba(0,0,0,0.1);
//     }

//     .cover-photo { height: 70px; background-color: #a0b4b7; }
    
//     .avatar-wrapper {
//       margin-top: -40px;
//       display: flex;
//       justify-content: center;
//     }
    
//     .avatar-circle {
//       width: 80px;
//       height: 80px;
//       border-radius: 50%;
//       background-color: #0a66c2;
//       color: #fff;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 32px;
//       font-weight: bold;
//       border: 4px solid #fff;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     }

//     .card-content { padding: 15px; text-align: center; flex-grow: 1; display: flex; flex-direction: column; }
    
//     .profile-link {
//       font-size: 18px;
//       font-weight: bold;
//       color: #000;
//       text-decoration: none;
//     }
//     .profile-link:hover { text-decoration: underline; color: #0a66c2; }

//     .skill-pill {
//       display: inline-block;
//       background-color: #f3f2ef;
//       color: #000;
//       padding: 4px 10px;
//       border-radius: 16px;
//       font-size: 12px;
//       font-weight: 600;
//       margin: 3px;
//     }

//     .btn-like {
//       width: calc(100% - 30px);
//       margin: 0 15px 15px 15px;
//       padding: 8px 0;
//       border-radius: 20px;
//       font-weight: bold;
//       border: 1px solid #0a66c2;
//       background-color: transparent;
//       color: #0a66c2;
//       cursor: pointer;
//       transition: all 0.2s;
//     }
//     .btn-like:hover { background-color: #e8f3ff; border-width: 2px; padding: 7px 0; }
//     .btn-like:disabled { border-color: #ccc; color: #888; background-color: #f3f2ef; cursor: not-allowed; }
//   `;

//   return (
//     <div className="search-container">
//       <style>{styleSheet}</style>

//       {/* --- SEARCH BAR SECTION --- */}
//       <div className="search-bar-card">
//         <h2 style={{ marginTop: 0, color: '#333' }}>Find Teammates</h2>
//         <form style={{ display: 'flex', gap: '10px' }} onSubmit={handleSearch}>
//           <select 
//             style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', backgroundColor: '#f9f9f9', fontWeight: 'bold', color: '#666' }} 
//             value={searchType} 
//             onChange={(e) => setSearchType(e.target.value)}
//           >
//             <option value="skill">By Skill</option>
//             <option value="name">By Name</option>
//             <option value="username">By Username</option>
//           </select>

//           <input
//             style={{ flex: 1, padding: '12px 16px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', fontSize: '15px' }}
//             type="text"
//             placeholder={searchType === 'skill' ? 'E.g., React, Java, Python...' : `Search by ${searchType}...`}
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button 
//             style={{ backgroundColor: '#0a66c2', color: '#fff', border: 'none', padding: '0 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }} 
//             type="submit"
//           >
//             Search
//           </button>
//         </form>
//       </div>

//       {loading && <p style={{ textAlign: 'center', color: '#666' }}>Searching network...</p>}
//       {error && <p style={{ color: '#d11124', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

//       {/* --- RESULTS GRID SECTION --- */}
//       <div className="grid-container">
//         {results.length > 0 ? (
//           results.map((result) => {
//             const hasLiked = result.likedBy && result.likedBy.includes(user?.username);
//             const isSelf = user && result.username === user.username;

//             return (
//               <div key={result.id || result.username} className="user-card">
                
//                 {/* Top Half: Cover Photo & Avatar */}
//                 <div className="cover-photo"></div>
//                 <div className="avatar-wrapper">
//                   <div className="avatar-circle">
//                     {(result.name || result.username).charAt(0).toUpperCase()}
//                   </div>
//                 </div>

//                 {/* Bottom Half: Info & Button */}
//                 <div className="card-content">
                  
//                   {/* Clickable Name navigating to Public Profile */}
//                   <Link to={`/profile/${result.username}`} className="profile-link">
//                     {result.name || result.username}
//                   </Link>
                  
//                   <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
//                     {result.branch || 'Branch N/A'} • {result.college || 'College N/A'}
//                   </p>
                  
//                   <div style={{ margin: '10px 0', flexGrow: 1 }}>
//                     {result.skill && result.skill.length > 0 ? (
//                       result.skill.slice(0, 4).map((s, idx) => ( // Show up to 4 skills
//                         <span key={idx} className="skill-pill">{s}</span>
//                       ))
//                     ) : (
//                       <span className="skill-pill" style={{ backgroundColor: 'transparent', color: '#888' }}>No skills listed</span>
//                     )}
//                   </div>
                  
//                   <p style={{ margin: '0', fontSize: '12px', color: '#888', fontWeight: 'bold' }}>
//                     👍 {result.likesReceived || 0} Endorsements
//                   </p>
//                 </div>

//                 {/* Connect/Like Button */}
//                 {!isSelf && (
//                   <button
//                     className="btn-like"
//                     onClick={() => handleLike(result.username)}
//                     disabled={hasLiked}
//                   >
//                     {hasLiked ? 'Endorsed ✓' : 'Endorse Profile 👍'}
//                   </button>
//                 )}
                
//               </div>
//             );
//           })
//         ) : (
//           !loading && !error && (
//             <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
//               <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🌐</span>
//               <h3>Expand Your Network</h3>
//               <p>Search for specific skills to find the perfect teammate for your next project.</p>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function Search() {
//   const { user, token } = useContext(AuthContext); 

//   const [query, setQuery] = useState('');
//   const [searchType, setSearchType] = useState('skill'); 
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // --- LOGIC PRESERVED EXACTLY ---
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;
//     setLoading(true);
//     setError('');
//     setResults([]);
//     try {
//       let endpoint = '';
//       if (searchType === 'name') endpoint = `/home/search-by-name/${query}`;
//       if (searchType === 'skill') endpoint = `/home/search-by-skill/${query}`;
//       if (searchType === 'username') endpoint = `/home/search-by-username/${query}`;

//       const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space${endpoint}`, {
//         method: 'GET',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (!response.ok) throw new Error('No users found matching that criteria.');
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
//       const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/home/like/${targetUsername}?likerUsername=${user.username}`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         setResults((prev) => prev.map((r) => {
//           if (r.username === targetUsername) {
//             const updatedLikedBy = r.likedBy ? [...r.likedBy, user.username] : [user.username];
//             return { ...r, likesReceived: (r.likesReceived || 0) + 1, likedBy: updatedLikedBy };
//           }
//           return r;
//         }));
//       }
//     } catch (error) { console.error(error); }
//   };

//   const colors = {
//     blue: '#007AFF',
//     orange: '#FF9500',
//     glass: 'rgba(255, 255, 255, 0.5)',
//     border: 'rgba(255, 255, 255, 0.3)',
//     textMain: '#1D1D1F',
//     textSecondary: '#86868B'
//   };

//   const styleSheet = `
//     .search-container { max-width: 1100px; margin: 40px auto; padding: 0 20px; font-family: -apple-system, sans-serif; }
    
//     .search-bar-card {
//       background: ${colors.glass};
//       backdrop-filter: blur(20px);
//       -webkit-backdrop-filter: blur(20px);
//       padding: 30px;
//       border-radius: 24px;
//       border: 1px solid ${colors.border};
//       box-shadow: 0 8px 32px rgba(0,0,0,0.05);
//       margin-bottom: 40px;
//     }

//     .search-form { display: flex; gap: 15px; }
//     @media (max-width: 600px) { .search-form { flex-direction: column; } }

//     .search-select {
//       padding: 12px 18px;
//       border-radius: 14px;
//       border: 1px solid rgba(0,0,0,0.1);
//       background: rgba(255,255,255,0.6);
//       font-weight: 600;
//       color: ${colors.textMain};
//       outline: none;
//     }

//     .search-input {
//       flex: 1;
//       padding: 12px 20px;
//       border-radius: 14px;
//       border: 1px solid rgba(0,0,0,0.1);
//       background: rgba(255,255,255,0.8);
//       font-size: 16px;
//       outline: none;
//       transition: border-color 0.2s;
//     }
//     .search-input:focus { border-color: ${colors.blue}; }

//     .btn-search {
//       background: ${colors.blue};
//       color: white;
//       border: none;
//       padding: 0 30px;
//       border-radius: 14px;
//       font-weight: 700;
//       cursor: pointer;
//       transition: all 0.3s ease;
//       box-shadow: 0 4px 12px rgba(0,122,255,0.2);
//     }
//     .btn-search:hover { transform: translateY(-2px); background: #0062CC; }

//     .grid-container {
//       display: grid;
//       grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//       gap: 25px;
//     }

//     .user-card {
//       background: ${colors.glass};
//       backdrop-filter: blur(15px);
//       border-radius: 24px;
//       border: 1px solid ${colors.border};
//       overflow: hidden;
//       box-shadow: 0 10px 30px rgba(0,0,0,0.04);
//       transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//       display: flex;
//       flex-direction: column;
//     }
//     .user-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(0,0,0,0.08); }

//     .cover-photo { height: 90px; background: linear-gradient(135deg, ${colors.blue}, #00C7FC); opacity: 0.8; }
    
//     .avatar-wrapper { margin-top: -45px; display: flex; justify-content: center; }
    
//     .avatar-circle {
//       width: 90px; height: 90px; border-radius: 50%;
//       background: linear-gradient(135deg, #00C7FC, ${colors.blue});
//       color: #fff; display: flex; align-items: center; justify-content: center;
//       font-size: 36px; font-weight: 800; border: 6px solid #fff;
//       box-shadow: 0 4px 15px rgba(0,0,0,0.1);
//     }

//     .card-content { padding: 20px; text-align: center; flex-grow: 1; }
    
//     .profile-link {
//       font-size: 20px; font-weight: 800; color: ${colors.textMain};
//       text-decoration: none; transition: color 0.2s;
//     }
//     .profile-link:hover { color: ${colors.blue}; }

//     .skill-pill {
//       display: inline-block;
//       background: rgba(255, 149, 0, 0.1);
//       color: ${colors.orange};
//       padding: 6px 12px;
//       border-radius: 12px;
//       font-size: 12px;
//       font-weight: 700;
//       margin: 4px;
//       border: 1px solid rgba(255, 149, 0, 0.1);
//     }

//     .btn-like {
//       width: calc(100% - 40px);
//       margin: 0 20px 20px 20px;
//       padding: 12px 0;
//       border-radius: 16px;
//       font-weight: 700;
//       border: 1px solid ${colors.blue};
//       background: rgba(0, 122, 255, 0.05);
//       color: ${colors.blue};
//       cursor: pointer;
//       transition: all 0.2s;
//     }
//     .btn-like:hover:not(:disabled) { background: ${colors.blue}; color: white; transform: scale(1.02); }
//     .btn-like:disabled { border-color: transparent; color: ${colors.textSecondary}; background: rgba(0,0,0,0.05); cursor: not-allowed; }
//   `;

//   return (
//     <div className="search-container">
//       <style>{styleSheet}</style>

//       <div className="search-bar-card">
//         <h1 style={{ margin: '0 0 20px 0', fontSize: '28px', fontWeight: '800' }}>Find Teammates</h1>
//         <form className="search-form" onSubmit={handleSearch}>
//           <select 
//             className="search-select"
//             value={searchType} 
//             onChange={(e) => setSearchType(e.target.value)}
//           >
//             <option value="skill">By Skill</option>
//             <option value="name">By Name</option>
//             <option value="username">By Username</option>
//           </select>

//           <input
//             className="search-input"
//             type="text"
//             placeholder={searchType === 'skill' ? 'E.g., React, Node, UI Design...' : `Search by ${searchType}...`}
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button className="btn-search" type="submit" disabled={loading}>
//             {loading ? '...' : 'Search'}
//           </button>
//         </form>
//       </div>

//       {error && <p style={{ color: '#FF3B30', textAlign: 'center', fontWeight: '700', padding: '20px', background: 'rgba(255,59,48,0.1)', borderRadius: '16px' }}>{error}</p>}

//       <div className="grid-container">
//         {results.map((result) => {
//           const hasLiked = result.likedBy && result.likedBy.includes(user?.username);
//           const isSelf = user && result.username === user.username;

//           return (
//             <div key={result.id || result.username} className="user-card">
//               <div className="cover-photo"></div>
//               <div className="avatar-wrapper">
//                 <div className="avatar-circle">
//                   {(result.name || result.username).charAt(0).toUpperCase()}
//                 </div>
//               </div>

//               <div className="card-content">
//                 <Link to={`/profile/${result.username}`} className="profile-link">
//                   {result.name || result.username}
//                 </Link>
                
//                 <p style={{ margin: '6px 0', fontSize: '14px', color: colors.textSecondary, fontWeight: '500' }}>
//                   {result.branch || 'Independent'} • {result.college || 'verified'}
//                 </p>
                
//                 <div style={{ margin: '15px 0' }}>
//                   {result.skill && result.skill.length > 0 ? (
//                     result.skill.slice(0, 3).map((s, idx) => (
//                       <span key={idx} className="skill-pill">{s}</span>
//                     ))
//                   ) : (
//                     <span style={{ color: colors.textSecondary, fontSize: '12px' }}>Skillset hidden</span>
//                   )}
//                 </div>
                
//                 <p style={{ margin: '0', fontSize: '13px', color: colors.textSecondary, fontWeight: '700' }}>
//                   👍 {result.likesReceived || 0} Endorsements
//                 </p>
//               </div>

//               {!isSelf && (
//                 <button
//                   className="btn-like"
//                   onClick={() => handleLike(result.username)}
//                   disabled={hasLiked}
//                 >
//                   {hasLiked ? '✓ Endorsed' : 'Endorse Profile'}
//                 </button>
//               )}
//             </div>
//           );
//         })}
//       </div>
      
//       {!loading && results.length === 0 && !error && (
//         <div style={{ textAlign: 'center', padding: '100px 20px', opacity: 0.6 }}>
//           <span style={{ fontSize: '60px' }}>🔍</span>
//           <h3 style={{ color: colors.textSecondary }}>Search the network to find talent.</h3>
//         </div>
//       )}
//     </div>
//   );
// }





import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Search() {
  const { user, token } = useContext(AuthContext); 

  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('skill'); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- LOGIC PRESERVED EXACTLY ---
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);
    try {
      let endpoint = '';
      if (searchType === 'name') endpoint = `/home/search-by-name/${query}`;
      if (searchType === 'skill') endpoint = `/home/search-by-skill/${query}`;
      if (searchType === 'username') endpoint = `/home/search-by-username/${query}`;

      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space${endpoint}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('No users found matching that criteria.');
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
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/home/like/${targetUsername}?likerUsername=${user.username}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setResults((prev) => prev.map((r) => {
          if (r.username === targetUsername) {
            const updatedLikedBy = r.likedBy ? [...r.likedBy, user.username] : [user.username];
            return { ...r, likesReceived: (r.likesReceived || 0) + 1, likedBy: updatedLikedBy };
          }
          return r;
        }));
      }
    } catch (error) { console.error(error); }
  };

  const colors = {
    blue: '#007AFF',
    orange: '#FF9500',
    glass: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255, 255, 0.3)',
    textMain: '#1D1D1F',
    textSecondary: '#86868B'
  };

  const styleSheet = `
    .search-container { max-width: 1100px; margin: 40px auto; padding: 0 20px; font-family: -apple-system, sans-serif; }
    
    .search-bar-card {
      background: ${colors.glass};
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 30px;
      border-radius: 24px;
      border: 1px solid ${colors.border};
      box-shadow: 0 8px 32px rgba(0,0,0,0.05);
      margin-bottom: 40px;
    }

    .search-form { display: flex; gap: 15px; }
    @media (max-width: 600px) { .search-form { flex-direction: column; } }

    .search-select {
      padding: 12px 18px;
      border-radius: 14px;
      border: 1px solid rgba(0,0,0,0.1);
      background: rgba(255,255,255,0.6);
      font-weight: 600;
      color: ${colors.textMain};
      outline: none;
    }

    .search-input {
      flex: 1;
      padding: 12px 20px;
      border-radius: 14px;
      border: 1px solid rgba(0,0,0,0.1);
      background: rgba(255,255,255,0.8);
      font-size: 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input:focus { border-color: ${colors.blue}; }

    .btn-search {
      background: ${colors.blue};
      color: white;
      border: none;
      padding: 0 30px;
      border-radius: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,122,255,0.2);
    }
    .btn-search:hover { transform: translateY(-2px); background: #0062CC; }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
    }

    .user-card {
      background: ${colors.glass};
      backdrop-filter: blur(15px);
      border-radius: 24px;
      border: 1px solid ${colors.border};
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .user-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(0,0,0,0.08); }

    .cover-photo { 
      height: 90px; 
      background: linear-gradient(135deg, ${colors.blue}, #00C7FC); 
      opacity: 0.8; 
      width: 100%;
    }
    
    .avatar-wrapper { 
      margin-top: -45px; 
      display: flex; 
      justify-content: center; 
      position: relative; 
      z-index: 2; 
    }
    
    .avatar-circle {
      width: 90px; height: 90px; border-radius: 50%;
      background: linear-gradient(135deg, #00C7FC, ${colors.blue});
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-size: 36px; font-weight: 800; border: 6px solid #fff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .card-content { 
      padding: 20px; 
      text-align: center; 
      flex-grow: 1; 
      position: relative;
      z-index: 1;
    }
    
    .profile-link {
      font-size: 20px; font-weight: 800; color: ${colors.textMain};
      text-decoration: none; transition: color 0.2s;
    }
    .profile-link:hover { color: ${colors.blue}; }

    .skill-pill {
      display: inline-block;
      background: rgba(255, 149, 0, 0.1);
      color: ${colors.orange};
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 700;
      margin: 4px;
      border: 1px solid rgba(255, 149, 0, 0.1);
    }

    .btn-like {
      width: calc(100% - 40px);
      margin: 0 20px 20px 20px;
      padding: 12px 0;
      border-radius: 16px;
      font-weight: 700;
      border: 1px solid ${colors.blue};
      background: rgba(0, 122, 255, 0.05);
      color: ${colors.blue};
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      z-index: 1;
    }
    .btn-like:hover:not(:disabled) { background: ${colors.blue}; color: white; transform: scale(1.02); }
    .btn-like:disabled { border-color: transparent; color: ${colors.textSecondary}; background: rgba(0,0,0,0.05); cursor: not-allowed; }
  `;

  return (
    <div className="search-container">
      <style>{styleSheet}</style>

      <div className="search-bar-card">
        <h1 style={{ margin: '0 0 20px 0', fontSize: '28px', fontWeight: '800' }}>Find Teammates</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <select 
            className="search-select"
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="skill">By Skill</option>
            <option value="name">By Name</option>
            <option value="username">By Username</option>
          </select>

          <input
            className="search-input"
            type="text"
            placeholder={searchType === 'skill' ? 'E.g., React, Node, UI Design...' : `Search by ${searchType}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-search" type="submit" disabled={loading}>
            {loading ? '...' : 'Search'}
          </button>
        </form>
      </div>

      {error && <p style={{ color: '#FF3B30', textAlign: 'center', fontWeight: '700', padding: '20px', background: 'rgba(255,59,48,0.1)', borderRadius: '16px' }}>{error}</p>}

      <div className="grid-container">
        {results.map((result) => {
          const hasLiked = result.likedBy && result.likedBy.includes(user?.username);
          const isSelf = user && result.username === user.username;

          return (
            <div key={result.id || result.username} className="user-card">
              <div className="cover-photo"></div>
              <div className="avatar-wrapper">
                <div className="avatar-circle">
                  {(result.name || result.username).charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="card-content">
                <Link to={`/profile/${result.username}`} className="profile-link">
                  {result.name || result.username}
                </Link>
                
                <p style={{ margin: '6px 0', fontSize: '14px', color: colors.textSecondary, fontWeight: '500' }}>
                  {result.branch || 'Independent'} • {result.college || 'verified'}
                </p>
                
                <div style={{ margin: '15px 0' }}>
                  {result.skill && result.skill.length > 0 ? (
                    result.skill.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="skill-pill">{s}</span>
                    ))
                  ) : (
                    <span style={{ color: colors.textSecondary, fontSize: '12px' }}>Skillset hidden</span>
                  )}
                </div>
                
                <p style={{ margin: '0', fontSize: '13px', color: colors.textSecondary, fontWeight: '700' }}>
                  👍 {result.likesReceived || 0} Endorsements
                </p>
              </div>

              {!isSelf && (
                <button
                  className="btn-like"
                  onClick={() => handleLike(result.username)}
                  disabled={hasLiked}
                >
                  {hasLiked ? '✓ Endorsed' : 'Endorse Profile'}
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      {!loading && results.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '100px 20px', opacity: 0.6 }}>
          <span style={{ fontSize: '60px' }}>🔍</span>
          <h3 style={{ color: colors.textSecondary }}>Search the network to find talent.</h3>
        </div>
      )}
    </div>
  );
}