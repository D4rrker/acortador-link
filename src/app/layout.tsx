import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Acortador de Enlaces y Analíticas | LinkPro',
    template: '%s | LinkPro',
  },
  description:
    'Gestiona y optimiza tus enlaces con analíticas detalladas en tiempo real.',
  icons: {
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'LinkPro | Acortador de Enlaces y Analíticas',
    description:
      'Acorta tus enlaces y analiza el tráfico en tiempo real de forma gratuita.',
    url: 'https://linkpro.li',
    siteName: 'LinkPro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LinkPro Dashboard Preview',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkPro | Acortador de Enlaces',
    description: 'Gestiona tus links con estadísticas profesionales.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} bg-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
