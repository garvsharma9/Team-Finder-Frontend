import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Clock, Check, X, MessageSquare, UserMinus } from 'lucide-react';

export default function ConnectionButton({
  profileUser,
  relationshipHint = null,
  showRemove = false,
  onActionComplete,
}) {
  const { user, token, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // If looking at your own profile, don't show the button
  if (!user || !profileUser || user.username === profileUser.username) return null;

  // Determine the current relationship state
  const currentConnections = user.connections || [];
  const currentSentRequests = user.connectionRequestsSent || [];
  const currentReceivedRequests = user.connectionRequestsReceived || [];

  const profileConnections = profileUser.connections || [];
  const profileSentRequests = profileUser.connectionRequestsSent || [];
  const profileReceivedRequests = profileUser.connectionRequestsReceived || [];

  const isConnected =
    relationshipHint === 'connected' ||
    currentConnections.includes(profileUser.username) ||
    profileConnections.includes(user.username);

  const hasReceivedRequest =
    relationshipHint === 'received' ||
    currentReceivedRequests.includes(profileUser.username) ||
    profileSentRequests.includes(user.username);

  const hasSentRequest =
    relationshipHint === 'sent' ||
    currentSentRequests.includes(profileUser.username) ||
    profileReceivedRequests.includes(user.username);

  const handleAction = async (actionEndpoint, optimisticUpdate) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/user/connect/${actionEndpoint}/${profileUser.username}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        if (optimisticUpdate) {
          updateUser(optimisticUpdate);
        }
        onActionComplete?.({ action: actionEndpoint, profileUser });
      }
    } catch (err) {
      console.error("Connection action failed", err);
    } finally {
      setLoading(false);
    }
  };

  // State 1: We are already connected
  if (isConnected) {
    if (showRemove) {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/chat', { state: { openDmWith: profileUser.username } })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-colors"
          >
            <MessageSquare size={18} /> Message
          </button>
          <button
            disabled={loading}
            onClick={() => handleAction('remove', {
              connections: currentConnections.filter((username) => username !== profileUser.username)
            })}
            className="flex items-center gap-2 px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-full font-bold transition-colors disabled:opacity-60"
          >
            <UserMinus size={18} /> Remove
          </button>
        </div>
      );
    }

    return (
      <button 
        // Pass the username cleanly through React Router State!
        onClick={() => navigate('/chat', { state: { openDmWith: profileUser.username } })} 
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-colors"
      >
        <MessageSquare size={18} /> Message
      </button>
    );
  }
  // State 2: They sent us a request, we need to Accept/Reject
  if (hasReceivedRequest) {
    return (
      <div className="flex gap-2">
        <button 
          disabled={loading}
          onClick={() => handleAction('accept', { 
            connections: Array.from(new Set([...currentConnections, profileUser.username])),
            connectionRequestsReceived: currentReceivedRequests.filter((username) => username !== profileUser.username),
            connectionRequestsSent: currentSentRequests.filter((username) => username !== profileUser.username)
          })}
          className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold"
        >
          <Check size={18} /> Accept
        </button>
        <button 
          disabled={loading}
          onClick={() => handleAction('reject', {
            connectionRequestsReceived: currentReceivedRequests.filter((username) => username !== profileUser.username)
          })}
          className="flex items-center gap-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full font-bold"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  // State 3: We sent them a request, waiting for response
  if (hasSentRequest) {
    return (
      <button disabled className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-full font-bold cursor-not-allowed">
        <Clock size={18} /> Pending
      </button>
    );
  }

  // State 4: Default, no relationship
  return (
    <button 
      disabled={loading}
      onClick={() => handleAction('request', {
        connectionRequestsSent: Array.from(new Set([...currentSentRequests, profileUser.username]))
      })}
      className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full font-bold transition-colors"
    >
      <UserPlus size={18} /> Connect
    </button>
  );
}
