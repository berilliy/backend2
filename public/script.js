async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    hideAll();
    document.getElementById('loading').classList.remove('hidden');
    
    try {
        const response = await fetch(`http://localhost:3000/weather/${city}`);
        const data = await response.json();
        
        if (!data.success) {
            throw new Error('City not found');
        }
        
        displayWeather(data.data);
        displayNews(data.news.data);
        
    } catch (err) {
        showError(err.message);
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.city}, ${data.countryCode}`;
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    document.getElementById('temp').textContent = `${Math.round(data.temperature)}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('feels').textContent = `${Math.round(data.feelsLike)}°C`;
    document.getElementById('wind').textContent = `${data.windSpeed} m/s`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('rain').textContent = `${data.rainVolume} mm`;
    
    document.getElementById('weather').classList.remove('hidden');
}

function displayNews(articles) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';
    
    articles.forEach(article => {
        const item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML = `
            ${article.image ? `<img src="${article.image}" class="news-img">` : ''}
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read more →</a>
        `;
        newsList.appendChild(item);
    });
    
    document.getElementById('news').classList.remove('hidden');
}

function showError(message) {
    const error = document.getElementById('error');
    error.textContent = message;
    error.classList.remove('hidden');
}

function hideAll() {
    document.getElementById('error').classList.add('hidden');
    document.getElementById('weather').classList.add('hidden');
    document.getElementById('news').classList.add('hidden');
}

document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});