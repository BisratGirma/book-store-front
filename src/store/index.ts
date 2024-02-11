import { create } from "zustand";

interface Search {
  search: null | string;
  minPrice: number;
  maxPrice: number;
}

export const useStore = create((set) => ({
  search: { search: null, minPrice: 0, maxPrice: Infinity },
  setSearch: (search: string) => set((state: Search) => ({ ...state, search })),
  setMinPrice: (minPrice: number) =>
    set((state: Search) => ({ ...state, minPrice })),
  setMaxPrice: (maxPrice: number) =>
    set((state: Search) => ({ ...state, maxPrice })),

  // auth states
  user: { jwt: null, points: null },
  setToken: (token: string) => {
    set((state: any) => {
      return { ...state, user: { ...state.user, jwt: token } };
    });
  },
  setPoints: (points: number) =>
    set((state: any) => ({ ...state, user: { ...state.user, points } })),
  removeToken: () =>
    set((state: any) => ({ ...state, user: { ...state.user, jwt: null } })),
}));
