import * as React from "react";
import { Redirect } from "react-router-dom";

import { Table } from "./components";

export default function AuthenticatedApp({ user, isAuthenticated, children }) {
  return isAuthenticated ? (
    <>
      {children}
      <Table username={user.username} level={user.level} />
    </>
  ) : (
    <Redirect to="/login" />
  );
}
