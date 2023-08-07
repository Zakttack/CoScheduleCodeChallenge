import React, { useEffect } from 'react';

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
    <h1>{redirecturi}</h1>
  );
}

export default App;

