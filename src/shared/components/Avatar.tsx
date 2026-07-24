import React from 'react';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  isOnline,
}) => {
  const dimension = size === 'sm' ? '32px' : size === 'lg' ? '56px' : '44px';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div style={{ position: 'relative', width: dimension, height: dimension, flexShrink: 0 }}>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #262b34 0%, #1e2229 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f07b42',
            fontWeight: 600,
            fontSize: size === 'sm' ? '0.8rem' : size === 'lg' ? '1.3rem' : '1.05rem',
          }}
        >
          {initial}
        </div>
      )}
      {isOnline !== undefined && (
        <span
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#22c55e' : '#64748b',
            border: '2px solid #0d0f12',
          }}
        />
      )}
    </div>
  );
};
