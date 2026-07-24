import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';

export const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
          Password Reset
        </h2>
        <p style={{ fontSize: '0.86rem', color: '#9da4b0', marginBottom: '24px' }}>
          Enter your registered email address to receive password reset instructions.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button fullWidth type="submit" size="lg">
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div style={{ padding: '16px 0' }}>
            <p style={{ fontSize: '0.9rem', color: '#22c55e', marginBottom: '20px' }}>
              Reset link sent! Please check your email inbox.
            </p>
            <Button fullWidth variant="secondary" onClick={() => navigate('/auth/login')}>
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
