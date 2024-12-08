import { useEffect, useState } from "react";
import { authContext } from "../../contexts/authContext";
import { PropTypes } from "prop-types";
import httpClient from "../../services/axios";

export default function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userSaved = JSON.parse(localStorage.getItem("user"));
    if (userSaved) {
      setUser(userSaved);
    }
    setIsLoading(false);
  }, []);

  async function login(data) {
    const response = await httpClient.post("/auth/login", data);
    localStorage.setItem("token", response.data.token);
    const res = await httpClient.get("/users/me");
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <authContext.Provider value={{ user, isLoading, login, logout }}>
      {props.children}
    </authContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
