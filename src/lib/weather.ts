import { WeatherData, ProcessedWeatherData, WeatherCodeMap } from '@/types/weather'

// Weather code mapping based on WMO Weather interpretation codes
export const WEATHER_CODES: WeatherCodeMap = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  56: { description: 'Light freezing drizzle', icon: '🌨️' },
  57: { description: 'Dense freezing drizzle', icon: '🌨️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  66: { description: 'Light freezing rain', icon: '🌨️' },
  67: { description: 'Heavy freezing rain', icon: '🌨️' },
  71: { description: 'Slight snow fall', icon: '🌨️' },
  73: { description: 'Moderate snow fall', icon: '❄️' },
  75: { description: 'Heavy snow fall', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌧️' },
  82: { description: 'Violent rain showers', icon: '⛈️' },
  85: { description: 'Slight snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
}

export function getWeatherDescription(code: number): string {
  return WEATHER_CODES[code]?.description || 'Unknown'
}

export function getWeatherIcon(code: number): string {
  return WEATHER_CODES[code]?.icon || '❓'
}

export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  
  url.searchParams.set('latitude', latitude.toString())
  url.searchParams.set('longitude', longitude.toString())
  url.searchParams.set('hourly', 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m')
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum')
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('forecast_days', '7')
  
  const response = await fetch(url.toString())
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
  }
  
  return response.json()
}

export function processWeatherData(data: WeatherData, units: string = 'celsius'): ProcessedWeatherData {
  const now = new Date()
  const currentHour = now.getHours()
  
  // Find the current hour's index (today's data)
  const currentIndex = data.hourly.time.findIndex(time => {
    const timeDate = new Date(time)
    return timeDate.getDate() === now.getDate() && timeDate.getHours() === currentHour
  })
  
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0
  
  // Process current weather
  const current = {
    temperature: convertTemperature(Math.round(data.hourly.temperature_2m[safeCurrentIndex] || 0), units),
    humidity: data.hourly.relative_humidity_2m[safeCurrentIndex] || 0,
    windSpeed: Math.round(data.hourly.wind_speed_10m[safeCurrentIndex] || 0),
    windDirection: data.hourly.wind_direction_10m[safeCurrentIndex] || 0,
    weatherCode: data.hourly.weather_code[safeCurrentIndex] || 0,
    weatherDescription: getWeatherDescription(data.hourly.weather_code[safeCurrentIndex] || 0)
  }
  
  // Process next 24 hours
  const hourly = data.hourly.time.slice(0, 24).map((time, index) => ({
    time: new Date(time).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    }),
    temperature: convertTemperature(Math.round(data.hourly.temperature_2m[index] || 0), units),
    humidity: data.hourly.relative_humidity_2m[index] || 0,
    weatherCode: data.hourly.weather_code[index] || 0,
    weatherDescription: getWeatherDescription(data.hourly.weather_code[index] || 0)
  }))
  
  // Process daily forecast
  const daily = data.daily.time.map((date, index) => ({
    date: new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    }),
    maxTemp: convertTemperature(Math.round(data.daily.temperature_2m_max[index] || 0), units),
    minTemp: convertTemperature(Math.round(data.daily.temperature_2m_min[index] || 0), units),
    weatherCode: data.daily.weather_code[index] || 0,
    weatherDescription: getWeatherDescription(data.daily.weather_code[index] || 0),
    precipitation: Math.round((data.daily.precipitation_sum[index] || 0) * 10) / 10
  }))
  
  return {
    current,
    hourly,
    daily
  }
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5) + 32)
}

export function convertTemperature(temperature: number, unit: string): number {
  if (unit === 'fahrenheit') {
    return celsiusToFahrenheit(temperature)
  }
  return temperature // Default to Celsius
}

export function getTemperatureUnit(unit: string): string {
  return unit === 'fahrenheit' ? '°F' : '°C'
} 