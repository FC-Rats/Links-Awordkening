import { MutableRefObject } from "react";
import { UserInfo } from "./UserInfo";

export interface AppContextType {
    user: UserInfo | undefined;
    token: string | undefined;
    logIn: (userData: UserInfo, token: string) => void;
    logOut: () => void;
    updateCurentPage: (curentPageData: string) => void;
    updateUser: (userData: UserInfo) => void;
}