import { defineStore } from "pinia";

export type User = {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  description: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  planExpiration: number;
  expirationAccessTime: number;
  expirationRefreshTime: number;
};

type AccessTokens = {
  access_token: string;
  refresh_token: string;
};

type RefreshTokenResponse = {
  tokens: AccessTokens;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    ready: false
  }),

  actions: {
    // -----------------------------
    // Save user + persist
    // -----------------------------
    saveUser(newUser: User | null) {
      if (!newUser) {
        this.user = null;
        if (process.client) localStorage.removeItem("user");
        return;
      }

      this.user = {
        ...newUser,
        expirationAccessTime: Date.now() + 7 * 60 * 1000, // 7 min
        expirationRefreshTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
      };

      if (process.client) {
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },

    // -----------------------------
    // API call to refresh tokens
    // -----------------------------
    async refreshTokenApiCall(token: string): Promise<AccessTokens | null> {
      try {
        const data = await $fetch<RefreshTokenResponse>(
          config.public.BACKEND_URL + "/api/refresh",
          {
            method: "POST",
            body: { refresh_token: token },
          },
        );

        return {
          access_token: data.tokens.access_token,
          refresh_token: data.tokens.refresh_token,
        };
      } catch {
        return null;
      }
    },

    // -----------------------------
    // Refresh logic
    // -----------------------------
    async refreshToken() {
      if (!this.user) return false;

      const now = Date.now();

      // Refresh token expired → logout
      if (now > this.user.expirationRefreshTime) {
        this.logout();
        return false;
      }

      // Access token expired → refresh
      if (now > this.user.expirationAccessTime) {
        const tokens = await this.refreshTokenApiCall(this.user.refreshToken);

        if (!tokens) {
          this.logout();
          return false;
        }

        this.saveUser({
          ...this.user,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        });
      }

      return true;
    },

    // -----------------------------
    // Getters as actions (async)
    // -----------------------------
    async isLogged() {
      if (!this.user) return false;
      await this.refreshToken();
      return this.user !== null;
    },

    async getUser() {
      await this.refreshToken();
      return this.user;
    },

    getRole() {
      return this.user?.role;
    },

    // -----------------------------
    // Logout
    // -----------------------------
    logout() {
      if (process.client) {
        this.user = null; 
        localStorage.removeItem("user");
        navigateTo("/")
      };
    },

    // -----------------------------
    // Load from localStorage on init
    // -----------------------------
    async init() {
      if (process.client && !this.user) {
        const saved = localStorage.getItem("user");
        if (saved) {
          this.user = JSON.parse(saved);
          await this.refreshToken();
        }
      }
      this.ready = true
    },
  },
});
