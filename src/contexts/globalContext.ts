import { createContext } from "react";

export type GlobalContextType = {
    lang: string
    theme: "light" | "dark"
    toggleTheme: () => void
    changeLang: (newLang: string) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default GlobalContext;