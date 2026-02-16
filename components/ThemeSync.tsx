export default function ThemeSync({
  children,
}: {
  children: React.ReactNode;
}) {
  // Theme is now handled by CSS classes via Navbar component
  // This component just passes through children
  // No longer needs "use client" since it doesn't use any client-side features
  return <>{children}</>;
}
