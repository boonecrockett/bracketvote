import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  anonymousUser: { id: string; score: number } | null;
  loading: boolean;
  error: Error | null;
  setUser: (user: User | null) => void;
  setAnonymousUser: (user: { id: string; score: number } | null) => void;
  signOut: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  anonymousUser: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user, loading: false }),
  setAnonymousUser: (anonymousUser) => set({ anonymousUser }),
  signOut: async () => {
    set({ user: null, loading: false });
  },
}));

export default useAuthStore;
