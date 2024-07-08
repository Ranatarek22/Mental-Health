import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiInstance } from "../../../axios";

const TokenHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("TokenHandler component mounted");
    console.log("Current location.search:", location.search);

    return () => {
      console.log("TokenHandler component unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect ran");

    const urlParams = new URLSearchParams(location.search);
    const temporaryToken = urlParams.get("temporaryToken");

    console.log("Temporary Token:", temporaryToken);

    if (temporaryToken) {
      apiInstance
        .get(`/exchange-token?temporaryToken=${temporaryToken}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (data.token) {
            console.log("Token received:", data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("expiresOn", data.expiresOn);
            localStorage.setItem("email", data.email);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("roles", JSON.stringify(data.roles));
            navigate("/profile");
          }
        })
        .catch((error) => {
          console.error("There was an error exchanging the token!", error);
        });
    }
  }, [location.search, navigate]);

  return null;
};

export default TokenHandler;
