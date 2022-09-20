import create from "zustand";
import createVanillaStore from "zustand/vanilla";
import { persist } from "zustand/middleware";

const vanillaUserStore = createVanillaStore(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      email: "",
      role: "",
      logoutTimeoutId: "",
      pictureData: "",
      refreshTokenError: {},
      isSubmitting: false,
      scheduleStatus: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
      schedule: {
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
      },
      setUser: (email, role) =>
        set({
          email: email,
          role: role,
        }),
      setTokens: (accessToken, refreshToken) => {
        set({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      },
      setEmail: (email) => {
        set({
          email: email,
        });
      },
      setPictureData: (pictureData) => {
        set({
          pictureData: pictureData,
        });
      },
      setIsSubmitting: (isSubmitting) => {
        set({
          isSubmitting: isSubmitting,
        });
      },
      setSchedule: (schedule) => {
        set({
          schedule: schedule,
        });
      },
      setScheduleStatus: (scheduleStatus) => {
        set({
          scheduleStatus: scheduleStatus,
        });
      },
      resetUser: () => {
        set({
          accessToken: "",
          refreshToken: "",
          email: "",
          role: "",
          logoutTimeoutId: "",
          pictureData: "",
          refreshTokenError: "",
          isSubmitting: false,
          schedule: {
            sunday: "",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
          },
          scheduleStatus: {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
          },
        });
      },
    }),
    { name: "user-storage", getStorage: () => sessionStorage }
  )
);

const useUserStore = create(vanillaUserStore);
const { getState, setState } = vanillaUserStore;

export { useUserStore, getState, setState };
