import React from "react";
import { useAuth } from "../AuthProvider";
import { Route, useNavigate } from "react-router-dom";

/**
 * @param {Object} props
 * @param {Object} props.component
 * @param {Object} props.rest
 * @returns {React.ReactElement} JSX
 * @description This is a private route component that checks if the user is logged in.
 */
export default function PrivateRoute({ component, ...rest }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
  }

  return <Route {...rest} component={component} />;
}
