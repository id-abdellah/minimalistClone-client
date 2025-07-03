import { useEffect, useState } from "react";
import type { GlobalContextType } from "./globalContext";
import GlobalContext from "./globalContext";
import { useTranslation } from "react-i18next";


export default function GlobalContextProvider({ children }: React.PropsWithChildren) {

    const [theme, setTheme] = useState<GlobalContextType["theme"]>("dark");
    const [lang, setLang] = useState<GlobalContextType["lang"]>("en");
    const { i18n } = useTranslation();

    useEffect(() => {
        const storedTheme: GlobalContextType["theme"] = localStorage.getItem("minimalistTheme") as ("light" | "dark" | undefined) || "dark";
        setTheme(storedTheme)
    }, []);

    useEffect(() => {
        localStorage.setItem("minimalistTheme", theme);
    }, [theme]);

    useEffect(() => {
        const storedLang = localStorage.getItem("minimalistLang") || "en";
        setLang(storedLang);
        i18n.changeLanguage(storedLang)
    }, [i18n])


    const toggleTheme = (): void => {
        setTheme((currTheme) => {
            return currTheme === "dark" ? "light" : "dark"
        })
    }

    function changeLang(newLang: string) {
        setLang(newLang);
        i18n.changeLanguage(newLang)
    }

    return (
        <GlobalContext.Provider value={{ lang, theme, toggleTheme, changeLang }}>
            {children}
        </GlobalContext.Provider>
    )
}