import { createContext, useContext } from "react";
import {UserInfo} from "../types/UserInfo";

export const AppContext = createContext<UserInfo | undefined>(undefined);

// TODO: implement log in and log out interaction

export function useUserContext() {
  const user = useContext(AppContext);

  if (user === undefined) {
    throw new Error('useUserContext must be used with a AppContext');
  }
  return user;
}