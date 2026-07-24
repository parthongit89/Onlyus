import React from 'react';

export const Loader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        gap: '16px',
        color: '#9da4b0',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid rgba(240, 123, 66, 0.2)',
          borderTop: '3px solid #f07b42',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{text}</span>
    </div>
  );
};
