import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Prevent dragging and long-press dragging for all images across the website
if (typeof window !== 'undefined') {
  document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
