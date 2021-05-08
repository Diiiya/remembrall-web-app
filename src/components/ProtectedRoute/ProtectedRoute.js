import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  token,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component token={token} {...rest} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}
