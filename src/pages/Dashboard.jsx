// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export default function Dashboard() {
//   const { user, token, updateUser } = useContext(AuthContext);

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     bio: user?.bio || '',
//     branch: user?.branch || '',
//     college: user?.college || '',
//     experienceTag: user?.experienceTag || 'Beginner'
//   });
//   const [newSkill, setNewSkill] = useState('');

//   const handleSaveProfile = async () => {
//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
//         method: 'PUT',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` 
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         updateUser(formData); 
//         setIsEditing(false);
//         alert('Profile updated successfully in Database!');
//       } else {
//         // This will grab the exact error message from Spring Boot
//         const errText = await response.text(); 
//         alert(`Backend Error: ${response.status} - ${errText}`);
//       }
//     } catch (err) {
//       console.error("Network Error:", err);
//       alert('Network Error: Could not reach the server.');
//     }
//   };

//   const handleAddSkill = async () => {
//     if (!newSkill.trim()) return;
//     try {
//       // Assuming you have an endpoint like this, or you just update the whole user object
//       const currentSkills = user.skill || [];
//       const updatedSkills = [...currentSkills, newSkill.trim()];
      
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({ ...user, skill: updatedSkills })
//       });

//       if (response.ok) {
//         updateUser({ skill: updatedSkills });
//         setNewSkill('');
//       }
//     } catch (err) {
//       // Fallback for UI testing
//       updateUser({ skill: [...(user.skill || []), newSkill.trim()] });
//       setNewSkill('');
//     }
//   };

//   const handleRemoveSkill = async (skillToRemove) => {
//     const updatedSkills = (user.skill || []).filter(s => s !== skillToRemove);
//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({ ...user, skill: updatedSkills })
//       });
//       if (response.ok) updateUser({ skill: updatedSkills });
//     } catch (err) {
//       updateUser({ skill: updatedSkills }); // UI fallback
//     }
//   };

//   // --- INJECTED CSS ---
//   const styleSheet = `
//     .profile-wrapper { max-width: 800px; margin: 30px auto; padding: 0 20px; font-family: Arial, sans-serif; }
    
//     .profile-card {
//       background-color: #fff; border-radius: 12px; border: 1px solid #e0e0e0;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px; position: relative;
//     }

//     .cover-photo {
//       height: 140px; border-radius: 12px 12px 0 0;
//       background: linear-gradient(135deg, #a0b4b7 0%, #cbd6d8 100%);
//     }

//     .avatar-container { padding: 0 24px; display: flex; justify-content: space-between; align-items: flex-end; margin-top: -60px; margin-bottom: 15px; }
    
//     .main-avatar {
//       width: 130px; height: 130px; border-radius: 50%; border: 4px solid #fff;
//       background-color: #0a66c2; color: #fff; display: flex; align-items: center; justify-content: center;
//       font-size: 50px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     }

//     .btn-edit {
//       background-color: transparent; color: #0a66c2; border: 1px solid #0a66c2;
//       padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-bottom: 15px;
//     }
//     .btn-edit:hover { background-color: #e8f3ff; border-width: 2px; padding: 7px 15px; }

//     .btn-save { background-color: #0a66c2; color: #fff; border: none; padding: 8px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; }

//     .profile-info { padding: 0 24px 24px 24px; }
//     .profile-name { font-size: 24px; font-weight: bold; color: #111; margin: 0 0 5px 0; }
//     .profile-headline { font-size: 16px; color: #111; margin: 0 0 5px 0; }
//     .profile-sub { font-size: 14px; color: #666; margin: 0; }

//     .section-title { font-size: 20px; font-weight: bold; color: #111; margin: 0 0 15px 0; padding: 24px 24px 0 24px; }
//     .section-content { padding: 15px 24px 24px 24px; color: #444; line-height: 1.5; white-space: pre-wrap; font-size: 15px; }

//     .form-input { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; font-size: 14px; }
    
