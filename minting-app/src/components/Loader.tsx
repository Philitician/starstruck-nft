import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress size={150} />
  </Box>
);

export default Loader;
