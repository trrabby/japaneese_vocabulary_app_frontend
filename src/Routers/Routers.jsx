import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import { MainLayout } from "../Layout/MainLayout";
import { LoginPage } from "../Pages/LoginPage";
import { LessonsPage } from "../Pages/lesson/Lessons";
import { PrivateRoute } from "../Providers/PraivateRoute";
import { LessonDetails } from "../Pages/lesson/LessonDetails";
import { Vocabularies } from "../Pages/Vocabulary/Vocabularies";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import { Contacts } from "../Pages/Contacts";
import { AdminPrivateRoute } from "../Providers/AdminPraivateRoute";
import { DashBoard } from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/Outlets/DashboardHome";
import { AddLesson } from "../Pages/Dashboard/Outlets/AddLesson";
import { AddVocabulary } from "../Pages/Dashboard/Outlets/AddVocabulary";
import { Tutorials } from "../Pages/Tutorials/Tutorials";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
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
        path: "/tutorials",
        element: (
          <PrivateRoute>
            <Tutorials></Tutorials>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/contacts",
        element: <Contacts></Contacts>,
      },
      {
        path: "/dashboard",
        element: (
          <AdminPrivateRoute>
            <DashBoard></DashBoard>
          </AdminPrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome></DashboardHome>,
          },
          {
            path: "addLesson",
            element: <AddLesson></AddLesson>,
          },
          {
            path: "addVocabulary",
            element: <AddVocabulary></AddVocabulary>,
          },
        ],
      },
    ],
  },
]);
