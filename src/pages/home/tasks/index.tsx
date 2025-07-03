import { useQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext, useParams } from "react-router"
import { API } from "../../../utils/api/api";
import Loader from "../../../shared/Loader";
import { useEffect, useState, type ChangeEvent } from "react";
import { faBarsStaggered, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { queryClient } from "../../../utils/queryClient";
import toast from "react-hot-toast";
import TasksList from "./TasksList";
import { useTranslation } from "react-i18next";

export default function Tasks() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const outletContext = useOutletContext<{ toggleSidebar: () => void }>();

    const { list_id } = useParams();

    const [listname, setListname] = useState<string>("")

    function handleListnameChange(e: ChangeEvent<HTMLInputElement>) {
        setListname(e.target.value)
    }

    const { data, isLoading, isError } = useQuery({
        queryFn: () => API.getAllTasks(list_id!),
        queryKey: ["listTasks", list_id],
        refetchOnWindowFocus: false,
        select(data) {
            return data.data
        }
    });

    useEffect(() => {
        if (!data) return;
        setListname(data.list.list_name);
    }, [data])


    async function updateListnameHandler() {
        if (!data) return;
        if (listname.trim().length === 0) {
            toast.error("List name must not be empty")
            setListname(data.list.list_name);
            return;
        }
        if (listname.trim() === data?.list.list_name) return;

        try {
            await API.updateListName(data?.list.list_id, listname)
            await queryClient.refetchQueries({ queryKey: ["listTasks", data.list.list_id] })
            await queryClient.refetchQueries({ queryKey: ["userlists"] })
            toast.success("List name successfuly updated")
        } catch (error) {
            let msg = "Error occured"
            if (error instanceof Error) {
                msg = error.message
            }
            toast.error(msg)
        }
    }

    async function deleteListHandler() {
        try {
            await API.deleteList(list_id!);
            queryClient.refetchQueries({ queryKey: ["userlists"] })
            navigate("/")
            toast.success("List deleted successfuly!")
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) return <Loader size={25} />;
    if (isError) return <pre>Error occured :D</pre>;
    if (!data) return <pre>Error occured :D</pre>;

    return (
        <div className="flex flex-col gap-5">

            <div className="flex items-center gap-2">
                <div className="md:hidden block text-xl cursor-pointer active:scale-90" onClick={outletContext.toggleSidebar}>
                    <FontAwesomeIcon icon={faBarsStaggered} />
                </div>
                <div className="flex-1">
                    <input type="text" value={listname} onChange={handleListnameChange} onBlur={updateListnameHandler} className="caret-primary outline-none w-full ps-0 p-2 font-medium text-xl" />
                </div>
                <button className="cursor-pointer transition-colors hover:text-secondary-hover text-sm" title="delete this list" popoverTarget="listDeletiongConfirmation" popoverTargetAction="toggle">
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>

                <div className="w-full h-dvh bg-on-secondary/20 text-current" id="listDeletiongConfirmation" popover="auto">
                    <div className="size-full grid place-content-center">
                        <div className="bg-surface p-4 rounded-md flex flex-col gap-4">
                            <span className="font-medium">{t("mainView.deleteListConfirmation")}</span>
                            <div className="flex items-center justify-end gap-3 *:px-2 *:py-1 *:text-sm *:rounded-md *:cursor-pointer *:transition-all *:active:scale-95 font-medium">
                                <button className="ring-1 ring-border hover:ring-2" popoverTarget="listDeletiongConfirmation" popoverTargetAction="hide">{t("sidebar.cancel")}</button>
                                <button className="bg-danger hover:brightness-75" onClick={deleteListHandler} popoverTarget="listDeletiongConfirmation" popoverTargetAction="hide">{t("mainView.delete")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <TasksList tasks={data?.tasks} list_id={list_id!} />
            </div>

        </div>
    )
}