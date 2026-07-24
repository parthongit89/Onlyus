import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { AuthService } from './authService';

export const LoginPage: React.FC = () => {
  const [inviteCode, setInviteCode] = useState('');
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!inviteCode.trim()) {
      setError('An Invite Token is required for access.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.requestAccess(inviteCode, email);
      setIsLoading(false);
      navigate('/auth/otp', { state: { email, inviteCode } });
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Verification failed.');
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
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(240, 123, 66, 0.15)',
              color: '#f07b42',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff' }}>
            Invite My Account
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#9da4b0', marginTop: '4px' }}>
            OnlyUs is strictly invitation-only.
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              padding: '12px 14px',
              borderRadius: '12px',
              fontSize: '0.84rem',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleRequestAccess} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Invite Token"
            placeholder="e.g. ONLYUS-INVITE-2026"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <Input
            label="Email Address"
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Security Passcode"
            placeholder="••••••••"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />

          <div style={{ marginTop: '8px' }}>
            <Button fullWidth type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Verifying Token...' : 'Request Access'}
            </Button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <button
            onClick={() => navigate('/auth/otp', { state: { email: email || 'parth@onlyus.private' } })}
            style={{ fontSize: '0.85rem', color: '#f07b42', fontWeight: 500 }}
          >
            Verify existing OTP code →
          </button>
        </div>
      </div>
    </div>
  );
};
