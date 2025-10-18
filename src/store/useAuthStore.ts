import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



type User ={
    id: string;
    nome: string;
    email: string;
    role: 'Admin' | 'Vendedor';
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