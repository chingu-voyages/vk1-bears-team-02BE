import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./Components/Main/Main";
import { Login } from "./Components/Login/Login";
import { Test } from "./Components/Login/Test";

import Register from "./Components/Register/Register";
import Flood from "./Components/user/Flood/Flood";
import Fire from "./Components/user/Fire/Fire";
import Earthquake from "./Components/user/Earthquake/Earthquake";
import Dashboard from "./Components/admin/Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

// Routes
import PublicRoute from "./Components/routes/PublicRoute";
import PrivateRoute from "./Components/routes/PrivateRoute";

import { AuthenticationProvider } from "./Components/context/AuthenticationContext";

const App = () => {
  return (
    <Router>
      <Switch>
        <AuthenticationProvider>
          <PublicRoute exact path="/" component={Main}></PublicRoute>
          <PublicRoute exact path="/Login" component={Login}></PublicRoute>
          <PublicRoute exact path="/Test" component={Test}></PublicRoute>

          <PublicRoute
            exact
            path="/Register"
            component={Register}
          ></PublicRoute>
          <PrivateRoute
            exact
            path="/user/flood"
            component={Test}
          ></PrivateRoute>
          <PrivateRoute exact path="/user/fire" component={Fire}></PrivateRoute>
          <PrivateRoute
            exact
            path="/user/earthquake"
            component={Earthquake}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/admin"
            component={Dashboard}
          ></PrivateRoute>

        </AuthenticationProvider>
      </Switch>
    </Router>
  );
};

export default App;
