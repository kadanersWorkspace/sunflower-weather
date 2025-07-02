import { 
  getWeatherDescription, 
  getWeatherIcon, 
  processWeatherData, 
  getWindDirection,
  celsiusToFahrenheit,
  convertTemperature,
  getTemperatureUnit,
  WEATHER_CODES 
} from '../weather'

// Mock weather data for testing
const mockWeatherData = {
  latitude: 52.52,
  longitude: 13.41,
  generationtime_ms: 0.1,
  utc_offset_seconds: 3600,
  timezone: "Europe/Berlin",
  timezone_abbreviation: "CET",
  elevation: 74,
  hourly_units: {
    time: "iso8601",
    temperature_2m: "°C",
    relative_humidity_2m: "%",
    weather_code: "wmo code",
    wind_speed_10m: "km/h",
    wind_direction_10m: "°"
  },
  hourly: {
    time: [
      "2024-01-01T00:00",
      "2024-01-01T01:00",
      "2024-01-01T02:00",
      "2024-01-01T03:00"
    ],
    temperature_2m: [5.2, 4.8, 4.5, 4.1],
    relative_humidity_2m: [85, 87, 88, 89],
    weather_code: [1, 2, 3, 61],
    wind_speed_10m: [12.5, 13.2, 11.8, 10.5],
    wind_direction_10m: [180, 185, 175, 170]
  },
  daily_units: {
    time: "iso8601",
    weather_code: "wmo code",
    temperature_2m_max: "°C",
    temperature_2m_min: "°C",
    precipitation_sum: "mm"
  },
  daily: {
    time: ["2024-01-01", "2024-01-02", "2024-01-03"],
    weather_code: [1, 61, 71],
    temperature_2m_max: [8.5, 12.3, 6.8],
    temperature_2m_min: [2.1, 5.4, 1.2],
    precipitation_sum: [0.0, 5.2, 2.1]
  }
}

