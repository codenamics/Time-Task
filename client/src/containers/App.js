import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../service/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authAction";
import Timer from "../components/Timer";
import AddMonth from "../components/AddMonth";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import AddTask from "../components/AddTask";
import Landing from "../components/Landing";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              path="/register"
              render={() => <Register authType="register" title="Register" />}
            />
            <Route
              path="/login"
              render={() => <Login authType="login" title="Login" />}
            />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/addMonth" component={AddMonth} />
            <PrivateRoute path="/add/:id" component={AddTask} />
            <PrivateRoute path="/:id/:task_id" component={Timer} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
