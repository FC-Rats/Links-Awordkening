import { createContext, ReactNode, useContext, useState } from "react";
import { AppContextType } from "../types/AppContextType";
import { UserInfo } from "../types/UserInfo";

export const AppContext = createContext<AppContextType | undefined>(undefined);



interface AppContextProviderProps {
  children: ReactNode;
}

const testUser: UserInfo = {
    id: 1004,
    email: "luke@gmail.com",
    name: "Luke Skywalker",
    profilPicture: "/img/profilepictures/coconut.jpg",
    tokenR: "1122334455",
    visibility: "PUBLIC",
    verified: false,
    admin: true,
    averageScore: 85,
    birthYear: "1982",
};

export function AppContextProvider({children}: AppContextProviderProps) {
  const [user, setUser] = useState<UserInfo | undefined>(testUser); // undefined without testUser

  const logIn = (userData: UserInfo) => {
      setUser(userData);
      // Optionally, save the user data in localStorage or a cookie here
  };

  const logOut = () => {
      setUser(undefined);
      // Optionally, remove the user data from localStorage or a cookie here
  };

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