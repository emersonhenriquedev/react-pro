import { useState } from "react";
import { authContext } from "../../contexts/authContext";
import { PropTypes } from "prop-types";
import httpClient from "../../services/axios";

export default function AuthProvider(props) {
  const [user, setUser] = useState(null);

  async function login(data) {
    const response = await httpClient.post("/auth/login", data);
    localStorage.setItem("token", response.data.token);
    const res = await httpClient.get("/users/me");
    setUser(res.data);
  }
  return (
    <authContext.Provider value={{ login, user }}>
      {props.children}
    </authContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
