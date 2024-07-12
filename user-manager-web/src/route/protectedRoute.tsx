import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

type ProtectedRouteProps = {};
export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.user.authenticated
  );

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} replace />;
  }
};
