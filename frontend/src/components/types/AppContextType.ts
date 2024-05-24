import { MutableRefObject } from "react";
import { UserInfo } from "./UserInfo";

export interface AppContextType {
    user: UserInfo | undefined;
    token: string | undefined;
    wsgCurrent: MutableRefObject<WebSocket | null>;
    wscCurrent: MutableRefObject<WebSocket | null>;
    logIn: (userData: UserInfo, token: string) => void;
    logOut: () => void;
    initializeWSG: (url: string) => Promise<WebSocket>;
    initializeWSC: (url: string) => Promise<WebSocket>;
    closeWSG: () => void;
    closeWSC: () => void;
    saveWSG: (ws: WebSocket)=> void;
    saveWSC: (ws: WebSocket) => void;
}