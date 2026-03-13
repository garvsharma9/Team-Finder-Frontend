// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  
//   // OTP State
//   const [otp, setOtp] = useState('');
//   const [requiresOtp, setRequiresOtp] = useState(false);
//   const [maskedEmail, setMaskedEmail] = useState('');

//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // STEP 1: Validate Credentials & Request OTP
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/public/signin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }) 
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         throw new Error(errText || 'Invalid username or password');
//       }

//       const data = await response.json(); 
      
//       // Successfully triggered OTP
//       setRequiresOtp(true);
//       setMaskedEmail(data.email);
//       setMessage('Please check your email for the verification code.');

//     } catch (err) {
//       console.error('Login Error:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // STEP 2: Verify OTP & Log In
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/public/verify-login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: username, otp: otp }) 
//       });

//       if (!response.ok) {
//         throw new Error('Invalid or expired OTP');
//       }

//       const data = await response.json(); 
      
//       // We finally have the user and token!
//       login(data.user, data.token);
//       navigate('/dashboard');

//     } catch (err) {
//       console.error('OTP Error:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const styleSheet = `
//     .auth-container {
//       display: flex; flex-direction: column; align-items: center; justify-content: center;
//       min-height: calc(100vh - 60px); padding: 20px; font-family: Arial, sans-serif;
//     }
//     .auth-card {
//       background-color: #fff; width: 100%; max-width: 350px; padding: 32px;
//       border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e0e0e0;
//     }
//     .auth-logo { font-size: 28px; font-weight: bold; color: #0a66c2; margin: 0 0 10px 0; text-align: center; }
//     .auth-subtitle { font-size: 14px; color: #666; margin: 0 0 24px 0; text-align: center; }
    
//     .auth-input {
//       width: 100%; padding: 14px 12px; margin-bottom: 16px; border: 1px solid #8c8c8c;
//       border-radius: 4px; box-sizing: border-box; font-size: 16px; outline: none; transition: 0.2s;
//     }
//     .auth-input:focus { border-color: #0a66c2; box-shadow: 0 0 0 1px #0a66c2; }
    
//     .otp-input {
//       font-size: 24px; text-align: center; letter-spacing: 8px; font-weight: bold;
//       padding: 16px; border-color: #0a66c2; box-shadow: 0 0 5px rgba(10,102,194,0.2);
//     }

//     .auth-btn {
//       width: 100%; background-color: #0a66c2; color: #fff; border: none; padding: 14px;
//       border-radius: 24px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-top: 8px;
//     }
//     .auth-btn:hover:not(:disabled) { background-color: #004182; }
//     .auth-btn:disabled { background-color: #a0b4b7; cursor: not-allowed; }
    
//     .btn-secondary { background-color: transparent; color: #666; border: 1px solid #ccc; margin-top: 10px; }
//     .btn-secondary:hover:not(:disabled) { background-color: #f3f2ef; }

//     .auth-footer { text-align: center; margin-top: 24px; font-size: 14px; color: #444; }
//     .auth-link { color: #0a66c2; font-weight: bold; text-decoration: none; }
//     .auth-link:hover { text-decoration: underline; }
//   `;

//   return (
//     <div className="auth-container">
//       <style>{styleSheet}</style>

//       <div className="auth-card">
//         <h1 className="auth-logo">TeamFinder</h1>
//         <p className="auth-subtitle">Stay updated on your professional world</p>

//         {error && <p style={{ color: '#d11124', backgroundColor: '#fef0f0', padding: '10px', borderRadius: '4px', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
//         {message && <p style={{ color: '#057642', backgroundColor: '#e6f4ea', padding: '10px', borderRadius: '4px', fontSize: '14px', marginBottom: '16px', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}

//         {!requiresOtp ? (
//           <form onSubmit={handleLoginSubmit}>
//             <input 
//               className="auth-input" type="text" placeholder="Username" 
//               value={username} onChange={(e) => setUsername(e.target.value)} required 
//             />
//             <input 
//               className="auth-input" type="password" placeholder="Password" 
//               value={password} onChange={(e) => setPassword(e.target.value)} required 
//             />
//             <button className="auth-btn" type="submit" disabled={isLoading}>
//               {isLoading ? 'Verifying...' : 'Sign In'}
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOtp}>
//             <div style={{ textAlign: 'center', marginBottom: '15px' }}>
//               <label style={{ fontSize: '14px', color: '#444', fontWeight: 'bold' }}>
//                 Enter the 6-digit code sent to<br/><span style={{ color: '#0a66c2' }}>{maskedEmail}</span>
//               </label>
//             </div>
            
