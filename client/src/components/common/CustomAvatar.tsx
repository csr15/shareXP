import React, { useMemo } from 'react';

interface CustomAvatarProps {
  width?: string;
  height?: string;
}

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const CustomAvatar: React.FC<CustomAvatarProps> = ({ width = '100px', height = '100px' }) => {
  const colors = useMemo(() => ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'], []);
  const initials = useMemo(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);
  const bgColor = useMemo(() => pickRandom(colors), [colors]);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: '50%',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `calc(${width} * 0.4)`,
        color: '#fff',
        fontWeight: 700,
      }}
    >
      {initials}
    </div>
  );
};

export default React.memo(CustomAvatar);
