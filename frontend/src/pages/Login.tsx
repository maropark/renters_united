import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import LoginModal from '../components/LoginModal'
import './Login.css';

const Login: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  

  return (
    <Container className="login-container">
      <Typography variant="h4" gutterBottom>
        Welcome to Our App
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Sign In / Sign Up
      </Button>
      <LoginModal open={isModalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default Login;