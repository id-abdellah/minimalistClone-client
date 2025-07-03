import { useState } from "react";
import type { Task } from "../../../utils/api/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../utils/api/api";
import Loader from "../../../shared/Loader";
import toast from "react-hot-toast";
import SingleTask from "./SingleTask";
import { useTranslation } from "react-i18next";


type Props = {
    tasks: Task[],
    list_id: string
};

export default function TasksList({ tasks, list_id }: Props) {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    // states
    const [uiState, setUiState] = useState({
        createTodoPopupVisibility: false,
    });
    const [newTodoContent, setNewTodoContent] = useState<string>("");

    // Mutations
    const { mutate: createTodo, isPending: createTodoLoadingState } = useMutation({
        mutationFn: () => API.createNewTask(list_id, newTodoContent.trim()),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["listTasks", list_id] });
            setNewTodoContent("");
            toggleCreateTodoPopupVis();
            toast.success("Todo created!");
        }
    })


    /**
     * State Controllers 
     **/

    function toggleCreateTodoPopupVis() {
        setUiState(prev => (
            {
                ...prev,
                createTodoPopupVisibility: !prev.createTodoPopupVisibility
            }
        ))
    }

    return (
        <div>
            <div className="space-y-4">
                <div className="flex flex-col max-h-[75vh] overflow-auto scrollbar-none">
                    {
                        tasks.map(task => {
                            return <SingleTask task={task} key={task.todo_id} />
                        })
                    }
                </div>

                <button className="text-sm flex items-center gap-2 font-medium text-secondary cursor-pointer w-fit transition-colors hover:text-secondary/50" onClick={toggleCreateTodoPopupVis}>
                    <span>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span>{t("mainView.addTask")}</span>
                </button>
            </div>



            {/* create todo popup */}
            {
                uiState.createTodoPopupVisibility &&
                <div className="fixed bg-secondary/20 top-0 left-0 w-dvw h-dvh grid place-content-center" onClick={toggleCreateTodoPopupVis}>
                    <div className="p-3 bg-surface rounded-md flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                        <div>
                            <input className="p-3 w-72 text-sm outline-none ring ring-secondary/30 rounded-md" type="text" autoFocus placeholder={t("mainView.addTaskInputPlaceholder")} value={newTodoContent} onChange={(e) => setNewTodoContent(e.target.value)} />
                        </div>
                        <div className="flex gap-2 items-center justify-end *:py-1 *:px-2 *:rounded-md *:cursor-pointer *:transition-colors *:active:scale-95" >
                            <button className="ring ring-border hover:ring-2" onClick={toggleCreateTodoPopupVis}>{t("sidebar.cancel")}</button>
                            <button className="bg-primary hover:bg-primary-hover disabled:bg-border" disabled={createTodoLoadingState || newTodoContent.trim().length === 0} onClick={() => createTodo()}>
                                {
                                    createTodoLoadingState
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
        </div>
    )
}