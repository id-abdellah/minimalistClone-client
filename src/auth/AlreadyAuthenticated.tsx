/**
 * This AlreadyAuthenticated meant for redirecting the user if he is alreay "logged in"
 *      from "/login" or "/signup" to "/" home app page
 */

import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Navigate } from "react-router";

export default function AlreadyAuthenticated({ children }: React.PropsWithChildren) {
    const auth = useContext(AuthContext)
    if (!auth) throw new Error("AuthContext not provided");

    const { isLoggedIn, doneChecking } = auth;

    if (isLoggedIn && doneChecking) {
        return <Navigate to={"/"} replace />
    }

    return (
        <>
            {children}
        </>
    )
}