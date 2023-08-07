import React, { useEffect } from 'react';
import { Home } from './components/Home';

function App() {
  const redirecturi = 'https://localhost:44469';
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('accessToken') !== null;
    if (!isAuthenticated) {
      fetch('/api/auth/login')
      .then((response) => response.json());
    }
  }, []);
  return (
    <Home></Home>
  );
}

export default App;

