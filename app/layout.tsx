import type { Metadata } from "next";
import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "Camera Configuration App",
  description: "An application for configurating cameras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>
        {children}
      </body>
    </html>
  );
}
