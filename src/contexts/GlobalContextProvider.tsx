import { useState } from "react";
import type { GlobalContextType } from "./globalContext";
import GlobalContext from "./globalContext";


export default function GlobalContextProvider({ children }: React.PropsWithChildren) {

    const [theme, setTheme] = useState<GlobalContextType["theme"]>("light");
    const [lang, setLang] = useState<GlobalContextType["lang"]>("en");

    const toggleTheme = (): void => {
        setTheme((currTheme) => {
            return currTheme === "dark" ? "light" : "dark"
        })
    }

    const changeLang = (newLang: string): void => {
        setLang(newLang)
    }

    return (
        <GlobalContext.Provider value={{ lang, theme, toggleTheme, changeLang }}>
            {children}
        </GlobalContext.Provider>
    )
}