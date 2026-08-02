"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

const ThemeContext = createContext();

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("admin-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("admin-theme-change", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem("admin-theme") || "light";
}

function getServerSnapshot() {
  return "light";
}

export const ThemeProvider = ({ children }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    localStorage.setItem("admin-theme", newTheme);
    window.dispatchEvent(new Event("admin-theme-change"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);