import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFoundPage from "./pages/notFound";
import AlreadyAuthenticated from "./auth/AlreadyAuthenticated";
import { useContext, useEffect } from "react";
import GlobalContext from "./contexts/globalContext";

function App() {

   const globalState = useContext(GlobalContext);
   if (!globalState) throw new Error("GlobalContext not provided");

   const { lang, theme } = globalState

   useEffect(() => {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
   }, [lang, theme])

   return (
      <div>
         <Routes>
            <Route path="/" element={<Navigate to="/lists" />} />
            <Route path="/lists" element={
               <ProtectedRoute>
                  <Home />
               </ProtectedRoute>
            } />
            <Route path="/login" element={
               <AlreadyAuthenticated>
                  <LoginPage />
               </AlreadyAuthenticated>
            } />
            <Route path="/signup" element={
               <AlreadyAuthenticated>
                  <SignupPage />
               </AlreadyAuthenticated>
            } />

            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </div>
   )
}

export default App
