import { createContext } from "react";

type AuthContextType = {
    isLoggedIn: boolean
    login: (token: string) => void
    logout: () => void
    doneChecking: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext