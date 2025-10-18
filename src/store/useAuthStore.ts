import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



type User ={
    userId: string;
    name: string;
    role: 'Client' | 'Provider';
    token: string;
}

type AuthState = {
    user: User | null;
    setUser: (user: User) => void
    logout: () => void
}


export const useAuthStore = create<AuthState>()(
    persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null })
        sessionStorage.removeItem('auth')
      },
    }),
    {
      name: 'auth', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)