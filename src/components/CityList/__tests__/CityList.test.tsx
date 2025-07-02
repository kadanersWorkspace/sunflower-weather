import { render, screen } from "@testing-library/react";
import CityList from "../CityList";

// Mock city data
const mockCities = [
  {
    name: "Barcelona",
    continent: "Europe",
    active: true,
    country: "Spain",
    description: "Barcelona is a city on the coast of northeastern Spain.",
    image: "https://picsum.photos/id/402/500/500",
    coords: {
      lat: 41.390205,
      lng: 2.154007,
    },
    distanceFromTelAviv: 3064,
  },
  {
    name: "Tokyo",
    continent: "Asia",
    active: true,
    country: "Japan",
    description: "Tokyo is the capital and largest city of Japan.",
    image: "https://picsum.photos/id/401/500/500",
    coords: {
      lat: 35.689487,
      lng: 139.691711,
    },
    distanceFromTelAviv: 9159,
  },
  {
    name: "Cairo",
    continent: "Africa",
    active: true,
    country: "Egypt",
    description: "Cairo is the capital of Egypt.",
    image: "https://picsum.photos/id/400/500/500",
    coords: {
      lat: 30.044419,
      lng: 31.235712,
    },
    // No distance property to test optional distance
  },
];

describe("CityList Component", () => {
  it("renders all cities in a grid layout", () => {
    render(<CityList cities={mockCities} />);

    expect(screen.getByText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Cairo")).toBeInTheDocument();
  });

  it("displays city names and countries", () => {
    render(<CityList cities={mockCities} />);

    expect(screen.getByText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.getByText("Cairo")).toBeInTheDocument();
    expect(screen.getByText("Egypt")).toBeInTheDocument();
  });

  it("displays city descriptions", () => {
    render(<CityList cities={mockCities} />);

    expect(
      screen.getByText(
        "Barcelona is a city on the coast of northeastern Spain."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tokyo is the capital and largest city of Japan.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Cairo is the capital of Egypt.")
    ).toBeInTheDocument();
  });

  it("renders city images with correct alt text", () => {
    render(<CityList cities={mockCities} />);

    const barcelonaImage = screen.getByAltText("Barcelona");
    const tokyoImage = screen.getByAltText("Tokyo");
    const cairoImage = screen.getByAltText("Cairo");

    expect(barcelonaImage).toBeInTheDocument();
    expect(barcelonaImage).toHaveAttribute(
      "src",
      "https://picsum.photos/id/402/500/500"
    );

    expect(tokyoImage).toBeInTheDocument();
    expect(tokyoImage).toHaveAttribute(
      "src",
      "https://picsum.photos/id/401/500/500"
    );

    expect(cairoImage).toBeInTheDocument();
    expect(cairoImage).toHaveAttribute(
      "src",
      "https://picsum.photos/id/400/500/500"
    );
  });

  it("applies correct CSS classes for layout", () => {
    const { container } = render(<CityList cities={mockCities} />);

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass(
      "grid",
      "auto-rows-min",
      "gap-7",
      "md:grid-cols-6"
    );
  });

  it("applies correct styling to city cards", () => {
    render(<CityList cities={mockCities} />);

    const cityCards = screen.getAllByTestId("city-card");

    cityCards.forEach((card) => {
      expect(card).toHaveClass(
        "w-[222px]",
        "h-[206px]",
        "p-[20px]",
        "@container/card",
        "text-white"
      );
    });
  });

  it("handles empty city list", () => {
    render(<CityList cities={[]} />);

    const cityCards = screen.queryAllByTestId("city-card");
    expect(cityCards).toHaveLength(0);

    // Check that "No results found" message is displayed
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try adjusting your search or filter criteria to find cities."
      )
    ).toBeInTheDocument();
  });

  it("generates unique keys for each city", () => {
    const { container } = render(<CityList cities={mockCities} />);

    const cityCards = container.querySelectorAll('[data-testid="city-card"]');
    expect(cityCards).toHaveLength(3);

    // Each card should be rendered (keys are used internally by React)
    expect(screen.getByText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Cairo")).toBeInTheDocument();
  });

  it("applies text shadow to titles for readability over images", () => {
    render(<CityList cities={mockCities} />);

    const cityName = screen.getByText("Barcelona");
    const countryName = screen.getByText("Spain");

    expect(cityName).toHaveClass("drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]");
    expect(countryName).toHaveClass("drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]");
  });

  it("applies line-clamp to descriptions", () => {
    render(<CityList cities={mockCities} />);

    const description = screen.getByText(
      "Barcelona is a city on the coast of northeastern Spain."
    );
    expect(description).toHaveClass("line-clamp-6");
  });

  it("uses correct typography classes", () => {
    render(<CityList cities={mockCities} />);

    const cityName = screen.getByText("Barcelona");
    const countryName = screen.getByText("Spain");
    const description = screen.getByText(
      "Barcelona is a city on the coast of northeastern Spain."
    );

    expect(cityName).toHaveClass("text-[26px]", "font-normal");
    expect(countryName).toHaveClass("text-[20px]", "font-light");
    expect(description).toHaveClass("text-[12px]", "leading-[16px]");
  });

  it("handles single city correctly", () => {
    const singleCity = [mockCities[0]];
    render(<CityList cities={singleCity} />);

    expect(screen.getByText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.queryByText("Tokyo")).not.toBeInTheDocument();
  });

  it("maintains responsive grid layout", () => {
    const { container } = render(<CityList cities={mockCities} />);

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass("md:grid-cols-6");
  });
});
