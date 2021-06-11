import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const isJWTToken = new RegExp(
    "^[A-Za-z0-9\\-_=]+\\.[A-Za-z0-9\\-_=]+(\\.[A-Za-z0-9\\-_.+/=]+)?$"
  );

  async function saveToken(userToken) {
    var tokenValue = userToken;
    if (isJWTToken.test(tokenValue)) {
      localStorage.setItem("token", tokenValue);
      setToken(userToken.createdToken);
      return true;
    }
    return false;
  }

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
