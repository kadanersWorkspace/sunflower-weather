import { render } from "@/test-utils";
import PageContainer from "./PageContainer";

export function PageContainerDriver(children: React.ReactNode = null) {
  const { getByTestId } = render(<PageContainer>{children}</PageContainer>);

  return {
    getPageContainer: () => getByTestId("page-container"),
    getPageContainerText: () => getByTestId("page-container").textContent,
  };
}
