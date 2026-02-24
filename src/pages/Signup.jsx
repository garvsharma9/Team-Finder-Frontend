import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    branch: '',
    college: '',
    skillsString: '' 
  });
  
  // OTP State Management
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // STEP 1: Request the OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/public/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      if (response.ok) {
        setOtpSent(true);
        setMessage('OTP sent! Please check your email inbox.');
      } else {
        throw new Error('Failed to send OTP. Please ensure your email is correct.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Verify OTP and Create Account
  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Verify the OTP first
      const otpResponse = await fetch('http://localhost:8080/public/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: otp })
      });

      if (!otpResponse.ok) {
        throw new Error('Invalid or expired OTP. Please try again.');
      }

      // 2. If OTP is valid, process the signup
      const skillArray = formData.skillsString
        ? formData.skillsString.split(',').map(s => s.trim()).filter(s => s)
        : [];

      const payload = {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        email: formData.email, // Email is now required and verified!
        branch: formData.branch,
        college: formData.college,
        skill: skillArray
      };

      const signupResponse = await fetch('http://localhost:8080/public/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (signupResponse.ok) {
        alert('Account verified and created successfully! Please log in.');
        navigate('/login');
      } else {
        const errText = await signupResponse.text();
        throw new Error(errText || 'Failed to create account. Username may already exist.');
      }
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const styleSheet = `
    .auth-container {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: calc(100vh - 60px); padding: 40px 20px; font-family: Arial, sans-serif;
    }
    .auth-card {
      background-color: #fff; width: 100%; max-width: 450px; padding: 32px;
      border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
    }
    .auth-logo { font-size: 28px; font-weight: bold; color: #0a66c2; margin: 0 0 10px 0; text-align: center; }
    .auth-subtitle { font-size: 14px; color: #666; margin: 0 0 24px 0; text-align: center; }
    
    .input-group { margin-bottom: 16px; }
    .input-label { display: block; font-size: 13px; color: #444; font-weight: bold; margin-bottom: 4px; }
    .optional-tag { color: #888; font-weight: normal; font-size: 12px; }

    .auth-input {
      width: 100%; padding: 12px; border: 1px solid #8c8c8c;
      border-radius: 4px; box-sizing: border-box; font-size: 15px; outline: none; transition: 0.2s;
    }
    .auth-input:focus { border-color: #0a66c2; box-shadow: 0 0 0 1px #0a66c2; }
    .auth-input:disabled { background-color: #f3f2ef; color: #888; cursor: not-allowed; }
    
    .otp-input {
      font-size: 24px; text-align: center; letter-spacing: 8px; font-weight: bold;
      padding: 16px; border-color: #0a66c2; box-shadow: 0 0 5px rgba(10,102,194,0.2);
    }

    .auth-btn {
      width: 100%; background-color: #0a66c2; color: #fff; border: none; padding: 14px;
      border-radius: 24px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-top: 12px;
    }
    .auth-btn:hover:not(:disabled) { background-color: #004182; }
    .auth-btn:disabled { background-color: #a0b4b7; cursor: not-allowed; }
    
    .btn-secondary {
      background-color: transparent; color: #666; border: 1px solid #ccc; margin-top: 10px;
    }
    .btn-secondary:hover:not(:disabled) { background-color: #f3f2ef; }

    .auth-footer { text-align: center; margin-top: 24px; font-size: 14px; color: #444; }
    .auth-link { color: #0a66c2; font-weight: bold; text-decoration: none; }
    .auth-link:hover { text-decoration: underline; }
  `;

  return (
    <div className="auth-container">
      <style>{styleSheet}</style>

      <div className="auth-card">
        <h1 className="auth-logo">TeamFinder</h1>
        <p className="auth-subtitle">Make the most of your professional life</p>

        {error && <p style={{ color: '#d11124', backgroundColor: '#fef0f0', padding: '10px', borderRadius: '4px', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
        {message && <p style={{ color: '#057642', backgroundColor: '#e6f4ea', padding: '10px', borderRadius: '4px', fontSize: '14px', marginBottom: '16px', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}

        {/* Dynamic Form: Changes based on whether OTP has been sent */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="input-group">
              <label className="input-label">Full Name *</label>
              <input className="auth-input" type="text" placeholder="Garv Sharma" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Username *</label>
              <input className="auth-input" type="text" placeholder="garv_sharma" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address *</label>
              <input className="auth-input" type="email" placeholder="you@college.edu" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Password *</label>
              <input className="auth-input" type="password" placeholder="••••••••" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>

            <div style={{ borderTop: '1px solid #ebebeb', margin: '24px 0 16px 0', position: 'relative', textAlign: 'center' }}>
              <span style={{ backgroundColor: '#fff', padding: '0 10px', color: '#888', fontSize: '12px', position: 'relative', top: '-8px' }}>Optional Profile Details</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Branch <span className="optional-tag">(Optional)</span></label>
                <input className="auth-input" type="text" placeholder="Computer Science" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">College <span className="optional-tag">(Optional)</span></label>
                <input className="auth-input" type="text" placeholder="Tech University" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Skills <span className="optional-tag">(Comma separated, Optional)</span></label>
              <input className="auth-input" type="text" placeholder="Java, React, Python..." value={formData.skillsString} onChange={e => setFormData({...formData, skillsString: e.target.value})} />
            </div>

            <button className="auth-btn" type="submit" disabled={isLoading}>
              {isLoading ? 'Sending OTP...' : 'Send Verification OTP'}
            </button>
          </form>

        ) : (
          
          /* OTP Verification Form */
          <form onSubmit={handleVerifyAndSignup}>
            <div className="input-group" style={{ textAlign: 'center' }}>
              <label className="input-label" style={{ fontSize: '15px', marginBottom: '15px' }}>
                Enter the 6-digit code sent to <br/><strong style={{ color: '#0a66c2' }}>{formData.email}</strong>
              </label>
              <input 
                className="auth-input otp-input" 
                type="text" 
                maxLength="6" 
                placeholder="000000" 
                required 
                value={otp} 
                onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // Restrict to numbers
              />
            </div>
            
            <button className="auth-btn" type="submit" disabled={isLoading || otp.length < 6}>
              {isLoading ? 'Verifying...' : 'Verify & Create Account'}
            </button>

            <button 
              type="button" 
              className="auth-btn btn-secondary" 
              onClick={() => { setOtpSent(false); setOtp(''); setMessage(''); setError(''); }}
              disabled={isLoading}
            >
              Change Email / Edit Details
            </button>
          </form>
        )}

        <div className="auth-footer">
          Already on TeamFinder? <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}