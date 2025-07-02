export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-testid="page-container"
      className="flex flex-col items-center justify-center h-screen"
    >
      {children}
    </div>
  );
}
