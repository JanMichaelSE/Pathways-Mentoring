import create from "zustand";

export const useUserStore = create((set) => ({
  userId: "",
  email: "",
  role: "",
  setUser: (userId, email, role) =>
    set({ userId: userId, email: email, role: role }),
  resetUser: () => set({ userId: "", email: "", role: "" }),
}));
