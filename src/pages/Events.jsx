// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export default function Events() {
//   const { user, token } = useContext(AuthContext);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     heading: '',
//     date: '',
//     description: '',
//     maxTeamSize: '',
//     prizePool: '',
//     venue: '',
//     clubName: '',
//   });

//   const colors = themePalette;
//   const isPresident =
//     user && user.roles && (user.roles.includes('PRESIDENT') || user.roles.includes('ROLE_PRESIDENT'));

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/events/all', {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error('Failed to fetch events');

//       const data = await response.json();
//       setEvents(data.reverse());
//     } catch (err) {
//       setError('Could not load events. Is the server running?');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchEvents();
//     }
//   }, [token]);

//   const handleCreateEvent = async (event) => {
//     event.preventDefault();
//     setIsSubmitting(true);

//     const eventPayload = { ...formData, postedBy: user.username };

//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/events/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(eventPayload),
//       });

//       if (response.ok) {
//         setFormData({
//           heading: '',
//           date: '',
//           description: '',
//           maxTeamSize: '',
//           prizePool: '',
//           venue: '',
//           clubName: '',
//         });
//         setShowForm(false);
//         fetchEvents();
//       } else {
//         alert('Failed to create event.');
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteEvent = async (eventId) => {
//     if (!window.confirm('Are you sure you want to delete this official event?')) return;

//     try {
//       const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/events/delete/${eventId}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.ok) {
//         setEvents((previousEvents) => previousEvents.filter((event) => event.id !== eventId));
//       } else {
//         alert('Failed to delete event.');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const formatDateBlock = (dateString) => {
//     if (!dateString) return { month: 'TBD', day: '-' };
//     const dateObject = new Date(dateString);
//     return {
//       month: dateObject.toLocaleString('default', { month: 'short' }).toUpperCase(),
//       day: dateObject.getDate(),
//     };
//   };

//   // --- REWRITTEN GLASSY UI STYLES ---
//   const styleSheet = `
//     .events-page {
//       max-width: 920px;
//       margin: 36px auto;
//       padding: 0 20px;
//       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
//     }

//     .events-header {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       gap: 16px;
//       margin-bottom: 28px;
//       flex-wrap: wrap;
//     }

//     .events-button {
//       border: none;
//       border-radius: 18px;
//       padding: 12px 20px;
//       font-weight: 800;
//       cursor: pointer;
//       color: #fff;
//       background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
//       box-shadow: 0 14px 28px rgba(79, 140, 255, 0.24);
//       transition: transform 160ms ease, box-shadow 160ms ease;
//     }

//     .events-button:hover:not(:disabled) {
//       transform: translateY(-2px);
//       box-shadow: 0 20px 34px rgba(79, 140, 255, 0.28);
//     }

//     .events-form,
//     .events-card,
//     .events-empty {
//       background: ${colors.glass};
//       border: 1px solid ${colors.border};
//       border-radius: 28px;
//       backdrop-filter: blur(24px);
//       -webkit-backdrop-filter: blur(24px);
//       box-shadow: ${colors.shadow};
//     }

//     .events-form {
//       padding: 28px;
//       margin-bottom: 28px;
//     }

//     .events-input,
//     .events-textarea {
//       width: 100%;
//       border-radius: 16px;
//       border: 1px solid ${colors.border};
//       background: ${colors.mutedSurface};
//       color: ${colors.textMain};
//       outline: none;
//       padding: 14px 16px;
//       font-size: 15px;
//       transition: border-color 160ms ease, background 160ms ease;
//       resize: vertical;
//     }

//     .events-input:focus,
//     .events-textarea:focus {
//       border-color: ${colors.blue};
//       background: ${colors.glassStrong};
//     }

//     .events-row {
//       display: grid;
//       grid-template-columns: repeat(2, minmax(0, 1fr));
//       gap: 12px;
//       margin-top: 12px;
//     }

//     .events-row-three {
//       display: grid;
//       grid-template-columns: repeat(3, minmax(0, 1fr));
//       gap: 12px;
//       margin-top: 12px;
//     }

//     .events-card {
//       margin-bottom: 22px;
//       overflow: hidden;
//       transition: transform 180ms ease, box-shadow 180ms ease;
//     }

//     .events-card:hover {
//       transform: translateY(-5px);
//       box-shadow: ${colors.shadowStrong};
//     }

//     .events-card-bar {
//       height: 6px;
//       background: linear-gradient(90deg, ${colors.blueStrong}, #00c7fc, ${colors.accent});
//     }

//     .events-card-body {
//       display: flex;
//       gap: 18px;
//       padding: 24px;
//     }

//     .events-date {
//       min-width: 82px;
//       height: 88px;
//       border-radius: 20px;
//       border: 1px solid ${colors.border};
//       background: ${colors.glassStrong};
//       box-shadow: ${colors.shadow};
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//     }

//     .events-date-month {
//       font-size: 12px;
//       font-weight: 800;
//       color: ${colors.red};
//       letter-spacing: 0.08em;
//     }

//     .events-date-day {
//       font-size: 30px;
//       font-weight: 800;
//       color: ${colors.textMain};
//       margin-top: 2px;
//     }

//     .events-badges {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin: 16px 0;
//     }

//     .events-badge {
//       display: inline-flex;
//       align-items: center;
//       padding: 8px 14px;
//       border-radius: 999px;
//       background: ${colors.primaryGhost};
//       border: 1px solid ${colors.border};
//       color: ${colors.blue};
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .events-card-footer {
//       padding: 16px 24px 22px;
//       border-top: 1px solid ${colors.border};
//       background: ${colors.glassSoft};
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       gap: 16px;
//       flex-wrap: wrap;
//     }

//     .events-danger {
//       border: 1px solid rgba(255, 123, 141, 0.22);
//       border-radius: 16px;
//       padding: 10px 16px;
//       background: ${colors.dangerGhost};
//       color: ${colors.red};
//       font-weight: 800;
//       cursor: pointer;
//       transition: transform 160ms ease, background 160ms ease;
//     }

//     .events-danger:hover {
//       transform: translateY(-1px);
//       background: rgba(255, 123, 141, 0.22);
//     }

//     .events-empty {
//       text-align: center;
//       padding: 62px 24px;
//     }

//     @media (max-width: 720px) {
//       .events-row,
//       .events-row-three {
//         grid-template-columns: 1fr;
//       }

//       .events-card-body {
//         flex-direction: column;
//       }
//     }
//   `;

//   return (
//     <div className="events-page">
//       <style>{styleSheet}</style>

//       <div className="events-header">
//         <div>
//           <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', color: colors.textMain }}>Campus Events</h1>
//           <p style={{ margin: '8px 0 0 0', color: colors.textSecondary }}>
//             Official hackathons, competitions, and club activities from your campus ecosystem.
//           </p>
//         </div>

//         {isPresident ? (
//           <button className="events-button" type="button" onClick={() => setShowForm(!showForm)}>
//             {showForm ? 'Close Form' : 'Host New Event'}
//           </button>
//         ) : null}
//       </div>

//       {isPresident && showForm ? (
//         <div className="events-form">
//           <h3 style={{ marginTop: 0, marginBottom: '20px', color: colors.textMain, fontSize: '22px' }}>Event Details</h3>
//           <form onSubmit={handleCreateEvent}>
//             <input
//               className="events-input"
//               type="text"
//               placeholder="Event Heading"
//               required
//               value={formData.heading}
//               onChange={(event) => setFormData({ ...formData, heading: event.target.value })}
//             />

//             <div className="events-row">
//               <input
//                 className="events-input"
//                 type="date"
//                 required
//                 value={formData.date}
//                 onChange={(event) => setFormData({ ...formData, date: event.target.value })}
//               />
//               <input
//                 className="events-input"
//                 type="text"
//                 placeholder="Club Name"
//                 required
//                 value={formData.clubName}
//                 onChange={(event) => setFormData({ ...formData, clubName: event.target.value })}
//               />
//             </div>

//             <div className="events-row-three">
//               <input
//                 className="events-input"
//                 type="text"
//                 placeholder="Venue"
//                 required
//                 value={formData.venue}
//                 onChange={(event) => setFormData({ ...formData, venue: event.target.value })}
//               />
//               <input
//                 className="events-input"
//                 type="text"
//                 placeholder="Prize Pool"
//                 required
//                 value={formData.prizePool}
//                 onChange={(event) => setFormData({ ...formData, prizePool: event.target.value })}
//               />
//               <input
//                 className="events-input"
//                 type="number"
//                 placeholder="Team Size"
//                 required
//                 value={formData.maxTeamSize}
//                 onChange={(event) => setFormData({ ...formData, maxTeamSize: event.target.value })}
//               />
//             </div>

//             <textarea
//               className="events-textarea"
//               placeholder="Rules & requirements..."
//               style={{ minHeight: '120px', marginTop: '12px' }}
//               required
//               value={formData.description}
//               onChange={(event) => setFormData({ ...formData, description: event.target.value })}
//             />

//             <button className="events-button" type="submit" disabled={isSubmitting} style={{ width: '100%', marginTop: '16px' }}>
//               {isSubmitting ? 'Publishing...' : 'Publish Official Event'}
//             </button>
//           </form>
//         </div>
//       ) : null}

//       {loading ? <p style={{ textAlign: 'center', color: colors.textSecondary, fontSize: '18px' }}>Syncing events...</p> : null}
//       {error ? (
//         <p
//           style={{
//             color: colors.red,
//             textAlign: 'center',
//             padding: '18px 20px',
//             background: colors.dangerGhost,
//             borderRadius: '18px',
//           }}
//         >
//           {error}
//         </p>
//       ) : null}

//       {events.length > 0 ? (
//         events.map((event) => {
//           const { month, day } = formatDateBlock(event.date);

//           return (
//             <div key={event.id} className="events-card">
//               <div className="events-card-bar" />

//               <div className="events-card-body">
//                 <div className="events-date">
//                   <span className="events-date-month">{month}</span>
//                   <span className="events-date-day">{day}</span>
//                 </div>

//                 <div style={{ flex: 1 }}>
//                   <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: colors.textMain }}>
//                     {event.heading}
//                   </h2>
//                   <p style={{ margin: 0, color: colors.textSecondary }}>
//                     Organized by <span style={{ color: colors.blue, fontWeight: '700' }}>{event.clubName}</span>
//                   </p>

//                   <div className="events-badges">
//                     <span className="events-badge">📍 {event.venue}</span>
//                     <span className="events-badge">👥 Team Size: {event.maxTeamSize}</span>
//                     <span className="events-badge" style={{ background: colors.accentGhost, color: colors.accent }}>
//                       🏆 {event.prizePool}
//                     </span>
//                   </div>

//                   <p style={{ margin: 0, color: colors.textMain, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
//                     {event.description}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                
//                 <button 
//                   onClick={() => handleLikeEvent(event.id)}
//                   className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                     event.like?.includes(user?.username) 
//                       ? 'bg-blue-50 text-blue-600' 
//                       : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
//                   }`}
//                 >
//                   <ThumbsUp className="w-4 h-4" />
//                   <span>{event.like?.length || 0}</span>
//                 </button>

//                 <button 
//                   onClick={() => handleDislikeEvent(event.id)}
//                   className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                     event.dislike?.includes(user?.username) 
//                       ? 'bg-red-50 text-red-600' 
//                       : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
//                   }`}
//                 >
//                   <ThumbsDown className="w-4 h-4" />
//                   <span>{event.dislike?.length || 0}</span>
//                 </button>

//               </div>


//               <div className="events-card-footer">
//                 <span style={{ fontSize: '12px', color: colors.textSecondary, fontWeight: '700' }}>
//                   Posted by <strong style={{ color: colors.textMain }}>@{event.postedBy}</strong>
//                 </span>

//                 {isPresident ? (
//                   <button className="events-danger" type="button" onClick={() => handleDeleteEvent(event.id)}>
//                     Remove Event
//                   </button>
//                 ) : null}
//               </div>
//             </div>
//           );
//         })
//       ) : !loading ? (
//         <div className="events-empty">
//           <span style={{ fontSize: '50px', display: 'block', marginBottom: '18px' }}>🗓️</span>
//           <h3 style={{ margin: '0 0 10px 0', color: colors.textMain, fontSize: '22px' }}>No Upcoming Events</h3>
//           <p style={{ color: colors.textSecondary, margin: 0 }}>
//             The campus is quiet for now. Stay tuned for future hackathons!
//           </p>
//         </div>
//       ) : null}
//     </div>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThumbsUp, ThumbsDown } from 'lucide-react'; // ADDED: Icon imports!

export default function Events() {
  const { user, token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    date: '',
    description: '',
    maxTeamSize: '',
    prizePool: '',
    venue: '',
    clubName: '',
  });

  // ADDED: Reconstructed the missing color palette!
  const colors = {
    blue: '#0a66c2',
    blueStrong: '#004182',
    glass: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px rgba(0,0,0,0.06)',
    shadowStrong: '0 20px 60px rgba(0,0,0,0.12)',
    mutedSurface: '#f3f2ef',
    textMain: '#111827',
    textSecondary: '#6b7280',
    glassStrong: 'rgba(255, 255, 255, 0.9)',
    red: '#ef4444',
    accent: '#f59e0b',
    primaryGhost: 'rgba(10, 102, 194, 0.1)',
    accentGhost: 'rgba(245, 158, 11, 0.1)',
    glassSoft: 'rgba(255, 255, 255, 0.4)',
    dangerGhost: 'rgba(239, 68, 68, 0.1)'
  };

  const isPresident =
    user && user.roles && (user.roles.includes('PRESIDENT') || user.roles.includes('ROLE_PRESIDENT'));

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/events/all', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch events');

      const data = await response.json();
      setEvents(data.reverse());
    } catch (err) {
      setError('Could not load events. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  // ADDED: Missing Like Function
  const handleLikeEvent = async (eventId) => {
    if (!user) return; 
    setEvents(prevEvents => prevEvents.map(evt => {
      if (evt.id === eventId) {
        const hasLiked = evt.like?.includes(user.username);
        let newLike = evt.like || [];
        let newDislike = evt.dislike || [];

        if (hasLiked) {
          newLike = newLike.filter(name => name !== user.username);
        } else {
          newLike = [...newLike, user.username];
          newDislike = newDislike.filter(name => name !== user.username);
        }
        return { ...evt, like: newLike, dislike: newDislike };
      }
      return evt;
    }));

    try {
      await fetch(`https://garvsharma9-teamfinder-api.hf.space/events/${eventId}/like?username=${user.username}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to like event", err);
    }
  };

  // ADDED: Missing Dislike Function
  const handleDislikeEvent = async (eventId) => {
    if (!user) return; 
    setEvents(prevEvents => prevEvents.map(evt => {
      if (evt.id === eventId) {
        const hasDisliked = evt.dislike?.includes(user.username);
        let newLike = evt.like || [];
        let newDislike = evt.dislike || [];

        if (hasDisliked) {
          newDislike = newDislike.filter(name => name !== user.username);
        } else {
          newDislike = [...newDislike, user.username];
          newLike = newLike.filter(name => name !== user.username);
        }
        return { ...evt, like: newLike, dislike: newDislike };
      }
      return evt;
    }));

    try {
      await fetch(`https://garvsharma9-teamfinder-api.hf.space/events/${eventId}/dislike?username=${user.username}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to dislike event", err);
    }
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const eventPayload = { ...formData, postedBy: user.username };

    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/events/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventPayload),
      });

      if (response.ok) {
        setFormData({
          heading: '',
          date: '',
          description: '',
          maxTeamSize: '',
          prizePool: '',
          venue: '',
          clubName: '',
        });
        setShowForm(false);
        fetchEvents();
      } else {
        alert('Failed to create event.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this official event?')) return;

    try {
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/events/delete/${eventId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setEvents((previousEvents) => previousEvents.filter((event) => event.id !== eventId));
      } else {
        alert('Failed to delete event.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDateBlock = (dateString) => {
    if (!dateString) return { month: 'TBD', day: '-' };
    const dateObject = new Date(dateString);
    return {
      month: dateObject.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: dateObject.getDate(),
    };
  };

  const styleSheet = `
    .events-page {
      max-width: 920px;
      margin: 36px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .events-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }

    .events-button {
      border: none;
      border-radius: 18px;
      padding: 12px 20px;
      font-weight: 800;
      cursor: pointer;
      color: #fff;
      background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
      box-shadow: 0 14px 28px rgba(79, 140, 255, 0.24);
      transition: transform 160ms ease, box-shadow 160ms ease;
    }

    .events-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 20px 34px rgba(79, 140, 255, 0.28);
    }

    .events-form,
    .events-card,
    .events-empty {
      background: ${colors.glass};
      border: 1px solid ${colors.border};
      border-radius: 28px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: ${colors.shadow};
    }

    .events-form {
      padding: 28px;
      margin-bottom: 28px;
    }

    .events-input,
    .events-textarea {
      width: 100%;
      border-radius: 16px;
      border: 1px solid ${colors.border};
      background: ${colors.mutedSurface};
      color: ${colors.textMain};
      outline: none;
      padding: 14px 16px;
      font-size: 15px;
      transition: border-color 160ms ease, background 160ms ease;
      resize: vertical;
    }

    .events-input:focus,
    .events-textarea:focus {
      border-color: ${colors.blue};
      background: ${colors.glassStrong};
    }

    .events-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .events-row-three {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .events-card {
      margin-bottom: 22px;
      overflow: hidden;
      transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .events-card:hover {
      transform: translateY(-5px);
      box-shadow: ${colors.shadowStrong};
    }

    .events-card-bar {
      height: 6px;
      background: linear-gradient(90deg, ${colors.blueStrong}, #00c7fc, ${colors.accent});
    }

    .events-card-body {
      display: flex;
      gap: 18px;
      padding: 24px;
    }

    .events-date {
      min-width: 82px;
      height: 88px;
      border-radius: 20px;
      border: 1px solid ${colors.border};
      background: ${colors.glassStrong};
      box-shadow: ${colors.shadow};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .events-date-month {
      font-size: 12px;
      font-weight: 800;
      color: ${colors.red};
      letter-spacing: 0.08em;
    }

    .events-date-day {
      font-size: 30px;
      font-weight: 800;
      color: ${colors.textMain};
      margin-top: 2px;
    }

    .events-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 16px 0;
    }

    .events-badge {
      display: inline-flex;
      align-items: center;
      padding: 8px 14px;
      border-radius: 999px;
      background: ${colors.primaryGhost};
      border: 1px solid ${colors.border};
      color: ${colors.blue};
      font-size: 13px;
      font-weight: 700;
    }

    .events-card-footer {
      padding: 16px 24px 22px;
      border-top: 1px solid ${colors.border};
      background: ${colors.glassSoft};
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .events-danger {
      border: 1px solid rgba(255, 123, 141, 0.22);
      border-radius: 16px;
      padding: 10px 16px;
      background: ${colors.dangerGhost};
      color: ${colors.red};
      font-weight: 800;
      cursor: pointer;
      transition: transform 160ms ease, background 160ms ease;
    }

    .events-danger:hover {
      transform: translateY(-1px);
      background: rgba(255, 123, 141, 0.22);
    }

    .events-empty {
      text-align: center;
      padding: 62px 24px;
    }

    @media (max-width: 720px) {
      .events-row,
      .events-row-three {
        grid-template-columns: 1fr;
      }

      .events-card-body {
        flex-direction: column;
      }
    }
  `;

  return (
    <div className="events-page">
      <style>{styleSheet}</style>

      <div className="events-header">
        <div>
      <h1 className="dynamic-heading" style={{ margin: 0, fontSize: '32px', fontWeight: '800' }}>
        Campus Events
      </h1>
          <p style={{ margin: '8px 0 0 0', color: colors.textSecondary }}>
            Official hackathons, competitions, and club activities from your campus ecosystem.
          </p>
        </div>

        {isPresident ? (
          <button className="events-button" type="button" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : 'Host New Event'}
          </button>
        ) : null}
      </div>

      {isPresident && showForm ? (
        <div className="events-form">
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: colors.textMain, fontSize: '22px' }}>Event Details</h3>
          <form onSubmit={handleCreateEvent}>
            <input
              className="events-input"
              type="text"
              placeholder="Event Heading"
              required
              value={formData.heading}
              onChange={(event) => setFormData({ ...formData, heading: event.target.value })}
            />

            <div className="events-row">
              <input
                className="events-input"
                type="date"
                required
                value={formData.date}
                onChange={(event) => setFormData({ ...formData, date: event.target.value })}
              />
              <input
                className="events-input"
                type="text"
                placeholder="Club Name"
                required
                value={formData.clubName}
                onChange={(event) => setFormData({ ...formData, clubName: event.target.value })}
              />
            </div>

            <div className="events-row-three">
              <input
                className="events-input"
                type="text"
                placeholder="Venue"
                required
                value={formData.venue}
                onChange={(event) => setFormData({ ...formData, venue: event.target.value })}
              />
              <input
                className="events-input"
                type="text"
                placeholder="Prize Pool"
                required
                value={formData.prizePool}
                onChange={(event) => setFormData({ ...formData, prizePool: event.target.value })}
              />
              <input
                className="events-input"
                type="number"
                placeholder="Team Size"
                required
                value={formData.maxTeamSize}
                onChange={(event) => setFormData({ ...formData, maxTeamSize: event.target.value })}
              />
            </div>

            <textarea
              className="events-textarea"
              placeholder="Rules & requirements..."
              style={{ minHeight: '120px', marginTop: '12px' }}
              required
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            />

            <button className="events-button" type="submit" disabled={isSubmitting} style={{ width: '100%', marginTop: '16px' }}>
              {isSubmitting ? 'Publishing...' : 'Publish Official Event'}
            </button>
          </form>
        </div>
      ) : null}

      {loading ? <p style={{ textAlign: 'center', color: colors.textSecondary, fontSize: '18px' }}>Syncing events...</p> : null}
      {error ? (
        <p
          style={{
            color: colors.red,
            textAlign: 'center',
            padding: '18px 20px',
            background: colors.dangerGhost,
            borderRadius: '18px',
          }}
        >
          {error}
        </p>
      ) : null}

      {events.length > 0 ? (
        events.map((event) => {
          const { month, day } = formatDateBlock(event.date);

          return (
            <div key={event.id} className="events-card">
              <div className="events-card-bar" />

              <div className="events-card-body">
                <div className="events-date">
                  <span className="events-date-month">{month}</span>
                  <span className="events-date-day">{day}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: colors.textMain }}>
                    {event.heading}
                  </h2>
                  <p style={{ margin: 0, color: colors.textSecondary }}>
                    Organized by <span style={{ color: colors.blue, fontWeight: '700' }}>{event.clubName}</span>
                  </p>

                  <div className="events-badges">
                    <span className="events-badge">📍 {event.venue}</span>
                    <span className="events-badge">👥 Team Size: {event.maxTeamSize}</span>
                    <span className="events-badge" style={{ background: colors.accentGhost, color: colors.accent }}>
                      🏆 {event.prizePool}
                    </span>
                  </div>

                  <p style={{ margin: 0, color: colors.textMain, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 px-6 pb-2">
                
                <button 
                  onClick={() => handleLikeEvent(event.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    event.like?.includes(user?.username) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{event.like?.length || 0}</span>
                </button>

                <button 
                  onClick={() => handleDislikeEvent(event.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    event.dislike?.includes(user?.username) 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{event.dislike?.length || 0}</span>
                </button>

              </div>


              <div className="events-card-footer">
                <span style={{ fontSize: '12px', color: colors.textSecondary, fontWeight: '700' }}>
                  Posted by <strong style={{ color: colors.textMain }}>@{event.postedBy}</strong>
                </span>

                {isPresident ? (
                  <button className="events-danger" type="button" onClick={() => handleDeleteEvent(event.id)}>
                    Remove Event
                  </button>
                ) : null}
              </div>
            </div>
          );
        })
      ) : !loading ? (
        <div className="events-empty">
          <span style={{ fontSize: '50px', display: 'block', marginBottom: '18px' }}>🗓️</span>
          <h3 style={{ margin: '0 0 10px 0', color: colors.textMain, fontSize: '22px' }}>No Upcoming Events</h3>
          <p style={{ color: colors.textSecondary, margin: 0 }}>
            The campus is quiet for now. Stay tuned for future hackathons!
          </p>
        </div>
      ) : null}
    </div>
  );
}