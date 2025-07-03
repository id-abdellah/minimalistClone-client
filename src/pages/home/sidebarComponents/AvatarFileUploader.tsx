import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, type ChangeEvent } from "react"
import { API } from "../../../utils/api/api";
import Loader from "../../../shared/Loader";
import { queryClient } from "../../../utils/queryClient";
import { useTranslation } from "react-i18next";

type UploadStatus = "idle" | "success" | "error" | "uploading"

type Props = {
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AvatarFileUploader({ setVisibility }: Props) {

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [status, setStatus] = useState<UploadStatus>("idle");

    const { t } = useTranslation()

    const fileInput = useRef<HTMLInputElement | null>(null)

    const openFileSelector = () => {
        if (!fileInput.current) return;
        fileInput.current.click();
    }

    const handleFileChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const selectedFile = files[0]
        setFile(selectedFile)

        // generate file preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string)
        };
        reader.readAsDataURL(selectedFile)
    }

    const handleFileUpload = async () => {
        if (!file) return;
        setStatus("uploading");
        const formData = new FormData();
        formData.append("avatar", file);
        try {
            await API.changeAvatarPic(formData);
            setFile(null);
            setStatus("idle");
            await queryClient.refetchQueries({ queryKey: ["userdata"] });
            setVisibility(false)
        } catch (error) {
            setStatus("error");
            console.log(error);
        }
    }


    return (
        <div className="fixed top-0 left-0 w-dvw h-dvh grid place-content-center bg-secondary-light/30" onClick={() => setVisibility(false)}>

            <div className="bg-surface p-2 rounded-md space-y-3" onClick={(e) => e.stopPropagation()}>

                <div className="border border-dashed w-60 h-48 p-2">
                    {
                        file === null
                            ?
                            <div className="flex flex-col gap-2 text-xl cursor-pointer select-none items-center justify-center h-full" onClick={openFileSelector}>
                                <FontAwesomeIcon icon={faCloudArrowUp} />
                                {t("upload.selectMsg")}
                                <input ref={fileInput} accept="image/*" type="file" className="hidden" onChange={handleFileChanges} />
                            </div>
                            :
                            <img src={previewUrl!} alt="" className="block max-w-full max-h-full mx-auto" />
                    }
                </div>

                <button className="bg-primary w-full p-2 rounded-md cursor-pointer hover:bg-primary-hover text-on-primary font-bold disabled:text-gray-400 disabled:bg-primary-dark" disabled={!file} onClick={() => handleFileUpload()}>
                    {
                        status === "uploading"
                            ?
                            <Loader size={20} styles="mx-auto" />
                            :
                            t("upload.upload")
                    }
                </button>

            </div>

        </div>
    )
}