import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

// Add any providers here that your components need
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { customRender as render };

// Custom test utilities
export const createMockWeatherData = () => ({
  location: "New York",
  temperature: 72,
  condition: "Sunny",
  humidity: 65,
  windSpeed: 8,
  forecast: [
    { day: "Today", high: 75, low: 68, condition: "Sunny" },
    { day: "Tomorrow", high: 78, low: 70, condition: "Partly Cloudy" },
  ],
});

export const waitForLoadingToFinish = () => {
  return new Promise((resolve) => setTimeout(resolve, 0));
};
