import { UserInfo } from "./UserInfo";

export interface AppContextType {
    user: UserInfo | undefined;
    logIn: (userData: UserInfo) => void;
    logOut: () => void;
}