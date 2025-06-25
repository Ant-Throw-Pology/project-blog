"use client";
import React from 'react';
import Cookies from 'js-cookie';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

export const ThemeContext = React.createContext();

function ThemeRootInner({
  children,
  initialTheme = "unset",
  ...delegated
}) {
  // Set initial state from cookies, if any
  const [theme, setTheme] = React.useState(initialTheme);
  
  const activeTheme = theme.endsWith("dark") ? "dark" : theme.endsWith("light") ? "light" : "unset";
  
  // Set preference with CSS based on OS...
  const style = `html{${Object.entries(LIGHT_TOKENS).map(([k, v]) => `${k}:${v};`).join("")}} @media screen and (prefers-color-scheme:dark){html{${Object.entries(DARK_TOKENS).map(([k, v]) => `${k}:${v};`).join("")}}}`;
  
  // ...then apply that in state if no other data
  React.useEffect(() => {
    if (theme === "unset") {
      const osDark = window.matchMedia("(prefers-color-scheme: dark)");
      const osLight = window.matchMedia("(prefers-color-scheme: light)");
      
      function handleModeChange() {
        if (theme === "unset" || theme.startsWith("os-")) {
          if (osDark.matches) setTheme("os-dark");
          else if (osLight.matches) setTheme("os-light");
        }
      }
      
      if (osDark.matches) setTheme("os-dark");
      else if (osLight.matches) setTheme("os-light");
      
      osDark.addEventListener("change", handleModeChange);
      osLight.addEventListener("change", handleModeChange);
      
      return () => {
        osDark.removeEventListener("change", handleModeChange);
        osLight.removeEventListener("change", handleModeChange);
      };
    }
  }, []);
  
  // Change stored preference when the user clicks the toggle
  React.useEffect(() => {
    if (theme.startsWith("user-")) {
      Cookies.set("color-theme", theme, {
        expires: 1000
      });
    }
  }, [theme]);
  
  return (
    <ThemeContext value={{theme, activeTheme, setTheme}}>
      <html
        data-color-theme={theme}
        style={
          activeTheme === "light" ? LIGHT_TOKENS :
          activeTheme === "dark" ? DARK_TOKENS : {}
        }
        {...delegated}
      >
        <head>
          <style>{style}</style>
        </head>
        {children}
      </html>
    </ThemeContext>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext).theme;
}

export default ThemeRootInner;
