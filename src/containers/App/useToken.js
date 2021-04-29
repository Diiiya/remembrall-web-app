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
    console.log("comes here");
    if (isJWTToken.test(userToken)) {
      localStorage.setItem("token", userToken);
      setToken(userToken);
      return true;
    }
    return false;
  }

  return {
    setToken: saveToken,
    token,
  };
}
