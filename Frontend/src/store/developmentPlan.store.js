import create from "zustand";
import createVanillaStore from "zustand/vanilla";
import { persist } from "zustand/middleware";

const vanillaDevelopmentPlanStore = createVanillaStore(
  persist(
    (set) => ({
      developmentPlan: null,
      setDevelopmentPlan: (developmentPlan) => {
        set({ developmentPlan: developmentPlan });
      },
      resetDevelopmentPlan: () => {
        set({
          developmentPlan: null,
        });
      },
    }),
    { name: "developmentPlan-storage", getStorage: () => sessionStorage }
  )
);

const useDevelopmentPlanStore = create(vanillaDevelopmentPlanStore);
const { getState, setState } = vanillaDevelopmentPlanStore;

export { useDevelopmentPlanStore, getState, setState };
