import * as React from "react";
import { Switch, Route } from "react-router-dom";

import AuthenticatedApp from "./Authenticated-app";
import UnauthenticatedApp from "./Unauthenticated-app";
import { Navbar } from "./components";

function App() {
  const [user, setUser] = React.useState(() =>
    JSON.parse(window.localStorage.getItem("token"))
  );
  const isAuthenticated = !!user;

  return (
    <Switch>
      <Route path="/" exact>
        <AuthenticatedApp user={user} isAuthenticated={isAuthenticated}>
          <Navbar isAuthenticated={isAuthenticated} setUser={setUser} />
        </AuthenticatedApp>
      </Route>
      <Route path="/login" exact>
        <UnauthenticatedApp setUser={setUser} isAuthenticated={isAuthenticated}>
          <Navbar isAuthenticated={false} />
        </UnauthenticatedApp>
      </Route>
    </Switch>
  );
}

export default App;
