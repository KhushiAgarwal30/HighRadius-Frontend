import * as React from "react";
import { useHistory } from "react-router-dom";

import { Navbar } from "./components";

const URL = "http://localhost:8080/1705588/dashboard";

export default function AuthenticatedApp({ user }) {
  const history = useHistory();

  React.useLayoutEffect(() => {
    if (user == null) {
      history.push("/login");
    }
  }, [user, history]);

  React.useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then(
        (data) => console.log(data),
        (err) => console.log(err)
      );
  }, []);

  return (
    <>
      <Navbar isAuthenticated={!!user} />
      <h1>Currently logged in user has a level of: {user?.level}</h1>
    </>
  );
}
