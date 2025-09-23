import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nextProvider } from '@/contexts/I18nextProvider';
import AppLayout from '@/components/layout/AppLayout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'RuralSTEM Saga - Gamified Learning Platform',
  description: 'A gamified digital platform to enhance STEM learning outcomes for rural students in Odisha',
  keywords: 'STEM education, rural learning, gamification, Odisha, educational technology',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
  themeColor: '#10b981',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'RuralSTEM Saga',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased surppressHydrationWarning=true`}>
        <ThemeProvider>
          <AuthProvider>
            <I18nextProvider>
              <AppLayout>
                {children}
              </AppLayout>
            </I18nextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}