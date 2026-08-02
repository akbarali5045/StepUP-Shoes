"use client";

import { ThemeProvider as AdminThemeProvider } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  return <AdminThemeProvider>{children}</AdminThemeProvider>;
};

export default ThemeProvider;