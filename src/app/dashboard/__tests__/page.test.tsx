// NOTE: This test demonstrates the limitations of testing async Server Components with Jest
// Currently, Jest cannot properly test async Server Components that fetch data
// For components like this, you should use E2E testing with Playwright or Cypress

import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/Card/Card";

// Instead of testing the async server component, we can test the components it uses
describe("Dashboard Page Components", () => {
  it("renders city card components correctly", () => {
    // Test the individual components that the page uses
    const mockCity = {
      id: 1,
      name: "Barcelona",
      description: "Barcelona is a city on the coast of northeastern Spain.",
    };

    render(
      <Card data-testid="city-card">
        <CardHeader>
          <CardTitle>{mockCity.name}</CardTitle>
          <CardDescription>{mockCity.description}</CardDescription>
        </CardHeader>
      </Card>
    );

    expect(screen.getByText("Barcelona")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Barcelona is a city on the coast of northeastern Spain."
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("city-card")).toBeInTheDocument();
  });

  it("renders multiple city cards", () => {
    const mockCities = [
      { id: 1, name: "Barcelona", description: "City in Spain" },
      { id: 2, name: "Tokyo", description: "Capital of Japan" },
    ];

    render(
      <div data-testid="dashboard-page">
        {mockCities.map((city) => (
          <Card data-testid="city-card" key={city.id}>
            <CardHeader>
              <CardTitle>{city.name}</CardTitle>
              <CardDescription>{city.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    );

    expect(screen.getByText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getAllByTestId("city-card")).toHaveLength(2);
  });
});

/*
  IMPORTANT: The actual Dashboard page component cannot be tested with Jest because:
  
  1. It's an async Server Component
  2. It uses fetch() to get data from an API
  3. Jest doesn't support the server environment properly for this
  
  To test the full Dashboard page behavior, you should use:
  - Playwright (recommended)
  - Cypress
  - Other E2E testing tools
  
  These tools can:
  - Start your Next.js server
  - Make real HTTP requests
  - Test the complete user experience
  - Verify that data loads and renders correctly
*/
