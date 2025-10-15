import type { Metadata } from 'next';
import '@/assets/styles/globals.css';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Camera Configuration App',
  description: 'An application for configurating cameras',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>
        <Header />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
