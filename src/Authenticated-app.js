import * as React from "react";
import { Redirect } from "react-router-dom";

import { Navbar, Table } from "./components";

export default function AuthenticatedApp({ user }) {
  const isAuthenticated = !!user;

  return isAuthenticated ? (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Table level={user.level} />
    </>
  ) : (
    <Redirect to="/login" />
  );
}
