import React from "react";
import OpenRoutes from "./OpenRoutes";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";

const Routes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const selectRoutes = () => {
    if (isAuthenticated) {
      return <PrivateRoutes />;
    } else {
      return <OpenRoutes />;
    }
  };
  return selectRoutes();
};

export default Routes;
