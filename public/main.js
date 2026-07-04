const searchInput = document.getElementById('searchInput');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const loadingState = document.getElementById('loadingState');
const weatherContent = document.getElementById('weatherContent');

const ui = {
    currentTemp: document.getElementById('currentTemp'),
    cityName: document.getElementById('cityName'),
    weatherDesc: document.getElementById('weatherDesc'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    forecastContainer: document.getElementById('forecastContainer'),
    recIcon: document.getElementById('recIcon'),
    recText: document.getElementById('recText')
};

const getWeatherEmoji = (code) => {
    const map = {
        0: '☀️', 1: '🌤️', 2: '🌤️', 3: '☁️',
        45: '🌫️', 48: '🌫️', 
        51: '🌧️', 53: '🌧️', 55: '🌧️', 56: '🌧️', 57: '🌧️',
        61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
        80: '🌧️', 81: '🌧️', 82: '🌧️',
        71: '❄️', 73: '❄️', 75: '❄️', 77: '❄️', 85: '❄️', 86: '❄️',
        95: '⛈️', 96: '⛈️', 99: '⛈️'
    };
    return map[code] || '❓';
};

const getWeatherDesc = (code) => {
    if (code === 0) return 'Clear sky';
    if (code <= 3) return 'Partly cloudy';
    if (code <= 48) return 'Fog';
    if (code <= 67 || (code >= 80 && code <= 82)) return 'Rain';
    if (code <= 86) return 'Snow';
    if (code >= 95) return 'Thunderstorm';
    return 'Unknown';
};

const showState = (state) => {
    errorState.classList.add('hidden');
    loadingState.classList.add('hidden');
    weatherContent.classList.add('hidden');
    weatherContent.classList.remove('flex');
    if (state === 'error') errorState.classList.remove('hidden');
    if (state === 'loading') loadingState.classList.remove('hidden');
    if (state === 'content') {
        weatherContent.classList.remove('hidden');
        weatherContent.classList.add('flex');
    }
};

const fetchWeather = async (city) => {
    if (!city.trim()) return;
    showState('loading');
    
    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&format=json`);
        const geoData = await geoRes.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            errorMessage.textContent = "City not found. Please verify spelling and try again.";
            showState('error');
            return;
        }
        
        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        const displayName = `${location.name}${location.country ? `, ${location.country}` : ''}`;
        
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
        const weatherData = await weatherRes.json();
        
        updateUI(displayName, weatherData);
        showState('content');
    } catch (err) {
        errorMessage.textContent = "Network error. Please check your connection.";
        showState('error');
    }
};

const updateUI = (name, data) => {
    ui.cityName.textContent = name;
    ui.currentTemp.textContent = `${Math.round(data.current.temperature_2m)}°`;
    ui.weatherDesc.textContent = getWeatherDesc(data.current.weather_code);
    ui.humidity.textContent = `${data.current.relative_humidity_2m}%`;
    ui.windSpeed.textContent = `${data.current.wind_speed_10m} km/h`;
    
    // Forecast
    ui.forecastContainer.innerHTML = '';
    data.daily.time.forEach((time, index) => {
        const date = new Date(time + "T00:00:00");
        const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
        const max = Math.round(data.daily.temperature_2m_max[index]);
        const emoji = getWeatherEmoji(data.daily.weather_code[index]);
        const isToday = index === 0;
        
        const card = document.createElement('div');
        card.className = `shrink-0 w-16 p-3 rounded-2xl flex flex-col items-center justify-center snap-center transition-transform hover:scale-105 ${isToday ? 'bg-primaryContainer text-onPrimaryContainer shadow-sm border border-[#C6CBE0]' : 'bg-surface border border-outline text-onSurfaceVariant shadow-sm'}`;
        card.innerHTML = `
            <span class="text-[10px] font-bold mb-2 uppercase tracking-wider">${dayName}</span>
            <span class="text-2xl mb-2">${emoji}</span>
            <span class="text-[13px] font-bold text-onSurface">${max}°</span>
        `;
        ui.forecastContainer.appendChild(card);
    });
    
    // Recommendations
    const hasRain = data.daily.precipitation_probability_max.some(p => p > 50);
    const isHot = data.daily.temperature_2m_max.some(t => t > 30);
    const isCold = data.daily.temperature_2m_min.some(t => t < 5);
    
    if (hasRain) {
        ui.recIcon.textContent = '🌧️';
        ui.recText.textContent = "High chance of rain this week. Don't forget an umbrella!";
    } else if (isCold) {
        ui.recIcon.textContent = '🧥';
        ui.recText.textContent = "Temperatures will drop below 5°C. Pack warm clothing.";
    } else if (isHot) {
        ui.recIcon.textContent = '☀️';
        ui.recText.textContent = "Expect hot days over 30°C. Stay hydrated and use sun protection.";
    } else {
        ui.recIcon.textContent = '💡';
        ui.recText.textContent = "Perfect conditions for outdoor activities today. High visibility expected.";
    }
};

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather(searchInput.value);
    }
});

// Initial load
fetchWeather('Bengaluru');
