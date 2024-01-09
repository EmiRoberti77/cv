export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container">
      <section className="py-6">{children}</section>
    </main>
  );
}
