import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import { MainLayout } from "../Layout/MainLayout";
import { LoginPage } from "../Pages/LoginPage";
import { Lessons } from "../Pages/lesson/Lessons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/lessons",
        element: <Lessons></Lessons>,
      },
    ],
  },
]);
