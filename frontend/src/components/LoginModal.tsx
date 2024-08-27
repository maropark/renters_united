import React, { useEffect, useState } from 'react';
import { Modal, Box, Tabs, Tab, Button, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import '../styles/LoginModal.css';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, onClose]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {

    setTabValue(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In
  };

  const handleAppleSignIn = () => {
    // Implement Apple Sign In
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="login-modal">
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" type="email" fullWidth margin="normal" required />
          <TextField label="Password" type="password" fullWidth margin="normal" required />
          {tabValue === 1 && (
            <TextField label="Confirm Password" type="password" fullWidth margin="normal" required />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {tabValue === 0 ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ margin: '1rem 0' }}>
          Or sign in with:
        </Typography>
        <div className="social-buttons">
          <Button startIcon={<GoogleIcon />} onClick={handleGoogleSignIn} variant="outlined">
            Google
          </Button>
          <Button startIcon={<AppleIcon />} onClick={handleAppleSignIn} variant="outlined">
            Apple
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginModal;