import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #f8a176 0%, #e67543 50%, #0d0f12 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '88px',
          height: '88px',
          borderRadius: '24px',
          backgroundColor: '#0d0f12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f07b42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>

      <h1
        style={{
          fontSize: '2.4rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '12px',
          letterSpacing: '-0.5px',
        }}
      >
        OnlyUs
      </h1>

      <p
        style={{
          fontSize: '1.05rem',
          color: 'rgba(255, 255, 255, 0.85)',
          maxWidth: '340px',
          lineHeight: '1.6',
          marginBottom: '40px',
        }}
      >
        Private, encrypted, invite-only communication for trusted friends & family.
      </p>

      <div style={{ width: '100%', maxWidth: '320px' }}>
        <Button fullWidth size="lg" onClick={() => navigate('/auth/login')}>
          Enter Application
        </Button>
      </div>
    </div>
  );
};
