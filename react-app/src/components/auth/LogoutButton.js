import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await logout();
    dispatch(logout())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
