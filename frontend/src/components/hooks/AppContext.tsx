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
    const [token, setToken] = useState<string | undefined>();

    const logIn = (userData: UserInfo, token:string) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', JSON.stringify(token));
    };

    const logOut = () => {
        setUser(undefined);
        setToken(undefined);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(token));
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [user,token]);

    return (
        <AppContext.Provider value={{ user, logIn, logOut, token }}>
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
