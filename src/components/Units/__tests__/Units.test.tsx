import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Units from "../Units";

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Units Component", () => {
  const mockReplace = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
    toString: jest.fn(() => ""),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (usePathname as jest.Mock).mockReturnValue("/test");
  });

  it("renders the label correctly", () => {
    render(<Units label="Temperature Units" />);
    expect(screen.getByText("Temperature Units")).toBeInTheDocument();
  });

  it("renders both unit options", () => {
    render(<Units label="Units" />);
    expect(screen.getByText("°C")).toBeInTheDocument();
    expect(screen.getByText("°F")).toBeInTheDocument();
  });

  it("shows celsius as active by default", () => {
    mockSearchParams.get.mockReturnValue(null);
    render(<Units label="Units" />);

    const celsiusButton = screen.getByText("°C");
    expect(celsiusButton).toHaveClass(
      "text-gray-900",
      "font-medium",
      "underline"
    );
  });

  it("shows fahrenheit as active when units=fahrenheit in URL", () => {
    mockSearchParams.get.mockReturnValue("fahrenheit");
    render(<Units label="Units" />);

    const fahrenheitButton = screen.getByText("°F");
    expect(fahrenheitButton).toHaveClass(
      "text-gray-900",
      "font-medium",
      "underline"
    );

    const celsiusButton = screen.getByText("°C");
    expect(celsiusButton).toHaveClass("text-gray-500");
  });

  it("changes to fahrenheit when fahrenheit button is clicked", () => {
    mockSearchParams.get.mockReturnValue("celsius");
    mockSearchParams.toString.mockReturnValue("search=test");

    render(<Units label="Units" />);

    const fahrenheitButton = screen.getByText("°F");
    fireEvent.click(fahrenheitButton);

    expect(mockReplace).toHaveBeenCalledWith(
      "/test?search=test&units=fahrenheit"
    );
  });

  it("changes to celsius when celsius button is clicked from fahrenheit", () => {
    mockSearchParams.get.mockReturnValue("fahrenheit");
    mockSearchParams.toString.mockReturnValue("search=test");

    render(<Units label="Units" />);

    const celsiusButton = screen.getByText("°C");
    fireEvent.click(celsiusButton);

    expect(mockReplace).toHaveBeenCalledWith("/test?search=test&units=celsius");
  });

  it("does not change URL when clicking the same unit", () => {
    mockSearchParams.get.mockReturnValue("celsius");

    render(<Units label="Units" />);

    const celsiusButton = screen.getByText("°C");
    fireEvent.click(celsiusButton);

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("preserves existing search parameters when changing units", () => {
    mockSearchParams.get.mockReturnValue("celsius");
    mockSearchParams.toString.mockReturnValue("search=paris&sortBy=name");

    render(<Units label="Units" />);

    const fahrenheitButton = screen.getByText("°F");
    fireEvent.click(fahrenheitButton);

    expect(mockReplace).toHaveBeenCalledWith(
      "/test?search=paris&sortBy=name&units=fahrenheit"
    );
  });

  it("handles empty search params correctly", () => {
    mockSearchParams.get.mockReturnValue("celsius");
    mockSearchParams.toString.mockReturnValue("");

    render(<Units label="Units" />);

    const fahrenheitButton = screen.getByText("°F");
    fireEvent.click(fahrenheitButton);

    expect(mockReplace).toHaveBeenCalledWith("/test?units=fahrenheit");
  });

  it("has proper hover styles for inactive buttons", () => {
    mockSearchParams.get.mockReturnValue("celsius");
    render(<Units label="Units" />);

    const fahrenheitButton = screen.getByText("°F");
    expect(fahrenheitButton).toHaveClass(
      "text-gray-500",
      "hover:text-gray-700"
    );
  });

  it("displays separator between options", () => {
    render(<Units label="Units" />);
    expect(screen.getByText("|")).toBeInTheDocument();
  });

  it("applies cursor pointer style to buttons", () => {
    render(<Units label="Units" />);

    const celsiusButton = screen.getByText("°C");
    const fahrenheitButton = screen.getByText("°F");

    expect(celsiusButton).toHaveClass("cursor-pointer");
    expect(fahrenheitButton).toHaveClass("cursor-pointer");
  });
});
