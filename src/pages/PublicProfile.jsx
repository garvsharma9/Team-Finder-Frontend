// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { themePalette } from '../theme/palette';

// export default function PublicProfile() {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const { token } = useContext(AuthContext);
//   const colors = themePalette;

//   const [profileUser, setProfileUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/home/search-by-username/${username}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!response.ok) throw new Error('User not found');

//         const data = await response.json();
//         setProfileUser(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchProfile();
//     }
//   }, [username, token]);

//   const styleSheet = `
//     .public-profile-page {
//       max-width: 920px;
//       margin: 38px auto;
//       padding: 0 20px;
//       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
//     }

//     .public-profile-card {
//       background: ${colors.glass};
//       border: 1px solid ${colors.border};
//       border-radius: 30px;
//       backdrop-filter: blur(24px);
//       -webkit-backdrop-filter: blur(24px);
//       box-shadow: ${colors.shadow};
//       overflow: hidden;
//       margin-bottom: 24px;
//     }

//     .public-back-button {
//       border: 1px solid ${colors.border};
//       border-radius: 18px;
//       background: ${colors.glassSoft};
//       color: ${colors.textMain};
//       padding: 12px 18px;
//       font-weight: 800;
//       cursor: pointer;
//       margin-bottom: 22px;
//       transition: transform 160ms ease, background 160ms ease;
//     }

//     .public-back-button:hover {
//       transform: translateX(-2px);
//       background: ${colors.glassStrong};
//     }

//     .public-cover {
//       height: 190px;
//       background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc 55%, ${colors.accent});
//     }

//     .public-avatar-row {
//       display: flex;
//       align-items: flex-end;
//       padding: 0 30px;
//       margin-top: -66px;
//       margin-bottom: 22px;
//       position: relative;
//       z-index: 1;
//     }

//     .public-avatar {
//       width: 132px;
//       height: 132px;
//       border-radius: 999px;
//       border: 6px solid ${colors.glassStrong};
//       background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc);
//       color: #fff;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 52px;
//       font-weight: 800;
//       box-shadow: ${colors.shadowStrong};
//     }

//     .public-section-title {
//       margin: 0;
//       padding: 30px 30px 0;
//       font-size: 22px;
//       font-weight: 800;
//       color: ${colors.textMain};
//     }

//     .public-section-body {
//       padding: 18px 30px 30px;
//       color: ${colors.textMain};
//       line-height: 1.7;
//     }

//     .public-skill-chip {
//       display: inline-flex;
//       align-items: center;
//       padding: 8px 14px;
//       margin: 0 10px 10px 0;
//       border-radius: 999px;
//       background: ${colors.accentGhost};
//       border: 1px solid ${colors.border};
//       color: ${colors.accent};
//       font-size: 13px;
//       font-weight: 800;
//     }
//   `;

//   if (loading) {
//     return <div style={{ textAlign: 'center', marginTop: '100px', color: colors.textSecondary }}>Loading profile...</div>;
//   }

//   if (error) {
//     return <div style={{ textAlign: 'center', marginTop: '100px', color: colors.red }}>{error}</div>;
//   }

//   if (!profileUser) return null;

//   return (
//     <div className="public-profile-page">
//       <style>{styleSheet}</style>

//       <button className="public-back-button" type="button" onClick={() => navigate(-1)}>
//         ← Back to Search
//       </button>

//       <div className="public-profile-card">
//         <div className="public-cover" />
//         <div className="public-avatar-row">
//           <div className="public-avatar">{(profileUser.name || profileUser.username).charAt(0).toUpperCase()}</div>
//         </div>

//         <div style={{ padding: '0 30px 30px' }}>
//           <h1 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: '900', color: colors.textMain }}>
//             {profileUser.name || profileUser.username}
//           </h1>
//           <p style={{ margin: '0 0 8px 0', fontSize: '17px', color: colors.textMain, fontWeight: '600' }}>
//             {profileUser.branch || 'Independent Contributor'} • {profileUser.college || 'Verified Institution'}
//           </p>
//           <p style={{ margin: 0, color: colors.textSecondary, fontWeight: '700' }}>
//             @{profileUser.username} • <span style={{ color: colors.accent }}>{profileUser.experienceTag || 'Beginner'} Level</span> •{' '}
//             <span style={{ color: colors.green }}>👍 {profileUser.likesReceived || 0} Endorsements</span>
//           </p>
//         </div>
//       </div>

//       <div className="public-profile-card">
//         <h2 className="public-section-title">About</h2>
//         <div className="public-section-body" style={{ color: profileUser.bio ? colors.textMain : colors.textSecondary }}>
//           {profileUser.bio || 'This user prefers to let their skills do the talking. No bio provided.'}
//         </div>
//       </div>

