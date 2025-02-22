import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Welcome = () => {
  const [showGif, setShowGif] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show GIF for 3 seconds, then trigger reboot effect
    const gifTimer = setTimeout(() => {
      setShowGif(false);
      // Show main content after GIF disappears
      setTimeout(() => setShowContent(true), 500);
    }, 3000);

    // Function to handle AI voice greeting
    const playWelcomeMessage = () => {
      const messages = [
        { text: "Welcome to Aitzaz Store! I'm Sarah, your AI assistant.", voice: "female" },
        { text: "I'm John, and together with Sarah, we'll guide you through our amazing store.", voice: "male" },
        { text: "You can browse our products, manage your account, and get support anytime.", voice: "female" }
      ];

      let currentIndex = 0;

      const speakMessage = () => {
        if (currentIndex < messages.length) {
          const utterance = new SpeechSynthesisUtterance(messages[currentIndex].text);
          utterance.rate = 0.9;
          utterance.pitch = messages[currentIndex].voice === "female" ? 1.2 : 0.9;
          
          utterance.onend = () => {
            currentIndex++;
            setTimeout(speakMessage, 500);
          };

          window.speechSynthesis.speak(utterance);
        }
      };

      speakMessage();
    };

    // Start the welcome message after a short delay
    setTimeout(playWelcomeMessage, 1000);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <AnimatePresence>
        {showGif && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000',
              zIndex: 1000
            }}
          >
            <motion.img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2p6b3pxcGVvbTgydGJwMzE2ZXpqNmdjejJ2Z2RvM3M2YWNxN24wMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/29b9x2ulWMRWi6KugA/giphy.gif"
              alt="Welcome Animation"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Logo width={320} height={120} />
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Aitzaz Store
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph sx={{ mt: 4 }}>
              Experience shopping with our AI-powered assistance
            </Typography>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Welcome;
