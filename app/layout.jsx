import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nextProvider } from '@/contexts/I18nextProvider';
import { LoadingProvider } from '@/contexts/LoadingContext';
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased surppressHydrationWarning=true`}>
        <ThemeProvider>
          <AuthProvider>
            <I18nextProvider>
              <LoadingProvider>
                <AppLayout>
                  {children}
                </AppLayout>
              </LoadingProvider>
            </I18nextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}