//       <div className="public-profile-card">
//         <h2 className="public-section-title">Expertise</h2>
//         <div className="public-section-body">
//           {profileUser.skill && profileUser.skill.length > 0 ? (
//             profileUser.skill.map((skill) => (
//               <span key={`${profileUser.username}-${skill}`} className="public-skill-chip">
//                 {skill}
//               </span>
//             ))
//           ) : (
//             <p style={{ margin: 0, color: colors.textSecondary }}>No technical skills listed yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { themePalette } from '../theme/palette';
import ConnectionButton from '../components/ConnectionButton';

export default function PublicProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const colors = themePalette;

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // CHANGED TO LOCALHOST
        const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/home/search-by-username/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('User not found');

        const data = await response.json();
        setProfileUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [username, token]);

  const styleSheet = `
    .public-profile-page {
      max-width: 920px;
      margin: 38px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .public-profile-card {
      background: ${colors.glass};
      border: 1px solid ${colors.border};
      border-radius: 30px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: ${colors.shadow};
      overflow: hidden;
      margin-bottom: 24px;
    }

    .public-back-button {
      border: 1px solid ${colors.border};
      border-radius: 18px;
      background: ${colors.glassSoft};
      color: ${colors.textMain};
      padding: 12px 18px;
      font-weight: 800;
      cursor: pointer;
      margin-bottom: 22px;
      transition: transform 160ms ease, background 160ms ease;
    }

    .public-back-button:hover {
      transform: translateX(-2px);
      background: ${colors.glassStrong};
    }

    .public-cover {
      height: 190px;
    }

    .public-avatar-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 30px;
      margin-top: -66px;
      margin-bottom: 22px;
      position: relative;
      z-index: 1;
    }

    .public-avatar {
      width: 132px;
      height: 132px;
      border-radius: 999px;
      border: 6px solid ${colors.glassStrong};
      background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      font-weight: 800;
      box-shadow: ${colors.shadowStrong};
    }

    .public-section-title {
      margin: 0;
      padding: 30px 30px 0;
      font-size: 22px;
      font-weight: 800;
      color: ${colors.textMain};
    }

    .public-section-body {
      padding: 18px 30px 30px;
      color: ${colors.textMain};
      line-height: 1.7;
    }

    .public-skill-chip {
      display: inline-flex;
      align-items: center;
      padding: 8px 14px;
      margin: 0 10px 10px 0;
      border-radius: 999px;
      background: ${colors.accentGhost};
      border: 1px solid ${colors.border};
      color: ${colors.accent};
      font-size: 13px;
      font-weight: 800;
    }
  `;

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: colors.textSecondary }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '100px', color: colors.red }}>{error}</div>;
  }

  if (!profileUser) return null;

  return (
    <div className="public-profile-page">
      <style>{styleSheet}</style>

      <button className="public-back-button" type="button" onClick={() => navigate(-1)}>
        ← Back to Search
      </button>

      <div className="public-profile-card">
        <div className="public-cover" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
          {profileUser.bannerPictureUrl ? (
            <img 
              src={profileUser.bannerPictureUrl} 
              alt="Banner" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${colors.blueStrong}, #00c7fc 55%, ${colors.accent})` }} />
          )}
        </div>

        <div className="public-avatar-row">
          {profileUser.profilePictureUrl ? (
            <img 
              src={profileUser.profilePictureUrl} 
              alt="Avatar" 
              className="public-avatar" 
              style={{ objectFit: 'cover', background: '#fff', padding: 0 }} 
            />
          ) : (
            <div className="public-avatar">
              {(profileUser.name || profileUser.username).charAt(0).toUpperCase()}
            </div>
          )}
          
          <ConnectionButton profileUser={profileUser} />
        </div>

        <div style={{ padding: '0 30px 30px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: '900', color: colors.textMain }}>
            {profileUser.name || profileUser.username}
          </h1>
          <p style={{ margin: '0 0 8px 0', fontSize: '17px', color: colors.textMain, fontWeight: '600' }}>
            {profileUser.branch || 'Independent Contributor'} • {profileUser.college || 'Verified Institution'}
          </p>
          <p style={{ margin: 0, color: colors.textSecondary, fontWeight: '700' }}>
            @{profileUser.username} • <span style={{ color: colors.accent }}>{profileUser.experienceTag || 'Beginner'} Level</span> •{' '}
            <span style={{ color: colors.green || '#10b981' }}>👍 {profileUser.likesReceived || 0} Endorsements</span>
          </p>
        </div>
      </div>

      <div className="public-profile-card">
        <h2 className="public-section-title">About</h2>
        <div className="public-section-body" style={{ color: profileUser.bio ? colors.textMain : colors.textSecondary }}>
          {profileUser.bio || 'This user prefers to let their skills do the talking. No bio provided.'}
        </div>
      </div>

      <div className="public-profile-card">
        <h2 className="public-section-title">Expertise</h2>
        <div className="public-section-body">
          {profileUser.skill && profileUser.skill.length > 0 ? (
            profileUser.skill.map((skill) => (
              <span key={`${profileUser.username}-${skill}`} className="public-skill-chip">
                {skill}
              </span>
            ))
          ) : (
            <p style={{ margin: 0, color: colors.textSecondary }}>No technical skills listed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}