import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Sort from "../Sort";

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
});

describe("Sort Component", () => {
  const defaultProps = {
    label: "Sort by",
    options: [
      { value: "name", label: "Name" },
      { value: "distance", label: "Distance" },
    ],
    queryParam: "sortBy",
  };

  it("renders sort label and options", () => {
    mockGet.mockReturnValue("");

    render(<Sort {...defaultProps} />);

    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
    expect(screen.getByText("|")).toBeInTheDocument();
  });

  it("highlights selected option", () => {
    mockGet.mockReturnValue("name");

    render(<Sort {...defaultProps} />);

    const nameButton = screen.getByText("Name");
    const distanceButton = screen.getByText("Distance");

    expect(nameButton).toHaveClass("text-gray-900", "font-medium", "underline");
    expect(distanceButton).toHaveClass("text-gray-500");
  });

  it("calls router.replace when option is clicked", () => {
    mockGet.mockReturnValue("");

    render(<Sort {...defaultProps} />);

    const nameButton = screen.getByText("Name");
    fireEvent.click(nameButton);

    expect(mockReplace).toHaveBeenCalled();
  });

  it("toggles option off when clicking the same selected option", () => {
    mockGet.mockReturnValue("name");

    render(<Sort {...defaultProps} />);

    const nameButton = screen.getByText("Name");
    fireEvent.click(nameButton);

    expect(mockReplace).toHaveBeenCalled();
  });

  it("switches between options correctly", () => {
    mockGet.mockReturnValue("name");

    render(<Sort {...defaultProps} />);

    const distanceButton = screen.getByText("Distance");
    fireEvent.click(distanceButton);

    expect(mockReplace).toHaveBeenCalled();
  });

  it("uses custom query parameter", () => {
    mockGet.mockReturnValue("celsius");

    render(
      <Sort
        label="Units"
        options={[
          { value: "celsius", label: "°C" },
          { value: "fahrenheit", label: "°F" },
        ]}
        queryParam="units"
      />
    );

    expect(mockGet).toHaveBeenCalledWith("units");
  });

  it("renders temperature units correctly", () => {
    mockGet.mockReturnValue("");

    render(
      <Sort
        label="Units"
        options={[
          { value: "celsius", label: "°C" },
          { value: "fahrenheit", label: "°F" },
        ]}
        queryParam="units"
      />
    );

    expect(screen.getByText("Units")).toBeInTheDocument();
    expect(screen.getByText("°C")).toBeInTheDocument();
    expect(screen.getByText("°F")).toBeInTheDocument();
  });

  it("handles multiple options with separators", () => {
    mockGet.mockReturnValue("");

    const manyOptions = [
      { value: "name", label: "Name" },
      { value: "distance", label: "Distance" },
      { value: "population", label: "Population" },
    ];

    render(<Sort label="Sort by" options={manyOptions} queryParam="sortBy" />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
    expect(screen.getByText("Population")).toBeInTheDocument();

    // Should have 2 separators for 3 options
    const separators = screen.getAllByText("|");
    expect(separators).toHaveLength(2);
  });

  it("applies correct hover styles", () => {
    mockGet.mockReturnValue("");

    render(<Sort {...defaultProps} />);

    const nameButton = screen.getByText("Name");
    expect(nameButton).toHaveClass("hover:text-gray-700");
  });

  it("shows cursor pointer on buttons", () => {
    mockGet.mockReturnValue("");

    render(<Sort {...defaultProps} />);

    const nameButton = screen.getByText("Name");
    expect(nameButton).toHaveClass("cursor-pointer");
  });

  it("handles empty options array", () => {
    mockGet.mockReturnValue("");

    render(<Sort label="Empty Sort" options={[]} queryParam="empty" />);

    expect(screen.getByText("Empty Sort")).toBeInTheDocument();
    expect(screen.queryByText("|")).not.toBeInTheDocument();
  });

  it("applies correct font sizes and styling", () => {
    mockGet.mockReturnValue("");

    render(<Sort {...defaultProps} />);

    const label = screen.getByText("Sort by");
    const nameButton = screen.getByText("Name");

    expect(label).toHaveClass("text-[16px]", "font-normal");
    expect(nameButton).toHaveClass(
      "text-[16px]",
      "transition-colors",
      "duration-200"
    );
  });
});
