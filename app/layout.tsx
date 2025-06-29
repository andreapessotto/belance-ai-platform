import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BELANCE - AI Life Balance Council',
  description: 'Transform urban loneliness into personal growth through your AI companion council. Get expert guidance available 24/7 for peak performance.',
  keywords: 'AI companion, life balance, personal growth, mental health, productivity',
  authors: [{ name: 'BELANCE Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
