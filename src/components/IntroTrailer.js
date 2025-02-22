import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Logo from './Logo';

const IntroTrailer = ({ onComplete }) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <motion.div
          variants={textVariants}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Logo width={400} height={150} />
        </motion.div>

        <motion.div
          variants={textVariants}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Your AI-Powered Shopping Experience
          </Typography>
        </motion.div>

        <motion.div
          variants={textVariants}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <Typography variant="h6">
            Discover • Shop • Experience
          </Typography>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default IntroTrailer;
