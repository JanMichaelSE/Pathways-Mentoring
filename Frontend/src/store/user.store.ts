import create from "zustand";

const useUserStore = create((set) => ({
  userid: "",
  email: "",
}))