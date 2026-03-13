// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { themePalette } from '../theme/palette';

// export default function Dashboard() {
//   const { user, token, updateUser } = useContext(AuthContext);
//   const colors = themePalette;

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     bio: user?.bio || '',
//     branch: user?.branch || '',
//     college: user?.college || '',
//     experienceTag: user?.experienceTag || 'Beginner',
//   });
//   const [newSkill, setNewSkill] = useState('');

//   const handleSaveProfile = async () => {
//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         updateUser(formData);
//         setIsEditing(false);
//         alert('Profile updated successfully!');
//       } else {
//         const errText = await response.text();
//         alert(`Backend Error: ${response.status} - ${errText}`);
//       }
//     } catch (err) {
//       console.error('Network Error:', err);
//       alert('Network Error: Could not reach the server.');
//     }
//   };

//   const handleAddSkill = async () => {
//     if (!newSkill.trim()) return;

//     try {
//       const currentSkills = user.skill || [];
//       const updatedSkills = [...currentSkills, newSkill.trim()];

//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...user, skill: updatedSkills }),
//       });

//       if (response.ok) {
//         updateUser({ skill: updatedSkills });
//         setNewSkill('');
//       }
//     } catch (err) {
//       updateUser({ skill: [...(user.skill || []), newSkill.trim()] });
//       setNewSkill('');
//     }
//   };

//   const handleRemoveSkill = async (skillToRemove) => {
//     const updatedSkills = (user.skill || []).filter((skill) => skill !== skillToRemove);

//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...user, skill: updatedSkills }),
//       });

//       if (response.ok) {
//         updateUser({ skill: updatedSkills });
//       }
//     } catch (err) {
//       updateUser({ skill: updatedSkills });
//     }
//   };

//   const styleSheet = `
//     .dashboard-page {
//       max-width: 920px;
//       margin: 38px auto;
//       padding: 0 20px;
//       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
//     }

//     .dashboard-card {
//       background: ${colors.glass};
//       border: 1px solid ${colors.border};
//       border-radius: 30px;
//       backdrop-filter: blur(24px);
//       -webkit-backdrop-filter: blur(24px);
//       box-shadow: ${colors.shadow};
//       overflow: hidden;
//       margin-bottom: 24px;
//     }

//     .dashboard-cover {
//       height: 190px;
//       background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc 55%, ${colors.accent});
//     }

//     .dashboard-avatar-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-end;
//       gap: 16px;
//       padding: 0 30px;
//       margin-top: -66px;
//       margin-bottom: 24px;
//       position: relative;
//       z-index: 1;
//     }

//     .dashboard-avatar {
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

//     .dashboard-action {
//       border: none;
//       border-radius: 18px;
//       padding: 12px 18px;
//       font-weight: 800;
//       cursor: pointer;
//       color: #fff;
//       background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
//       box-shadow: 0 16px 28px rgba(79, 140, 255, 0.22);
//       transition: transform 160ms ease, box-shadow 160ms ease;
//     }

//     .dashboard-action:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 22px 34px rgba(79, 140, 255, 0.28);
//     }

//     .dashboard-section-title {
//       margin: 0;
//       padding: 30px 30px 0;
//       font-size: 22px;
//       font-weight: 800;
//       color: ${colors.textMain};
//     }

//     .dashboard-section-body {
//       padding: 18px 30px 30px;
//       color: ${colors.textMain};
//       line-height: 1.7;
//     }

//     .dashboard-form-shell {
//       max-width: 440px;
//       padding: 18px;
//       border-radius: 22px;
//       background: ${colors.glassSoft};
//       border: 1px solid ${colors.border};
//     }

//     .dashboard-label {
//       display: block;
//       margin-bottom: 6px;
//       color: ${colors.textSecondary};
//       font-size: 12px;
//       font-weight: 800;
//       letter-spacing: 0.04em;
//       text-transform: uppercase;
//     }

//     .dashboard-input,
//     .dashboard-textarea,
//     .dashboard-select {
//       width: 100%;
//       border-radius: 16px;
//       border: 1px solid ${colors.border};
//       background: ${colors.mutedSurface};
//       color: ${colors.textMain};
//       outline: none;
//       padding: 14px 16px;
//       font-size: 15px;
//       margin-bottom: 14px;
//       box-sizing: border-box;
//       transition: border-color 160ms ease, background 160ms ease;
//     }

