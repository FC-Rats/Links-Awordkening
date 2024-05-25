import { MutableRefObject } from "react";
import { UserInfo } from "./UserInfo";
import { StatePage } from "./StatePage";

export interface AppContextType {
    user: UserInfo | undefined;
    token: string | undefined;
    logIn: (userData: UserInfo, token: string) => void;
    logOut: () => void;
    updateCurrentPage: (curentPageData: StatePage) => void;
    updateUser: (userData: UserInfo) => void;
    currentPage: StatePage | undefined;
}