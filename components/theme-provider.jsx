"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme provider component that wraps the application to provide theme context
 *
 * @param {Object} props - Component props
 * @param {string} [props.attribute="class"] - HTML attribute to apply the theme value to
 * @param {string} [props.defaultTheme="system"] - Default theme to use
 * @param {boolean} [props.enableSystem=true] - Whether to enable system theme detection
 * @param {boolean} [props.disableTransitionOnChange=false] - Whether to disable transitions when changing theme
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Theme provider component
 */
export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
