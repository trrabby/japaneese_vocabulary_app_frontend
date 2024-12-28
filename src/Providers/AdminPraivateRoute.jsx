/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../assets/groovyWalk.json";
import { ContextApi } from "./ContextProvider";

export const AdminPrivateRoute = ({ children }) => {
  const { user, userLoading } = useContext(ContextApi);
  const location = useLocation();
  if (user && user.role === "admin") {
    return children;
  } else {
    if (userLoading) {
      return <Lottie className="h-52" animationData={groovyWalkAnimation} />;
    }

    if (!user) {
      return (
        <Navigate to={"/login"} state={location.pathname}>
          {" "}
        </Navigate>
      );
    }
  }
};
