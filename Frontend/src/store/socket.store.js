import create from "zustand";
import createVanillaStore from "zustand/vanilla";

const vanillaSocketStore = createVanillaStore((set) => ({
  socket: {},
  setSocket: (socket) => set({ socket: socket }),
}));

const useSocketStore = create(vanillaSocketStore);
const { getState, setState } = vanillaSocketStore;

export { useSocketStore, getState, setState };