//     .dashboard-input:focus,
//     .dashboard-textarea:focus,
//     .dashboard-select:focus {
//       border-color: ${colors.blue};
//       background: ${colors.glassStrong};
//     }

//     .dashboard-textarea {
//       min-height: 130px;
//       resize: vertical;
//     }

//     .dashboard-skill {
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

//     .dashboard-skill-remove {
//       border: none;
//       background: transparent;
//       color: inherit;
//       margin-left: 8px;
//       cursor: pointer;
//       font-size: 16px;
//       font-weight: 800;
//       padding: 0;
//     }
//   `;

//   if (!user) {
//     return <div style={{ textAlign: 'center', marginTop: '50px', color: colors.textSecondary }}>Please sign in to view your dashboard.</div>;
//   }

//   return (
//     <div className="dashboard-page">
//       <style>{styleSheet}</style>

//       <div className="dashboard-card">
//         <div className="dashboard-cover" />
//         <div className="dashboard-avatar-row">
//           <div className="dashboard-avatar">{(user.name || user.username).charAt(0).toUpperCase()}</div>
//           {!isEditing ? (
//             <button className="dashboard-action" type="button" onClick={() => setIsEditing(true)}>
//               Edit Profile
//             </button>
//           ) : (
//             <button className="dashboard-action" type="button" onClick={handleSaveProfile}>
//               Save Changes
//             </button>
//           )}
//         </div>

//         <div style={{ padding: '0 30px 30px' }}>
//           {!isEditing ? (
//             <>
//               <h1 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: '900', color: colors.textMain }}>
//                 {user.name || user.username}
//               </h1>
//               <p style={{ margin: '0 0 8px 0', fontSize: '17px', color: colors.textMain, fontWeight: '600' }}>
//                 {user.branch || 'Specify Branch'} • {user.college || 'Add College'}
//               </p>
//               <p style={{ margin: 0, color: colors.textSecondary, fontWeight: '700' }}>
//                 @{user.username} • <span style={{ color: colors.accent }}>{user.experienceTag || 'Beginner'} Level</span> •{' '}
//                 <span style={{ color: colors.green }}>👍 {user.likesReceived || 0} Endorsements</span>
//               </p>
//             </>
//           ) : (
//             <div className="dashboard-form-shell">
//               <label className="dashboard-label">Full Name</label>
//               <input
//                 className="dashboard-input"
//                 type="text"
//                 value={formData.name}
//                 onChange={(event) => setFormData({ ...formData, name: event.target.value })}
//               />

//               <label className="dashboard-label">Branch / Specialization</label>
//               <input
//                 className="dashboard-input"
//                 type="text"
//                 value={formData.branch}
//                 onChange={(event) => setFormData({ ...formData, branch: event.target.value })}
//               />

//               <label className="dashboard-label">College / University</label>
//               <input
//                 className="dashboard-input"
//                 type="text"
//                 value={formData.college}
//                 onChange={(event) => setFormData({ ...formData, college: event.target.value })}
//               />

//               <label className="dashboard-label">Expertise Level</label>
//               <select
//                 className="dashboard-select"
//                 value={formData.experienceTag}
//                 onChange={(event) => setFormData({ ...formData, experienceTag: event.target.value })}
//               >
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Pro">Pro</option>
//               </select>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="dashboard-card">
//         <h2 className="dashboard-section-title">About Me</h2>
//         <div className="dashboard-section-body">
//           {!isEditing ? (
//             <span style={{ color: user.bio ? colors.textMain : colors.textSecondary }}>
//               {user.bio || 'Share a bit about your journey, tech interests, or collaboration goals...'}
//             </span>
//           ) : (
//             <textarea
//               className="dashboard-textarea"
//               value={formData.bio}
//               onChange={(event) => setFormData({ ...formData, bio: event.target.value })}
//               placeholder="I am passionate about building..."
//             />
//           )}
//         </div>
//       </div>

