import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Redirect to static HTML landing page
window.location.href = '/index.html';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
