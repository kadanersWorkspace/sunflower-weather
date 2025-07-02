import { render, screen } from "@testing-library/react";
import SearchSkeleton from "../SearchSkeleton";
import SortSkeleton from "../SortSkeleton";
import CardSkeleton from "../CardSkeleton";

describe("Skeleton Components", () => {
  describe("SearchSkeleton", () => {
    it("renders search skeleton with correct structure", () => {
      const { container } = render(<SearchSkeleton />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("mb-8");

      // Should have label skeleton
      const labelSkeleton = container.querySelector(
        ".h-4.bg-gray-100.rounded.w-16"
      );
      expect(labelSkeleton).toBeInTheDocument();
      expect(labelSkeleton).toHaveClass("animate-pulse", "mb-4");

      // Should have input skeleton
      const inputSkeleton = container.querySelector(
        ".h-10.bg-gray-100.rounded-sm"
      );
      expect(inputSkeleton).toBeInTheDocument();
      expect(inputSkeleton).toHaveClass("animate-pulse");
    });

    it("applies correct styling classes", () => {
      const { container } = render(<SearchSkeleton />);

      const labelSkeleton = container.querySelector(".h-4");
      const inputSkeleton = container.querySelector(".h-10");

      expect(labelSkeleton).toHaveClass(
        "bg-gray-100",
        "rounded",
        "w-16",
        "animate-pulse"
      );
      expect(inputSkeleton).toHaveClass(
        "bg-gray-100",
        "rounded-sm",
        "animate-pulse"
      );
    });
  });

  describe("SortSkeleton", () => {
    it("renders sort skeleton with correct structure", () => {
      const { container } = render(<SortSkeleton />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("mb-8");

      // Should have label skeleton
      const labelSkeleton = container.querySelector(
        ".h-4.bg-gray-100.rounded.w-14"
      );
      expect(labelSkeleton).toBeInTheDocument();
      expect(labelSkeleton).toHaveClass("animate-pulse", "mb-4");

      // Should have options container
      const optionsContainer = container.querySelector(
        ".flex.items-center.gap-2"
      );
      expect(optionsContainer).toBeInTheDocument();
    });

    it("renders option skeletons with separator", () => {
      render(<SortSkeleton />);

      // Should have separator
      expect(screen.getByText("|")).toBeInTheDocument();
      expect(screen.getByText("|")).toHaveClass("text-gray-300", "mx-2");
    });

    it("renders two option skeletons with correct widths", () => {
      const { container } = render(<SortSkeleton />);

      const firstOption = container.querySelector(
        ".h-4.bg-gray-100.rounded.w-10"
      );
      const secondOption = container.querySelector(
        ".h-4.bg-gray-100.rounded.w-16"
      );

      expect(firstOption).toBeInTheDocument();
      expect(firstOption).toHaveClass("animate-pulse");

      expect(secondOption).toBeInTheDocument();
      expect(secondOption).toHaveClass("animate-pulse");
    });

    it("applies correct layout classes", () => {
      const { container } = render(<SortSkeleton />);

      const optionsContainer = container.querySelector(".flex");
      expect(optionsContainer).toHaveClass("items-center", "gap-2");
    });
  });

  describe("CardSkeleton", () => {
    it("renders card skeleton with correct structure", () => {
      const { container } = render(<CardSkeleton />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass(
        "relative",
        "z-10",
        "h-full",
        "flex",
        "flex-col",
        "justify-between"
      );
    });

    it("renders header section with title and subtitle skeletons", () => {
      const { container } = render(<CardSkeleton />);

      const header = container.querySelector(".p-0.leading-\\[26px\\]");
      expect(header).toBeInTheDocument();

      // Title skeleton (larger)
      const titleSkeleton = container.querySelector(
        ".h-6.bg-white\\/20.rounded.w-3\\/4"
      );
      expect(titleSkeleton).toBeInTheDocument();
      expect(titleSkeleton).toHaveClass("animate-pulse", "mb-1");

      // Subtitle skeleton (smaller)
      const subtitleSkeleton = container.querySelector(
        ".h-5.bg-white\\/20.rounded.w-1\\/2"
      );
      expect(subtitleSkeleton).toBeInTheDocument();
      expect(subtitleSkeleton).toHaveClass("animate-pulse");
    });

    it("renders description section with multiple line skeletons", () => {
      const { container } = render(<CardSkeleton />);

      const descriptionContainer = container.querySelector(".mt-auto");
      expect(descriptionContainer).toBeInTheDocument();

      const linesContainer = container.querySelector(".space-y-1");
      expect(linesContainer).toBeInTheDocument();

      // Should have 4 description line skeletons with decreasing widths
      const fullWidthLine = container.querySelector(
        ".h-3.bg-white\\/20.rounded.w-full"
      );
      const fiveSixthsLine = container.querySelector(
        ".h-3.bg-white\\/20.rounded.w-5\\/6"
      );
      const fourSixthsLine = container.querySelector(
        ".h-3.bg-white\\/20.rounded.w-4\\/6"
      );
      const threeSixthsLine = container.querySelector(
        ".h-3.bg-white\\/20.rounded.w-3\\/6"
      );

      expect(fullWidthLine).toBeInTheDocument();
      expect(fiveSixthsLine).toBeInTheDocument();
      expect(fourSixthsLine).toBeInTheDocument();
      expect(threeSixthsLine).toBeInTheDocument();

      // All should have animate-pulse
      expect(fullWidthLine).toHaveClass("animate-pulse");
      expect(fiveSixthsLine).toHaveClass("animate-pulse");
      expect(fourSixthsLine).toHaveClass("animate-pulse");
      expect(threeSixthsLine).toHaveClass("animate-pulse");
    });

    it("uses white/20 opacity for text overlays", () => {
      const { container } = render(<CardSkeleton />);

      const titleSkeleton = container.querySelector(".h-6");
      const descriptionLine = container.querySelector(".h-3");

      expect(titleSkeleton).toHaveClass("bg-white/20");
      expect(descriptionLine).toHaveClass("bg-white/20");
    });

    it("maintains proper spacing and layout", () => {
      const { container } = render(<CardSkeleton />);

      const descriptionContainer = container.querySelector(".mt-auto");
      const linesContainer = container.querySelector(".space-y-1");

      expect(descriptionContainer).toHaveClass("mt-auto");
      expect(linesContainer).toHaveClass("space-y-1");
    });
  });

  describe("All Skeleton Components", () => {
    it("all components use animate-pulse for loading animation", () => {
      const { container: searchContainer } = render(<SearchSkeleton />);
      const { container: sortContainer } = render(<SortSkeleton />);
      const { container: cardContainer } = render(<CardSkeleton />);

      // All skeleton elements should have animate-pulse
      const searchPulseElements =
        searchContainer.querySelectorAll(".animate-pulse");
      const sortPulseElements =
        sortContainer.querySelectorAll(".animate-pulse");
      const cardPulseElements =
        cardContainer.querySelectorAll(".animate-pulse");

      expect(searchPulseElements.length).toBeGreaterThan(0);
      expect(sortPulseElements.length).toBeGreaterThan(0);
      expect(cardPulseElements.length).toBeGreaterThan(0);
    });

    it("all components render without errors", () => {
      expect(() => render(<SearchSkeleton />)).not.toThrow();
      expect(() => render(<SortSkeleton />)).not.toThrow();
      expect(() => render(<CardSkeleton />)).not.toThrow();
    });

    it("all components use consistent gray color scheme", () => {
      const { container: searchContainer } = render(<SearchSkeleton />);
      const { container: sortContainer } = render(<SortSkeleton />);

      // Search and Sort use gray-100
      const searchGrayElements =
        searchContainer.querySelectorAll(".bg-gray-100");
      const sortGrayElements = sortContainer.querySelectorAll(".bg-gray-100");

      expect(searchGrayElements.length).toBeGreaterThan(0);
      expect(sortGrayElements.length).toBeGreaterThan(0);

      // Card uses white/20 for overlay effect
      const { container: cardContainer } = render(<CardSkeleton />);
      const cardWhiteElements =
        cardContainer.querySelectorAll(".bg-white\\/20");
      expect(cardWhiteElements.length).toBeGreaterThan(0);
    });
  });
});