//       <div className="dashboard-card">
//         <h2 className="dashboard-section-title">Tech Stack & Skills</h2>
//         <div className="dashboard-section-body">
//           <div style={{ marginBottom: isEditing ? '18px' : 0 }}>
//             {user.skill && user.skill.length > 0 ? (
//               user.skill.map((skill) => (
//                 <span key={`${user.username}-${skill}`} className="dashboard-skill">
//                   {skill}
//                   {isEditing ? (
//                     <button
//                       className="dashboard-skill-remove"
//                       type="button"
//                       onClick={() => handleRemoveSkill(skill)}
//                     >
//                       ×
//                     </button>
//                   ) : null}
//                 </span>
//               ))
//             ) : (
//               <p style={{ margin: 0, color: colors.textSecondary }}>No skills highlighted yet.</p>
//             )}
//           </div>

//           {isEditing ? (
//             <div className="dashboard-form-shell" style={{ maxWidth: '480px' }}>
//               <label className="dashboard-label">Add Another Skill</label>
//               <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
//                 <input
//                   className="dashboard-input"
//                   style={{ flex: 1, marginBottom: 0, minWidth: '220px' }}
//                   type="text"
//                   placeholder="e.g., React, Go, Docker"
//                   value={newSkill}
//                   onChange={(event) => setNewSkill(event.target.value)}
//                 />
//                 <button className="dashboard-action" type="button" onClick={handleAddSkill}>
//                   Add Skill
//                 </button>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { themePalette } from '../theme/palette';
import { Camera, Loader2 } from 'lucide-react'; // Added icons for the upload buttons

