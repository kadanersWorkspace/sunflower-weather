import { render, screen } from "@/test-utils";
import Home from "./page";

describe("Dashboard Page", () => {
  it("renders the dashboard page with correct content", () => {
    render(<Home />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("has the correct heading level", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Hello World");
  });

  it("applies correct styling classes", () => {
    render(<Home />);

    const heading = screen.getByText("Hello World");
    expect(heading).toHaveClass("text-4xl", "font-bold");
  });
});
