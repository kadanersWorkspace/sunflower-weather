import { render, screen } from "@/test-utils";
import Home from "./page";
import { PageContainerDriver } from "@/components/Page/PageContainer.driver";

describe("Dashboard Page", () => {
  it("renders the dashboard page with PageContainer component", () => {
    const { getPageContainerText } = PageContainerDriver(<Home />);
    expect(getPageContainerText()).toBe("Hello World");
  });
});
