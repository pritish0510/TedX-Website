import './globals.css';
import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import InitialLoader from '@/components/InitialLoader';

export const metadata: Metadata = {
  title: 'TEDx SRMIST NCR Ghaziabad 2025 - Elysium Night',
  description: 'Join us for an inspiring TEDx event on March 15, 2025 at SRMIST NCR Ghaziabad. Theme: Elysium (Mystical Dark Paradise).',
  keywords: 'TEDx, SRMIST, NCR, Ghaziabad, Elysium, happiness, wellbeing, ideas, innovation',
  authors: [{ name: 'TEDx SRMIST NCR Ghaziabad Team' }],
  creator: 'TEDx SRMIST NCR Ghaziabad',
  publisher: 'SRMIST NCR Campus',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://tedxsrmistncr.com',
  },
  openGraph: {
    title: 'TEDx SRMIST NCR Ghaziabad 2025 - Elysium Night',
    description: 'Join us for an inspiring TEDx event on March 15, 2025. Theme: Elysium.',
    type: 'website',
    url: 'https://tedxsrmistncr.com',
    siteName: 'TEDx SRMIST NCR Ghaziabad',
    locale: 'en_US',
    images: [
      {
        url: 'https://tedxsrmistncr.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TEDx SRMIST NCR Ghaziabad 2025 - Elysium Night',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEDx SRMIST NCR Ghaziabad 2025 - Elysium Night',
    description: 'Join us for an inspiring TEDx event on March 15, 2025. Theme: Elysium.',
    images: ['https://tedxsrmistncr.com/og-image.jpg'],
    creator: '@tedxsrmistncr',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Education',
  classification: 'Educational Event',
  other: {
    'event:start_time': '2025-03-15T09:00:00+05:30',
    'event:end_time': '2025-03-15T18:00:00+05:30',
    'event:location': 'SRMIST NCR Campus, Ghaziabad, India',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#EB0028" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans bg-[#111827] text-[#E2E8F0] antialiased selection:bg-[#EB0028] selection:text-white">
        <InitialLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}