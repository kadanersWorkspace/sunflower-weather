import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../Card";

describe("Card Component", () => {
  it("renders a basic card", () => {
    render(
      <Card>
        <CardContent>Test content</CardContent>
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Card className="custom-class">
        <CardContent>Test content</CardContent>
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("custom-class");
  });

  it("renders card with header, title, and description", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test content</CardContent>
      </Card>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders with all card components", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    );

    // Check that all elements are present in the DOM
    expect(
      container.querySelector('[data-slot="card-header"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-title"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-description"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-content"]')
    ).toBeInTheDocument();
  });
});
