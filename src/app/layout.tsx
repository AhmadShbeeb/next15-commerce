import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReduxProvider } from '@/lib/providers/redux-provider';
import { Header } from '@/components/layout/header';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryProvider } from '../lib/providers/react-query-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Next.js E-commerce',
  description: 'A modern e-commerce platform built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <ReduxProvider>
            <ReactQueryProvider>
              <Header />
              {children}
            </ReactQueryProvider>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
