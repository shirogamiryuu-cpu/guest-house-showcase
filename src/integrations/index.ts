import { supabase } from "./supabase/client";

type SignInOptions = {
  redirect_uri?: string;
  extraParams?: Record<string, string>;
};

export const auth = {
  signInWithOAuth: async (
    provider: "google" | "apple" | "azure",
    opts?: SignInOptions
  ) => {
    return supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: opts?.redirect_uri,
        queryParams: opts?.extraParams,
      },
    });
  },

  signOut: async () => {
    return supabase.auth.signOut();
  },

  getUser: async () => {
    return supabase.auth.getUser();
  },

  getSession: async () => {
    return supabase.auth.getSession();
  },

  onAuthStateChange: (
    callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]
  ) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};