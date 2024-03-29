import { create } from "zustand";
import { mental_auth_data } from "../axios";

export const useAuthStore = create((set) => ({
  token: mental_auth_data?.token || null,
  isAuthenticated: Boolean(mental_auth_data),
  expiresOn: mental_auth_data?.expiresOn || "",
  userId: mental_auth_data?.userId || "",
  userName: mental_auth_data?.userName || "",
  email: mental_auth_data?.email || "",
  roles: mental_auth_data?.roles || [],
  photoUrl: mental_auth_data?.photoUrl || "",
  activeUser: null,

  updateActiveUser: (credentials) =>
    set(() => ({
      token: credentials.token,
      isAuthenticated: true,
      expiresOn: credentials.expiresOn,
      roles: credentials.roles,
      userId: credentials.userId,
      userName: credentials.userName,
      photoUrl: credentials.photoUrl,
      email: credentials.email,
    })),
  removeActiveUser: () =>
    set(() => {
      localStorage.removeItem("mental_auth");
      return {
        token: null,
        isAuthenticated: false,
        expiresOn: "",
        roles: [],
        userId: "",
        userName: "",
        email: "",
      };
    }),
  //Use it when we want to use it in any private route (call it in page) (side bar or footer)
  isValidToken: () =>
    set((state) => {
      const today = new Date();
      const expire_date = new Date(state.expiresOn);
      if (today.getTime() > expire_date.getTime()) {
        state.removeActiveUser();
      }
      return state;
    }),
}));
