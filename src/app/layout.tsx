import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Jost } from 'next/font/google';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Calendar-planner',
  description: 'Test task',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={jost.className}>{children}</body>
    </html>
  );
};
export default RootLayout;
