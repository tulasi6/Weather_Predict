import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/Weather.css';


// Dynamically adjust viewport scale based on device width
(function() {
  const metaViewport = document.getElementById('viewport-meta');
  const screenWidth = window.innerWidth;

  let scale = 1;

  // Adjust scale for different device widths
  if (screenWidth < 360) {
    scale = 0.8;  // very small phones
  } else if (screenWidth < 480) {
    scale = 0.85; // small phones
  } else if (screenWidth < 768) {
    scale = 0.9;  // medium phones
  } else {
    scale = 1;    // tablets/desktops
  }

  metaViewport.setAttribute(
    'content',
    `width=device-width, initial-scale=${scale}, maximum-scale=1, user-scalable=yes`
  );
})();

createRoot(document.getElementById('root')).render(<App />);
