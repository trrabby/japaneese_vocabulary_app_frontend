import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import { MainLayout } from "../Layout/MainLayout";
import { LoginPage } from "../Pages/LoginPage";
import { LessonsPage } from "../Pages/lesson/Lessons";
import { PrivateRoute } from "../Providers/PraivateRoute";
import { LessonDetails } from "../Pages/lesson/LessonDetails";
import { Vocabularies } from "../Pages/Vocabulary/Vocabularies";
import { Register } from "../Pages/Register";

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
      {
        path: "/vocabularies",
        element: (
          <PrivateRoute>
            <Vocabularies></Vocabularies>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
