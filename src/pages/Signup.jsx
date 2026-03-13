import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { themePalette } from '../theme/palette';

export default function Signup() {
  const navigate = useNavigate();
  const colors = themePalette;

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    branch: '',
    college: '',
    skillsString: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://garvsharma9-teamfinder-api.hf.space/public/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setMessage('Verification code sent to your email.');
      } else {
        throw new Error('Failed to send OTP. Please check your email.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndSignup = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const otpResponse = await fetch('https://garvsharma9-teamfinder-api.hf.space/public/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      if (!otpResponse.ok) throw new Error('Invalid or expired OTP.');

      const skillArray = formData.skillsString
        ? formData.skillsString.split(',').map((skill) => skill.trim()).filter(Boolean)
        : [];

      const payload = {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        branch: formData.branch,
        college: formData.college,
        skill: skillArray,
      };

      const signupResponse = await fetch('https://garvsharma9-teamfinder-api.hf.space/public/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (signupResponse.ok) {
        alert('Account created successfully!');
        navigate('/login');
      } else {
        const errText = await signupResponse.text();
        throw new Error(errText || 'Username already exists.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const styleSheet = `
    .signup-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: 28px 20px;
    }

    .signup-blob {
      position: absolute;
      width: 560px;
      height: 560px;
      border-radius: 999px;
      filter: blur(20px);
      opacity: 0.9;
      pointer-events: none;
      animation: signup-float 20s ease-in-out infinite alternate;
    }

    .signup-blob-one {
      top: -160px;
      left: -90px;
      background: radial-gradient(circle, rgba(79, 140, 255, 0.18) 0%, transparent 72%);
    }

    .signup-blob-two {
      right: -100px;
      bottom: -180px;
      background: radial-gradient(circle, rgba(255, 184, 107, 0.16) 0%, transparent 72%);
      animation-delay: 1.5s;
    }

    .signup-card {
      width: min(520px, 100%);
      padding: 40px;
      border-radius: 32px;
      background: ${colors.glass};
      border: 1px solid ${colors.border};
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      box-shadow: ${colors.shadowStrong};
      position: relative;
      z-index: 1;
    }

    .signup-title {
      margin: 0 0 8px 0;
      text-align: center;
      font-size: 34px;
      font-weight: 900;
      background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.accent});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .signup-subtitle {
      margin: 0 0 30px 0;
      text-align: center;
      color: ${colors.textSecondary};
      font-size: 15px;
      font-weight: 600;
    }

    .signup-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .signup-group {
      margin-bottom: 14px;
    }

    .signup-label {
      display: block;
      margin-bottom: 6px;
      color: ${colors.textMain};
      font-size: 13px;
      font-weight: 800;
    }

    .signup-input {
      width: 100%;
      border-radius: 16px;
      border: 1px solid ${colors.border};
      background: ${colors.mutedSurface};
      color: ${colors.textMain};
      outline: none;
      padding: 14px 16px;
      font-size: 15px;
      box-sizing: border-box;
      transition: border-color 160ms ease, background 160ms ease;
    }

    .signup-input:focus {
      border-color: ${colors.blue};
      background: ${colors.glassStrong};
    }

    .signup-otp {
      text-align: center;
      letter-spacing: 10px;
      font-size: 26px;
      font-weight: 800;
      color: ${colors.blue};
    }

    .signup-divider {
      display: flex;
      align-items: center;
      gap: 14px;
      margin: 22px 0 18px;
    }

    .signup-divider-line {
      flex: 1;
      height: 1px;
      background: ${colors.border};
    }

    .signup-divider-text {
      color: ${colors.textSecondary};
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .signup-button,
    .signup-button-secondary {
      width: 100%;
      border-radius: 18px;
      padding: 15px 18px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
    }

    .signup-button {
      border: none;
      background: linear-gradient(135deg, ${colors.blueStrong}, ${colors.blue});
      color: #fff;
      box-shadow: 0 16px 28px rgba(79, 140, 255, 0.24);
    }

    .signup-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 22px 34px rgba(79, 140, 255, 0.28);
    }

    .signup-button-secondary {
      margin-top: 12px;
      border: 1px solid ${colors.border};
      background: ${colors.glassSoft};
      color: ${colors.textMain};
    }

    .signup-button:disabled,
    .signup-button-secondary:disabled {
      cursor: not-allowed;
      opacity: 0.72;
    }

    .signup-status {
      border-radius: 16px;
      padding: 12px 14px;
      margin-bottom: 18px;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
    }

    .signup-error {
      background: ${colors.dangerGhost};
      color: ${colors.red};
    }

    .signup-success {
      background: ${colors.successGhost};
      color: ${colors.green};
    }

    @keyframes signup-float {
      from { transform: translate(-14px, -10px) scale(1); }
      to { transform: translate(18px, 16px) scale(1.08); }
    }

    @media (max-width: 640px) {
      .signup-card {
        padding: 28px 22px;
      }

      .signup-row {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <div className="signup-page">
      <style>{styleSheet}</style>
      <div className="signup-blob signup-blob-one" />
      <div className="signup-blob signup-blob-two" />

      <div className="signup-card">
        <h1 className="signup-title">TeamFinder</h1>
        <p className="signup-subtitle">Join the professional student network</p>

        {error ? <div className="signup-status signup-error">{error}</div> : null}
        {message ? <div className="signup-status signup-success">{message}</div> : null}

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="signup-row">
              <div className="signup-group">
                <label className="signup-label">Full Name</label>
                <input
                  className="signup-input"
                  type="text"
                  placeholder="Garv Sharma"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                />
              </div>
              <div className="signup-group">
                <label className="signup-label">Username</label>
                <input
                  className="signup-input"
                  type="text"
                  placeholder="garv_dev"
                  required
                  value={formData.username}
                  onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                />
              </div>
            </div>

            <div className="signup-group">
              <label className="signup-label">Email Address</label>
              <input
                className="signup-input"
                type="email"
                placeholder="you@university.edu"
                required
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              />
            </div>

            <div className="signup-group">
              <label className="signup-label">Password</label>
              <input
                className="signup-input"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              />
            </div>

            <div className="signup-divider">
              <div className="signup-divider-line" />
              <span className="signup-divider-text">Profile Details</span>
              <div className="signup-divider-line" />
            </div>

            <div className="signup-row">
              <div className="signup-group">
                <label className="signup-label">Branch</label>
                <input
                  className="signup-input"
                  type="text"
                  placeholder="CS / IT"
                  value={formData.branch}
                  onChange={(event) => setFormData({ ...formData, branch: event.target.value })}
                />
              </div>
              <div className="signup-group">
                <label className="signup-label">College</label>
                <input
                  className="signup-input"
                  type="text"
                  placeholder="University Name"
                  value={formData.college}
                  onChange={(event) => setFormData({ ...formData, college: event.target.value })}
                />
              </div>
            </div>

            <div className="signup-group">
              <label className="signup-label">Skills (Comma separated)</label>
              <input
                className="signup-input"
                type="text"
                placeholder="React, Java, Python..."
                value={formData.skillsString}
                onChange={(event) => setFormData({ ...formData, skillsString: event.target.value })}
              />
            </div>

            <button className="signup-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Send Verification OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndSignup}>
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <p style={{ fontSize: '15px', color: colors.textSecondary, lineHeight: 1.6, margin: 0 }}>
                A 6-digit code has been sent to
                <br />
                <strong style={{ color: colors.blue }}>{formData.email}</strong>
              </p>
            </div>

            <input
              className="signup-input signup-otp"
              type="text"
              maxLength="6"
              placeholder="000000"
              required
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/[^0-9]/g, ''))}
            />

            <button className="signup-button" type="submit" disabled={isLoading || otp.length < 6}>
              {isLoading ? 'Creating Account...' : 'Verify & Sign Up'}
            </button>

            <button
              type="button"
              className="signup-button-secondary"
              onClick={() => {
                setOtpSent(false);
                setOtp('');
                setMessage('');
                setError('');
              }}
              disabled={isLoading}
            >
              Edit Registration Info
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '26px', fontSize: '14px', color: colors.textSecondary }}>
          Already a member?{' '}
          <Link to="/login" style={{ color: colors.blue, fontWeight: '800', textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
