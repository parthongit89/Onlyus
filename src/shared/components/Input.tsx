import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '0.85rem', color: '#9da4b0', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          style={{
            width: '100%',
            padding: icon ? '12px 16px 12px 42px' : '12px 16px',
            backgroundColor: '#1e2229',
            border: error ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            color: '#f5f6f8',
            outline: 'none',
            fontSize: '0.95rem',
            transition: 'border-color 0.2s ease',
          }}
          className={className}
          {...props}
        />
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#626975',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </div>
        )}
      </div>
      {error && <span style={{ fontSize: '0.78rem', color: '#ef4444' }}>{error}</span>}
    </div>
  );
};
