import { Moon, Sun } from "lucide-react";
import { useTheme } from "../store/useTheme";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}