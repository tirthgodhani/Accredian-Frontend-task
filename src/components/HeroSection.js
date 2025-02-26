import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

const HeroSection = ({ onReferClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Share Knowledge,
              <br />
              Earn Rewards
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
              }}
            >
              Refer your friends to our courses and earn exciting rewards for every successful enrollment.
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={onReferClick}
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.2rem',
                boxShadow: theme.shadows[10],
              }}
            >
              Start Referring
            </Button>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: isMobile ? 'none' : 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Add hero image here */}
            <Box
              component="img"
              src="/hero-image.png"
              alt="Refer and Earn"
              sx={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