//             <input 
//               className="auth-input otp-input" type="text" maxLength="6" placeholder="000000" 
//               value={otp} onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))} required 
//             />
            
//             <button className="auth-btn" type="submit" disabled={isLoading || otp.length < 6}>
//               {isLoading ? 'Authenticating...' : 'Verify & Log In'}
//             </button>
            
//             <button 
//               type="button" className="auth-btn btn-secondary" 
//               onClick={() => { setRequiresOtp(false); setOtp(''); setMessage(''); setError(''); setPassword(''); }}
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//           </form>
//         )}

//         <div className="auth-footer">
//           New to TeamFinder? <Link to="/signup" className="auth-link">Join now</Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { API_BASE_URL } from '../config';

export default function Login() {
  const [step, setStep] = useState('LOGIN'); // LOGIN, LOGIN_OTP, FORGOT_REQ, FORGOT_RESET
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [maskedEmail, setMaskedEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const resetUI = (newStep, msg = '') => {
    setError('');
    setMessage(msg);
    setOtp('');
    setStep(newStep);
  };

  // --- 1. NORMAL LOGIN ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMessage(''); setIsLoading(true);
    try {
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/public/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) 
      });
      if (!response.ok) throw new Error(await response.text() || 'Invalid credentials');
      const data = await response.json(); 
      setMaskedEmail(data.email);
      resetUI('LOGIN_OTP', 'Verification code sent to your email.');
    } catch (err) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  const handleVerifyLoginOtp = async (e) => {
    e.preventDefault();
    setError(''); setIsLoading(true);
    try {
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/public/verify-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp }) 
      });
      if (!response.ok) throw new Error('Invalid or expired OTP');
      const data = await response.json(); 
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  // --- 2. FORGOT PASSWORD FLOW ---
  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setError(''); setIsLoading(true);
    try {
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/public/forgot-password/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }) 
      });
      if (!response.ok) throw new Error(await response.text() || 'User not found');
      const data = await response.json();
      setMaskedEmail(data.email);
      resetUI('FORGOT_RESET', 'Password reset code sent to your email.');
    } catch (err) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError(''); setIsLoading(true);
    try {
      const response = await fetch(`https://garvsharma9-teamfinder-api.hf.space/public/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp, newPassword }) 
      });
      if (!response.ok) throw new Error(await response.text() || 'Failed to reset password');
      
      setPassword(''); setNewPassword(''); setConfirmPassword('');
      resetUI('LOGIN', 'Password reset successfully! You can now log in.');
    } catch (err) { setError(err.message); } 
    finally { setIsLoading(false); }
  };

  const colors = { blue: '#007AFF', orange: '#FF9500', glass: 'rgba(255, 255, 255, 0.45)', border: 'rgba(255, 255, 255, 0.5)' };
  const styleSheet = `
    .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8fafc; overflow: hidden; position: relative; }
    .glass-card { background: ${colors.glass}; backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); width: 100%; max-width: 400px; padding: 40px; border-radius: 32px; border: 1px solid ${colors.border}; box-shadow: 0 20px 50px rgba(0,0,0,0.1); z-index: 10; text-align: center; }
    .auth-logo { font-size: 32px; font-weight: 900; background: linear-gradient(135deg, ${colors.blue}, ${colors.orange}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }
    .auth-subtitle { color: #6e6e73; font-size: 15px; margin-bottom: 30px; font-weight: 500; }
    .auth-input { width: 100%; padding: 16px 20px; margin-bottom: 16px; border: 1px solid rgba(0,0,0,0.1); border-radius: 16px; background: rgba(255,255,255,0.5); font-size: 16px; outline: none; transition: 0.2s; box-sizing: border-box; }
    .auth-input:focus { border-color: ${colors.blue}; background: white; }
    .otp-display { letter-spacing: 12px; font-size: 28px; text-align: center; font-weight: 800; color: ${colors.blue}; }
    .auth-btn { width: 100%; padding: 16px; border-radius: 18px; border: none; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.3s ease; margin-top: 10px; }
    .btn-primary { background: ${colors.blue}; color: white; box-shadow: 0 4px 15px rgba(0,122,255,0.3); }
    .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,122,255,0.4); }
    .btn-secondary { background: rgba(0,0,0,0.05); color: #1D1D1F; margin-top: 15px; }
    .status-msg { padding: 12px; border-radius: 12px; font-size: 14px; margin-bottom: 20px; font-weight: 600; }
    .error { background: rgba(255, 59, 48, 0.1); color: #FF3B30; }
    .success { background: rgba(52, 199, 89, 0.1); color: #34C759; }
    .blob { position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,122,255,0.1) 0%, transparent 70%); border-radius: 50%; z-index: 1; animation: float 15s infinite alternate ease-in-out; }
    @keyframes float { from { transform: translate(-10%, -10%); } to { transform: translate(10%, 10%); } }
    .link-btn { background: none; border: none; color: ${colors.blue}; font-weight: 700; cursor: pointer; font-size: 14px; margin-top: 10px; padding: 0; }
    .link-btn:hover { text-decoration: underline; }
  `;

  return (
    <div className="auth-page">
      <style>{styleSheet}</style>
      <div className="blob" style={{top: '-100px', left: '-100px'}}></div>
      <div className="blob" style={{bottom: '-100px', right: '-100px', background: 'radial-gradient(circle, rgba(255,149,0,0.08) 0%, transparent 70%)'}}></div>

      <div className="glass-card">
        <h1 className="auth-logo">TeamFinder</h1>
        <p className="auth-subtitle">
          {step === 'LOGIN' || step === 'LOGIN_OTP' ? 'Welcome back to the workspace' : 'Reset your password'}
        </p>

        {error && <div className="status-msg error">{error}</div>}
        {message && <div className="status-msg success">{message}</div>}

        {step === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit}>
            <input className="auth-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
              <button type="button" className="link-btn" onClick={() => resetUI('FORGOT_REQ')}>Forgot Password?</button>
            </div>
            <button className="auth-btn btn-primary" type="submit" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Sign In'}</button>
          </form>
        )}

        {step === 'LOGIN_OTP' && (
          <form onSubmit={handleVerifyLoginOtp}>
            <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '20px' }}>Enter the code sent to<br/><strong style={{ color: colors.blue }}>{maskedEmail}</strong></p>
            <input className="auth-input otp-display" type="text" maxLength="6" placeholder="000000" value={otp} onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))} required />
            <button className="auth-btn btn-primary" type="submit" disabled={isLoading || otp.length < 6}>{isLoading ? 'Confirming...' : 'Verify & Log In'}</button>
            <button type="button" className="auth-btn btn-secondary" onClick={() => resetUI('LOGIN')} disabled={isLoading}>Back to Login</button>
          </form>
        )}

        {step === 'FORGOT_REQ' && (
          <form onSubmit={handleForgotRequest}>
            <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '20px' }}>Enter your username to receive a reset code.</p>
            <input className="auth-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <button className="auth-btn btn-primary" type="submit" disabled={isLoading || !username}>{isLoading ? 'Sending...' : 'Send Reset Code'}</button>
            <button type="button" className="auth-btn btn-secondary" onClick={() => resetUI('LOGIN')} disabled={isLoading}>Back to Login</button>
          </form>
        )}

        {step === 'FORGOT_RESET' && (
          <form onSubmit={handlePasswordReset}>
            <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '20px' }}>Enter the 6-digit code sent to<br/><strong style={{ color: colors.blue }}>{maskedEmail}</strong></p>
            <input className="auth-input otp-display" type="text" maxLength="6" placeholder="000000" value={otp} onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))} required />
            <input className="auth-input" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength="6" />
            <input className="auth-input" style={{ marginBottom: '24px' }} type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength="6" />
            <button className="auth-btn btn-primary" type="submit" disabled={isLoading || otp.length < 6 || !newPassword || !confirmPassword}>{isLoading ? 'Updating...' : 'Reset Password'}</button>
            <button type="button" className="auth-btn btn-secondary" onClick={() => resetUI('FORGOT_REQ')} disabled={isLoading}>Back</button>
          </form>
        )}

        <div style={{ marginTop: '30px', fontSize: '14px', color: '#86868b' }}>
          New here? <Link to="/signup" style={{ color: colors.blue, fontWeight: '700', textDecoration: 'none' }}>Create account</Link>
        </div>
      </div>
    </div>
  );
}