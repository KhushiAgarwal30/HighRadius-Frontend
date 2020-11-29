import * as React from "react";
import { Switch, Route } from "react-router-dom";

import AuthenticatedApp from "./Authenticated-app";
import UnauthenticatedApp from "./Unauthenticated-app";

function App() {
  const [user, setUser] = React.useState(() =>
    JSON.parse(window.localStorage.getItem("token"))
  );

  return (
    <Switch>
      <Route path="/" exact>
        <AuthenticatedApp user={user} />
      </Route>
      <Route path="/login" exact>
        <UnauthenticatedApp user={user} setUser={setUser} />
      </Route>
    </Switch>
  );
}

export default App;
