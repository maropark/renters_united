import React, { useState, useCallback } from "react";
import NavBar from "./components/NavBar";
import AppRouter from "./appRouter/AppRouter";
import LoginModal from "./components/LoginModal";
import './App.css';


function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const handleCloseLoginModal = useCallback(() => setIsLoginModalOpen(false), []);
  return (
    <div className="App">
      <NavBar onOpenLoginModal={handleOpenLoginModal} />
      <div className="content">
        <AppRouter />
      </div>
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
}

export default App;