//     .skill-pill {
//       display: inline-flex; align-items: center; background-color: #0a66c2; color: #fff;
//       padding: 6px 14px; border-radius: 16px; font-size: 14px; font-weight: bold; margin: 0 8px 8px 0;
//     }
//     .btn-remove-skill { background: none; border: none; color: #fff; font-weight: bold; margin-left: 8px; cursor: pointer; font-size: 16px; line-height: 1; padding: 0; }
//     .btn-remove-skill:hover { color: #ffcccc; }
//   `;

//   if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Please log in.</div>;

//   return (
//     <div className="profile-wrapper">
//       <style>{styleSheet}</style>

//       {/* --- HEADER CARD --- */}
//       <div className="profile-card">
//         <div className="cover-photo"></div>
//         <div className="avatar-container">
//           <div className="main-avatar">{(user.name || user.username).charAt(0).toUpperCase()}</div>
//           {!isEditing ? (
//             <button className="btn-edit" onClick={() => setIsEditing(true)}>✎ Edit Profile</button>
//           ) : (
//             <button className="btn-save" onClick={handleSaveProfile}>Save Changes</button>
//           )}
//         </div>

//         <div className="profile-info">
//           {!isEditing ? (
//             <>
//               <h1 className="profile-name">{user.name || user.username}</h1>
//               <p className="profile-headline">{user.branch || 'Add your branch'} at {user.college || 'Add your college'}</p>
//               <p className="profile-sub">@{user.username} • {user.experienceTag || 'Beginner'} Level • 👍 {user.likesReceived || 0} Endorsements</p>
//             </>
//           ) : (
//             <div style={{ maxWidth: '400px' }}>
//               <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>Full Name</label>
//               <input className="form-input" type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              
//               <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>Branch / Role</label>
//               <input className="form-input" type="text" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} />
              
//               <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>College / Organization</label>
//               <input className="form-input" type="text" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} />
              
//               <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>Experience Level</label>
//               <select className="form-input" value={formData.experienceTag} onChange={e => setFormData({...formData, experienceTag: e.target.value})}>
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Pro">Pro</option>
//               </select>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- ABOUT CARD --- */}
//       <div className="profile-card">
//         <h2 className="section-title">About</h2>
//         <div className="section-content">
//           {!isEditing ? (
//             user.bio || 'Write a short bio to tell people about yourself and your goals.'
//           ) : (
//             <textarea className="form-input" style={{ minHeight: '100px' }} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="I am a passionate developer looking for..." />
//           )}
//         </div>
//       </div>

//       {/* --- SKILLS CARD --- */}
//       <div className="profile-card">
//         <h2 className="section-title">Skills</h2>
//         <div className="section-content">
//           <div style={{ marginBottom: '15px' }}>
//             {user.skill && user.skill.length > 0 ? (
//               user.skill.map((s, index) => (
//                 <span key={index} className="skill-pill">
//                   {s} 
//                   {isEditing && <button className="btn-remove-skill" onClick={() => handleRemoveSkill(s)}>×</button>}
//                 </span>
//               ))
//             ) : (
//               <p style={{ color: '#888', margin: 0 }}>No skills added yet.</p>
//             )}
//           </div>

