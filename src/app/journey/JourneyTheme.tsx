"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { Moon } from "lucide-react";
import { Navbar } from "@/components/Navbar";

type Theme = "light" | "dark";

const storageKey = "journey-theme";
const changeEvent = "journey-theme-change";
let temporaryTheme: Theme = "light";
let storageUnavailable = false;

function getTheme(): Theme {
  if (storageUnavailable) return temporaryTheme;
  try {
    return localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
  } catch (error) {
    storageUnavailable = true;
    console.warn("Journey theme preference could not be read.", error);
    return temporaryTheme;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function setTheme(theme: Theme) {
  temporaryTheme = theme;
  if (!storageUnavailable) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      storageUnavailable = true;
      console.warn("Journey theme preference could not be saved.", error);
    }
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function JourneyTheme({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  return (
    <main className="journeyPrototype-page journeyPrototype-story" data-theme={theme}>
      <div className="journeyPrototype-nav">
        <Navbar />
        <button
          type="button"
          className="journeyPrototype-themeToggle"
          aria-pressed={theme === "dark"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Moon size={16} aria-hidden="true" />
          Dark mode
          <span className="journeyPrototype-themeIndicator" aria-hidden="true" />
        </button>
      </div>
      {children}
    </main>
  );
}
