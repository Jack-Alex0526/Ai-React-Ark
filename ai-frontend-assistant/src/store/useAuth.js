import { create } from "zustand";

export const useAuth = create((set) => ({
  user: localStorage.getItem("user") || null,

  login: (name) => {
    localStorage.setItem("user", name);
    set({ user: name });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));