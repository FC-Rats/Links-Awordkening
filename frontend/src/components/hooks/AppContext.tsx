import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppContextType } from "../types/AppContextType";
import { UserInfo } from "../types/UserInfo";
import { StatePage } from "../types/StatePage";
import { createLog } from "../../services/LogServices";

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
    const [previousPages, setPreviousPages] = useState<StatePage[]>(() => {
        // Get previousPages data from localStorage if it exists
        const previousPagesData = localStorage.getItem('previousPages');
        return previousPagesData ? JSON.parse(previousPagesData) : ["choosing"];
    });

    const goTo = (newPage: StatePage) => {
        setPreviousPages(prevPages => {
            const updatedPages = [...prevPages, newPage];
            return updatedPages;
        });
        localStorage.setItem('previousPages', JSON.stringify(previousPages));
    };

    const goBack = () => {
        setPreviousPages(prevPages => {
            const updatedPages = prevPages.slice(0, -1);
            return updatedPages;
        });
        localStorage.setItem('previousPages', JSON.stringify(previousPages));
    };

    const resetPageGame = () => {
        setPreviousPages(prevPages => {
            return ["choosing"];
        });
        localStorage.setItem('previousPages', JSON.stringify(previousPages));
    };

    const updateUser = (userData: UserInfo) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logIn = (userData: UserInfo, token: string) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', JSON.stringify(token));
    };

    const logOut = () => {
        if(user){
            createLog({
                idUser: user.id,
                log: 'Déconnexion',
            }); 
        }
        setUser(undefined);
        setToken(undefined);
        setPreviousPages(["choosing"]);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('previousPages');
        window.location.reload();
    };

    useEffect(() => {
        localStorage.setItem('previousPages', JSON.stringify(previousPages));
    }, [previousPages]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(token));
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [user, token]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User is leaving the page
                localStorage.setItem('lastLeaveTime', JSON.stringify(Date.now()));
            } else {
                // User is coming back to the page
                const lastLeaveTime = localStorage.getItem('lastLeaveTime');
                if (lastLeaveTime) {
                    const leaveTime = JSON.parse(lastLeaveTime);
                    const currentTime = Date.now();
                    const deltaHours = (currentTime - leaveTime) / (1000 * 60 * 60);
                    if (deltaHours > 4) {
                        logOut();
                        window.location.href = '/sign-in';
                    }
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    });

    return (
        <AppContext.Provider value={{ user, logIn, logOut, token, goTo, goBack, updateUser, previousPages, resetPageGame }}>
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