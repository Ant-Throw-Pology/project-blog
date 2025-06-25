"use client";
import React from 'react';
import { Sun, Moon } from 'react-feather';

import VisuallyHidden from '@/components/VisuallyHidden';
import {ThemeContext} from '../ThemeRoot';
import Spinner from '../Spinner';

function ThemeToggle({...delegated}) {
  const {activeTheme, setTheme} = React.useContext(ThemeContext);
  
  const Icon =
    activeTheme === "light" ? Sun
    : activeTheme === "dark" ? Moon
    : Spinner;
  
  return (
    <button
      onClick={() => {
        setTheme(activeTheme === "light" ? "user-dark" : "user-light");
      }}
      {...delegated}
    >
      <Icon size="1.5rem" />
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
