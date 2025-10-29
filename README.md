# Weather Now

A small React app to look up current weather conditions quickly for any city using the Open-Meteo APIs.

## Features
- Search a city name → shows current temperature, condition, wind, and observation time
- Use browser geolocation to get weather for your current location
- No API keys or registration required (uses Open-Meteo geocoding + weather)
- Simple, responsive UI and graceful error handling

## APIs used
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}`
- Current weather: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&timezone=auto`

## Run locally

1. Make sure you have Node.js (v18+ recommended) and npm installed.
2. Clone or copy project files into a folder `weather-now`.
3. In the project folder run:

```bash
npm install
npm run dev
