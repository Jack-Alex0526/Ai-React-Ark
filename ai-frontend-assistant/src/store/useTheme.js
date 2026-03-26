import { create } from "zustand";

export const useTheme = create((set) => ({
  isDark: localStorage.getItem("theme") === "dark",

  toggleTheme: () => {
    set((state) => {
      const next = !state.isDark;
      localStorage.setItem("theme", next ? "dark" : "light");
      return { isDark: next };
    });
  },
}));