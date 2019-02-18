import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "../service/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authAction";
import Timer from "../components/Timer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
            </Switch>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <Route
                exact
                path="/register"
                render={() => <Register authType="register" title="Register" />}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path="/login"
                render={() => <Login authType="login" title="Login" />}
              />
            </Switch>
            <Switch>
              <Route exact path="/add" render={() => <AddTask />} />
            </Switch>
            <Switch>
              <Route exact path="/:id" render={() => <Timer />} />
            </Switch>
            {/* <Switch>
                                                      <Route
                                                        exact
                                                        path="/reset"
                                                        render={() => <Auth authType="reset" title="Reset Password" />}
                                                      />
                                                    </Switch>
                                                    <Switch>
                                                      <Route
                                                        exact
                                                        path="/reset/:token"
                                                        render={() => (
                                                          <Auth authType="reset" title="Set New Password" />
                                                        )}
                                                      />
                                                    </Switch> */}
            {/* <Route
                                                                exact
                                                                path="/login"
                                                                render={() => (
                                                                  <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />
                                                                )}
                                                              />
                                                              <Route
                                                                exact
                                                                path="/register"
                                                                render={() => (
                                                                  <AuthPage
                                                                    authType="register"
                                                                    isAuthenticated={auth.isAuthenticated}
                                                                  />
                                                                )}
                                                              /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
