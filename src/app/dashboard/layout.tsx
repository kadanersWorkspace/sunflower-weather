import PageContainer from "@/components/Page/PageContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
