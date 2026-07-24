import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';

export const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (val: string, index: number) => {
    if (val.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
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
          maxWidth: '380px',
          backgroundColor: '#16191e',
          borderRadius: '24px',
          padding: '32px 28px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '8px',
          }}
        >
          OTP Verification
        </h2>
        <p
          style={{
            fontSize: '0.88rem',
            color: '#9da4b0',
            marginBottom: '28px',
          }}
        >
          Enter the 4-digit code sent to your invite email
        </p>

        {!isSubmitted ? (
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
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    outline: 'none',
                  }}
                />
              ))}
            </div>

            <Button fullWidth type="submit" size="lg">
              Verify Code
            </Button>
          </form>
        ) : (
          <div style={{ padding: '16px 0' }}>
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px' }}>
              Pending Admin Approval
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#9da4b0', lineHeight: 1.5, marginBottom: '24px' }}>
              Your account has been created and is waiting for administrator approval. You will receive access once approved.
            </p>
            <Button fullWidth variant="secondary" onClick={() => navigate('/chats')}>
              Proceed to Dashboard (Demo View)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
