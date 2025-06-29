import './globals.css';
import type { Metadata } from 'next';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

export const metadata: Metadata = {
  title: 'BELANCE - AI Life Balance Council',
  description: 'Transform urban loneliness into personal growth with 6 specialized AI video companions. Your circle of trust for mental health, relationships, career, health, finance, and creativity.',
  keywords: 'AI companions, mental health, life balance, personal development, video chat, life coaching',
  authors: [{ name: 'BELANCE Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" 
        />
      </head>
      <body className="font-sans min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}