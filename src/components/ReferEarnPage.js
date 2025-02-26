import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import Navbar from './Navbar';
import ReferralModal from './ReferralModal';

const ReferEarnPage = ({ onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar onLogout={onLogout} />
      
      <Container maxWidth="md">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 4
            }}
          >
            Refer Friends & Earn Rewards
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 4 }}
          >
            Share your favorite courses with friends and earn exciting rewards when they enroll!
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenModal}
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.2rem',
              borderRadius: 2
            }}
          >
            Refer a Friend
          </Button>
        </Box>

        <Box sx={{ mt: 8, mb: 8 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              textAlign: 'center',
              mb: 4
            }}
          >
            How It Works
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 4
          }}>
            <Box sx={{ 
              textAlign: 'center',
              flex: '1 1 250px',
              maxWidth: 350
            }}>
              <Typography variant="h6" gutterBottom color="primary">
                1. Share Your Link
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Invite your friends using your unique referral link
              </Typography>
            </Box>

            <Box sx={{ 
              textAlign: 'center',
              flex: '1 1 250px',
              maxWidth: 350
            }}>
              <Typography variant="h6" gutterBottom color="primary">
                2. Friend Enrolls
              </Typography>
              <Typography variant="body1" color="text.secondary">
                When your friend enrolls using your link
              </Typography>
            </Box>

            <Box sx={{ 
              textAlign: 'center',
              flex: '1 1 250px',
              maxWidth: 350
            }}>
              <Typography variant="h6" gutterBottom color="primary">
                3. Earn Rewards
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get exciting rewards for successful referrals
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <ReferralModal
        open={isModalOpen}
        onClose={handleCloseModal}
        referrerName={user.username}
        referrerEmail={user.email}
      />
    </>
  );
};

export default ReferEarnPage;
