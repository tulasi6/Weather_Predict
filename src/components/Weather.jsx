import React, { useState } from 'react';

// Small mapping from Open-Meteo weather codes to text
const weatherCodeMap = {
  0: 'Clear',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  95: 'Thunderstorm',
  99: 'Severe thunderstorm'
};

const geocodeUrl = (q) =>
  `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`;
const weatherUrl = (lat, lon) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&windspeed_unit=kmh`;

export default function Weather() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState('C');

  const convertTemp = (c) => {
    if (unit === 'C') return `${c.toFixed(1)} °C`;
    return `${(c * 9/5 + 32).toFixed(1)} °F`;
  };

  const handleSearch = async (e) => {
    e?.preventDefault?.();
    setError('');
    setData(null);

    const q = city.trim();
    if (!q) {
      setError('Please enter a city name.');
      return;
    }

    try {
      setLoading(true);
      // Geocode
      const gRes = await fetch(geocodeUrl(q));
      if (!gRes.ok) throw new Error('Geocoding error');
      const gJson = await gRes.json();

      if (!gJson.results || gJson.results.length === 0) {
        setError('City not found. Try adding country (e.g., "Paris, FR").');
        setLoading(false);
        return;
      }

      const top = gJson.results[0];
      const { latitude, longitude, name, country, admin1 } = top;

      // Weather
      const wRes = await fetch(weatherUrl(latitude, longitude));
      if (!wRes.ok) throw new Error('Weather fetch error');
      const wJson = await wRes.json();

      if (!wJson.current_weather) {
        setError('No current weather available for this location.');
        setLoading(false);
        return;
      }

      setData({
        city: name,
        region: admin1,
        country,
        lat: latitude,
        lon: longitude,
        weather: wJson.current_weather
      });
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-card">
      <form className="search-row" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search city (e.g., London, Bengaluru)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="city"
        />
        <button type="submit" className="btn">Search</button>

        <div className="unit-toggle" role="radiogroup" aria-label="Temperature unit">
          <label><input type="radio" name="unit" checked={unit==='C'} onChange={() => setUnit('C')} /> °C</label>
          <label><input type="radio" name="unit" checked={unit==='F'} onChange={() => setUnit('F')} /> °F</label>
        </div>
      </form>

      {loading && <div className="info">Loading…</div>}
      {error && <div className="error">{error}</div>}

      {data && (
        <div className="current-weather">
          <div className="left">
            <h2>{data.city}{data.region ? `, ${data.region}` : ''}{data.country ? ` • ${data.country}` : ''}</h2>
            <div className="temp">{convertTemp(data.weather.temperature)}</div>
            <div className="desc">{weatherCodeMap[data.weather.weathercode] || 'Unknown'}</div>
            <div className="meta">
              <span>Wind: {data.weather.windspeed} km/h</span>
              <span>Dir: {Math.round(data.weather.winddirection)}°</span>
              <span>Updated: {new Date(data.weather.time).toLocaleString()}</span>
            </div>
          </div>

          <div className="right">
            <div className="big-icon">
              {(() => {
                const code = data.weather.weathercode;
                if (code === 0) return '☀️';
                if ([1,2].includes(code)) return '🌤️';
                if (code === 3) return '☁️';
                if ([51,53,55,61,63,65].includes(code)) return '🌧️';
                if ([71,73,75].includes(code)) return '❄️';
                if ([95,99].includes(code)) return '⛈️';
                return '🌤️';
              })()}
            </div>
          </div>
        </div>
      )}

      <div className="notes">
        Tip: include country for ambiguous cities (e.g., "Springfield, US").
      </div>
    </div>
  );
}
