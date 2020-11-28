import * as React from "react";

import AuthenticatedApp from "./Authenticated-app";
import UnauthenticatedApp from "./Unauthenticated-app";

const URL = "http://localhost:8080/1705588/login";

function App() {
  const [user, setUser] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [doesHaveUser, setDoesHaveUser] = React.useState(false);

  React.useEffect(() => {
    if (!doesHaveUser) {
      return;
    }
    fetch(
      `${URL}?name=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setUser(data);
          setDoesHaveUser(true);
        },
        (err) => setError(err)
      );
  }, [doesHaveUser, password, username]);

  function login({ username, password }) {
    setUsername(username);
    setPassword(password);
    setDoesHaveUser(true);
  }

  return user ? (
    <AuthenticatedApp user={user} />
  ) : (
    <UnauthenticatedApp error={error} onSubmit={login} />
  );
}

export default App;