//           {isEditing && (
//             <div style={{ display: 'flex', gap: '10px', maxWidth: '400px' }}>
//               <input className="form-input" style={{ marginBottom: 0 }} type="text" placeholder="Add a skill (e.g., React, Java)" value={newSkill} onChange={e => setNewSkill(e.target.value)} />
//               <button className="btn-save" onClick={handleAddSkill}>Add</button>
//             </div>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user, token, updateUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    branch: user?.branch || '',
    college: user?.college || '',
    experienceTag: user?.experienceTag || 'Beginner'
  });
  const [newSkill, setNewSkill] = useState('');

  // --- LOGIC PRESERVED (fetch, handleSave, handleAdd, handleRemove) ---
  const handleSaveProfile = async () => {
    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
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
      console.error("Network Error:", err);
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
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...user, skill: updatedSkills })
      });

      if (response.ok) {
        updateUser({ skill: updatedSkills });
        setNewSkill('');
      }
    } catch (err) {
      updateUser({ skill: [...(user.skill || []), newSkill.trim()] }); // Fallback
      setNewSkill('');
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    const updatedSkills = (user.skill || []).filter(s => s !== skillToRemove);
    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...user, skill: updatedSkills })
      });
      if (response.ok) updateUser({ skill: updatedSkills });
    } catch (err) {
      updateUser({ skill: updatedSkills }); // Fallback
    }
  };

  // --- REWRITTEN GLASSY CSS ---
  const styleSheet = `
    /* Overall Aesthetic */
    .profile-wrapper { 
      max-width: 900px; 
      margin: 40px auto; 
      padding: 0 20px; 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
      color: #1D1D1F; 
    }
    
    /* Transparent Card (Apple Glassy) */
/* Updated CSS sections to fix overlapping */

.profile-card {
  background: rgba(255, 255, 255, 0.5); 
  border-radius: 24px; 
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px); 
  -webkit-backdrop-filter: blur(20px); 
  box-shadow: 0 10px 40px rgba(0,0,0,0.06); 
  margin-bottom: 30px; 
  overflow: hidden; /* This ensures the cover photo doesn't bleed out */
  position: relative;
}

.cover-photo {
  height: 180px; 
  background: linear-gradient(135deg, #007AFF 0%, #FF9500 100%); 
  width: 100%;
  display: block;
}

.avatar-container { 
  padding: 0 32px; 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-end; /* Changed to flex-end for better alignment */
  margin-top: -65px; 
  margin-bottom: 25px; 
  position: relative; /* Added relative positioning */
  z-index: 10;        /* Ensures it sits on top of the cover photo */
}

.main-avatar {
  width: 130px; 
  height: 130px; 
  border-radius: 50%; 
  border: 6px solid rgba(255, 255, 255, 1); /* Solid white border for separation */
  background: linear-gradient(135deg, #007AFF 0%, #00C7FC 100%); 
  color: #fff; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-size: 50px; 
  font-weight: 800; 
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  position: relative;
}

    /* Primary Actions (Save/Edit) - Glassy Blue */
    .btn-action {
      background: rgba(0, 122, 255, 0.7); 
      color: #fff; 
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 12px 24px; 
      border-radius: 16px; 
      font-weight: 600; 
      cursor: pointer; 
      backdrop-filter: blur(10px);
      transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(0,122,255,0.3);
      font-size: 14px;
    }
    .btn-action:hover { background: rgba(0, 122, 255, 0.9); transform: translateY(-2px); }
    .btn-action:active { transform: translateY(1px); }

    /* Secondary Action (Add Skill) */
    .btn-secondary {
      background: rgba(255, 255, 255, 0.4); 
      color: #007AFF; 
      border: 1px solid rgba(0, 122, 255, 0.2);
      padding: 12px 24px; 
      border-radius: 16px; 
      font-weight: 600; 
      cursor: pointer; 
      backdrop-filter: blur(10px);
      transition: all 0.2s ease;
      font-size: 14px;
    }
    .btn-secondary:hover { background: rgba(0, 122, 255, 0.1); }

    .profile-info { padding: 0 32px 32px 32px; }
    .profile-name { font-size: 28px; font-weight: 800; color: #1D1D1F; margin: 0 0 8px 0; }
    .profile-headline { font-size: 17px; color: #1D1D1F; margin: 0 0 8px 0; font-weight: 500; }
    .profile-sub { font-size: 14px; color: #86868B; margin: 0; display: flex; gap: 6px; align-items: center; }

    .section-title { font-size: 22px; font-weight: 700; color: #1D1D1F; margin: 0; padding: 32px 32px 0 32px; }
    .section-content { padding: 20px 32px 32px 32px; color: #1D1D1F; line-height: 1.6; font-size: 16px; }

    /* Forms with blurring background */
    .form-input { 
      width: 100%; 
      padding: 14px; 
      margin-bottom: 16px; 
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 14px; 
      box-sizing: border-box; 
      font-size: 15px; 
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(5px);
      color: #1D1D1F;
    }
    .form-input:focus { border-color: #007AFF; outline: none; background: rgba(255, 255, 255, 0.5); }
    
    /* Skill Pills - Glassy Orange */
    .skill-pill {
      display: inline-flex; 
      align-items: center; 
      background: rgba(255, 149, 0, 0.8); 
      color: #fff;
      padding: 8px 16px; 
      border-radius: 16px; 
      font-size: 14px; 
      font-weight: 600; 
      margin: 0 10px 10px 0;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 10px rgba(255,149,0,0.3);
    }
    .btn-remove-skill { background: none; border: none; color: #fff; font-weight: bold; margin-left: 10px; cursor: pointer; font-size: 18px; padding: 0; opacity: 0.7; }
    .btn-remove-skill:hover { opacity: 1; transform: scale(1.1); }
  `;

  if (!user) return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#86868B' }}>Please sign in to view your dashboard.</div>;

  return (
    <div className="profile-wrapper">
      <style>{styleSheet}</style>

      {/* --- HEADER CARD --- */}
      <div className="profile-card">
        <div className="cover-photo"></div>
        <div className="avatar-container">
          <div className="main-avatar">{(user.name || user.username).charAt(0).toUpperCase()}</div>
          {!isEditing ? (
            <button className="btn-action" onClick={() => setIsEditing(true)}>✎ Edit Profile</button>
          ) : (
            <button className="btn-action" onClick={handleSaveProfile}>✓ Save Changes</button>
          )}
        </div>

        <div className="profile-info">
          {!isEditing ? (
            <>
              <h1 className="profile-name">{user.name || user.username}</h1>
              <p className="profile-headline">{user.branch || 'Specify Branch'} • {user.college || 'Add College'}</p>
              <p className="profile-sub">
                <span>@{user.username}</span> • 
                <span style={{color: '#FF9500', fontWeight: 600}}>{user.experienceTag || 'Beginner'} Level</span> • 
                <span style={{color: '#34C759'}}>👍 {user.likesReceived || 0} Endorsements</span>
              </p>
            </>
          ) : (
            <div style={{ maxWidth: '400px', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#86868B', marginBottom: '4px', display: 'block' }}>Full Name</label>
              <input className="form-input" type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#86868B', marginBottom: '4px', display: 'block' }}>Branch / Specialization</label>
              <input className="form-input" type="text" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} />
              
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#86868B', marginBottom: '4px', display: 'block' }}>College / University</label>
              <input className="form-input" type="text" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} />
              
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#86868B', marginBottom: '4px', display: 'block' }}>Expertise Level</label>
              <select className="form-input" value={formData.experienceTag} onChange={e => setFormData({...formData, experienceTag: e.target.value})}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* --- ABOUT CARD --- */}
      <div className="profile-card">
        <h2 className="section-title">About Me</h2>
        <div className="section-content">
          {!isEditing ? (
            <span style={{ color: (user.bio ? '#1D1D1F' : '#86868B') }}>
              {user.bio || 'Share a bit about your journey, tech interests, or collaboration goals...'}
            </span>
          ) : (
            <textarea className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="I am passionate about building..." />
          )}
        </div>
      </div>

      {/* --- SKILLS CARD --- */}
      <div className="profile-card">
        <h2 className="section-title">Tech Stack & Skills</h2>
        <div className="section-content">
          <div style={{ marginBottom: isEditing ? '20px' : '0' }}>
            {user.skill && user.skill.length > 0 ? (
              user.skill.map((s, index) => (
                <span key={index} className="skill-pill">
                  {s} 
                  {isEditing && <button className="btn-remove-skill" onClick={() => handleRemoveSkill(s)}>×</button>}
                </span>
              ))
            ) : (
              <p style={{ color: '#86868B', margin: 0 }}>No skills highlighted yet.</p>
            )}
          </div>

          {isEditing && (
            <div style={{ display: 'flex', gap: '12px', maxWidth: '450px', background: 'rgba(255,149,0,0.1)', padding: '10px', borderRadius: '16px' }}>
              <input className="form-input" style={{ marginBottom: 0, flex: 1 }} type="text" placeholder="e.g., React, Go, Docker" value={newSkill} onChange={e => setNewSkill(e.target.value)} />
              <button className="btn-secondary" onClick={handleAddSkill}>+ Add</button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}