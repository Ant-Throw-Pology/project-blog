import React from 'react';
import {
  Work_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';
import clsx from 'clsx';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';
import RespectMotionPreference from '@/components/RespectMotionPreference';
import ThemeRoot from '@/components/ThemeRoot/ThemeRoot';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

function RootLayout({ children }) {
  return (
    <RespectMotionPreference>
      <ThemeRoot
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
      >
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </ThemeRoot>
    </RespectMotionPreference>
  );
}

export default RootLayout;