describe('Weather Utilities', () => {
  describe('getWeatherDescription', () => {
    it('returns correct description for clear sky', () => {
      expect(getWeatherDescription(0)).toBe('Clear sky')
    })

    it('returns correct description for partly cloudy', () => {
      expect(getWeatherDescription(2)).toBe('Partly cloudy')
    })

    it('returns correct description for rain', () => {
      expect(getWeatherDescription(61)).toBe('Slight rain')
    })

    it('returns correct description for snow', () => {
      expect(getWeatherDescription(71)).toBe('Slight snow fall')
    })

    it('returns correct description for thunderstorm', () => {
      expect(getWeatherDescription(95)).toBe('Thunderstorm')
    })

    it('returns "Unknown" for invalid weather code', () => {
      expect(getWeatherDescription(999)).toBe('Unknown')
    })

    it('returns "Unknown" for undefined weather code', () => {
      expect(getWeatherDescription(undefined as any)).toBe('Unknown')
    })
  })

  describe('getWeatherIcon', () => {
    it('returns correct icon for clear sky', () => {
      expect(getWeatherIcon(0)).toBe('☀️')
    })

    it('returns correct icon for partly cloudy', () => {
      expect(getWeatherIcon(2)).toBe('⛅')
    })

    it('returns correct icon for rain', () => {
      expect(getWeatherIcon(61)).toBe('🌧️')
    })

    it('returns correct icon for snow', () => {
      expect(getWeatherIcon(71)).toBe('🌨️')
    })

    it('returns correct icon for thunderstorm', () => {
      expect(getWeatherIcon(95)).toBe('⛈️')
    })

    it('returns "❓" for invalid weather code', () => {
      expect(getWeatherIcon(999)).toBe('❓')
    })
  })

  describe('getWindDirection', () => {
    it('returns "N" for north wind (0 degrees)', () => {
      expect(getWindDirection(0)).toBe('N')
    })

    it('returns "E" for east wind (90 degrees)', () => {
      expect(getWindDirection(90)).toBe('E')
    })

    it('returns "S" for south wind (180 degrees)', () => {
      expect(getWindDirection(180)).toBe('S')
    })

    it('returns "W" for west wind (270 degrees)', () => {
      expect(getWindDirection(270)).toBe('W')
    })

    it('returns "NE" for northeast wind (45 degrees)', () => {
      expect(getWindDirection(45)).toBe('NE')
    })

    it('returns correct direction for values wrapping around 360', () => {
      expect(getWindDirection(360)).toBe('N')
    })

    it('handles fractional degrees correctly', () => {
      expect(getWindDirection(22.5)).toBe('NNE')
    })
  })

  describe('processWeatherData', () => {
    it('processes weather data correctly', () => {
      const result = processWeatherData(mockWeatherData)

      expect(result).toHaveProperty('current')
      expect(result).toHaveProperty('hourly')
      expect(result).toHaveProperty('daily')
    })

    it('processes current weather correctly', () => {
      const result = processWeatherData(mockWeatherData)

      expect(result.current.temperature).toBe(5) // Rounded from 5.2
      expect(result.current.humidity).toBe(85)
      expect(result.current.windSpeed).toBe(13) // Rounded from 12.5
      expect(result.current.windDirection).toBe(180)
      expect(result.current.weatherCode).toBe(1)
      expect(result.current.weatherDescription).toBe('Mainly clear')
    })

    it('processes hourly data correctly', () => {
      const result = processWeatherData(mockWeatherData)

      expect(result.hourly).toHaveLength(4)
      expect(result.hourly[0]).toHaveProperty('time')
      expect(result.hourly[0]).toHaveProperty('temperature')
      expect(result.hourly[0]).toHaveProperty('humidity')
      expect(result.hourly[0]).toHaveProperty('weatherCode')
      expect(result.hourly[0]).toHaveProperty('weatherDescription')

      expect(result.hourly[0].temperature).toBe(5) // Rounded from 5.2
      expect(result.hourly[0].humidity).toBe(85)
      expect(result.hourly[0].weatherCode).toBe(1)
    })

    it('processes daily data correctly', () => {
      const result = processWeatherData(mockWeatherData)

      expect(result.daily).toHaveLength(3)
      expect(result.daily[0]).toHaveProperty('date')
      expect(result.daily[0]).toHaveProperty('maxTemp')
      expect(result.daily[0]).toHaveProperty('minTemp')
      expect(result.daily[0]).toHaveProperty('weatherCode')
      expect(result.daily[0]).toHaveProperty('weatherDescription')
      expect(result.daily[0]).toHaveProperty('precipitation')

      expect(result.daily[0].maxTemp).toBe(9) // Rounded from 8.5
      expect(result.daily[0].minTemp).toBe(2) // Rounded from 2.1
      expect(result.daily[0].weatherCode).toBe(1)
      expect(result.daily[0].precipitation).toBe(0.0)
      expect(result.daily[1].precipitation).toBe(5.2)
    })

    it('handles missing data gracefully', () => {
      const incompleteData = {
        ...mockWeatherData,
        hourly: {
          time: [],
          temperature_2m: [],
          relative_humidity_2m: [],
          weather_code: [],
          wind_speed_10m: [],
          wind_direction_10m: []
        },
        daily: {
          time: [],
          weather_code: [],
          temperature_2m_max: [],
          temperature_2m_min: [],
          precipitation_sum: []
        }
      }

      const result = processWeatherData(incompleteData)

      expect(result.current.temperature).toBe(0)
      expect(result.current.humidity).toBe(0)
      expect(result.current.weatherDescription).toBe('Clear sky') // Default for code 0
      expect(result.hourly).toHaveLength(0)
      expect(result.daily).toHaveLength(0)
    })

    it('rounds precipitation correctly', () => {
      const result = processWeatherData(mockWeatherData)

      expect(result.daily[1].precipitation).toBe(5.2) // Should be rounded to 1 decimal
      expect(result.daily[2].precipitation).toBe(2.1)
    })
  })

  describe('WEATHER_CODES', () => {
    it('contains all expected weather codes', () => {
      const expectedCodes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99]
      
      expectedCodes.forEach(code => {
        expect(WEATHER_CODES).toHaveProperty(code.toString())
        expect(WEATHER_CODES[code]).toHaveProperty('description')
        expect(WEATHER_CODES[code]).toHaveProperty('icon')
      })
    })

    it('has valid descriptions and icons', () => {
      Object.values(WEATHER_CODES).forEach(weather => {
        expect(weather.description).toBeTruthy()
        expect(weather.icon).toBeTruthy()
        expect(typeof weather.description).toBe('string')
        expect(typeof weather.icon).toBe('string')
      })
    })
  })

  describe('Temperature Conversion', () => {
    describe('celsiusToFahrenheit', () => {
      it('converts 0°C to 32°F', () => {
        expect(celsiusToFahrenheit(0)).toBe(32)
      })

      it('converts 100°C to 212°F', () => {
        expect(celsiusToFahrenheit(100)).toBe(212)
      })

      it('converts 20°C to 68°F', () => {
        expect(celsiusToFahrenheit(20)).toBe(68)
      })

      it('converts negative temperatures correctly', () => {
        expect(celsiusToFahrenheit(-10)).toBe(14)
      })

      it('rounds results to nearest integer', () => {
        expect(celsiusToFahrenheit(21)).toBe(70) // 69.8 rounded to 70
      })
    })

    describe('convertTemperature', () => {
      it('returns original temperature for celsius', () => {
        expect(convertTemperature(25, 'celsius')).toBe(25)
      })

      it('converts to fahrenheit when unit is fahrenheit', () => {
        expect(convertTemperature(25, 'fahrenheit')).toBe(77)
      })

      it('defaults to celsius for unknown units', () => {
        expect(convertTemperature(25, 'unknown')).toBe(25)
      })

      it('defaults to celsius for empty string', () => {
        expect(convertTemperature(25, '')).toBe(25)
      })
    })

    describe('getTemperatureUnit', () => {
      it('returns °C for celsius', () => {
        expect(getTemperatureUnit('celsius')).toBe('°C')
      })

      it('returns °F for fahrenheit', () => {
        expect(getTemperatureUnit('fahrenheit')).toBe('°F')
      })

      it('defaults to °C for unknown units', () => {
        expect(getTemperatureUnit('unknown')).toBe('°C')
      })

      it('defaults to °C for empty string', () => {
        expect(getTemperatureUnit('')).toBe('°C')
      })
    })
  })

  describe('processWeatherData with units', () => {
    it('processes temperatures in celsius by default', () => {
      const result = processWeatherData(mockWeatherData)
      expect(result.current.temperature).toBe(5) // Original celsius value rounded
    })

    it('processes temperatures in fahrenheit when specified', () => {
      const result = processWeatherData(mockWeatherData, 'fahrenheit')
      expect(result.current.temperature).toBe(41) // 5.2°C = 41.36°F, rounded to 41
    })

    it('converts hourly temperatures to fahrenheit', () => {
      const result = processWeatherData(mockWeatherData, 'fahrenheit')
      expect(result.hourly[0].temperature).toBe(41) // 5.2°C = 41.36°F, rounded to 41
      expect(result.hourly[1].temperature).toBe(41) // 4.8°C = 40.64°F, rounded to 41
    })

    it('converts daily temperatures to fahrenheit', () => {
      const result = processWeatherData(mockWeatherData, 'fahrenheit')
      expect(result.daily[0].maxTemp).toBe(48) // 8.5°C = 47.3°F, rounded to 48
      expect(result.daily[0].minTemp).toBe(36) // 2.1°C = 35.78°F, rounded to 36
    })

    it('handles unknown units by defaulting to celsius', () => {
      const result = processWeatherData(mockWeatherData, 'unknown')
      expect(result.current.temperature).toBe(5) // Should remain in celsius
    })
  })
}) 