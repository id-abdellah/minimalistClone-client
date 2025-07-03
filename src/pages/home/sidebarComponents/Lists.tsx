import { useQuery } from "@tanstack/react-query"
import { API } from "../../../utils/api/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import CreateListButton from "./CreateListButton"
import Loader from "../../../shared/Loader"
import { Link, useParams } from "react-router"
import { useTranslation } from "react-i18next"

export default function Lists() {
    const { t } = useTranslation();

    const { list_id: selectedLisID } = useParams();

    const { data: userLists, isLoading, isError } = useQuery({
        queryFn: () => API.getAllUserLists(),
        queryKey: ["userlists"],
        gcTime: 0,
        refetchOnWindowFocus: false,
        select(data) {
            return data.data.lists.reverse()
        },
    })


    return (
        <div className="mt-10">
            <div className="max-h-[290px] overflow-y-auto scrollbar-none">
                {
                    isLoading
                        ?
                        <Loader size={25} styles="mx-auto" />
                        :
                        isError
                            ?
                            <pre>Error occured :(</pre>
                            :
                            userLists?.length === 0
                                ?
                                <div className="text-gray-400 text-sm text-center">{t("sidebar.noLists")}</div>
                                :
                                userLists?.map(list => {
                                    return (
                                        <Link className="text-sm flex items-center gap-2 cursor-pointer rounded-md w-full p-2 transition-colors hover:bg-secondary-hover data-[selected=true]:bg-primary data-[selected=true]:text-on-primary" data-selected={selectedLisID === list.list_id} key={list.list_id} title={list.list_name} to={list.list_id}>
                                            <span><FontAwesomeIcon icon={faBars} /></span>
                                            <span className="truncate">{list.list_name}</span>
                                        </Link>
                                    )
                                })
                }
            </div>

            <div className="mt-2 pt-2 border-t border-t-on-surface">
                <CreateListButton />
            </div>
        </div>
    )
}