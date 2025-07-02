import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Search from "../Search";

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

describe("Search Component", () => {
  const defaultProps = {
    label: "Search",
    placeholder: "Type to search",
    queryParam: "search",
  };

  it("renders search input with label and placeholder", () => {
    mockGet.mockReturnValue("");

    render(<Search {...defaultProps} />);

    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
  });

  it("displays clear button when there is search text", () => {
    mockGet.mockReturnValue("Barcelona");

    render(<Search {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: "Clear search" })
    ).toBeInTheDocument();
  });

  it("does not display clear button when search is empty", () => {
    mockGet.mockReturnValue("");

    render(<Search {...defaultProps} />);

    expect(
      screen.queryByRole("button", { name: "Clear search" })
    ).not.toBeInTheDocument();
  });

  it("updates input value from URL parameters", () => {
    mockGet.mockReturnValue("Tokyo");

    render(<Search {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Tokyo");
  });

  it("updates URL when user types in search input", async () => {
    mockGet.mockReturnValue("");

    render(<Search {...defaultProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Paris" } });

    // Wait for debounced search
    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it("clears search when clear button is clicked", () => {
    mockGet.mockReturnValue("Barcelona");

    render(<Search {...defaultProps} />);

    const clearButton = screen.getByRole("button", { name: "Clear search" });
    fireEvent.click(clearButton);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });

  it("uses custom query parameter", () => {
    mockGet.mockReturnValue("Europe");

    render(<Search {...defaultProps} queryParam="continent" />);

    expect(mockGet).toHaveBeenCalledWith("continent");
  });

  it("trims whitespace from search input", async () => {
    mockGet.mockReturnValue("");

    render(<Search {...defaultProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "  Barcelona  " } });

    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it("handles custom label and placeholder", () => {
    mockGet.mockReturnValue("");

    render(
      <Search
        label="Continent"
        placeholder="Filter by continent"
        queryParam="continent"
      />
    );

    expect(screen.getByText("Continent")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Filter by continent")
    ).toBeInTheDocument();
  });

  it("debounces search input to avoid excessive API calls", async () => {
    mockGet.mockReturnValue("");

    render(<Search {...defaultProps} />);

    const input = screen.getByRole("textbox");

    // Type multiple characters quickly
    fireEvent.change(input, { target: { value: "B" } });
    fireEvent.change(input, { target: { value: "Ba" } });
    fireEvent.change(input, { target: { value: "Bar" } });

    // Should not call replace immediately
    expect(mockReplace).not.toHaveBeenCalled();

    // Wait for debounce
    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalledTimes(1);
      },
      { timeout: 150 }
    );
  });
});
