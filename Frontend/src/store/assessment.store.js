import create from "zustand";
import createVanillaStore from "zustand/vanilla";
import { persist } from "zustand/middleware";

const vanillaAssessmentStore = createVanillaStore(
  persist(
    (set) => ({
      assessment: null,
      setAssessment: (assessment) => {
        set({ assessment: assessment });
      },
    }),
    { name: "assessment-storage", getStorage: () => sessionStorage }
  )
);

const useAssessmentStore = create(vanillaAssessmentStore);
const { getState, setState } = vanillaAssessmentStore;

export { useAssessmentStore, getState, setState };
