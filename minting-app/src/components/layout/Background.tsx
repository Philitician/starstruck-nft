import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface BackgroundProps {
  children: ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  return (
    <Box
      id='background'
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(/bg.svg)`,
        height: '100vh',
      }}
    >
      {children}
    </Box>
  );
};

export default Background;
