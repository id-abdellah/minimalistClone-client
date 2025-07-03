import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api/api";
import Loader from "../../../shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faChevronDown, faEnvelope, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/authContext";
import { useTranslation } from "react-i18next";
import AvatarFileUploader from "./AvatarFileUploader";

export default function UserProfile() {
    const auth = useContext(AuthContext);
    const { t } = useTranslation();
    const [fileUploaderVis, setFileUploaderVis] = useState<boolean>(false)

    const { data: userData, isLoading, isError } = useQuery({
        queryFn: () => API.getCurrentUser(),
        queryKey: ["userdata"],
        gcTime: 0,
        refetchOnWindowFocus: false,
        select(data) {
            return data.data
        },
    })

    if (isLoading) return <Loader size={25} />;
    if (isError || !userData) return <code>Unknown error occured</code>;

    return (
        <div id="userProfileWrapper" className="flex items-center justify-center gap-2 w-full">

            <div className="group relative size-10 rounded-full overflow-hidden cursor-pointer" onClick={() => setFileUploaderVis(true)}>
                <img className="w-full" src={`${userData.avatarUrl}?t=${Date.now()}`} alt="user avatar image" />
                <div className="top-1/2 left-1/2 text-sm -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full grid place-content-center bg-secondary-light/50 absolute opacity-0 group-hover:opacity-100 transition-opacity">
                    <FontAwesomeIcon icon={faCamera} />
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center gap-1">
                <div className="whitespace-nowrap overflow-hidden overflow-ellipsis flex-1 w-1 text-on-surface font-medium">{userData.username}</div>
                <button id="userProfilePopupControle" popoverTarget="userProfilePopup" popoverTargetAction="toggle" className="block text-sm transition-colors cursor-pointer text-secondary-light hover:text-secondary-hover">
                    <FontAwesomeIcon icon={faChevronDown} />
                </button>
            </div>

            <div popover="auto" id="userProfilePopup" className="rounded-md text-[12px] *:flex *:gap-2 *:items-center *:border-b *:pb-2 *:border-b-secondary-hover *:p-2">
                <div>
                    <span>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span>
                        {userData.username}
                    </span>
                </div>
                <div>
                    <span>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span>
                        {userData.email}
                    </span>
                </div>
                <button className="cursor-pointer transition-colors hover:bg-secondary-hover w-full" onClick={auth?.logout}>
                    <span>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </span>
                    <span>
                        {t("auth.logout")}
                    </span>
                </button>
            </div>

            {
                fileUploaderVis
                    ?
                    <AvatarFileUploader setVisibility={setFileUploaderVis} />
                    :
                    null
            }
        </div>
    )
}