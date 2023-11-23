import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Jost } from 'next/font/google';

import { ReactQueryProvider } from '@/providers';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Calendar-planner',
  description: 'Test task',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={jost.className} suppressHydrationWarning>
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
};
export default RootLayout;
