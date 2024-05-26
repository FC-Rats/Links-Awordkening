import { MutableRefObject } from "react";
import { UserInfo } from "./UserInfo";
import { StatePage } from "./StatePage";

export interface AppContextType {
    user: UserInfo | undefined;
    token: string | undefined;
    logIn: (userData: UserInfo, token: string) => void;
    logOut: () => void;
    goTo: (newPage: StatePage) => void;
    goBack: () => void;
    updateUser: (userData: UserInfo) => void;
    previousPages: StatePage[];
    resetPageGame: () => void;
}