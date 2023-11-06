import { create } from 'zustand';

const useAuthStore = create((set) => ({
    loggedIn: false,
    login: () => set((state) => { state.loggedIn = true }),
    logout: () => set((state) => { state.loggedIn = false }),
}));

export default useAuthStore;