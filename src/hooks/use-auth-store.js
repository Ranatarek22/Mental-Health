import { create } from "zustand";
import { mental_auth_data } from "../axios";

export const useAuthStore = create((set) => ({
  token: mental_auth_data?.token || null,
  isAuthenticated: mental_auth_data?.isAuthenticated || false,
  expiresOn: mental_auth_data?.expiresOn || "",
  roles: mental_auth_data?.roles || [],
  updateActiveUser: (credentials) =>
    set(() => ({
      token: credentials.token,
      isAuthenticated: credentials.isAuthenticated,
      expiresOn: credentials.expiresOn,
      roles: credentials.roles,
    })),
  removeActiveUser: () =>
    set({ token: null, isAuthenticated: false, expiresOn: "", roles: [] }),
}));
