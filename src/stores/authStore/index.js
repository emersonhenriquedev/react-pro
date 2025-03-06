import { create } from "zustand";

const authStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export { authStore };
