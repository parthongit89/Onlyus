import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 600,
    borderRadius: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const sizes = {
    sm: { padding: '8px 14px', fontSize: '0.85rem' },
    md: { padding: '12px 20px', fontSize: '0.95rem' },
    lg: { padding: '16px 28px', fontSize: '1.05rem' },
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #f07b42 0%, #e65c2b 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 14px rgba(240, 123, 66, 0.35)',
    },
    secondary: {
      background: '#262b34',
      color: '#f5f6f8',
    },
    outline: {
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: '#f5f6f8',
    },
    danger: {
      background: '#ef4444',
      color: '#ffffff',
    },
  };

  const combinedStyle = {
    ...baseStyle,
    ...sizes[size],
    ...variants[variant],
  };

  return (
    <button style={combinedStyle} className={className} {...props}>
      {children}
    </button>
  );
};
