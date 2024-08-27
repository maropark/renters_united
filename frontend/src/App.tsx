import React, { useState, useCallback } from "react";
import NavBar from "./components/NavBar";
import AppRouter from "./appRouter/AppRouter";
import LoginModal from "./components/LoginModal";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const handleCloseLoginModal = useCallback(() => setIsLoginModalOpen(false), []);
  return (
    <div className="App">
      <NavBar onOpenLoginModal={handleOpenLoginModal} />
      <AppRouter />
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
}

export default App;
