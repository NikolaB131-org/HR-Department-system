import './globals.css';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';

const roboto = Roboto({
  weight: ['400'],
  fallback: ['sans-serif'],
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HR department',
  description: 'Simple HR department system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={roboto.style}>
        {children}
      </body>
    </html>
  );
}
