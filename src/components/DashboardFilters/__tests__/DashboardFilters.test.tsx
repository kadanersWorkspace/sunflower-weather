import { render, screen } from "@testing-library/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import DashboardFilters from "../DashboardFilters";

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const mockReplace = jest.fn();
const mockGet = jest.fn();
const mockSearchParams = {
  get: mockGet,
  toString: jest.fn(() => "mock=params"),
};

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue({
    replace: mockReplace,
  });
  (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  (usePathname as jest.Mock).mockReturnValue("/dashboard");
  mockGet.mockReturnValue(""); // Default empty values
});

describe("DashboardFilters Component", () => {
  it("renders all filter components", () => {
    render(<DashboardFilters />);

    // Search components
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Continent")).toBeInTheDocument();

    // Sort components
    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(screen.getByText("Units")).toBeInTheDocument();
  });

  it("renders search inputs with correct placeholders", () => {
    render(<DashboardFilters />);

    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();

    // Continent search has empty placeholder
    const continentInput = screen.getAllByRole("textbox")[1];
    expect(continentInput).toHaveAttribute("placeholder", "");
  });

  it("renders sort options correctly", () => {
    render(<DashboardFilters />);

    // Sort by options
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();

    // Units options
    expect(screen.getByText("°C")).toBeInTheDocument();
    expect(screen.getByText("°F")).toBeInTheDocument();
  });

  it("applies correct grid layout classes", () => {
    const { container } = render(<DashboardFilters />);

    const gridContainer = container.querySelector(
      ".grid.grid-cols-4.grid-rows-1"
    );
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass("gap-4", "mb-8");
  });

  it("contains 4 filter components in correct order", () => {
    render(<DashboardFilters />);

    const labels = screen.getAllByText(/Search|Continent|Sort by|Units/);
    expect(labels).toHaveLength(4);

    expect(labels[0]).toHaveTextContent("Search");
    expect(labels[1]).toHaveTextContent("Continent");
    expect(labels[2]).toHaveTextContent("Sort by");
    expect(labels[3]).toHaveTextContent("Units");
  });

  it("uses correct query parameters for each filter", () => {
    render(<DashboardFilters />);

    // Mock calls should be made for each query parameter
    expect(mockGet).toHaveBeenCalledWith("search");
    expect(mockGet).toHaveBeenCalledWith("continent");
    expect(mockGet).toHaveBeenCalledWith("sortBy");
    expect(mockGet).toHaveBeenCalledWith("units");
  });

  it("renders separators in sort components", () => {
    render(<DashboardFilters />);

    // Should have separators for both sort components
    const separators = screen.getAllByText("|");
    expect(separators).toHaveLength(2); // One for sort options, one for unit options
  });

  it("maintains responsive layout structure", () => {
    const { container } = render(<DashboardFilters />);

    const outerWrapper = container.firstChild;
    expect(outerWrapper).toBeInTheDocument();

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid-cols-4", "grid-rows-1");
  });

  it("renders with client-side directive", () => {
    // This component is marked with "use client"
    expect(() => render(<DashboardFilters />)).not.toThrow();
  });

  it("exports sort and unit options correctly", () => {
    render(<DashboardFilters />);

    // Verify all expected sort options are rendered
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();

    // Verify all expected unit options are rendered
    expect(screen.getByText("°C")).toBeInTheDocument();
    expect(screen.getByText("°F")).toBeInTheDocument();
  });

  it("handles empty state correctly", () => {
    mockGet.mockReturnValue("");

    render(<DashboardFilters />);

    // All inputs should be empty
    const textInputs = screen.getAllByRole("textbox");
    textInputs.forEach((input) => {
      expect(input).toHaveValue("");
    });
  });

  it("handles populated filters state", () => {
    // Mock different values for different parameters
    mockGet.mockImplementation((param) => {
      switch (param) {
        case "search":
          return "Barcelona";
        case "continent":
          return "Europe";
        case "sortBy":
          return "name";
        case "units":
          return "celsius";
        default:
          return "";
      }
    });

    render(<DashboardFilters />);

    // Check that search inputs show values
    const searchInput = screen.getByDisplayValue("Barcelona");
    const continentInput = screen.getByDisplayValue("Europe");

    expect(searchInput).toBeInTheDocument();
    expect(continentInput).toBeInTheDocument();
  });

  it("maintains consistent spacing and margins", () => {
    const { container } = render(<DashboardFilters />);

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("mb-8"); // Bottom margin for separation from content
  });

  it("uses consistent component structure", () => {
    render(<DashboardFilters />);

    // Should have exactly 2 Search components and 2 Sort components
    const searchLabels = screen.getAllByText(/Search|Continent/);
    const sortLabels = screen.getAllByText(/Sort by|Units/);

    expect(searchLabels).toHaveLength(2);
    expect(sortLabels).toHaveLength(2);
  });
});
