import { create } from "zustand";
import { persist } from "zustand/middleware";

const getMaxId = (histories) => {
  if (!histories || histories.length === 0) return 0;
  return Math.max(...histories.map(h => h.id || 0));
};

export const useHistory = create(
  persist(
    (set) => ({
      histories: [],

      addHistory: (prompt, answer) =>
        set((state) => ({
          histories: [
            {
              id: getMaxId(state.histories) + 1,
              prompt,
              answer,
              time: new Date().toLocaleString(),
            },
            ...state.histories,
          ],
        })),

      clearHistory: () => set({ histories: [] }),
    }),
    { name: "ai-history" }
  )
);