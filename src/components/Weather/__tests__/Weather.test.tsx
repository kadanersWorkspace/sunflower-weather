import { render, screen } from "@testing-library/react";
import WeatherCard from "../WeatherCard";
import HourlyForecast from "../HourlyForecast";
import DailyForecast from "../DailyForecast";
import WeatherLoadingSkeleton from "../WeatherLoadingSkeleton";

// Mock weather data
const mockWeatherCardProps = {
  temperature: 22,
  humidity: 65,
  windSpeed: 15,
  windDirection: "NW",
  weatherDescription: "partly cloudy",
  weatherIcon: "⛅",
  tempUnit: "°C",
};

const mockHourlyData = [
  {
    time: "12 PM",
    temperature: 22,
    humidity: 65,
    weatherCode: 2,
    weatherDescription: "Partly cloudy",
  },
  {
    time: "1 PM",
    temperature: 24,
    humidity: 62,
    weatherCode: 1,
    weatherDescription: "Mainly clear",
  },
  {
    time: "2 PM",
    temperature: 26,
    humidity: 58,
    weatherCode: 0,
    weatherDescription: "Clear sky",
  },
];

const mockDailyData = [
  {
    date: "Mon, Jan 1",
    maxTemp: 25,
    minTemp: 12,
    weatherCode: 1,
    weatherDescription: "Mainly clear",
    precipitation: 0,
  },
  {
    date: "Tue, Jan 2",
    maxTemp: 22,
    minTemp: 10,
    weatherCode: 61,
    weatherDescription: "Slight rain",
    precipitation: 2.5,
  },
  {
    date: "Wed, Jan 3",
    maxTemp: 28,
    minTemp: 15,
    weatherCode: 0,
    weatherDescription: "Clear sky",
    precipitation: 0,
  },
];

