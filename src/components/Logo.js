import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const Logo = ({ width = 240, height = 80 }) => {
  return (
    <Box
      component={motion.div}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        width,
        height,
        '& svg': {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <img
        src={require('../assets/logo.svg').default}
        alt="Aitzaz Store"
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
};

export default Logo;
