import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFoundPage from "./pages/notFound";
import AlreadyAuthenticated from "./auth/AlreadyAuthenticated";
import { useContext, useEffect } from "react";
import GlobalContext from "./contexts/globalContext";
import Tasks from "./pages/home/tasks";
import NoListSelected from "./shared/NoListSelected";

const router = createBrowserRouter([
   {
      path: "/",
      element: <>
         <ProtectedRoute>
            <Home />
         </ProtectedRoute>
      </>,
      children: [
         {
            index: true,
            element: <NoListSelected />
         },
         {
            path: "/:list_id",
            element: <Tasks />
         }
      ]
   },
   {
      path: "/login",
      element: <>
         <AlreadyAuthenticated>
            <LoginPage />
         </AlreadyAuthenticated>
      </>
   },
   {
      path: "/signup",
      element: <>
         <AlreadyAuthenticated>
            <SignupPage />
         </AlreadyAuthenticated>
      </>
   },
   {
      path: "*",
      element: <NotFoundPage />
   }
])

function App() {

   const globalState = useContext(GlobalContext);
   if (!globalState) throw new Error("GlobalContext not provided");

   const { lang, theme, changeLang } = globalState

   useEffect(() => {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
   }, [lang, theme, changeLang])


   return (
      <div>
         <RouterProvider router={router} />
      </div>
   )
}

export default App
