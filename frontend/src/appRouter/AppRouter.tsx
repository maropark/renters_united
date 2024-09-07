import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Rent from '../pages/Rent';
import Buy from '../pages/Buy';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="home/rent" element={<Rent />} />
      <Route path="/buy" element={<Buy />} />
    </Routes>
  );
};

export default AppRouter;