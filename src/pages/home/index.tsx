import { useContext, useRef } from "react"
import UserProfile from "./sidebarComponents/UserProfile";
import Lists from "./sidebarComponents/Lists";
import { Outlet } from "react-router";
import GlobalContext from "../../contexts/globalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";


export default function HomePage() {
    const { t } = useTranslation()
    const globalState = useContext(GlobalContext);
    if (!globalState) throw new Error("Global context must provided");
    const { theme, toggleTheme, lang } = globalState

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const toggleSidebar = () => {
        const sidebar = sidebarRef.current!;
        const currentStatus = parseInt(getComputedStyle(sidebar).marginInlineStart) < 0 ? "hidden" : "open";
        sidebar.style.marginInlineStart = currentStatus === "hidden" ? "0px" : "-250px";
    }

    return (
        <div className="flex">

            <div ref={sidebarRef} className="bg-surface text-on-surface h-dvh w-[250px] p-5 relative transition-all md:ms-0 -ms-[250px]">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <UserProfile />
                        <Lists />
                    </div>

                    {/* some settings */}
                    <div className="flex items-center">
                        <div onClick={toggleTheme} className="bg-border size-6 rounded-full grid place-content-center text-sm transition-colors cursor-pointer hover:bg-border/50">
                            {
                                theme === "dark"
                                    ?
                                    <FontAwesomeIcon icon={faMoon} />
                                    :
                                    <FontAwesomeIcon icon={faSun} />
                            }
                        </div>
                        <div>
                            <select value={lang} onChange={(e) => {
                                const choosedLang = e.target.selectedOptions[0].value;
                                localStorage.setItem("minimalistLang", choosedLang);
                                location.reload();
                            }}
                                className="d-select *:bg-surface">
                                <option value="en">{t("sidebar.langEn")}</option>
                                <option value="ar">{t("sidebar.langAr")}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 h-dvh p-5">
                <Outlet context={{ toggleSidebar }} />
            </div>
        </div>
    )
}