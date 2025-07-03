import { faCirclePlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { API } from "../../../utils/api/api";
import toast from "react-hot-toast";
import Loader from "../../../shared/Loader";
import { queryClient } from "../../../utils/queryClient";

export default function CreateListButton() {
    const [dialogVis, setDialogVis] = useState<boolean>(false);
    const [lisnameInput, setListnameInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { t } = useTranslation();


    function toggleDialog() {
        setDialogVis(prev => !prev);
    }

    function handleListnameInputChange(e: ChangeEvent<HTMLInputElement>) {
        setListnameInput(e.target.value)
    }

    function handleCancelCreation() {
        toggleDialog();
        setListnameInput("");
    }

    async function handleCreateListRequest() {
        if (!lisnameInput) {
            toast.error("List name shouldn't be empty")
            return;
        }
        try {
            setIsLoading(true);
            await API.createNewList(lisnameInput.trim());
            queryClient.refetchQueries({ queryKey: ["userlists"] })
            setIsLoading(false);
            toggleDialog();
            setListnameInput("");
            toast.success("List created");
        } catch (error) {
            setIsLoading(false);
            let msg = "Error occured";
            if (error instanceof Error) {
                msg = error.message;
            };
            toast.error(msg)
        }
    }

    return (
        <>
            <button className="text-sm flex items-center gap-2 cursor-pointer rounded-md w-full p-2 transition-colors hover:bg-secondary-hover hover:text-on-secondary" onClick={toggleDialog}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <span>{t("sidebar.createList")}</span>
            </button>

            {
                dialogVis &&
                <div className="fixed top-0 left-0 w-dvw h-dvh grid place-content-center bg-on-secondary/30" onClick={toggleDialog}>

                    <div className="bg-surface rounded-md p-4 md:w-[350px] w-[250px] space-y-4" onClick={(e) => e.stopPropagation()} >
                        <div className="flex items-center justify-between font-medium">
                            <div>{t("sidebar.createList")}</div>
                            <button className="cursor-pointer transition-colors hover:text-danger" onClick={toggleDialog}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div>
                            <input type="text" autoFocus placeholder={t("sidebar.listnameInputPlaceholder")} value={lisnameInput} onChange={handleListnameInputChange} className="w-full p-2 rounded-sm outline-none ring ring-border focus:ring-4" />
                        </div>
                        <div className="flex items-center justify-end gap-3 *:px-2 *:py-1 *:text-sm *:rounded-md *:cursor-pointer *:transition-colors *:active:scale-95">
                            <button className="ring-1 ring-border hover:ring-2" onClick={handleCancelCreation}>{t("sidebar.cancel")}</button>

                            <button className="bg-primary hover:bg-primary-hover" onClick={handleCreateListRequest} disabled={isLoading}>
                                {
                                    isLoading
                                        ?
                                        <Loader size={16} styles="mx-auto" />
                                        :
                                        t("sidebar.create")
                                }
                            </button>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}