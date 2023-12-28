import React from "react";
import { useAuthStore } from "../../../hooks/use-auth-store";

const HomePage = () => {
  const user_token = useAuthStore((state) => state.token);
  return <div>Hello !{user_token}</div>;
};

export default HomePage;
