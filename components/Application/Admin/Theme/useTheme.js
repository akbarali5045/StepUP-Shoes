"use client";

import { useTheme as useThemeContext } from "./ThemeContext";

export const useTheme = () => {
  return useThemeContext();
};