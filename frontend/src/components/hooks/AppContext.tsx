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
        return userData ? JSON.parse(userData) : undefined; 
    });
    const [token, setToken] = useState<string | undefined>(() => {
        // Get toekn data from localStorage if it exists
        const tokenData = localStorage.getItem('token');
        return tokenData ? JSON.parse(tokenData) : undefined; 
    });
    const [curentPage, setCurentPage] = useState<string | undefined>(() => {
        // Get currentPage data from localStorage if it exists
        const curentPageData = localStorage.getItem('curentPage');
        return curentPageData ? JSON.parse(curentPageData) : undefined; 
    });

    const updateCurentPage = (curentPageData: string) => {
        setCurentPage(curentPageData);
        localStorage.setItem('curentPage', JSON.stringify(curentPageData));
    };

    const updateUser = (userData: UserInfo) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

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
        <AppContext.Provider value={{ user, logIn, logOut, token, updateCurentPage, updateUser }}>
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