export default function Dashboard() {
  const { user, token, updateUser } = useContext(AuthContext);
  const colors = themePalette;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    branch: user?.branch || '',
    college: user?.college || '',
    experienceTag: user?.experienceTag || 'Beginner',
  });
  const [newSkill, setNewSkill] = useState('');

  // --- NEW: Image Upload State & Refs ---
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      if (type === 'avatar') setIsUploadingAvatar(true);
      else setIsUploadingBanner(true);

      const endpoint = type === 'avatar' ? '/user/upload-avatar' : '/user/upload-banner';

      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // NO Content-Type header here! The browser sets it automatically for FormData
        },
        body: uploadData
      });

      if (!response.ok) {
        // This will grab the exact error text from Spring Boot
        const errorText = await response.text(); 
        console.error("Server says:", errorText);
        throw new Error(errorText);
      }
      const data = await response.json();

      // Update the global user context immediately so the image appears
      if (type === 'avatar') {
        updateUser({ profilePictureUrl: data.url });
      } else {
        updateUser({ bannerPictureUrl: data.url });
      }
      
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      if (type === 'avatar') setIsUploadingAvatar(false);
      else setIsUploadingBanner(false);
      // Clear the input so you can upload the same file again if needed
      event.target.value = null; 
    }
  };
  // --------------------------------------

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        updateUser(formData);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        const errText = await response.text();
        alert(`Backend Error: ${response.status} - ${errText}`);
      }
    } catch (err) {
      console.error('Network Error:', err);
      alert('Network Error: Could not reach the server.');
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const currentSkills = user.skill || [];
      const updatedSkills = [...currentSkills, newSkill.trim()];

      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, skill: updatedSkills }),
      });

      if (response.ok) {
        updateUser({ skill: updatedSkills });
        setNewSkill('');
      }
    } catch (err) {
      updateUser({ skill: [...(user.skill || []), newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    const updatedSkills = (user.skill || []).filter((skill) => skill !== skillToRemove);

    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, skill: updatedSkills }),
      });

      if (response.ok) {
        updateUser({ skill: updatedSkills });
      }
    } catch (err) {
      updateUser({ skill: updatedSkills });
    }
  };

  const styleSheet = `
    .dashboard-page {
      max-width: 920px;
      margin: 38px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .dashboard-card {
      background: ${colors.glass};
      border: 1px solid ${colors.border};
      border-radius: 30px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: ${colors.shadow};
      overflow: hidden;
      margin-bottom: 24px;
    }

    .dashboard-cover {
      height: 190px;
      background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc 55%, ${colors.accent});
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .dashboard-cover-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0);
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 16px;
      transition: background 0.3s;
    }

    .dashboard-cover:hover .dashboard-cover-overlay {
      background: rgba(0,0,0,0.2);
    }

    .upload-btn {
      background: rgba(255,255,255,0.8);
      border: none;
      border-radius: 50%;
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: #333;
      transition: all 0.2s;
    }

    .upload-btn:hover {
      background: #fff;
      transform: scale(1.05);
    }

    .dashboard-avatar-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      padding: 0 30px;
      margin-top: -66px;
      margin-bottom: 24px;
      position: relative;
      z-index: 1;
    }

    .dashboard-avatar {
      width: 132px;
      height: 132px;
      border-radius: 999px;
      border: 6px solid ${colors.glassStrong};
      background: linear-gradient(135deg, ${colors.blueStrong}, #00c7fc);
      background-size: cover;
      background-position: center;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      font-weight: 800;
      box-shadow: ${colors.shadowStrong};
      position: relative;
      overflow: hidden;
    }

    .dashboard-avatar-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.3s;
      cursor: pointer;
      color: white;
    }

    .dashboard-avatar:hover .dashboard-avatar-overlay {
      background: rgba(0,0,0,0.4);
      opacity: 1;
    }

    .spin-icon {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .dashboard-action {
      border: none;
      border-radius: 18px;
      padding: 12px 18px;
      font-weight: 800;
      cursor: pointer;
      color: #fff;
      background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
      box-shadow: 0 16px 28px rgba(79, 140, 255, 0.22);
      transition: transform 160ms ease, box-shadow 160ms ease;
    }

    .dashboard-action:hover {
      transform: translateY(-2px);
      box-shadow: 0 22px 34px rgba(79, 140, 255, 0.28);
    }

    .dashboard-section-title {
      margin: 0;
      padding: 30px 30px 0;
      font-size: 22px;
      font-weight: 800;
      color: ${colors.textMain};
    }

    .dashboard-section-body {
      padding: 18px 30px 30px;
      color: ${colors.textMain};
      line-height: 1.7;
    }

    .dashboard-form-shell {
      max-width: 440px;
      padding: 18px;
      border-radius: 22px;
      background: ${colors.glassSoft};
      border: 1px solid ${colors.border};
    }

    .dashboard-label {
      display: block;
      margin-bottom: 6px;
      color: ${colors.textSecondary};
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .dashboard-input,
    .dashboard-textarea,
    .dashboard-select {
      width: 100%;
      border-radius: 16px;
      border: 1px solid ${colors.border};
      background: ${colors.mutedSurface};
      color: ${colors.textMain};
      outline: none;
      padding: 14px 16px;
      font-size: 15px;
      margin-bottom: 14px;
      box-sizing: border-box;
      transition: border-color 160ms ease, background 160ms ease;
    }

    .dashboard-input:focus,
    .dashboard-textarea:focus,
    .dashboard-select:focus {
      border-color: ${colors.blue};
      background: ${colors.glassStrong};
    }

    .dashboard-textarea {
      min-height: 130px;
      resize: vertical;
    }

    .dashboard-skill {
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

    .dashboard-skill-remove {
      border: none;
      background: transparent;
      color: inherit;
      margin-left: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 800;
      padding: 0;
    }
  `;

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: colors.textSecondary }}>Please sign in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard-page">
      <style>{styleSheet}</style>

      {/* HIDDEN FILE INPUTS */}
      <input 
        type="file" 
        accept="image/*" 
        ref={avatarInputRef} 
        onChange={(e) => handleFileUpload(e, 'avatar')} 
        style={{ display: 'none' }}
      />
      <input 
        type="file" 
        accept="image/*" 
        ref={bannerInputRef} 
        onChange={(e) => handleFileUpload(e, 'banner')} 
        style={{ display: 'none' }}
      />

      <div className="dashboard-card">
        {/* BANNER SECTION */}
        <div 
          className="dashboard-cover" 
          style={user.bannerPictureUrl ? { backgroundImage: `url(${user.bannerPictureUrl})` } : {}}
        >
          <div className="dashboard-cover-overlay">
            <button 
              className="upload-btn" 
              onClick={() => bannerInputRef.current.click()}
              disabled={isUploadingBanner}
              title="Change Banner Image"
            >
              {isUploadingBanner ? <Loader2 className="spin-icon" size={20} /> : <Camera size={20} />}
            </button>
          </div>
        </div>

        <div className="dashboard-avatar-row">
          {/* AVATAR SECTION */}
          <div 
            className="dashboard-avatar"
            style={user.profilePictureUrl ? { backgroundImage: `url(${user.profilePictureUrl})` } : {}}
          >
            {/* Show initials ONLY if there is no profile picture */}
            {!user.profilePictureUrl && (user.name || user.username).charAt(0).toUpperCase()}
            
            <div 
              className="dashboard-avatar-overlay" 
              onClick={() => !isUploadingAvatar && avatarInputRef.current.click()}
              title="Change Profile Picture"
            >
              {isUploadingAvatar ? <Loader2 className="spin-icon" size={28} /> : <Camera size={28} />}
            </div>
          </div>

          {!isEditing ? (
            <button className="dashboard-action" type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <button className="dashboard-action" type="button" onClick={handleSaveProfile}>
              Save Changes
            </button>
          )}
        </div>

        <div style={{ padding: '0 30px 30px' }}>
          {!isEditing ? (
            <>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '30px', fontWeight: '900', color: colors.textMain }}>
                {user.name || user.username}
              </h1>
              <p style={{ margin: '0 0 8px 0', fontSize: '17px', color: colors.textMain, fontWeight: '600' }}>
                {user.branch || 'Specify Branch'} • {user.college || 'Add College'}
              </p>
              <p style={{ margin: 0, color: colors.textSecondary, fontWeight: '700' }}>
                @{user.username} • <span style={{ color: colors.accent }}>{user.experienceTag || 'Beginner'} Level</span> •{' '}
                <span style={{ color: colors.green || '#10b981' }}>👍 {user.likesReceived || 0} Endorsements</span>
              </p>
            </>
          ) : (
            <div className="dashboard-form-shell">
              <label className="dashboard-label">Full Name</label>
              <input
                className="dashboard-input"
                type="text"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              />

              <label className="dashboard-label">Branch / Specialization</label>
              <input
                className="dashboard-input"
                type="text"
                value={formData.branch}
                onChange={(event) => setFormData({ ...formData, branch: event.target.value })}
              />

              <label className="dashboard-label">College / University</label>
              <input
                className="dashboard-input"
                type="text"
                value={formData.college}
                onChange={(event) => setFormData({ ...formData, college: event.target.value })}
              />

              <label className="dashboard-label">Expertise Level</label>
              <select
                className="dashboard-select"
                value={formData.experienceTag}
                onChange={(event) => setFormData({ ...formData, experienceTag: event.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-section-title">About Me</h2>
        <div className="dashboard-section-body">
          {!isEditing ? (
            <span style={{ color: user.bio ? colors.textMain : colors.textSecondary }}>
              {user.bio || 'Share a bit about your journey, tech interests, or collaboration goals...'}
            </span>
          ) : (
            <textarea
              className="dashboard-textarea"
              value={formData.bio}
              onChange={(event) => setFormData({ ...formData, bio: event.target.value })}
              placeholder="I am passionate about building..."
            />
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-section-title">Tech Stack & Skills</h2>
        <div className="dashboard-section-body">
          <div style={{ marginBottom: isEditing ? '18px' : 0 }}>
            {user.skill && user.skill.length > 0 ? (
              user.skill.map((skill) => (
                <span key={`${user.username}-${skill}`} className="dashboard-skill">
                  {skill}
                  {isEditing ? (
                    <button
                      className="dashboard-skill-remove"
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ×
                    </button>
                  ) : null}
                </span>
              ))
            ) : (
              <p style={{ margin: 0, color: colors.textSecondary }}>No skills highlighted yet.</p>
            )}
          </div>

          {isEditing ? (
            <div className="dashboard-form-shell" style={{ maxWidth: '480px' }}>
              <label className="dashboard-label">Add Another Skill</label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  className="dashboard-input"
                  style={{ flex: 1, marginBottom: 0, minWidth: '220px' }}
                  type="text"
                  placeholder="e.g., React, Go, Docker"
                  value={newSkill}
                  onChange={(event) => setNewSkill(event.target.value)}
                />
                <button className="dashboard-action" type="button" onClick={handleAddSkill}>
                  Add Skill
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}