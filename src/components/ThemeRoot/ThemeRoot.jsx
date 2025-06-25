import React from 'react';
import ThemeRootInner from './ThemeRootInner';
import {cookies} from 'next/headers';

async function ThemeRoot({...delegated}) {
  const savedThemeCookie = (await cookies()).get("color-theme");
  let initialTheme;
  if (savedThemeCookie) {
    initialTheme = savedThemeCookie.value;
  } else initialTheme = "unset";
  
  return <ThemeRootInner initialTheme={initialTheme} {...delegated} />
}

export default ThemeRoot;