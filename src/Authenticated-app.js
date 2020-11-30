import * as React from "react";
import { Redirect } from "react-router-dom";

import { Table } from "./components";

export default function AuthenticatedApp({ user, children }) {
  const isAuthenticated = !!user;

  return isAuthenticated ? (
    <>
      {children}
      <Table level={user.level} />
    </>
  ) : (
    <Redirect to="/login" />
  );
}