describe("Weather Components", () => {
  describe("WeatherCard", () => {
    it("renders weather card with all information", () => {
      render(<WeatherCard {...mockWeatherCardProps} />);

      expect(screen.getByText("22°C")).toBeInTheDocument();
      expect(screen.getByText("partly cloudy")).toBeInTheDocument();
      expect(screen.getByText("⛅")).toBeInTheDocument();
      expect(screen.getByText("65%")).toBeInTheDocument();
      expect(screen.getByText("15 km/h")).toBeInTheDocument();
      expect(screen.getByText("NW")).toBeInTheDocument();
    });

    it("displays humidity section correctly", () => {
      render(<WeatherCard {...mockWeatherCardProps} />);

      expect(screen.getByText("Humidity")).toBeInTheDocument();
      expect(screen.getByText("💧")).toBeInTheDocument();
    });

    it("displays wind speed section correctly", () => {
      render(<WeatherCard {...mockWeatherCardProps} />);

      expect(screen.getByText("Wind Speed")).toBeInTheDocument();
      expect(screen.getByText("💨")).toBeInTheDocument();
    });

    it("displays wind direction section correctly", () => {
      render(<WeatherCard {...mockWeatherCardProps} />);

      expect(screen.getByText("Wind Direction")).toBeInTheDocument();
      expect(screen.getByText("🧭")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      const { container } = render(<WeatherCard {...mockWeatherCardProps} />);

      const card = container.firstChild;
      expect(card).toHaveClass(
        "bg-white",
        "rounded-xl",
        "shadow-sm",
        "border",
        "p-6"
      );
    });

    it("capitalizes weather description", () => {
      const propsWithLowercase = {
        ...mockWeatherCardProps,
        weatherDescription: "partly cloudy",
      };

      render(<WeatherCard {...propsWithLowercase} />);

      const description = screen.getByText("partly cloudy");
      expect(description).toHaveClass("capitalize");
    });
  });

  describe("HourlyForecast", () => {
    it("renders all hourly data items", () => {
      render(<HourlyForecast hourlyData={mockHourlyData} tempUnit="°C" />);

      expect(screen.getByText("12 PM")).toBeInTheDocument();
      expect(screen.getByText("1 PM")).toBeInTheDocument();
      expect(screen.getByText("2 PM")).toBeInTheDocument();
    });

    it("displays temperatures correctly", () => {
      render(<HourlyForecast hourlyData={mockHourlyData} tempUnit="°C" />);

      expect(screen.getByText("22°C")).toBeInTheDocument();
      expect(screen.getByText("24°C")).toBeInTheDocument();
      expect(screen.getByText("26°C")).toBeInTheDocument();
    });

    it("displays humidity information", () => {
      render(<HourlyForecast hourlyData={mockHourlyData} tempUnit="°C" />);

      expect(screen.getByText("65% humidity")).toBeInTheDocument();
      expect(screen.getByText("62% humidity")).toBeInTheDocument();
      expect(screen.getByText("58% humidity")).toBeInTheDocument();
    });

    it("applies correct scrollable layout", () => {
      const { container } = render(
        <HourlyForecast hourlyData={mockHourlyData} tempUnit="°C" />
      );

      const scrollContainer = container.querySelector(".overflow-x-auto");
      expect(scrollContainer).toBeInTheDocument();

      const flexContainer = container.querySelector(".flex.space-x-4");
      expect(flexContainer).toBeInTheDocument();
    });

    it("handles empty hourly data", () => {
      const { container } = render(
        <HourlyForecast hourlyData={[]} tempUnit="°C" />
      );

      expect(container.firstChild).toBeInTheDocument();

      // Should not have any hourly items
      expect(screen.queryByText("PM")).not.toBeInTheDocument();
      expect(screen.queryByText("AM")).not.toBeInTheDocument();
    });

    it("applies minimum width to prevent wrapping", () => {
      const { container } = render(
        <HourlyForecast hourlyData={mockHourlyData} tempUnit="°C" />
      );

      const hourlyItems = container.querySelectorAll(".min-w-\\[120px\\]");
      expect(hourlyItems).toHaveLength(3);
    });
  });

  describe("DailyForecast", () => {
    it("renders all daily forecast items", () => {
      render(<DailyForecast dailyData={mockDailyData} tempUnit="°C" />);

      expect(screen.getByText("Mon, Jan 1")).toBeInTheDocument();
      expect(screen.getByText("Tue, Jan 2")).toBeInTheDocument();
      expect(screen.getByText("Wed, Jan 3")).toBeInTheDocument();
    });

    it("displays temperature ranges correctly", () => {
      render(<DailyForecast dailyData={mockDailyData} tempUnit="°C" />);

      expect(screen.getByText("25°C")).toBeInTheDocument();
      expect(screen.getByText("12°C")).toBeInTheDocument();
      expect(screen.getByText("22°C")).toBeInTheDocument();
      expect(screen.getByText("10°C")).toBeInTheDocument();
    });

    it("displays weather descriptions", () => {
      render(<DailyForecast dailyData={mockDailyData} tempUnit="°C" />);

      expect(screen.getByText("Mainly clear")).toBeInTheDocument();
      expect(screen.getByText("Slight rain")).toBeInTheDocument();
      expect(screen.getByText("Clear sky")).toBeInTheDocument();
    });

    it("shows precipitation when greater than 0", () => {
      render(<DailyForecast dailyData={mockDailyData} tempUnit="°C" />);

      expect(screen.getByText("2.5mm")).toBeInTheDocument();

      // Check for precipitation indicator specifically (not weather icon)
      const precipitationIndicators = screen.getAllByText("🌧️");
      expect(precipitationIndicators.length).toBeGreaterThan(0);
    });

    it("hides precipitation when 0", () => {
      render(<DailyForecast dailyData={mockDailyData} tempUnit="°C" />);

      // Check for precipitation mm text instead of emoji (since emoji appears in weather icons too)
      expect(screen.getByText("2.5mm")).toBeInTheDocument();
      expect(screen.queryByText("0mm")).not.toBeInTheDocument();
      expect(screen.queryByText("0.0mm")).not.toBeInTheDocument();
    });

    it("handles empty daily data", () => {
      const { container } = render(
        <DailyForecast dailyData={[]} tempUnit="°C" />
      );

      expect(container.firstChild).toBeInTheDocument();

      // Should not have any daily items
      expect(screen.queryByText("Jan")).not.toBeInTheDocument();
    });

    it("capitalizes weather descriptions", () => {
      render(<DailyForecast dailyData={mockDailyData} tempUnit="°C" />);

      const descriptions = screen.getAllByText(/clear|rain/);
      descriptions.forEach((description) => {
        expect(description).toHaveClass("capitalize");
      });
    });
  });

  describe("WeatherLoadingSkeleton", () => {
    it("renders loading skeleton structure", () => {
      render(<WeatherLoadingSkeleton />);

      // Should have animate-pulse elements
      const pulseElements = document.querySelectorAll(".animate-pulse");
      expect(pulseElements.length).toBeGreaterThan(0);
    });

    it("renders header skeleton", () => {
      const { container } = render(<WeatherLoadingSkeleton />);

      const headerSection = container.querySelector(
        ".bg-white.shadow-sm.border-b"
      );
      expect(headerSection).toBeInTheDocument();
    });

    it("renders current weather skeleton", () => {
      const { container } = render(<WeatherLoadingSkeleton />);

      const weatherCards = container.querySelectorAll(
        ".bg-white.rounded-xl.shadow-sm.border"
      );
      expect(weatherCards.length).toBeGreaterThan(0);
    });

    it("renders hourly forecast skeleton", () => {
      const { container } = render(<WeatherLoadingSkeleton />);

      const hourlyItems = container.querySelectorAll(".min-w-\\[120px\\]");
      expect(hourlyItems).toHaveLength(6); // 6 hourly skeleton items
    });

    it("renders daily forecast skeleton", () => {
      const { container } = render(<WeatherLoadingSkeleton />);

      const dailyItems = container.querySelectorAll(".bg-gray-50.rounded-lg");
      expect(dailyItems.length).toBeGreaterThan(7); // At least 7 daily items + hourly items
    });

    it("has proper background and layout", () => {
      const { container } = render(<WeatherLoadingSkeleton />);

      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass("min-h-screen", "bg-gray-50");
    });

    it("uses consistent gray color scheme", () => {
      const { container } = render(<WeatherLoadingSkeleton />);

      const grayElements = container.querySelectorAll(".bg-gray-200");
      expect(grayElements.length).toBeGreaterThan(0);
    });
  });

  describe("Weather Components Integration", () => {
    it("all components render without errors", () => {
      expect(() =>
        render(<WeatherCard {...mockWeatherCardProps} />)
      ).not.toThrow();
      expect(() =>
        render(<HourlyForecast hourlyData={mockHourlyData} />)
      ).not.toThrow();
      expect(() =>
        render(<DailyForecast dailyData={mockDailyData} />)
      ).not.toThrow();
      expect(() => render(<WeatherLoadingSkeleton />)).not.toThrow();
    });

    it("components use consistent styling patterns", () => {
      const { container: weatherCard } = render(
        <WeatherCard {...mockWeatherCardProps} />
      );
      const { container: hourlyForecast } = render(
        <HourlyForecast hourlyData={mockHourlyData} />
      );
      const { container: dailyForecast } = render(
        <DailyForecast dailyData={mockDailyData} />
      );

      // All should use white background with rounded corners and borders
      const whiteCards = [
        weatherCard.querySelector(".bg-white.rounded-xl"),
        hourlyForecast.querySelector(".bg-white.rounded-xl"),
        dailyForecast.querySelector(".bg-white.rounded-xl"),
      ];

      whiteCards.forEach((card) => {
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass("shadow-sm", "border");
      });
    });
  });
});
