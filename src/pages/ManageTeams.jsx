import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { themePalette } from '../theme/palette';

export default function ManageTeams() {
  const { user, token } = useContext(AuthContext);
  const colors = themePalette;
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyPosts = async () => {
    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/post/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      const relevantPosts = data.filter(
        (post) =>
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
    if (token) {
      fetchMyPosts();
    }
  }, [token]);

  const handleAccept = async (postId, targetUsername) => {
    try {
      const response = await fetch(
        `https://garvsharma9-teamfinder-api.hf.space/post/${postId}/accept?ownerUsername=${user.username}&targetUsername=${targetUsername}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setMyPosts((previousPosts) =>
          previousPosts.map((post) => {
            if (post.id !== postId) return post;

            const updatedRequests = post.requestedUsernames.filter((name) => name !== targetUsername);
            const updatedAccepted = post.acceptedUsernames ? [...post.acceptedUsernames, targetUsername] : [targetUsername];

            return { ...post, requestedUsernames: updatedRequests, acceptedUsernames: updatedAccepted };
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (postId, targetUsername) => {
    if (!window.confirm(`Are you sure you want to reject ${targetUsername}?`)) return;

    try {
      const response = await fetch(
        `https://garvsharma9-teamfinder-api.hf.space/post/${postId}/reject?ownerUsername=${user.username}&targetUsername=${targetUsername}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setMyPosts((previousPosts) =>
          previousPosts.map((post) => {
            if (post.id !== postId) return post;

            const updatedRequests = post.requestedUsernames.filter((name) => name !== targetUsername);
            return { ...post, requestedUsernames: updatedRequests };
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const styleSheet = `
    .teams-page {
      max-width: 1020px;
      margin: 38px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .teams-card,
    .teams-empty {
      background: ${colors.glass};
      border: 1px solid ${colors.border};
      border-radius: 30px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: ${colors.shadow};
      overflow: hidden;
    }

    .teams-card {
      margin-bottom: 28px;
    }

    .teams-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 24px 28px;
      border-bottom: 1px solid ${colors.border};
      background: ${colors.glassSoft};
    }

    .teams-status {
      display: inline-flex;
      align-items: center;
      padding: 7px 13px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
    }

    .teams-status-lead {
      background: ${colors.primaryGhost};
      color: ${colors.blue};
    }

    .teams-status-member {
      background: ${colors.successGhost};
      color: ${colors.green};
    }

    .teams-status-pending {
      background: ${colors.accentGhost};
      color: ${colors.accent};
    }

    .teams-grid {
      display: grid;
      grid-template-columns: 1fr 1.1fr;
    }

    .teams-col {
      padding: 28px;
    }

    .teams-col + .teams-col {
      border-left: 1px solid ${colors.border};
      background: ${colors.glassSoft};
    }

    .teams-section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin: 0 0 18px 0;
      color: ${colors.textMain};
      font-size: 18px;
      font-weight: 800;
    }

    .teams-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 28px;
      height: 28px;
      border-radius: 999px;
      background: ${colors.glassStrong};
      border: 1px solid ${colors.border};
      color: ${colors.textSecondary};
      font-size: 13px;
      font-weight: 800;
    }

    .teams-user-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 18px;
      border: 1px solid ${colors.border};
      background: ${colors.glassSoft};
      margin-bottom: 12px;
    }

    .teams-user-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .teams-avatar {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 800;
      flex-shrink: 0;
    }

    .teams-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .teams-button,
    .teams-button-muted {
      border-radius: 14px;
      padding: 9px 14px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 160ms ease, background 160ms ease;
    }

    .teams-button {
      border: none;
      background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
      color: #fff;
    }

    .teams-button-muted {
      border: 1px solid rgba(255, 123, 141, 0.22);
      background: ${colors.dangerGhost};
      color: ${colors.red};
    }

    .teams-button:hover,
    .teams-button-muted:hover {
      transform: translateY(-1px);
    }

    .teams-empty {
      text-align: center;
      padding: 68px 24px;
    }

    @media (max-width: 820px) {
      .teams-grid {
        grid-template-columns: 1fr;
      }

      .teams-col + .teams-col {
        border-left: none;
        border-top: 1px solid ${colors.border};
      }
    }
  `;

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: colors.textSecondary }}>Please log in to manage your teams.</div>;
  }

  return (
    <div className="teams-page">
      <style>{styleSheet}</style>

      <h1 style={{ marginBottom: '12px', color: colors.textMain, fontSize: '34px', fontWeight: '900' }}>Workspace Manager</h1>
      <p style={{ marginTop: 0, marginBottom: '28px', color: colors.textSecondary }}>
        Review incoming applications, track your memberships, and keep every project lineup organized.
      </p>

      {loading ? <p style={{ color: colors.textSecondary }}>Syncing your teams...</p> : null}
      {error ? <p style={{ color: colors.red }}>{error}</p> : null}

      {myPosts.length > 0 ? (
        myPosts.map((post) => {
          const isOwner = post.username === user.username;
          const isAccepted = post.acceptedUsernames && post.acceptedUsernames.includes(user.username);
          const isPending = post.requestedUsernames && post.requestedUsernames.includes(user.username);

          return (
            <div key={post.id} className="teams-card">
              <div className="teams-header">
                <div>
                  <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '900', color: colors.textMain }}>
                    {post.teamName || 'Untitled Team'}
                  </h2>
                  <p style={{ margin: '6px 0 0 0', color: colors.textSecondary }}>
                    Targeting <strong style={{ color: colors.textMain }}>{post.competitionName}</strong>
                  </p>
                </div>

                <div>
                  {isOwner ? <span className="teams-status teams-status-lead">Team Lead</span> : null}
                  {!isOwner && isAccepted ? <span className="teams-status teams-status-member">Member</span> : null}
                  {!isOwner && !isAccepted && isPending ? <span className="teams-status teams-status-pending">Pending</span> : null}
                </div>
              </div>

              <div className="teams-grid">
                <div className="teams-col">
                  <h3 className="teams-section-title">
                    Applications
                    <span className="teams-count">{post.requestedUsernames?.length || 0}</span>
                  </h3>

                  {isOwner ? (
                    post.requestedUsernames?.length > 0 ? (
                      post.requestedUsernames.map((requester) => (
                        <div key={requester} className="teams-user-row">
                          <div className="teams-user-meta">
                            <div className="teams-avatar" style={{ background: colors.accent }}>
                              {requester.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: '800', color: colors.textMain }}>{requester}</div>
                              <div style={{ fontSize: '12px', color: colors.textSecondary }}>Wants to join your team</div>
                            </div>
                          </div>

                          <div className="teams-actions">
                            <button className="teams-button" type="button" onClick={() => handleAccept(post.id, requester)}>
                              Accept
                            </button>
                            <button className="teams-button-muted" type="button" onClick={() => handleReject(post.id, requester)}>
                              Decline
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ color: colors.textSecondary, fontSize: '14px' }}>No new requests.</div>
                    )
                  ) : (
                    <div
                      style={{
                        color: colors.textSecondary,
                        fontSize: '14px',
                        background: colors.glassSoft,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '18px',
                        padding: '16px',
                      }}
                    >
                      {isPending ? 'Your application is under review by the team lead.' : 'Only leads can manage applicants.'}
                    </div>
                  )}
                </div>

                <div className="teams-col">
                  <h3 className="teams-section-title">
                    Team Roster
                    <span className="teams-count">{(post.acceptedUsernames?.length || 0) + 1}</span>
                  </h3>

                  <div className="teams-user-row">
                    <div className="teams-user-meta">
                      <div className="teams-avatar" style={{ background: colors.blue }}>
                        {post.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: '800', color: colors.textMain }}>{post.username}</div>
                        <div style={{ fontSize: '12px', color: colors.blue, fontWeight: '800' }}>TEAM LEAD</div>
                      </div>
                    </div>
                  </div>

                  {post.acceptedUsernames?.map((member) => (
                    <div key={member} className="teams-user-row">
                      <div className="teams-user-meta">
                        <div className="teams-avatar" style={{ background: colors.green }}>
                          {member.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: '800', color: colors.textMain }}>{member}</div>
                          <div style={{ fontSize: '12px', color: colors.green, fontWeight: '800' }}>MEMBER</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      ) : !loading ? (
        <div className="teams-empty">
          <span style={{ fontSize: '52px', display: 'block', marginBottom: '18px' }}>⛵</span>
          <h3 style={{ margin: '0 0 10px 0', color: colors.textMain, fontSize: '24px' }}>You aren&apos;t in any teams yet</h3>
          <p style={{ color: colors.textSecondary, margin: 0 }}>Explore the feed to find your next project.</p>
        </div>
      ) : null}
    </div>
  );
}
