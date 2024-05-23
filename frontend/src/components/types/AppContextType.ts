import { UserInfo } from "./UserInfo";

export interface AppContextType {
    user: UserInfo | undefined;
    logIn: (userData: UserInfo, token:string) => void;
    logOut: () => void;
}