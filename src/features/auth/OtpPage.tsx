import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { AuthService } from './authService';
import { User, DeviceSession } from '../../shared/types';

export const OtpPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'user@onlyus.private';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState<User | null>(null);
  const [session, setSession] = useState<DeviceSession | null>(null);

  const handleChange = (val: string, index: number) => {
    if (val.length <= 1 && /^\d*$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      setError(null);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 4) {
      setError('Please enter all 4 digits of the OTP code.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { user, token, deviceSession } = await AuthService.verifyOtp(email, fullOtp);
      setIsLoading(false);
      setVerifiedUser(user);
      setSession(deviceSession);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'OTP verification failed.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #38241b 0%, #0d0f12 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#16191e',
          borderRadius: '24px',
          padding: '36px 30px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
        }}
      >
        {!verifiedUser ? (
          <>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              OTP Verification
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#9da4b0', marginBottom: '24px', lineHeight: 1.4 }}>
              Enter the 4-digit code sent to <br />
              <strong style={{ color: '#f07b42' }}>{email}</strong>
            </p>

            {error && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '10px',
                  borderRadius: '12px',
                  fontSize: '0.84rem',
                  marginBottom: '20px',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleVerify}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      backgroundColor: '#1e2229',
                      border: digit ? '1.5px solid #f07b42' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      outline: 'none',
                    }}
                  />
                ))}
              </div>

              <Button fullWidth type="submit" size="lg" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP Code'}
              </Button>
            </form>
          </>
        ) : (
          <div style={{ padding: '12px 0' }}>
            {verifiedUser.status === 'PENDING' ? (
              <>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(234, 179, 8, 0.15)',
                    color: '#eab308',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Pending Admin Approval
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#9da4b0', lineHeight: 1.5, marginBottom: '20px' }}>
                  Your invitation has been verified. In accordance with OnlyUs security rules, your account is in <strong style={{ color: '#eab308' }}>PENDING</strong> state until approved by an administrator.
                </p>

                {session && (
                  <div style={{ backgroundColor: '#1e2229', padding: '12px', borderRadius: '12px', textAlign: 'left', fontSize: '0.78rem', color: '#9da4b0', marginBottom: '24px' }}>
                    <div><strong>Device:</strong> {session.deviceName}</div>
                    <div><strong>IP:</strong> {session.ipAddress}</div>
                    <div><strong>Status:</strong> Active Session Established</div>
                  </div>
                )}

                <Button fullWidth variant="primary" onClick={() => navigate('/admin')}>
                  Go to Admin Approvals Demo
                </Button>
              </>
            ) : (
              <>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: '#22c55e',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Authentication Approved!
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#9da4b0', marginBottom: '24px' }}>
                  Welcome back, {verifiedUser.displayName}.
                </p>
                <Button fullWidth variant="primary" onClick={() => navigate('/chats')}>
                  Enter OnlyUs Private Messenger
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
