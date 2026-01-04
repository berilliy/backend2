const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

const apiKey = process.env.WEATHER_API_KEY;
const newsApiKey = process.env.NEWS_API_KEY;

app.get('/weather/:city', async (req, res) => {
    try {
        const city = req.params.city

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response  = await fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            const weatherData = {
                city: data.name,
                temperature: data.main.temp,
                feelsLike: data.main.feels_like,
                description: data.weather[0].description,
                coordinates: {
                    lat: data.coord.lat,
                    lon: data.coord.lon
                },
                windSpeed: data.wind.speed,
                countryCode: data.sys.country,
                rainVolume: data.rain ? data.rain['3h'] || 0 : 0,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                icon: data.weather[0].icon
            };
            
            fetch(`http://localhost:3000/api/news/${data.sys.country}`)
            .then(res => res.json())
            .then(newsData => {
                res.json({
                success: true,
                data: weatherData,
                news: newsData
            });
            })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})

app.get('/api/news/:country', async (req, res) => {
  try {
    const country = req.params.country.toLowerCase();
    
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsApiKey}&pageSize=5`;
    const response  = await fetch(newsUrl)
        .then(res => res.json())
        .then(data => {
            const articles = data.articles.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                image: article.urlToImage,
                publishedAt: article.publishedAt,
                source: article.source.name
            }));
            
            res.json({
                success: true,
                data: articles
            });
        })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
        success: false,
        error: err.message
    });
  }
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});