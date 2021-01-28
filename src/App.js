import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import home from "./container/home/home";
import Signin from "./container/signin/signin";
import Signup from "./container/signup/signup";
import PrivateRoute from "./components/HOC/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLogedIn } from "./store/actions/auth.actons";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  /**simillar to componentdidmount
   * use effect trigget isUserLgedin fucntion --> which further trigger LOGIN_SUCCESS action if token is found in localstoreage.
   * when LOGIN_SUCCESS action is erceived by reducer it sets the token and user to reduc store
   * and also sets the authenticate : true even after the refresh of the page.
   * The redirect function is kept signin and sign up compoent and to prevent the blink glitch
   * we directly use the useeffect in root component. because root render all component.
   * after page refresh the store value is also sets to initial state so to set the user token and user obj the login success is triggered again using the localstorage value.
   */
  useEffect(() => {
    if (!auth.authenticate) dispatch(isUserLogedIn());
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
