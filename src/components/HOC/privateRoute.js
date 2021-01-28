import { Redirect, Route } from "react-router-dom";

/**behavior of this HOC
 * --when this HOC is called the home component is sent inside it.
 * --this function grabs the component itself and return back the same component along with the props if token is available.
 * --if token is not found it redirect it to the signin component.
 *
 */

const PrivateRoute = ({ component: Component, ...rest }) => {
  /**...rest-> path exact='/'etc. and component -> "component={}"
   * --creating a complete route with dynamic value.
   * --so that it can determine which page to redirect or load.
   */
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
