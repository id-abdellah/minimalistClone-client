import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "../../../shared/Checkbox";
import type { Task } from "../../../utils/api/types"
import { faCircleExclamation, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../utils/api/api";
import Loader from "../../../shared/Loader";
import toast from "react-hot-toast";

type Props = {
    task: Task;
}

export default function SingleTask({ task }: Props) {
    const queryClient = useQueryClient()


    const [taskContent, setTaskContent] = useState<string>(task.content)
    const [taskDeletionSwitcher, setTaskDeletionSwitcher] = useState<boolean>(false)


    const { mutate: updateContent, isPending: updateContentLoadingState } = useMutation({
        mutationFn: () => API.updateTaskContent(task.list_id, task.todo_id, taskContent),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["listTasks", task.list_id] })
        }
    })

    const { mutate: deleteTodo } = useMutation({
        mutationFn: () => API.deleteTask(task.list_id, task.todo_id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["listTasks", task.list_id] })
        }
    })

    const { mutate: toggleCompletion, isPending: toggleCompletionPendingState } = useMutation({
        mutationFn: () => API.toggleTaskCompletion(task.todo_id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["listTasks", task.list_id] })
        }
    })


    async function updateContentHandler() {
        if (taskContent.trim() === task.content) return;
        if (!taskContent.trim().length) {
            toast.error("Todo content must not be empty");
            setTaskContent(task.content);
            return;
        }
        try {
            updateContent();
            toast.success("Todo updated!")
        } catch (error) {
            setTaskContent(task.content);
            toast.error(error instanceof Error ? error.message : "Error occured while updating content")
        }
    }

    async function deleteTodoHandler() {
        try {
            deleteTodo()
            setTaskDeletionSwitcher(false);
            toast.success("Todo deleted!")
        } catch {
            setTaskDeletionSwitcher(false);
            toast.error("Error occured when trying to delete")
        }
    }

    function toggleCompletionHandler() {
        try {
            toggleCompletion();
        } catch {
            toast.error("Error Occured :(")
        }
    }

    return (
        <div className="group flex gap-2 items-center justify-between transition-colors cursor-pointer hover:bg-surface p-2 rounded-md" onMouseLeave={() => setTaskDeletionSwitcher(false)}>

            <div className="group flex items-center gap-2 flex-1">
                <div>
                    {
                        toggleCompletionPendingState
                            ?
                            <Loader size={16} />
                            :
                            <Checkbox checked={!!task.completed} onChange={toggleCompletionHandler} />
                    }
                </div>
                <div className="flex-1">
                    {
                        updateContentLoadingState
                            ?
                            <Loader size={18} />
                            :
                            <input type="text" value={taskContent} disabled={!!task.completed} onChange={(e) => setTaskContent(e.target.value)} onBlur={updateContentHandler} className="w-full outline-none disabled:text-border disabled:line-through" />
                    }
                </div>
            </div>

            <div className="text-sm cursor-pointer hidden group-hover:block transition-colors hover:text-secondary-light">
                {
                    taskDeletionSwitcher
                        ?
                        <div className="text-danger" onClick={deleteTodoHandler}>
                            <FontAwesomeIcon icon={faCircleExclamation} />
                        </div>
                        :
                        <div onClick={() => setTaskDeletionSwitcher(true)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                }
            </div>
        </div>
    )
}