import React from 'react';
import { Container } from '@mui/material';
import LoginModal from '../components/LoginModal';

const FullPageLogin: React.FC = () => {
  return (
    <Container>
      <LoginModal open={true} onClose={() => {}} />
    </Container>
  );
};

export default FullPageLogin;