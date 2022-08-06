import create from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      email: "",
      role: "",
      logoutTimeoutId: "",
      pictureData: "",
      refreshTokenError: {},
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
      setPictureData: (pictureData) => {
        set({
          pictureData: pictureData,
        });
      },
      resetUser: () => {
        set({
          accessToken: "",
          refreshToken: "",
          email: "",
          role: "",
          logoutTimeoutId: "",
          refreshTokenError: "",
        });
      },
    }),
    { name: "user-storage", getStorage: () => sessionStorage }
  )
);
