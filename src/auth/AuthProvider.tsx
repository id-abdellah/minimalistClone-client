/**
 * This AutheProvider function is providing the current user statue whether his is logged in or not.
 * 
 * The status depends on "token" key in localStorage. which is his existency means the user is logged in.
 */

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import AuthContext from "../contexts/authContext";

export function AuthProvider({ children }: React.PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [doneChecking, setDoneChecking] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsLoggedIn(false);
            setDoneChecking(true);
            return;
        }

        try {
            jwtDecode(token);
            setIsLoggedIn(true)
        } catch {
            setIsLoggedIn(false)
        } finally {
            setDoneChecking(true);
        }
    }, [])

    function login(token: string): void {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    }

    function logout(): void {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        location.reload()
    }


    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, doneChecking }}>
            {children}
        </AuthContext.Provider>
    )
}
