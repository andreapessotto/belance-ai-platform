import './globals.css'

export const metadata = {
  title: 'BELANCE - AI Life Balance Council',
  description: 'Transform your life balance with AI companions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
