import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "../service/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authAction";
import Timer from "../components/Timer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  browserHistory
} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { Provider } from "react-redux";
import store from "../store";
import Dashboard from "../components/Dashboard";
import AddTask from "../components/AddTask";
import Action from "../components/Action";

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
            <Route exact path="/" component={Login} />

            <Route path="/dashboard" component={Dashboard} />

            <Route
              path="/register"
              render={() => <Register authType="register" title="Register" />}
            />

            <Route
              path="/login"
              render={() => <Login authType="login" title="Login" />}
            />

            <Route path="/add" render={() => <AddTask />} />

            <Route path="/:id" render={() => <Timer />} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
