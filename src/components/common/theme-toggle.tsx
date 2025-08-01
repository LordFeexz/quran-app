import { useState, useEffect, useCallback, memo } from "react";
import { Sun, Moon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export type Theme = "light" | "dark" | null;

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "dark") {
    return <Sun className="w-5 h-5" />;
  } else if (theme === "light") {
    return <Moon className="w-5 h-5" />;
  } else {
    return <Loader2 className="w-5 h-5 animate-spin" />;
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, [setTheme, theme]);

  return (
    <Button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <ThemeIcon theme={theme} />
    </Button>
  );
}

export default memo(ThemeToggle);
