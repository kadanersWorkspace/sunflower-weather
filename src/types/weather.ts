export interface WeatherData {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: {
    time: string
    temperature_2m: string
    relative_humidity_2m: string
    weather_code: string
    wind_speed_10m: string
    wind_direction_10m: string
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    weather_code: number[]
    wind_speed_10m: number[]
    wind_direction_10m: number[]
  }
  daily_units: {
    time: string
    weather_code: string
    temperature_2m_max: string
    temperature_2m_min: string
    precipitation_sum: string
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_sum: number[]
  }
}

export interface ProcessedWeatherData {
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    windDirection: number
    weatherCode: number
    weatherDescription: string
  }
  hourly: Array<{
    time: string
    temperature: number
    humidity: number
    weatherCode: number
    weatherDescription: string
  }>
  daily: Array<{
    date: string
    maxTemp: number
    minTemp: number
    weatherCode: number
    weatherDescription: string
    precipitation: number
  }>
}

export interface WeatherCodeMap {
  [key: number]: {
    description: string
    icon: string
  }
} 