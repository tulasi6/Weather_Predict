import React from 'react';
import Weather from './components/Weather';
import './styles/Weather.css';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className='heading01'>Weather Now</h1>
        <p className="tagline">Quick current weather for any city</p>
      </header>

      <main>
        <Weather />
      </main>

      <footer className="app-footer">
        <small>Data from Open-Meteo • No API key required</small>
      </footer>
    </div>
  );
}
