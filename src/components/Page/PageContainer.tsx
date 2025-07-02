export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-testid="page-container"
      className="flex flex-col items-center py-[30px]"
    >
      <div className="max-w-fit">{children}</div>
    </div>
  );
}
