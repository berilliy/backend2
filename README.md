# Weather & News Application

A full-stack Node.js application that provides real-time weather information and latest news based on city location.

## Features

- 🌤️ Real-time weather data from OpenWeather API
- 📰 Latest news from News API based on country
- 📱 Responsive design for all devices
- ⚡ Fast server-side API processing
- 🎨 Modern and clean UI

## APIs Used

1. **OpenWeather API** - Provides weather data including:
   - Temperature and feels-like temperature
   - Weather description
   - Coordinates (latitude/longitude)
   - Wind speed
   - Rain volume (last 3 hours)
   - Country code

2. **News API** - Provides:
   - Top headlines based on country code
   - Article titles, descriptions, and images
   - Publication dates and sources

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- API keys from:
  - [OpenWeather](https://openweathermap.org/api)
  - [News API](https://newsapi.org/)

### Setup Steps

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root directory:
```env
WEATHER_API_KEY=your_openweather_api_key
NEWS_API_KEY=your_news_api_key
PORT=3000
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

5. Open browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### GET /api/weather/:city
Fetches weather data for specified city

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "London",
    "temperature": 15.5,
    "feelsLike": 14.2,
    "description": "cloudy",
    "coordinates": { "lat": 51.51, "lon": -0.13 },
    "windSpeed": 5.2,
    "countryCode": "GB",
    "rainVolume": 0,
    "humidity": 72,
    "pressure": 1013
  }
}
```

### GET /api/news/:country
Fetches top 5 news headlines for specified country code

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "title": "News Title",
      "description": "News description",
      "url": "https://...",
      "image": "https://...",
      "publishedAt": "2024-01-15T10:30:00Z",
      "source": "BBC News"
    }
  ]
}
```
### Server-Side Architecture
- **Express.js** for routing and middleware
- **dotenv** for environment variable management
- **CORS** enabled for cross-origin requests

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **APIs:** OpenWeather API, News API

## Testing

Test the API endpoints using Postman or curl:
```bash
# Weather endpoint
curl http://localhost:3000/api/weather/London

# News endpoint
curl http://localhost:3000/api/news/GB
```

## Screenshots

<img width="1898" height="931" alt="image" src="https://github.com/user-attachments/assets/9095c5d7-3eff-49a7-ae02-477a79d4879c" />
