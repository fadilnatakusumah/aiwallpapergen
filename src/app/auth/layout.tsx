import { GeistSans } from "geist/font/sans";
import { PropsWithChildren } from "react";

import "~/styles/globals.css";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-screen w-screen">{children}</body>
    </html>
  );
}

export default AuthLayout;
