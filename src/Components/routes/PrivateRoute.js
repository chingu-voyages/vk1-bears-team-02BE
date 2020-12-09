import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthenticationContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(AuthenticationContext);
  return (
    <Route
      {...rest}
      component={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
