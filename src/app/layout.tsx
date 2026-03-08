import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Acortador de links',
  description:
    'Acorta links de totalmente gratis. Regístrate de forma gratuita para poder ver las analíticas de tus enlaces acortados.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-gray-100 antialiased dark:bg-zinc-900`}
      >
        {children}
      </body>
    </html>
  );
}
