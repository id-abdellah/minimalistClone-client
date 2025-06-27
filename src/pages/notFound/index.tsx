import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

export default function NotFoundPage() {

    const [countdown, setCountdown] = useState<number>(5);
    const navigate = useNavigate()

    useEffect(() => {
        const c = setInterval(() => {
            if (countdown <= 0) {
                navigate("/")
            } else {
                setCountdown(prev => prev - 1);
            }
        }, 1000)

        return () => {
            clearInterval(c)
        }
    })

    return (
        <div className="bg-bg h-dvh flex justify-center items-center flex-col text-3xl gap-6 font-bold">
            <span>404</span>
            <span>Hmmm. it seems like the route doesn't exists.</span>
            <span>You will be redirected to home page in {countdown}</span>
        </div>
    )
}