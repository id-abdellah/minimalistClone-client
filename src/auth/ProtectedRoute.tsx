/**
 * ProtectedRoute
 * 
 * This Component is meant for redirecting user from home page "/" to "/login" page, if he is not logged in.
 * It depends on "AuthProvider" context provider
 */


import type React from "react";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Navigate } from "react-router";


export default function ProtectedRoute({ children }: React.PropsWithChildren) {

    const auth = useContext(AuthContext)
    if (!auth) throw new Error("AuthContext not provided");

    const { isLoggedIn, doneChecking } = auth;

    if (!isLoggedIn && doneChecking) {
        return <Navigate to={"/login"} replace />
    }

    return (
        <>
            {children}
        </>
    )
}