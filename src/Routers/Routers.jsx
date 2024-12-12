import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import { MainLayout } from "../Layout/MainLayout";
import { LoginPage } from "../Pages/LoginPage";
import { LessonsPage } from "../Pages/lesson/Lessons";
import { PrivateRoute } from "../Providers/PraivateRoute";
import { LessonDetails } from "../Pages/lesson/LessonDetails";

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
        element: (
          <PrivateRoute>
            <LessonsPage></LessonsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/lessons/:lesson_no",
        element: (
          <PrivateRoute>
            <LessonDetails></LessonDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
