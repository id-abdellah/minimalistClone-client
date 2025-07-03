import { useTranslation } from "react-i18next";

export default function NoListSelected() {
    const { t } = useTranslation()

    return (
        <div className="text-xl text-center h-full text-secondary grid place-content-center">{t("mainView.noListSelected")}</div>
    )
}