import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppContextType } from "../types/AppContextType";
import { UserInfo } from "../types/UserInfo";

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
    const [user, setUser] = useState<UserInfo | undefined>(() => {
        // Get user data from localStorage if it exists
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : undefined; // Replace testUser with undefined if needed
    });

    const logIn = (userData: UserInfo) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logOut = () => {
        setUser(undefined);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <AppContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </AppContext.Provider>
    );
};

export function useUserContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useUserContext must be used within an AppProvider');
    }

    return context;
}
