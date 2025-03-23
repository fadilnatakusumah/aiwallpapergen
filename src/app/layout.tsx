// app/layout.tsx
// has to be made 
// but the HTML tag is already made in other files
// so we only return the children here

async function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default RootLayout;
