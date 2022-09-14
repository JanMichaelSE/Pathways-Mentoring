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
      submitValue: false,
      time: "0",
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
      setSubmitValue: (submitValue) => {
        set({
          submitValue: submitValue,
        });
      },
      setTime: (time) => {
        set({
          time: time,
        });
      },
      setSchedule: (schedule) => {
        set({
          schedule: schedule,
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
          submitValue: false,
          time: "0",
          schedule: {
            sunday: "",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
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
